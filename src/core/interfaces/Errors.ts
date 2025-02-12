import { IApiControllerExtrasProps } from "./IApiControllerProps";

export interface AppErrorBasicProps {
  extras: IApiControllerExtrasProps;
}

export interface AppErrorProps extends AppErrorBasicProps {
  message: string;
  statusCode: number;
  data: unknown;
}