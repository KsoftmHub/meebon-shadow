import { Request, Response, NextFunction } from 'express';
import { arcjet } from 'arcjet';
import { arcjetConfig } from '../configs/arcjet.config';

const aj = arcjet(arcjetConfig.token, { trustProxy: arcjetConfig.trustProxy });

export const arcjetMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await aj.protect(req);

    if (result.ok) {
      next();
    } else {
      res.status(429).send("Too Many Requests");
    }
  } catch (err) {
    console.error("Arcjet Error:", err);
    next(err);
  }
};
