const { body, validationResult } = require('express-validator');
let tweet = [
    {
        title: 'ReactJS',
        body: 'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.',
        date_of_creation: '2022-03-21',
        author: 'Karthik',
        category: 'study',
    },
];
function getTweets(req, res) {
    res.json(tweet);
}
const addTweet = [
    body('title')
        .trim()
        .isLength({ min: 5, max: 50 })
        .isAlphanumeric()
        .withMessage('title:5-50 chars and only alpha numeric'),
    body('body')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('body : 5-200 chars')
        .escape(),
    body('author')
        .trim()
        .isLength({ min: 5, max: 100 })
        .isAlphanumeric()
        .withMessage('Author:5-100 and no special chars'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ status: 0, debug_data: errors });
        } else {
            console.log(req.body);
            let { title, body, date_of_creation, author, category } = req.body;
            tweet.push({ title, body, date_of_creation, author, category });
            res.json({ status: 'Tweet Added' });
        }
    },
];

function deleteTweet(req, res) {
    console.log(req.params.indexToDelete);
    let newTweets = tweet.filter((val, index) => {
        if (index === parseInt(req.params.indexToDelete)) {
            console.log('Came in return false');
            return false;
        } else {
            return true;
        }
    });
    tweet = newTweets;
    res.json({ status: 'deleted' });
}
function clearAll(req, res) {
    tweet = [];
    res.json({ status: 'Deleted all' });
}
module.exports = { getTweets, addTweet, deleteTweet, clearAll };
