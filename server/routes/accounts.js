const express=require('express');
const router=express.Router();

const {getAccounts,storeAccount}=require('../controllers/account.controller');

router.get('/',getAccounts);
router.post('/',storeAccount);

module.exports = router;