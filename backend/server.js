import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/ToDoRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/todolist", todoRoutes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
