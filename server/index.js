import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
const app = express();
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import path from "path";

// Db
import connectDB from "./db/conn.js";

// middleware
app.use(express.json());
app.use(cors());
app.use(express.static("static"));

// router
import router from "./route/router.js";

// routes
app.use("/api/v1", router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});

// port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
