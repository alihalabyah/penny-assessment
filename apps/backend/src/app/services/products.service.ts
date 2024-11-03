import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(userId: string, createProductDto: any) {
    const product = await this.productModel.create({
      ...createProductDto,
      userId,
    });
    return product;
  }

  async findAll(userId: string) {
    return this.productModel.find({ userId });
  }

  async findOne(userId: string, productId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.userId.toString() !== userId) {
      throw new UnauthorizedException();
    }
    return product;
  }

  async update(userId: string, productId: string, updateProductDto: any) {
    const product = await this.findOne(userId, productId);
    Object.assign(product, updateProductDto);
    return product.save();
  }

  async remove(userId: string, productId: string) {
    const product = await this.findOne(userId, productId);
    await this.productModel.deleteOne({ _id: product._id });
    return { message: 'Product deleted' };
  }
}
