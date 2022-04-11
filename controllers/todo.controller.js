const Todo = require('../models/todo.schema')

module.exports = {
  addTodo: async (req, res) => {
   
    try {
      const { todo, num } = req.body

      if(!todo)
        return res.status(400).json({ message: "Empty todo can't be added" })
  
      Todo.create({ title: todo, num: num }, async (error, data) => {

        console.log(error, data)
  
        if(!!error)
          return res.status(500).json({ message: 'Something went wrong while adding todo'})
  
        return res.status(201).json({ message: 'Added todo'})
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Something went wrong while adding todo'})
    }
   
  },
  getAllTodos: async (req, res) => {

    Todo.find(async (error, data) => {
      if (error)
        return res.status(400).json(error)
      return res.json(data)
    })
  },
  toggleTodo: async (req, res) => {

    try {
      const { id } = req.params

      if(!id)
        return res.status(400).json({ message: "invalid todo"})
      
      Todo
        .findById(id)
        .then(todo => {
          Todo.findByIdAndUpdate(id, { isDone: !todo.isDone }, (error, data) => {
  
            if(error) 
              return res.status(500).json({message: "Something Went Wrong"})
            
            res.json({message: 'Todd is updated'})
          })
        })
        .catch(() => res.status(500).json({message: "Something Went Wrong"}))
    } catch (error) {
      return res.status(500).json({message: "Something Went Wrong"})
    }
  },
  getTodoById: async (req, res) => {

    const { id } = req.params
    
    Todo
      .findById(id)
      .then(todo => res.json(todo))
      .catch(() => res.status(500).json({ message: 'Something went Wrong' }))
  },
  deleteTodo: async (req, res) => {

    const { id } = req.params

    if(!id)
      return res.status(400).json({ message: 'Invalid Todo'})

    Todo
      .findByIdAndDelete(id)
      .then(() => res.json({ message: 'Todo deleted' }))
      .catch(() => res.status(500).json({ message: 'Something went wrong' }))
  } 
}