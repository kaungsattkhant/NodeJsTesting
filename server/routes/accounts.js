const express=require('express');
const router=express.Router();
const authenticateToken = require('../middleware/auth');

const {getAccounts,storeAccount}=require('../controllers/account.controller');

router.get('/',authenticateToken,getAccounts);
router.post('/',storeAccount);

module.exports = router;