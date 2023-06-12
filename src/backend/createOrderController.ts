import { Request, Response } from "express";

import IHttpServer from "../types/IHttpServer";
import createOrderHandler from "./createOrderHandler";

export async function createOrderController(
  this: IHttpServer,
  req: Request,
  res: Response
): Promise<void> {
  if (
    req.body.product_id == null ||
    req.body.quantity == null ||
    req.body.amount == null
  ) {
    res.status(400).json({
      error: "BAD_REQUEST",
      error_message: "Invalid request.",
    });
    return;
  }

  const createOrderResponse = await createOrderHandler.call(this, {
    productId: req.body.product_id,
    quantity: req.body.quantity,
    amount: req.body.amount,
  });

  if (createOrderResponse.status !== "OK") {
    if (createOrderResponse.error_code === "SERVER_ERROR") {
      res.status(500).json({
        error: "INTERNAL_SERVER_ERROR",
        error_message: "Internal error.",
      });
      return;
    }

    if (createOrderResponse.error_code === "BAD_REQUEST") {
      res.status(400).json({
        error: "BAD_REQUEST",
        error_message: "Invalid request.",
      });
      return;
    }

    if (createOrderResponse.error_code === "ACCESS_DENIED") {
      res.status(400).json({
        error: "ACCESS_DENIED",
        error_message: "Invalid username or password.",
      });
      return;
    }

    if (createOrderResponse.error_code === "NOT_FOUND") {
      res.status(404).json({
        error: "NOT_FOUND",
        error_message: "Product not found.",
      });
      return;
    }
  }

  if (createOrderResponse.status === "OK") {
    res.status(200).json(createOrderResponse.order).json({
      status: "OK",
    });
    return;
  }
}
