const { Router } = require('express');
const UsersController = require('../controllers/UsersController');

const router = Router();

router.post('/signup', UsersController.signup)
    .post('/login', UsersController.login);






module.exports = router;
