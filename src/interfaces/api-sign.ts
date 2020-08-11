import { HttpMethod } from "../enums/http-method";

export interface ApiSign {
  url: string;
  method?: HttpMethod;
  controller: any;
  middlewares: Array<any>;
}
