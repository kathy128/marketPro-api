import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Product {

  @Column({primary: true, generated: true})
  id: number;

  @Column({ type: 'varchar', length: 255 })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0})
  rating: number;

   @Column({ nullable: true })
  image: string;

  @Column({ type: 'boolean', default: false })
  featured: boolean;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'int' })
  sellerId: number;
  
  @CreateDateColumn()
  createdAt: Date;

}
