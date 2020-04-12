const express = require('express');
const router  = express.Router();

//INDEX
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
