var express = require('express');
var router = express.Router();
var db = require('../db');


/* GET users listing. */
router.get('/', function(req, res, next) {
  db.simpleQuery('SELECT * FROM USERS').then( users => res.json(users));
});

router.post('/login', async function(req, res, next) {
  let credentials = await db.simpleQuery('SELECT * FROM CREDENTIALS WHERE id=?',req.body.id);
  if(!credentials[0]) {
    res.status(401);
    res.send('User not found');
  }
  else if (credentials[0].password == req.body.password) {
    res.redirect('../' + credentials[0].id);
  } else {
    res.status(401);
    res.send('Incorrect password...');
  }
});

router.get('/:id', function(req, res, next) {
  db.simpleQuery('SELECT * FROM USERS WHERE id=?',req.params.id).then( user => res.json(user[0]));
});

module.exports = router;
