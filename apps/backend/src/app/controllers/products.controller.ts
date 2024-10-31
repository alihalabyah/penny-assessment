import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@User('userId') userId: string, @Body() createProductDto: any) {
    return this.productsService.create(userId, createProductDto);
  }

  @Get()
  findAll(@User('userId') userId: string) {
    return this.productsService.findAll(userId);
  }

  @Get(':id')
  findOne(@User('userId') userId: string, @Param('id') productId: string) {
    return this.productsService.findOne(userId, productId);
  }

  @Put(':id')
  update(
    @User('userId') userId: string,
    @Param('id') productId: string,
    @Body() updateProductDto: any,
  ) {
    return this.productsService.update(userId, productId, updateProductDto);
  }

  @Delete(':id')
  remove(@User('userId') userId: string, @Param('id') productId: string) {
    return this.productsService.remove(userId, productId);
  }
}
