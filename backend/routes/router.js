import express from "express";
import getTodoitems, {
  getTodoitem,
  createTodoitem,
  deleteTodoitem,
  updateTodoitem,
  getStatusCount,
} from "../controllers/todoitemController.js";

const router = express.Router();

//GET count of status
router.get("/count", getStatusCount);

//GET all todo items
router.get("/", getTodoitems);

//GET a single todo item
router.get("/:id", getTodoitem);

//POST a new todo item
router.post("/", createTodoitem);

//DELETE a todo item
router.delete("/:id", deleteTodoitem);

//UPDATE a todo item
router.put("/:id", updateTodoitem);

export default router;
