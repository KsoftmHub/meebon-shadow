import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, MinLength } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @MinLength(8)
  passwordHash!: string;
}