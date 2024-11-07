import express from "express";
import {
  createToDoList,
  getToDoLists,
  removeToDoList,
  removeToDoLists,
  updateToDoList,
} from "../controllers/ToDoController.js";

const router = express.Router();
// create one to-do list
router.post("/create", createToDoList);

// get all to-do lists
router.get("/getall", getToDoLists);

// update one to-do list
router.put("/update/:id", updateToDoList);

// delete one to-do list
router.delete("/remove/:id", removeToDoList);

// delete all to-do lists
router.delete("/remove/all", removeToDoLists);

export default router;
