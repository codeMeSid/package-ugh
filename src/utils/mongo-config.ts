import mongoose from "mongoose";
import { errorlog, successlog } from "./logger";
import { DatabaseConnectionError } from "../errors/database-connection-error";
export const startDb = async (uri: string): Promise<void> => {
  return new Promise((resolve) => {
    mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err: any) => {
        if (err) {
          errorlog(err.message);
          throw new DatabaseConnectionError();
        } else {
          successlog("Database is connected");
          resolve();
        }
      }
    );
  });
};
