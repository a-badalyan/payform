import IDb from "../../types/IDb";
import { DbOrder, Order } from "../../types";

export default async function getOrderById(
  this: IDb,
  {
    order_id,
  }: {
    order_id: string;
  }
): Promise<DbOrder | null> {
  return this.pgpdb.oneOrNone<DbOrder>(this.queryFiles.getOrderById, {
    order_id,
  });
}
