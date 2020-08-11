import { HttpMethod } from "../enums/http-methods";

export interface ApiSign {
  url: string;
  method?: HttpMethod;
  controller: any;
  middlewares: Array<any>;
}
