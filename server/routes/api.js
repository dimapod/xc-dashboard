var express = require('express');
var router = express.Router();
var debug = require('debug')('server-test:api');


router.get('/users', function(req, res, next) {
  debug('Generating users');
  res.send([ { name: 'Bob', age:10, now: new Date()}, { name: 'Paul', age:21, now: new Date()} ]);
});


module.exports = router;
