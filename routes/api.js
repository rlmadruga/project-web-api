const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// AXIOS - EXPORTING JSON CARS
router.get('/', (req, res, next) => {
    Car
    .find()
    .then(cars => {
        res.json(cars);
    })
    .catch(error => console.log(error));
});

module.exports = router;