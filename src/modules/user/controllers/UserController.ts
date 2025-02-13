import { BaseController } from '@lib/core/abstract/BaseController';
import { User } from '@lib/entity/User';
import { JsonController } from 'routing-controllers';
import { UserService } from '../services/UserService';

@JsonController("/user")
export class UserController extends BaseController<User> {
  service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }
}
