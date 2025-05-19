import { Controller, Get, Post, Body, Patch, Param, Request ,Delete, UseInterceptors, UploadedFile, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Product } from './entities/product.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createProductDto: CreateProductDto,  @UploadedFile() file: Express.Multer.File, ) {
    if (file) {
      createProductDto.image = null;
    } else {
      createProductDto.image = file;
    }
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: string,@UploadedFile() file: Express.Multer.File,@Body() updateProductDto: UpdateProductDto,) {
     if (file) {
      updateProductDto.image = file;
    }

    return this.productsService.update(+id, updateProductDto);
  }

  @Get('seller/:sellerId')
  async findProductsBySellerId(
    @Param('sellerId', ParseIntPipe) sellerId: number,
  ): Promise<Product[]> {
    return this.productsService.findProductsBySellerId(sellerId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string,  @Request() req) {
    console.log('req:::',req)
    return this.productsService.remove(+id, req.user);
  }
}
