SELECT 
    id,
    name,
    price,
    created_at::TEXT,
    updated_at::TEXT
FROM products
WHERE id = ${product_id}
;
