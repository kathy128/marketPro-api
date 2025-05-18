import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  SELLER = 'seller',
  BUYER = 'buyer',
  ADMIN = 'admin',
}

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  fullname: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
