import { Server } from "http";
import express, { Express } from "express";
import cors from "cors";

import Db from "./Db";
import SberClient from "./SberClient";
import IHttpServer from "./types/IHttpServer";
import { createOrderController } from "./backend/createOrderController";
import { callbackOrderController } from "./backend/callbackOrderController";

export default class HttpServer implements IHttpServer {
  port: number;
  db: Db;
  sberClient: SberClient;
  merchantUserName: string;
  merchantUserPassword: string;
  failUrl: string;
  returnUrl: string;

  expressApp: Express;
  server: Server = new Server();

  constructor({
    port,
    db,
    sberClient,
    merchantUserName,
    merchantUserPassword,
    failUrl,
    returnUrl,
  }: {
    port: number;
    db: Db;
    sberClient: SberClient;
    merchantUserName: string;
    merchantUserPassword: string;
    failUrl: string;
    returnUrl: string;
  }) {
    this.port = port;
    this.db = db;
    this.sberClient = sberClient;
    this.merchantUserName = merchantUserName;
    this.merchantUserPassword = merchantUserPassword;
    this.failUrl = failUrl;
    this.returnUrl = returnUrl;

    this.expressApp = express();
  }

  async start(): Promise<void> {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    this.expressApp.use(express.static("src/frontend"));

    this.server = this.expressApp.listen(this.port, "0.0.0.0");

    this.expressApp.get("/", (_req, res) =>
      res.sendFile(`${__dirname}/frontend/index.html`)
    );

    this.expressApp.post("/order", createOrderController.bind(this));

    this.expressApp.get("/callback", callbackOrderController.bind(this));
  }

  stop(): void {
    this.server.close();
  }
}
