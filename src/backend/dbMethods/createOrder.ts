import IDb from "../../types/IDb";
import { Order } from "../../types";

export default async function createOrder(
  this: IDb,
  {
    order_id,
    product_id,
    quantity,
    amount,
  }: {
    order_id: string;
    product_id: string;
    quantity: string;
    amount: string;
  }
): Promise<Order> {
  return this.pgpdb.one<Order>(this.queryFiles.createOrder, {
    order_id,
    product_id,
    quantity,
    amount,
  });
}
