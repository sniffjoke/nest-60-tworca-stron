import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dtos/create-product.dto";
import {EditProductDto} from "./dtos/edit-product.dto";

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    @Get()
    getProducts() {
        return  this.productsService.getAll()
    }

    @Get('/:id')
    getProduct(@Param('id') id: string) {
        return this.productsService.getById(parseInt(id))
    }

    @Post()
    addProduct(@Body() body: CreateProductDto) {
        console.log(body)
        return this.productsService.add(body.title, body.price  )
    }

    @Delete('/:id')
    @HttpCode(204)
    removeProduct(@Param('id') id: string) {
        this.productsService.remove(+id)
        return `item with id ${id} was deleted`
    }

    @Patch('/:id')
    editProduct(@Body() body: EditProductDto, @Param('id') id: string) {
        return this.productsService.edit(+id, body.price)
    }
}
