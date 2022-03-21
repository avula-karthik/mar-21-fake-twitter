var express = require('express');
var router = express.Router();
let product = [
    {
        name: 'tshirt',
        price: 30,
        description: 'Half sleeve T Shirt',
        category: 'Clothing',
        status: 'unavailable',
    },
];
router.get('/', function (req, res) {
    res.json(product);
});
router.post('/', function (req, res) {
    console.log(req.body);
    let { name, price, description, category, status } = req.body;
    product.push({ name, price, description, category, status });
    res.json({ status: 'Adding Completed' });
});
router.delete('/:indexToDel', function (req, res) {
    console.log(req.params.indexToDel);
    let newProducts = product.filter((val, index) => {
        if (index === parseInt(req.params.indexToDel)) {
            return false;
        } else {
            return true;
        }
    });
    product = newProducts;
    res.json({ status: 'Deleted' });
});
router.put('/clearAll', (req, res) => {
    product = [];
    res.json({ status: 'Cleared All' });
});
module.exports = router;
