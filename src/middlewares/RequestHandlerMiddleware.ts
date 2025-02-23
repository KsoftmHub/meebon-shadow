import { HttpException } from "@lib/core/exceptions/HttpException";
import { IBaseRequest, IBaseResponse } from "@lib/core/interfaces/Request";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
const { NODE_ENV } = process.env;

@Middleware({ type: "before" })
export class RequestHandlerMiddleware implements ExpressMiddlewareInterface {
  use(req: IBaseRequest, res: IBaseResponse, next: (err?: any) => any) {
    res.sendRes = (data, meta) => {
      if (res.headersSent) {
        return;
      }
      const length = data && Array.isArray(data) && data.length || undefined;
      return res.status(meta.status || 200).send({
        status: true,
        length,
        meta: { ...req.meta, ...meta },
        data,
      });
    };
    next();
  }
}
