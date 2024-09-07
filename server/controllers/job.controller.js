const knex = require("knex")(require("../knexfile").development);

const getJobs = async (req, res) => {
  const { search_input, function_ids, location_id } = req.query;

  try {
    // const rows = await knex("jobs").orderBy("id", "desc");
    let query = knex("jobs")
      .distinct("jobs.id") // Select distinct job IDs to avoid duplicates
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
    if (Array.isArray(function_ids) && function_ids.length > 0) {
      query = query
        .join("job_function", "jobs.id", "job_function.job_id")
        .whereIn("job_function.function_id", function_ids);
    }
    if (search_input) {
      query = query.where("jobs.name", "like", `%${search_input}%`);
    }

    if (location_id) {
      query = query.where("jobs.location_id", location_id);
    }
    const rows = await query;
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
    knex("job_function").where({ job_id: jobId }).pluck("function_id"),
  ]);
  // const result = await knex("jobs").where({ id: jobId }).first();
  // const function_ids = await knex("job_function").where({ job_id: jobId }).pluck('function_id');
  // console.log(function_ids);
  if (!jobResult) {
    res.status(404).json({ message: "data not found" });
  }
  // console.log(result);
  jobResult.function_ids = functionIds;
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
    user_id,
    function_ids,
  } = req.body;
  console.log(req.body);
  try {
    if (id) {
      // Update the existing job
      const result = await knex("jobs").where({ id }).update({
        name,
        company,
        education,
        description,
        location_id,
        updated_at: new Date(), // Assuming you have a 'updated_at' column
      });

      if (!result) {
        return res
          .status(404)
          .json({ message: "Job not found or update failed" });
      }

      // Update job functions
      await knex("job_function").where({ job_id: id }).del(); // Delete existing job functions

      const jobFunctions = function_ids.map((function_id) => ({
        job_id: id,
        function_id,
      }));

      await knex("job_function").insert(jobFunctions); // Insert updated job functions

      res.json({ message: "Updated Successfully" });
    } else {
      // Insert new job
      const result = await knex("jobs").insert({
        name,
        company,
        education,
        description,
        location_id,
        date_time: new Date(),
        user_id, // Assuming user_id is static for now
        created_at: new Date(),
        updated_at: new Date(),
      });

      const insertId = result[0];
      if (!insertId) {
        return res.status(500).json({ message: "Create error" });
      }

      // Insert job functions
      const jobFunctions = function_ids.map((function_id) => ({
        job_id: insertId,
        function_id,
      }));

      await knex("job_function").insert(jobFunctions);

      res.json({ message: "Created Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  // if (id) {
  // } else {
  //   const result = await knex("jobs").insert({
  //     name,
  //     company,
  //     education,
  //     date_time: new Date(),
  //     description,
  //     location_id,
  //     user_id: 1,
  //   });
  //   const insertId = result[0];
  //   if (!insertId) {
  //     res.status(500).json({ message: "Create error" });
  //   }
  //   if (insertId) {
  //     for (const function_id of function_ids) {
  //       const jobFunction = await knex("job_function").insert({
  //         job_id: insertId,
  //         function_id: function_id,
  //       });
  //     }
  //     res.json({ message: "Created Successfully" });
  //   }
  // }
};

const deleteJob = async (req, res) => {
  // console.log(req.params.id);
  const jobId = req.params.id; // Access jobId from URL parameters
  console.log(jobId);
  try {
    // Delete the user from the 'accounts' table
    const result = await knex("jobs").where("id", jobId).del();

    if (result === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({
      message: "Data deleted successfully",
      status: 200,
      id: jobId,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "An error occurred",
      status: 500,
      error: error.message,
    });
  }
};

module.exports = { getJobs, storeJob, getDetail, deleteJob };
