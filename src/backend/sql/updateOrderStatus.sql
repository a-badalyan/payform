UPDATE 
    orders
SET
    status = ${status},
    operation_status = ${operation_status},
    updated_at = current_timestamp
WHERE
    id = ${order_id}
RETURNING
    id
;
