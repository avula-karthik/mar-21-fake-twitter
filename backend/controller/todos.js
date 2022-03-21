const { body, validationResult } = require('express-validator');
let todos = [
    { item: 'initial todo1', status: 'complete' },
    { item: 'initial todo2', status: 'incomplete' },
];

function getTodos(req, res) {
    res.json(todos);
}
const addTodo = [
    body('item')
        .trim()
        .isLength({ min: 3, max: 150 })
        .withMessage('Item: 3-20 chars')
        .escape(),
    body('status')
        .trim()
        .isLength({ min: 8, max: 10 })
        .withMessage('Status should be 8-10 chars'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ status: 0, debug_data: errors });
        } else {
            console.log(req.body);
            let { item, status } = req.body;
            todos.push({ item, status });
            res.json({ status: 'adding todo complete' });
        }
    },
];
function deleteTodo(req, res) {
    console.log(req.params.indexToDelete);
    let newTodos = todos.filter((val, index) => {
        if (index === parseInt(req.params.indexToDelete)) {
            console.log('Came in return false');
            return false;
        } else {
            return true;
        }
    });
    console.log(newTodos);
    todos = newTodos;
    res.json({ status: 'deleted' });
}

module.exports = { getTodos, addTodo, deleteTodo };
