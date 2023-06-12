import pgPromise from "pg-promise";

import Db from "./Db";
import HttpServer from "./HttpServer";
import config from "./config";
import SberClient from "./SberClient";

const pgp = pgPromise({});
const pgpdb = pgp(config.postgresUri);

const db = new Db({
  pgpdb,
});

const sberClient = new SberClient(config.merchantBaseUrl);

const httpServer = new HttpServer({
  port: config.port,
  db,
  sberClient,
  merchantUserName: config.merchantUserName,
  merchantUserPassword: config.merchantUserPassword,
  returnUrl: config.returnUrl,
  failUrl: config.failUrl,
});

(async (): Promise<void> => {
  await db.initDatabase();
  await httpServer.start();

  console.log({ msg: "service_started" });
})();
