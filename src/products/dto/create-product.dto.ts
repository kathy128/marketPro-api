import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, isNumber, IsNumber, IsOptional, IsString } from "class-validator";
import { IsFile } from "src/common/custom-validators/file.validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Product Sku' })
    @IsString()
    sku: string;

    @ApiProperty({ example: 'Product Name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Product price' })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    price: number;

    @ApiProperty({ example: 'Product rating' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : 0))
    rating?: number;
    
    @ApiProperty({ example: 'Product image' })
    @IsOptional()
    image?: any;

    @ApiProperty({ example: 'Product featured' })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => (value ? Boolean(value) : false))
    featured?: boolean;

    @ApiProperty({ example: 'Product quantity' })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    stock: number;

    @ApiProperty({ example: 'Product sellerId' })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    sellerId: number;
}
