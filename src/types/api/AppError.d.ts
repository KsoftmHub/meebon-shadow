import { ApiControllerExtrasProps } from "./ApiController";


export interface AppErrorBasicProps {
  extras: ApiControllerExtrasProps;
}

export interface AppErrorProps extends AppErrorBasicProps {
  message: string;
  statusCode: number;
  data: unknown;
}
