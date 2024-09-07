const express=require('express');
const router=express.Router();
const authenticateToken = require('../middleware/auth');

const {getLocations}=require('../controllers/location.controller');

router.get('/',authenticateToken,getLocations);
router.get('/get_all',getLocations);
module.exports = router;