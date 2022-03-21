var express = require('express');
var router = express.Router();
let twitterController = require('../controller/twitter');

router.get('/', twitterController.getTweets);
router.post('/', twitterController.addTweet);
router.delete('/:indexToDelete', twitterController.deleteTweet);
router.put('/clearAll', twitterController.clearAll);

module.exports = router;
