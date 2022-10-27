import { Router } from "express";

import { userRoutes } from "./user.routes";
import {productsRoutes } from "./products.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products", productsRoutes);

export { routes };
