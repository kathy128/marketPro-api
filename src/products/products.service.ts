import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { User, UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
   
   constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    //@InjectRepository(User)
    //private readonly userRepository: Repository<User>,
    private configService: ConfigService
  ) {
    cloudinary.config({
        cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
        api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
}   );
  }
   async uploadImageToCloudinary(file: Express.Multer.File) {
     //const filePath = file.path.replace(/\\/g, '/');
    /* if (!fs.existsSync(file.path)) {
    throw new Error('El archivo no se encuentra en la ruta especificada');
  } */
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
    let imageUrl: any; 
    if(createProductDto.image){
      imageUrl = await this.uploadImageToCloudinary(createProductDto.image);
    }
    const product = this.productRepository.create({...createProductDto, image: imageUrl.url});
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({id});
  }


  async findProductsBySellerId(sellerId: number): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { sellerId },
    });
    if (!products.length) {
      return [];
    }
    return products;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    let imageUrl: any; 
    if(updateProductDto.image){
      imageUrl = await this.uploadImageToCloudinary(updateProductDto.image);
    }
      const updatedProduct = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (updatedProduct && imageUrl && imageUrl.url) {
      updatedProduct.image = imageUrl.url;
    }
    if (!updatedProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

      return this.productRepository.save(updatedProduct);
  }

  async remove(id: number, user: any) {
    const product = await this.findOne(id);
    if (product?.sellerId !== (user?.id)) {
      throw new ForbiddenException(
        'Solo el vendedor puede eliminar productos',
      );
    }
    return await this.productRepository.delete(id);
  }
}
