import { HttpMethod } from "../enums/http-methods";

export interface RequestUtil {
  url: string;
  method: HttpMethod;
  body: Object;
  onSuccess?: (data: any) => any;
  onError?: (errors: Array<{ message: string }>) => any;
}
