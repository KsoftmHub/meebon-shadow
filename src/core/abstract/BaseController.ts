import { IBaseRequest, IBaseResponse, SendResProps } from '../interfaces/Request';
import { IService } from '../interfaces/IService';

export abstract class BaseController<T> {
  abstract service: IService<T>;

  abstract getAll(res: IBaseResponse): SendResProps | void | Promise<void>;
  abstract create(data: T, res: IBaseResponse): SendResProps | void | Promise<void>;
  abstract getById(id: string, res: IBaseResponse): SendResProps | void | Promise<void>;
  abstract update(id: string, data: Partial<T>, res: IBaseResponse): SendResProps | void | Promise<void>;
  abstract delete(id: string, res: IBaseResponse): SendResProps | void | Promise<void>;

  protected getEntityName(): string {
    return this.constructor.name.replace('Controller', '');
  }
}
