import { IDatabase, QueryFile } from "pg-promise";
import path from "path";
import createOrder from "./backend/dbMethods/createOrder";
import initDatabase from "./backend/dbMethods/initDatabase";
import setOrderErrorDetails from "./backend/dbMethods/setOrderErrorDetails";
import getProductById from "./backend/dbMethods/getProductById";
import getOrderById from "./backend/dbMethods/getOrderById";
import updateOrderStatus from "./backend/dbMethods/updateOrderStatus";

const QUERY_NAMES: Array<string> = [
  "createOrder",
  "setOrderErrorDetails",
  "initDatabase",
  "getProductById",
  "getOrderById",
  "updateOrderStatus",
];

const QUERY_FILES_DIR = path.resolve(__dirname, "backend/sql");

export default class Db {
  pgpdb: IDatabase<Record<string, unknown>>;
  queryFiles: Record<string, QueryFile>;

  createOrder = createOrder;
  initDatabase = initDatabase;
  setOrderErrorDetails = setOrderErrorDetails;
  getProductById = getProductById;
  getOrderById = getOrderById;
  updateOrderStatus = updateOrderStatus;

  constructor({ pgpdb }: { pgpdb: IDatabase<Record<string, unknown>> }) {
    this.pgpdb = pgpdb;
    this.queryFiles = {};
    this.loadQueryFiles();
  }

  loadQueryFiles(): void {
    QUERY_NAMES.forEach((queryName: string) => {
      const queryFile = new QueryFile(
        path.resolve(QUERY_FILES_DIR, `${queryName}.sql`)
      );
      this.queryFiles[queryName] = queryFile;
    });
  }
}
