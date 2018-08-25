var express = require('express');
var router = express.Router(); 
var Controller = require('../controller/userController');

/* GET users listing. */
router.post('/', Controller.createUser);
router.post('/signIn', Controller.signIn);

module.exports = router;
