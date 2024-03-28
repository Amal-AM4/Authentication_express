var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateUser = require('../middlewares/authenticateUser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/welcome', authenticateUser, async (req, res, next) => {
  // Access decoded user data from req.user
  const userData = req.user;
  console.log(userData);
  console.log(userData.userId);

  pk = userData.userId;

  // const result = await User.findByPk(pk);
  const result = await User.findOne({ where: {id: pk} });

  res.render('welcome', {data: result});
});

router.get('/dashash', authenticateUser, authController.nextPage);

router.get('/testRouter', (req, res) => {
  res.send('TestRouter');
})

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogIn);

// Logout route to clear session
router.post('/logout', async (req, res) => {
  res.clearCookie('token');
  return res.redirect('/login');
});



module.exports = router;
