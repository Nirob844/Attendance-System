import express, { json } from "express";
import connectDB from "./db.js";

const app = express();

app.use(json());

//app.use(routes);

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({
    message,
  });
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database Connected");
    app.listen(4000, () => {
      console.log("I'm listening on port 4000");
    });
  })
  .catch((e) => console.log(e));
