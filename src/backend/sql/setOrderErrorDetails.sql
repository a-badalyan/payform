UPDATE 
    orders
SET
    status = 'error',
    error_details = ${error_details},
    updated_at = current_timestamp
WHERE
    id = ${order_id}
RETURNING
    id
;
