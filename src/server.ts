import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./errors/AppError";
import { routes } from "./routes";
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.get('/', (req, res) => {
    
  // console.log(req.params.A)
  // console.log(req.body)
  // console.log(req.header)

  // res.render
  // res.json
  // res.send
  // res.status
  res.send("Deu certo!!!")
})
app.listen(process.env.Port || 3333, () => console.log("Server is running in port 3333 🚀"));
