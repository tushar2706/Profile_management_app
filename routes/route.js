const express = require('express');
const app = require('../routes/route');
const bodyparser = require('body-parser');
const Controller = require('../controllers/controller')
const validate = require('../middleware/middleware')
require('dotenv').config();
const mongoString = process.env.DATABASE_URL;
const {
  user_info, Country, State, City
} = require('../model/model')
const upload = validate.upload;

const router = express();
router.use(bodyparser.json());

router.get('/users', Controller.getalluserdata)
router.post('/signup', Controller.signup)
router.post('/login', Controller.login)
router.get('/profile', validate.verifyTokenfunction, Controller.getprofile)
router.put('/profile', Controller.updateprofile)
router.post('/user/photo', upload.single('photo'), Controller.photoupload)

module.exports = router;