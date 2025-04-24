import { Entity, Column, Generated, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsEmail, MinLength, IsString } from "class-validator";
import { RootEntity } from "@lib/core/abstract/RootEntity";

@Entity()
export class User extends RootEntity {
  @Column({ type: "uuid", unique: true, primary: true })
  @Generated("uuid")
  userId!: string;

  @IsNotEmpty({ message: "First name is required" })
  @Column({ type: "varchar", length: 255 })
  @IsString()
  firstName!: string;

  @IsNotEmpty({ message: "Last name is required" })
  @Column({ type: "varchar", length: 255 })
  @IsString()
  lastName!: string;

  @IsEmail({}, { message: "Invalid email format" })
  @Column({ type: "varchar", unique: true, length: 255 })
  @IsString()
  email!: string;

  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @IsString()
  private _password!: string;

  @Column({ type: "varchar", length: 255 })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @IsString()
  passwordHash!: string;

  // Getter for password
  get password(): string {
    return this._password;
  }

  // Setter for password
  set password(value: string) {
    this._password = value;
    this.passwordHash = value; // You can hash the password here if needed
  }
}
