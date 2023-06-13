import { OrderStatus, SberOperation } from "../../types";
import IDb from "../../types/IDb";

export default async function updateOrderStatus(
  this: IDb,
  {
    order_id,
    status,
    operation_status,
  }: {
    order_id: string;
    status: OrderStatus;
    operation_status: SberOperation;
  }
): Promise<void> {
  await this.pgpdb.oneOrNone(this.queryFiles.updateOrderStatus, {
    order_id,
    status,
    operation_status,
  });
}
