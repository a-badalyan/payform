import { IDatabase, QueryFile } from "pg-promise";

export default interface DbContext {
  pgpdb: IDatabase<Record<string, unknown>>;
  queryFiles: Record<string, QueryFile>;
}
