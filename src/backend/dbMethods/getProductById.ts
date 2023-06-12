import IDb from "../../types/IDb";
import { Order, Product } from "../../types";

export default async function getProductById(
  this: IDb,
  {
    product_id,
  }: {
    product_id: string;
  }
): Promise<Product | null> {
  return this.pgpdb.oneOrNone<Product>(this.queryFiles.getProductById, {
    product_id,
  });
}
