const express=require('express');
const router=express.Router();
const { loginAuth }=require('../controllers/auth.controller');
router.post('/',loginAuth);
module.exports = router;