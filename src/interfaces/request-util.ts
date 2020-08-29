import { HttpMethod } from "../enums/http-methods";

export interface RequestUtil {
  url: string;
  method: string;
  body: any;
  onSuccess?: (data: any) => any;
  onError?: (errors: Array<{ message: string }>) => any;
}
