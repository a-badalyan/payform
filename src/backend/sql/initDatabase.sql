CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    price NUMERIC NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
);


CREATE TABLE IF NOT EXISTS orders (
    id UUID UNIQUE PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    error_details TEXT,
    sber_order_id TEXT,
    operation_status TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
);



INSERT INTO products (
    name,
    price
) VALUES 
    ('Хлеб', '34.10'),
    ('Сахар', '50.00'),
    ('Молоко', '49.50'),
    ('Творог', '140.40')
ON CONFLICT DO NOTHING
;
