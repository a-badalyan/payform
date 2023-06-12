import IDb from "../../types/IDb";

export default async function initDatabase(this: IDb): Promise<void> {
  await this.pgpdb.none(this.queryFiles.initDatabase);
}
