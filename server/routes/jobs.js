const express=require('express');
const router=express.Router();
const authenticateToken = require('../middleware/auth');

const {getJobs,storeJob,getDetail}=require('../controllers/job.controller');

router.get('/',authenticateToken,getJobs);
router.get('/:id',authenticateToken,getDetail);
router.post('/',authenticateToken,storeJob);
module.exports = router;