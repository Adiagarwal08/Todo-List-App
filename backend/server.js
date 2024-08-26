import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import TodoRoutes from "./routes/router.js";
import TodoItem from "./models/todoItemModel.js";

//express app
const app = express();

//middleware
app.use(express.json());

app.use("/api/todoitems", TodoRoutes);

//connect to db

const startServer = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);

    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db and server running on port ",
        process.env.PORT
      );
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
