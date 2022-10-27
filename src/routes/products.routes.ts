import { Router } from "express";
import {  ItensController } from "../modules/products/productsController";

const itensController = new  ItensController();

const productsRoutes = Router();
productsRoutes.post("/register", itensController .registerProduct);
productsRoutes.delete("/delete:idProducts", itensController .deleteProduct);


export { productsRoutes };