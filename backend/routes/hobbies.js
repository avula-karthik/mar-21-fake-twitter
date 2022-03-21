var express = require('express');
var router = express.Router();
let hobby = [
    {
        name: 'Listening to podcast',
        description: 'Early morning and evening. improves focus',
        date_of_creation: '2022-03-20',
    },
];
router.get('/', function (req, res) {
    res.json(hobby);
});
router.post('/', function (req, res) {
    console.log(req.body);
    let { name, description, date_of_creation } = req.body;
    hobby.push({ name, description, date_of_creation });
    res.json({ status: 'Adding Completed' });
});
router.delete('/:indexToDel', function (req, res) {
    console.log(req.params.indexToDel);
    let newHobbies = hobby.filter((val, index) => {
        if (index === parseInt(req.params.indexToDel)) {
            return false;
        } else {
            return true;
        }
    });
    hobby = newHobbies;
    res.json({ status: 'Deleted' });
});
router.put('/clearAll', (req, res) => {
    hobby = [];
    res.json({ status: 'Cleared All' });
});
module.exports = router;
