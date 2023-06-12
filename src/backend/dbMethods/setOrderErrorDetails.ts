import IDb from "../../types/IDb";
import { Order } from "../../types";

export default async function setOrderErrorDetails(
  this: IDb,
  {
    order_id,
    error_details,
  }: {
    order_id: string;
    error_details: string | null;
  }
): Promise<void> {
  await this.pgpdb.oneOrNone(this.queryFiles.setOrderErrorDetails, {
    order_id,
    error_details,
  });
}
