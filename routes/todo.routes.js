const router = require('express').Router()
const todoActions = require('../controllers/todo.controller')

router.post('/', todoActions.addTodo)
router.get('/', todoActions.getAllTodos)
router.get('/:id', todoActions.getTodoById)
router.put('/:id', todoActions.toggleTodo)
router.delete('/:id', todoActions.deleteTodo)

module.exports = router