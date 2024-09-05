const express=require('express');
const router=express.Router();
const authenticateToken = require('../middleware/auth');
const {getUsers,storeUser,getDetail,deleteUser}=require('../controllers/user.controller');

router.get('/',authenticateToken,getUsers);
router.get('/:id',authenticateToken,getDetail);
router.delete('/:id',authenticateToken,deleteUser);
router.post('/',authenticateToken,storeUser);

module.exports = router;