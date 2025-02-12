import { JsonController } from 'routing-controllers';
import { UserService } from '../services/UserService';
import { User } from '../../../entity/User';
import { BaseController } from '../../../core/abstract/BaseController';

@JsonController("/user")
export class UserController extends BaseController<User> {
  service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }
}
