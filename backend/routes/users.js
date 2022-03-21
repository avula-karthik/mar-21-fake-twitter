var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(`<h1>respond with a resource</h1>`);
});
router.get('/details', (req, res) => {
    res.send(`<h1>Showing Details Page</h1>`);
});
router.get('/info', function (req, res) {
    res.send(`<h1>Showing Users info</h1>`);
});
router.get('/info/mine', (req, res) => {
    res.send(`<h1>Showing User me data</h1>`);
});

module.exports = router;
