export type OrderStatus = "new" | "pending" | "completed" | "error";

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

export type SberOperation =
  | "approved"
  | "declinedByTimeout"
  | "deposited"
  | "reversed"
  | "refunded";

export type DbOrder = {
  id: string;
  product_id: string;
  quantity: string;
  price: string;
  amount: string;
  status: string;
  error_details?: string | null;
  sber_order_id?: string | null;
  operation_status?: SberOperation | null;
  created_at: string;
  updated_at: string;
};

export type SberCallbackQuery = {
  mdOrder: string;
  orderNumber: string;
  operation: SberOperation;
  status: "0" | "1";
};
