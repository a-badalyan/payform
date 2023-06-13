import { Request, Response } from "express";

import IHttpServer from "../types/IHttpServer";
import { SberCallbackQuery } from "../types";

export async function callbackOrderController(
  this: IHttpServer,
  req: Request<{}, {}, {}, SberCallbackQuery>,
  res: Response
): Promise<void> {
  const { orderNumber, operation, status } = req.query;

  const dbOrder = await this.db.getOrderById({
    order_id: orderNumber,
  });

  if (dbOrder == null) {
    res.status(404).json({ status: "ERROR", error_code: "NOT_FOUND" });

    return;
  }

  if (status === "1" && operation === "approved") {
    await this.db.updateOrderStatus({
      order_id: orderNumber,
      status: "completed",
      operation_status: "approved",
    });
  }
}
