import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/Connection.js";
import router from "./router/route.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //less hackers know about our stack

const port = 8080;

//HTTP GET Request
app.get("/", (req, res) => {
  res.status(201).json("Home GET request");
});

//api routes
app.use("/api", router);

//start server only when we have a valid connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`app is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.log(`cannot connect the server`);
    }
  })
  .catch((error) => {
    console.log(`Invalid database connection`);
  });
