import axios from "axios";
import { SberCreateOrderResponse } from "./types";

export default class SberClient {
  merchantUrl: string;

  constructor(merchantUrl: string) {
    this.merchantUrl = merchantUrl;
  }

  async createOrder({
    userName,
    password,
    orderNumber,
    amount,
    returnUrl,
    failUrl,
  }: {
    userName: string;
    password: string;
    orderNumber: string;
    amount: string;
    returnUrl: string;
    failUrl: string;
  }): Promise<
    | { status: "OK" | "ERROR"; data: SberCreateOrderResponse }
    | { status: "SERVER_ERROR"; error_message: string }
  > {
    try {
      const response = await axios.get<SberCreateOrderResponse>(
        `payment/rest/register.do?userName=${userName}&password=${password}&orderId=${orderNumber}&amount=${amount}&returnUrl=${returnUrl}&failUrl=${failUrl}`,
        {
          baseURL: this.merchantUrl,
          timeout: 10 * 1000,
        }
      );

      console.log(response.data);

      if (response.data.errorCode != null && response.data.errorCode !== "0") {
        return {
          status: "ERROR",
          data: response.data,
        };
      }

      return {
        status: "OK",
        data: response.data,
      };
    } catch (error: unknown) {
      console.log({
        msg: "sber_create_order_error",
        error_message: error instanceof Error ? error.message : "unknown_error",
      });

      return {
        status: "SERVER_ERROR",
        error_message: error instanceof Error ? error.message : "unknown_error",
      };
    }
  }
}
