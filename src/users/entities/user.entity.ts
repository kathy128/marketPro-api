import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  SELLER = 'seller',
  BUYER = 'buyer',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
