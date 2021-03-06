const express = require('express');
const router  = express.Router();
const Car = require('../models/Car');
const ensureLogin = require('connect-ensure-login');

//FILE UPLOAD
const multer = require('multer');
const uploadCloud = require('../config/cloudinary');

//INDEX
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});

//THANK YOU --------------------------------------------
router.get('/thankyou', (req, res, next) => {
  res.render('thankyou');
});

//DASHBOARD
router.get('/dashboard', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {

  Car
  .find({owner: req.user._id})
  .populate('owner')
  .then(cars => {
    const manageCars = cars.map(car => {
      if (car.owner && car.owner.toString() === req.user._id.toString()) {
        car.isOwner = true;
      }
      console.log(car)
      return car;
    });
    res.render('dashboard', {user: req.user, cars: manageCars});
  })
  .catch(error => {
  console.log(error);
    res.redirect('auth/login');
  })
});

//SAVE CAR -----------------------------------
router.get('/savecar', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('savecar', {user: req.user});
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
    status
  } = req.body;

      Car.create({
        brand,
        model, 
        color,
        plate,
        city,
        state,
        year,
        details,
        status,
        path: req.file.url,
        originalName: req.file.originalname,
        owner: req.user._id
      })
      .then(response => {
        console.log(response);
        res.redirect('/dashboard');
      })
      .catch(error => {
        res.render('savecar', {message: 'Carro já cadastrado em nosso banco de dados!'});
        console.log(error);
      });
        
});

//SHOW CAR DETAILS --------------------------
router.get('/cars/:carId', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const {
    carId
  } = req.params;

  Car
  .findById(carId)
  .then(car => {
    console.log(car);
    res.render('detailscar', {
      car, user: req.user
    });
  })
  .catch(error => {
    
    // res.render('savecar', {message: 'Carro já cadastrado em nosso banco de dados!'})
    console.log(error);
  });
}) 

//EDIT CAR -----------------------------------
router.get('/cars-edit/:carId', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const {
    carId
  } = req.params;

  Car
  .findById(carId)
  .then(car => {
    res.render('editcar', {
      car, user: req.user
    });
  })
  .catch(error => console.log(error));
});


router.post('/cars-edit', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  // console.log(req.body);
  const {
    details,
    status,
    carId
  } = req.body;

  Car
  .findOneAndUpdate({_id: carId}, {
    $set:{
      details: details,
      status: status
    }
  }, {
    new:true
  })
  .then(response => {
    console.log(response)
    res.redirect(`/cars/${response._id}`);
  })
  .catch(error => console.log(error));
})

//DELETAR CAR ------------------------------------
router.get('/cars-delete/:carId', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const {
    carId
  } = req.params;

  Car
  .findByIdAndDelete(carId)
  .then(response => {
    res.redirect('/dashboard');
  })
  .catch(error => console.log(error));
})

//SEARCH -----------------------------------------
router.get('/search', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {

  console.log(req.query.search);
  if (req.query.search !== undefined) {
  Car
  .findOne({plate: req.query.search})
  .then(response => {
    console.log(response);
    if (response !== null) {
      res.render('search', {response, user: req.user});
    } else {
      res.render('search', {user: req.user, message: "Esse carro não está cadastrado no nosso banco de dados"});
    }
  })
  .catch(error => console.log(error));
  } else {
    res.render('search', {user: req.user});
  }
});


module.exports = router;
