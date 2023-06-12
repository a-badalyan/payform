WITH product AS MATERIALIZED (
    SELECT
        id,
        price,
        name
    FROM 
        products
    WHERE
        id = ${product_id}
)

INSERT INTO orders (
    id,
    product_id,
    quantity,
    price,
    amount
) VALUES (
    ${order_id},
    ${product_id},
    ${quantity},
    (SELECT price FROM product),
    ${amount}
) RETURNING
    id,
    (SELECT name AS product_name FROM product),
    quantity,
    (SELECT price FROM product),
    amount,
    status,
    error_details,
    created_at::TEXT,
    updated_at::TEXT
;
