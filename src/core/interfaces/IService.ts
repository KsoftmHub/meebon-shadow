export interface IService<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | undefined>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | undefined>;
  delete(id: number): Promise<boolean>;
}