const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

router.get('/', (req, res, next) => {
    Car
        .find()
        .then(cars => {
            res.json(cars);
        })
        .catch(error => console.log(error));
});

module.exports = router;