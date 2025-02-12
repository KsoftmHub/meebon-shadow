import { Service, Token } from "typedi";
import { AppDataSource } from "../../../sources/data-source";
import { validateOrReject } from 'class-validator';
import { User } from "../../../entity/User";
import { IService } from "../../../core/interfaces/IService";

@Service<User>()
export class UserService implements IService<User> {
  private userRepository = AppDataSource.getRepository(User);

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async create(data: User): Promise<User> {
    const user = this.userRepository.create(data);
    await validateOrReject(user);
    return this.userRepository.save(user);
  }

  async update(id: number, data: any): Promise<User | undefined> {
    const user = await this.getById(id);
    if (!user) {
      return undefined;
    }
    this.userRepository.merge(user, data);
    await validateOrReject(user);
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