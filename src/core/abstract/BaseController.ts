import { NextFunction } from 'express';
import { IBaseRequest, IBaseResponse } from '../interfaces/Request';
import { Body, JsonController, Param, Req, Res, Get, Post, Put, Delete } from 'routing-controllers';
import { RootEntity } from './RootEntity';
import { HttpException } from '../exceptions/HttpException';
import { STATUS_CODE } from '../exceptions/helpers';
import { IService } from '../interfaces/IService';

export abstract class BaseController<T> {
  abstract service: IService<T>;

  @Get('/')
  async getAll(@Res() res: IBaseResponse) {
    try {
      const item = await this.service.getAll();
      res.sendRes(item as T[], {
        message: `${this.getEntityName()}(s) load successful`,
        status: STATUS_CODE.OK,
      })
    } catch (error) {
      throw new HttpException({ message: `Error fetching ${this.getEntityName()}s`, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR });
    }
  }

  @Post('/')
  async create(@Body() data: T, @Res() res: IBaseResponse) {
    try {
      const item = await this.service.create(data);
      res.sendRes(item as T[], {
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
        res.sendRes(item as T[], {
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
  async update(@Param('id') id: string, @Body() data: Partial<T>, @Res() res: IBaseResponse) {
    const entityId = parseInt(id, 10);
    try {
      const updatedItem = await this.service.update(entityId, data);
      if (updatedItem) {
        res.sendRes(updatedItem as T[], {
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

  protected getEntityName(): string {
    return this.constructor.name.replace('Controller', '');
  }
}
