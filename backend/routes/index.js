var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.send(`<h1>Welcome to Homepage</h1>`);
});
router.get('/students', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    let students = ['Karthik', 'Mulaz', 'Mithun', 'Keerthan', 'purusotham'];
    res.json(students);
    // res.send('Welcome to Homepage');
});
router.get('/student', function (req, res, next) {
    let anyStudent = { name: 'Karthik', age: 21, class: 'cse3' };
    res.json(anyStudent);
});

module.exports = router;
