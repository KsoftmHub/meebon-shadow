import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { validateOrReject } from 'class-validator';

@Service()
export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(data: User): Promise<User> {
    const user = this.userRepository.create(data);
    await validateOrReject(user);  // Validate using class-validator
    return this.userRepository.save(user);
  }

  async update(id: number, data: any): Promise<User | undefined> {
    const user = await this.getById(id);
    if (!user) {
      return undefined;
    }
    this.userRepository.merge(user, data);
    await validateOrReject(user); // Validate before updating
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.getById(id);
    if (!user) {
      return false;
    }
    await this.userRepository.remove(user);
    return true;
  }
}