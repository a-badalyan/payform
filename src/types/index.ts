type OrderStatus = "new" | "pending" | "completed" | "error";

export type Product = {
  id: string;
  name: string;
  price: string;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  product_name: string;
  quantity: string;
  price: string;
  amount: string;
  status: OrderStatus;
  error_details: string;
  created_at: string;
  updated_at: string;
};

export type CreateOrderRequest = {
  product_name: string;
  quantity: string;
  amount: string;
};

export type CreateOrderErrorResponse = {
  status: "ERROR";
  error_code: "BAD_REQUEST" | "SERVER_ERROR" | "ACCESS_DENIED" | "NOT_FOUND";
};

export type CreateOrderOkResponse = { status: "OK"; order: Order };

export type CreateOrderResponse =
  | CreateOrderOkResponse
  | CreateOrderErrorResponse;

export type SberCreateOrderResponse = {
  orderId?: string | null;
  formUrl?: string | null;
  errorCode?: string | null;
  errorMessage?: string | null;

  // only for app2app and back2app
  externalParams?: { [key: string]: any } | null;
};
