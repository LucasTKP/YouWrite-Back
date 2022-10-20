import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./errors/AppError";
import { routes } from "./routes";
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3333;

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
  res.send("Deu certo!!!!!!!")
})
app.listen(port, () => console.log("Server is running in port " + port + " 🚀"));
