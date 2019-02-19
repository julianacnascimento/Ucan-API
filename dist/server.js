'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();

router.route('/books').get(function (req, res) {
  res.send('list of all books');
});

app.use('/', router);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});