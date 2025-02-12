import { NextFunction, Request, Response, } from "express";
import { IApiControllerProps } from "../interfaces/IApiControllerProps";



// export default (
//   apiController: (data: IApiControllerProps) => Promise<void>,
//   useTransaction = true
// ) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await apiController({
//         req: req, res, extras: {
//           next,
//         }
//       });
//     } catch (error) {
//     }
//   }
// }