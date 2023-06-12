import { v4 } from "uuid";

import { CreateOrderResponse } from "../types";

import IHttpServer from "../types/IHttpServer";
import bn from "../bn";

export default async function createOrderHandler(
  this: IHttpServer,
  {
    productId,
    quantity,
    amount,
  }: {
    productId: string;
    quantity: string;
    amount: string;
  }
): Promise<CreateOrderResponse> {
  const orderId = v4();

  try {
    const dbProduct = await this.db.getProductById({ product_id: productId });

    if (dbProduct == null) {
      console.log({ msg: "ERROR", error_message: "product_not_found" });

      return {
        status: "ERROR",
        error_code: "NOT_FOUND",
      };
    }

    if (!bn(quantity).times(bn(dbProduct.price)).eq(bn(amount))) {
      console.log({
        msg: "ERROR",
        error_message: "incorrect_amount",
        amount_estimate: bn(quantity).times(dbProduct.price).toFixed(),
        request_amount: amount,
      });

      return {
        status: "ERROR",
        error_code: "BAD_REQUEST",
      };
    }

    const createdOrder = await this.db.createOrder({
      order_id: orderId,
      product_id: dbProduct.id,
      amount,
      quantity,
    });

    const sberResponse = await this.sberClient.createOrder({
      userName: this.merchantUserName,
      password: this.merchantUserPassword,
      amount,
      orderNumber: orderId,
      failUrl: this.failUrl,
      returnUrl: this.returnUrl,
    });

    if (sberResponse.status === "SERVER_ERROR") {
      await this.db.setOrderErrorDetails({
        order_id: orderId,
        error_details: sberResponse.error_message,
      });

      return {
        status: "ERROR",
        error_code: "SERVER_ERROR",
      };
    }

    if (sberResponse.data.errorCode === "5") {
      await this.db.setOrderErrorDetails({
        order_id: orderId,
        error_details: sberResponse.data.errorMessage ?? null,
      });

      return {
        status: "ERROR",
        error_code: "ACCESS_DENIED",
      };
    }

    if (sberResponse.data.errorCode === "4") {
      await this.db.setOrderErrorDetails({
        order_id: orderId,
        error_details: sberResponse.data.errorMessage ?? null,
      });

      return {
        status: "ERROR",
        error_code: "BAD_REQUEST",
      };
    }

    return {
      status: "OK",
      order: createdOrder,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown_error";

    console.log({
      msg: "ERROR",
      error_message: errorMessage,
    });

    await this.db.setOrderErrorDetails({
      order_id: orderId,
      error_details: errorMessage,
    });

    return {
      status: "ERROR",
      error_code: "SERVER_ERROR",
    };
  }
}
