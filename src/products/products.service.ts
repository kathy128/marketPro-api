import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';

@Injectable()
export class ProductsService {
   
   constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
   async uploadImageToCloudinary(file: Express.Multer.File) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'productos',
      });
      return result; 
    } catch (error) {
      throw new Error('Error al subir la imagen a Cloudinary');
    }
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({id});
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
      const updatedProduct = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!updatedProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

      return this.productRepository.save(updatedProduct);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
