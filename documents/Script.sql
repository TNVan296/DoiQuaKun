create database MLteachProject;

use mlteachproject;


select * from cards;
select * from sizes s ;
select * from products p;
select * from product_categories pc ;
select * from colors c ;
select * from pictures p ;
select * from users u ;


INSERT INTO pictures (name, created_at, updated_at)
VALUES 
('aothun_cam.png', NOW(), NOW()),
('aothun_do.png', NOW(), NOW()),
('aothun_tonghop.jpg', NOW(), NOW()),
('aothun_tonghop.png', NOW(), NOW()),
('aothun_xanhduong.jpg', NOW(), NOW()),
('binhnuoc_do.png', NOW(), NOW()),
('binhnuoc_tonghop.jpg', NOW(), NOW()),
('binhnuoc_tonghop.png', NOW(), NOW()),
('binhnuoc_xanhduong.png', NOW(), NOW()),
('binhnuoc_xanhla.png', NOW(), NOW()),
('dongho_hong.png', NOW(), NOW()),
('dongho_tonghop.png', NOW(), NOW()),
('dongho_vang.png', NOW(), NOW()),
('giay_chopchop_den.png', NOW(), NOW()),
('giay_chopchop_xam.png', NOW(), NOW()),
('giay_gdndsp_xam.png', NOW(), NOW()),
('giay_tamtuot_hong.png', NOW(), NOW()),
('giay_tamtuot_trang.png', NOW(), NOW()),
('giay_tonghop.jpg', NOW(), NOW()),
('giay_tonghop.png', NOW(), NOW()),
('hoodie_cam.png', NOW(), NOW()),
('hoodie_do.png', NOW(), NOW()),
('hoodie_hong.png', NOW(), NOW()),
('hoodie_tonghop.jpg', NOW(), NOW()),
('hoodie_tonghop.png', NOW(), NOW()),
('hoodie_xanhduong.png', NOW(), NOW()),
('hoodie_xanhla.png', NOW(), NOW()),
('tuirut_do.png', NOW(), NOW()),
('tuirut_tonghop.jpg', NOW(), NOW()),
('tuirut_tonghop.png', NOW(), NOW()),
('tuirut_xanhla.png', NOW(), NOW());

INSERT INTO sizes (size_name, size_number, created_at, updated_at)
VALUES 
('Small', 1, NOW(), NOW()),
('Medium', 2, NOW(), NOW()),
('Large', 3, NOW(), NOW()),
('Extra Large', 4, NOW(), NOW()),
('XXL', 5, NOW(), NOW());


INSERT INTO colors (name, created_at, updated_at)
VALUES 
('Red', NOW(), NOW()),
('Blue', NOW(), NOW()),
('Green', NOW(), NOW()),
('Yellow', NOW(), NOW()),
('Purple', NOW(), NOW());

INSERT INTO product_categories (name, created_at, updated_at)
VALUES 
('Áo thun', NOW(), NOW()),
('Bình nước', NOW(), NOW()),
('Đồng hồ', NOW(), NOW()),
('Giày dép', NOW(), NOW()),
('Hoodie', NOW(), NOW()),
('Túi rút', NOW(), NOW());

INSERT INTO products (name, picture_id, color_id, size_id, category_id, exchange_point, created_at, updated_at)
VALUES 
('Áo thun cam', 1, 1, 1, 1, 100, NOW(), NOW()),
('Áo thun đỏ', 2, 2, 2, 1, 120, NOW(), NOW()),
('Áo thun tổng hợp', 3, 3, 3, 1, 130, NOW(), NOW()),
('Áo thun tổng hợp', 4, 4, 4, 1, 140, NOW(), NOW()),
('Áo thun xanh dương', 5, 5, 5, 1, 150, NOW(), NOW());

INSERT INTO products (name, picture_id, color_id, size_id, category_id, exchange_point, created_at, updated_at)
VALUES 
('Bình nước đỏ', 6, 1, 1, 2, 100, NOW(), NOW()),
('Bình nước tổng hợp', 7, 2, 2, 2, 110, NOW(), NOW()),
('Bình nước tổng hợp', 8, 3, 3, 2, 120, NOW(), NOW()),
('Bình nước xanh dương', 9, 4, 4, 2, 130, NOW(), NOW()),
('Bình nước xanh lá', 10, 5, 5, 2, 140, NOW(), NOW());



INSERT INTO products (name, picture_id, color_id, size_id, category_id, exchange_point, created_at, updated_at)
VALUES 
('Đồng hồ hồng', 11, 1, 1, 3, 100, NOW(), NOW()),
('Đồng hồ tổng hợp', 12, 2, 2, 3, 120, NOW(), NOW()),
('Đồng hồ vàng', 13, 3, 3, 3, 130, NOW(), NOW());



INSERT INTO products (name, picture_id, color_id, size_id, category_id, exchange_point, created_at, updated_at)
VALUES 
('Túi rút đỏ', 28, 1, 1, 6, 100, NOW(), NOW()),
('Túi rút tổng hợp', 29, 2, 2, 6, 120, NOW(), NOW()),
('Túi rút tổng hợp', 30, 3, 3, 6, 130, NOW(), NOW()),
('Túi rút xanh lá', 31, 4, 4, 6, 140, NOW(), NOW());

