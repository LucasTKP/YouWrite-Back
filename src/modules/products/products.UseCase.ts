import { Products } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";
import { deleteProductDTO, registerProductDTO } from "./dtos";

export class ProductsUseCase{
    async registerProduct({name, description, filter, price}: registerProductDTO): Promise<Products>{
        console.log("description")
        const result = await prisma.products.create({
            data: {
                name: name,
                description: description,
                filter: filter,
                price: 555.5
            }
        })
        return result
    }

    async deleteProduct({id}: deleteProductDTO){
        const result = await prisma.products.delete({
            where: {
                id: id
            }
        })
        console.log(result)
        return result
    }
}