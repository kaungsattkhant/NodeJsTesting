const express=require('express');
const router=express.Router();

const {getJobs,storeJob}=require('../controllers/job.controller');

router.get('/',getJobs);
router.post('/',storeJob);
module.exports = router;