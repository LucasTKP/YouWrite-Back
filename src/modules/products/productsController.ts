import { Request, Response } from "express";
import {ProductsUseCase} from './products.UseCase'

export class ItensController{
    async registerProduct(req: Request, res: Response){
    const productsUseCase  = new ProductsUseCase();   
    const {name, description, filter, price} = req.body
    const result = await productsUseCase.registerProduct({name, description, filter, price})
    return res.status(200).json({result, message: "produts was registered"})
    }

    async deleteProduct(req: Request, res: Response){
        const productsUseCase  = new ProductsUseCase();  
        console.log(req.params.idProducts)
        const id = parseInt(req.params.idProducts)
        const result = await productsUseCase.deleteProduct({id})
        return res.status(200) .json({result, "message": "This product was deleted!"})
    }
}