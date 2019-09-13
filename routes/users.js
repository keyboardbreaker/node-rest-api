const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
// const auth = require('../app/middlewares/auth');


router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
// router.post('/authenticate', auth.ensureAuthenticated);

module.exports = router;