var jwt = require('jwt-simple');
const user = require('../models/user')

var payload = { userId: req.params.id };
var secret = 'fe1a1915a379f3be5394b64d14794932';
var token = jwt.encode(payload, secret);

console.log(token);