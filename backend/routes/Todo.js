// Imports
const router = require("express").Router();
const Todo = require("../models/todo");

// We are using async

// GET All Todos · localhost/api/todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send({ message: "Error getting all the Todos" }); //message: err.message
  }
});

// POST > new Todo · localhost/api/todos/new
router.post("/new", async (req, res) => {
  try {
    //req.body > what the Vue App is sending to the DB
    // For now we create an object since we don't have a frontend form
    const newTodo = new Todo({ author: "Flanders", todo: "Go to Canada" });
    // We save it in the DB
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).send({ message: "Error creating a new todo" });
  }
});

// GET by ID · localhost/api/todos/id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todoFound = await Todo.findById({
      _id: req.params.id,
    });
    res.json(todoFound);
  } catch (err) {
    res.status(500).send({ message: "Error getting Todo with id= " + id });
  }
});

// DELETE by ID · localhost/api/todos/delete/id
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todoFoundToDelete = await Todo.findByIdAndDelete({
      _id: req.params.id,
    });
    res.json(todoFoundToDelete);
  } catch (err) {
    res.status(500).send({ message: "Error deleting Todo with id= " + id });
  }
});

// PUT > Update by ID · localhost/api/todos/update/id
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // const todoFoundToUpdate = await Todo.updateOne({
    //   // {_id: req.params.id}, {$set: req.body}
    //   author: "Bart",
    //   todo: "Skating",
    // });
    const todoFoundToUpdate = await Todo.findByIdAndUpdate(id, {
      author: "Bart",
      todo: "Skating",
    });
    res.json(todoFoundToUpdate);
  } catch (err) {
    res.status(500).send({ message: "Error updating Todo with id= " + id });
  }
});
// Routes export
module.exports = router;
