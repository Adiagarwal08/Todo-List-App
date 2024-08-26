import mongoose from "mongoose";
import ToDoItem from "../models/todoItemModel.js";

//get all todo items
const getTodoitems = async (req, res) => {
  const todoItems = await ToDoItem.find({}).sort({ createdAt: -1 });

  res.status(200).json(todoItems);
};

//get a single todo item
const getTodoitem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const todoItem = await ToDoItem.findById(id);

  if (!todoItem) {
    return res.status(404).json({ error: "No such item" });
  }

  res.status(200).json(todoItem);
};

//create a new todo item
const createTodoitem = async (req, res) => {
  console.log(req.body);
  const { title, deadline } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!deadline) {
    emptyFields.push("deadline");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const todoItem = await ToDoItem.create({ title, deadline });
    res.status(200).json(todoItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a todo item
const deleteTodoitem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const todoItem = await ToDoItem.findOneAndDelete({ _id: id });

  if (!todoItem) {
    return res.status(404).json({ error: "No such item" });
  }

  res.status(200).json(todoItem);
};

//update a todo item
const updateTodoitem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const todoItem = await ToDoItem.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!todoItem) {
    return res.status(404).json({ error: "No such item" });
  }

  res.status(200).json(todoItem);
};

// get count of status
const getStatusCount = async (req, res) => {
  console.log("Hi");
  const statusCounts = await ToDoItem.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        _id: { $ne: null }, // Exclude documents with null _id
      },
    },
  ]);

  if (!statusCounts) {
    return res.status(400).json({ error: "Not found" });
  }

  res.status(200).json(statusCounts);
};

export default getTodoitems;

export {
  getTodoitem,
  createTodoitem,
  deleteTodoitem,
  updateTodoitem,
  getStatusCount,
};
