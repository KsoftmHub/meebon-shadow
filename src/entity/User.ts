import { Entity, Column } from "typeorm";
import { IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { RootEntity } from "../core/abstract/RootEntity";

@Entity()
export class User extends RootEntity {

  @IsNotEmpty({ message: "First name is required" })
  @Column({ type: "varchar", length: 255 })
  firstName!: string;

  @IsNotEmpty({ message: "Last name is required" })
  @Column({ type: "varchar", length: 255 })
  lastName!: string;

  @IsEmail({}, { message: "Invalid email format" })
  @Column({ type: "varchar", unique: true, length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  passwordHash: string;
}
