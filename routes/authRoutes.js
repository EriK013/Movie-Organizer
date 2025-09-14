const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get('/register', (req, res) => {
    res.render('authViews/register');
});
router.post('/register', authController.register);

router.get('/login', (req, res) => {
    res.render('authViews/login', {error: null});
});

router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;