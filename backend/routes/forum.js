var express = require('express');
var router = express.Router();
let forums = [];
router.get('/', (req, res) => {
    res.json(forums);
});
router.post('/', (req, res) => {
    let { title, doc, body, author } = req.body;
    forums.push({ title, doc, body, author });
    res.json({ Status: 'Addition Done' });
});
router.delete('/:indexToDel', function (req, res) {
    console.log(req.params.indexToDel);
    let newForums = forums.filter((val, index) => {
        if (index === parseInt(req.params.indexToDel)) {
            return false;
        } else {
            return true;
        }
    });
    forums = newForums;
    res.json({ status: 'Deleted' });
});
router.put('/clearall', function (req, res) {
    forums = [];
    res.json({ status: 'ClearedAll' });
});
module.exports = router;
