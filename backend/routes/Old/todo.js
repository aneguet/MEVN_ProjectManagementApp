// Imports
const router = require('express').Router();
const Todo = require('../models/Todo');

// We are using async

// GET All Todos · localhost/api/todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send({ message: 'Error getting all the Todos' }); //message: err.message
  }
});

// GET by ID · localhost/api/todos/id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todoFound = await Todo.findById({
      _id: req.params.id,
    });
    res.json(todoFound);
  } catch (err) {
    res.status(500).send({ message: 'Error getting Todo with id= ' + id });
  }
});

// DELETE by ID · localhost/api/todos/delete/id
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todoFoundToDelete = await Todo.findByIdAndDelete({
      _id: req.params.id,
    });
    if (todoFoundToDelete) {
      res.json(todoFoundToDelete);
    } else {
      // Id not found, todoFoundToDelete is null
      res.status(404).send({ message: 'Error deleting Todo with id= ' + id });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error deleting Todo with id= ' + id });
  }
});

// PUT > Update by ID · localhost/api/todos/update/id
router.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // const todoFoundToUpdate = await Todo.updateOne({
    //   {_id: req.params.id}, // {$set: req.body}
    //   author: "Bart",
    //   todo: "Skating",
    // });
    const todoFoundToUpdate = await Todo.findByIdAndUpdate(id, {
      $set: req.body,
    });
    if (todoFoundToUpdate) {
      res.json(todoFoundToUpdate);
    } else {
      res.status(404).send({ message: 'Error updating Todo with id= ' + id });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error updating Todo with id= ' + id });
  }
});
// POST > new Todo · localhost/api/todos/new
router.post('/new', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    // const newTodo = new Todo({ author: 'Flanders', todo: 'Go to Canada' });
    // We save it in the DB
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).send({ message: 'Error creating a new todo' });
  }
});
// Routes export
module.exports = router;
