import { BaseController } from '@lib/core/abstract/BaseController';
import { User } from '@lib/entity/User';
import { Body, Delete, Get, JsonController, Param, Post, Put, Res } from 'routing-controllers';
import { UserService } from '../services/UserService';
import { IBaseResponse } from '@lib/core/interfaces/Request';
import { STATUS_CODE } from '@lib/core/exceptions/helpers';
import { HttpException } from '@lib/core/exceptions/HttpException';

@JsonController("/users")
export class UserController extends BaseController<User> {
  service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }

  @Get('/')
  async getAll(@Res() res: IBaseResponse) {
    try {
      const item = await this.service.getAll();
      res.sendRes(item, {
        message: `${this.getEntityName()}(s) load successful`,
        status: STATUS_CODE.OK,
      });
    } catch (error) {
      throw new HttpException({
        message: `Error fetching ${this.getEntityName()}s`,
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        error: error
      });
    }
  }

  @Post('/')
  async create(@Body() data: User, @Res() res: IBaseResponse) {
    try {
      const item = await this.service.create(data);
      res.sendRes(item, {
        message: `${this.getEntityName()} create successful`,
        status: STATUS_CODE.CREATED,
      })
    } catch (error) {
      throw new HttpException({ message: `Error creating ${this.getEntityName()}`, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR });
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string, @Res() res: IBaseResponse) {
    const entityId = parseInt(id, 10);
    try {
      const item = await this.service.getById(entityId);
      if (item) {
        res.sendRes(item, {
          message: `${this.getEntityName()} load successful`,
          status: STATUS_CODE.OK,
        })
      } else {
        throw new HttpException({
          message: `${this.getEntityName()} not Found`,
          statusCode: STATUS_CODE.NOT_FOUND
        });
      }
    } catch (error) {
      throw new HttpException({
        message: `Error fetching ${this.getEntityName()}`,
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
      });
    }
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: Partial<User>, @Res() res: IBaseResponse) {
    const entityId = parseInt(id, 10);
    try {
      const updatedItem = await this.service.update(entityId, data);
      if (updatedItem) {
        res.sendRes(updatedItem, {
          message: `${this.getEntityName()} update successful`,
          status: STATUS_CODE.OK,
        })
      } else {
        throw new HttpException({ message: `${this.getEntityName()} not Found`, statusCode: STATUS_CODE.NOT_FOUND });
      }
    } catch (error) {
      throw new HttpException({ message: `Error updating ${this.getEntityName()}`, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR });
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: IBaseResponse) {
    const entityId = parseInt(id, 10);
    try {
      const deleted = await this.service.delete(entityId);
      if (deleted) {
        throw new HttpException({
          message: `${this.getEntityName()} delete successful`,
          statusCode: STATUS_CODE.NO_CONTENT
        });
      } else {
        throw new HttpException({ message: `${this.getEntityName()} not Found`, statusCode: STATUS_CODE.NOT_FOUND });
      }
    } catch (error) {
      throw new HttpException({ message: `Error deleting ${this.getEntityName()}`, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR });
    }
  }
}
