import { BaseEntity, CreateDateColumn, DeleteDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class RootEntity extends BaseEntity {

  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  @Generated("increment")
  id!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
