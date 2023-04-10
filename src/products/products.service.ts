import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {Repository} from "typeorm";

// let products = [
//     {id: 1, title: 'Mleko', price: 3.5},
//     {id: 2, title: 'Mąka', price: 2.9}
// ]

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

    getAll() {
        // return products
        return this.repo.find()
    }

    getById(id: number) {
        // return products.find(x => x.id === id)
        return this.repo.findOne({where: {id}})
    }

    add(title: string, price: number) {
        // const id = Math.round(Math.random() * 1000)
        // const newProduct = {id, title, price}
        // products.push(newProduct)
        //
        // return newProduct

        const newProduct = this.repo.create({title, price})
        return this.repo.save(newProduct)
    }

    async remove(id: number) {
        // products = products.filter(x => x.id !== id)
        const product = await this.repo.findOne({where: {id}})
        await this.repo.remove(product)
    }

    async edit(id: number, price: number) {
        // const product = products.find(x => x.id === id)
        // product.price = price
        // return product

        const product = await this.repo.findOne({where: {id}})
        product.price = price
        return await this.repo.save(product)
    }
}
