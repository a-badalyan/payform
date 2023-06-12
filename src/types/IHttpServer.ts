import Db from "../Db";
import SberClient from "../SberClient";

export default interface IHttpServer {
  port: number;
  db: Db;
  sberClient: SberClient;
  merchantUserName: string;
  merchantUserPassword: string;
  failUrl: string;
  returnUrl: string;
}
