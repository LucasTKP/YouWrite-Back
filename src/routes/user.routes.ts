import { Router } from "express";
import {  UserController } from "../modules/users/useCases/userController/userController";

const userController = new  UserController();

const userRoutes = Router();

userRoutes.post("/create", userController .createUser);
userRoutes.post("/verify", userController .verifyEmailSignUp);
userRoutes.get("/:id", userController .selectUserByID);
userRoutes.post("/login", userController.verifyUserLogin);
userRoutes.post("/recovery", userController.recoveryPassword);
userRoutes.put("/alterpassword", userController.alterPassword);


export { userRoutes };
