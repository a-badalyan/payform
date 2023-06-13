SELECT
    id,
    product_id,
    quantity,
    price,
    amount,
    status,
    error_details,
    sber_order_id,
    operation_status,
    created_at::TEXT,
    updated_at::TEXT
FROM orders
    WHERE id = ${order_id}
;
