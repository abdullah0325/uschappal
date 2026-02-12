-- Seed some sample Peshawari Chappals
INSERT INTO products (name, description, price, category, size, color, stock_quantity, is_featured) VALUES
('Classic Peshawari Chappal', 'Traditional handmade Peshawari chappal with authentic leather craftsmanship', 2500.00, 'Men', '42', 'Brown', 15, true),
('Premium Leather Chappal', 'High-quality leather chappal with comfortable sole and elegant design', 3200.00, 'Men', '41', 'Black', 12, true),
('Ladies Peshawari Chappal', 'Specially designed Peshawari chappal for women with delicate craftsmanship', 2800.00, 'Women', '38', 'Tan', 10, false),
('Kids Peshawari Chappal', 'Comfortable and durable chappal for children, made with soft leather', 1800.00, 'Kids', '32', 'Brown', 20, false),
('Embroidered Chappal', 'Beautiful Peshawari chappal with traditional embroidery work', 3500.00, 'Men', '43', 'Dark Brown', 8, true),
('Casual Daily Wear', 'Comfortable everyday chappal perfect for daily use', 2200.00, 'Men', '40', 'Light Brown', 25, false),
('Formal Peshawari Chappal', 'Elegant chappal suitable for formal occasions and events', 4000.00, 'Men', '44', 'Black', 6, true),
('Handcrafted Special', 'Exclusively handcrafted chappal with intricate detailing', 4500.00, 'Men', '42', 'Mahogany', 5, true)
ON CONFLICT DO NOTHING;
