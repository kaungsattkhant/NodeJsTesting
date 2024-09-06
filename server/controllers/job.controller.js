const knex = require("knex")(require("../knexfile").development);

const getJobs = async (req, res) => {
  try {
    // const rows = await knex("jobs").orderBy("id", "desc");
    const rows = await knex("jobs")
      .select(
        "jobs.id",
        "jobs.name",
        "jobs.company",
        "jobs.date_time",
        "jobs.description",
        "jobs.is_active",
        "jobs.created_at",
        "jobs.updated_at",
        "locations.name as location_name",
        "locations.latitude",
        "locations.longitude",
        "users.username"
      )
      .leftJoin("locations", "jobs.location_id", "locations.id") // Join with locations
      .leftJoin("users", "jobs.user_id", "users.id") // Join with locations
      .orderBy("jobs.id", "desc");
    for (const job of rows) {
      const functions = await knex("functions")
        .join("job_function", "functions.id", "job_function.function_id")
        .where("job_function.job_id", job.id)
        .select(
          "functions.name as function_name",
          "functions.id as function_id"
        );
      job.functions = functions.map((f) => ({
        id: f.function_id,
        name: f.function_name,
      })); // Attach functions to the job
    }
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving ", error: err.message });
  }
};

const getDetail = async (req, res) => {
  const { id: jobId } = req.params; // Access jobId from URL parameters
  const [jobResult, functionIds] = await Promise.all([
    knex("jobs").where({ id: jobId }).first(),
    knex("job_function").where({ job_id: jobId }).pluck('function_id')
  ]);
  // const result = await knex("jobs").where({ id: jobId }).first();
  // const function_ids = await knex("job_function").where({ job_id: jobId }).pluck('function_id');
  // console.log(function_ids);
  if (!jobResult) {
    res.status(404).json({ message: "data not found" });
  }
  // console.log(result);
  jobResult.function_ids=functionIds;
  res.json({ data: jobResult });
};

const storeJob = async (req, res) => {
  const {
    id,
    name,
    company,
    education,
    description,
    location_id,
    function_ids,
  } = req.body;
  const result = await knex("jobs").insert({
    name,
    company,
    education,
    date_time: new Date(),
    description,
    location_id,
    user_id: 1,
  });
  const insertId = result[0];
  if (!insertId) {
    res.status(500).json({ message: "Create error" });
  }
  if (insertId) {
    for (const function_id of function_ids) {
      const jobFunction = await knex("job_function").insert({
        job_id: insertId,
        function_id: function_id,
      });
    }
    res.json({ message: "Created Successfully" });
  }
};

module.exports = { getJobs, storeJob, getDetail };
