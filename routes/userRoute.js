const express = require('express');
const { Register, Login, GetAllUsers, GetSingleUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/allusers', GetAllUsers);
router.get('/:id', GetSingleUser);



module.exports = router;