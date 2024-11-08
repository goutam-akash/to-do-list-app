import express from "express";
import {
  createToDoList,
  getToDoList,
  getToDoLists,
  removeToDoList,
  removeToDoLists,
  updateToDoList,
} from "../controllers/ToDoController.js";

const router = express.Router();
// create one to-do list
router.post("/create", createToDoList);

// create one to-do list
router.get("/getone/:id", getToDoList);

// get all to-do lists
router.get("/getall", getToDoLists);

// update one to-do list
router.put("/update/:id", updateToDoList);

// delete one to-do list
router.delete("/removeone/:id", removeToDoList);

// delete all to-do lists
router.delete("/remove/all", removeToDoLists);

export default router;
