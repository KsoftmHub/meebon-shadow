import { NextFunction } from 'express';
import { IBaseRequest, IBaseResponse } from '../interfaces/Request';
import { Body, JsonController, Param, Req, Res, Get, Post, Put, Delete } from 'routing-controllers';
import { RootEntity } from './RootEntity';
import { HttpException } from '../exceptions/HttpException';
import { STATUS_CODE } from '../exceptions/helpers';
import { IService } from '../interfaces/IService';

export abstract class BaseController<T> {
  abstract service: IService<T>;

  abstract getAll(res: IBaseResponse): void;
  abstract create(data: T, res: IBaseResponse): void;
  abstract getById(id: string, res: IBaseResponse): void;
  abstract update(id: string, data: Partial<T>, res: IBaseResponse): void;
  abstract delete(id: string, res: IBaseResponse): void;

  protected getEntityName(): string {
    return this.constructor.name.replace('Controller', '');
  }
}
