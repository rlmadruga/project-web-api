const express = require('express');
const router  = express.Router();
const Car = require('../models/Car');
const ensureLogin = require('connect-ensure-login');

//FILE UPLOAD
const multer = require('multer');
const uploadCloud = require('../config/cloudinary');

//INDEX
router.get('/', (req, res, next) => {
  res.render('index');
});

//SAVE CAR -----------------------------------
router.get('/savecar', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('savecar');
});

router.post('/save', uploadCloud.single('photo'), ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const {
    brand,
    model, 
    color,
    plate,
    city,
    state,
    year,
    details,
  } = req.body;

  // const location = {
  //   type: 'Point',
  //   coordinates: [longitude, latitude]
  // }

  Car.create({
    brand,
    model, 
    color,
    plate,
    city,
    state,
    year,
    details,
    path: req.file.url,
    originalName: req.file.originalname,
    owner: req.user._id
  })
  .then(() => {
    res.redirect('/auth/dashboard');
  })
  .catch(error => console.log(error));
});

//EDIT CAR -----------------------------------
router.get('/editcar', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('editcar');
});



module.exports = router;
