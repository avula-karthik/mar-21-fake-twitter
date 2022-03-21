function homepage(req, res) {
    res.send('Products Base Page');
}
function productDetails(req, res) {
    res.send('Product Details page');
}
module.exports = { homepage, productDetails };
