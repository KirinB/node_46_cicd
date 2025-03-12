CREATE TABLE cars(
	car_id INT PRIMARY KEY AUTO_INCREMENT,
    -- Tên xe, ví dụ: "Tesla Model S"
	`name` VARCHAR(255),
    -- Mô tả ngắn, ví dụ "Free recharge at any station"
    description TEXT,
    -- Số lượng hành khách, ví dụ: 4
    passengers INT,
    -- Tốc độ tối đa với thời gian tăng tốc, ví dụ: "100 km/h in 4 seconds"
    max_speed VARCHAR(255),
    -- Loại hộp số, ví dụ: "Automactic gearbox"
    gearbox_type VARCHAR(255),
    -- Loại nhiên liệu, ví dụ: "Electric"
    fuel_type VARCHAR(255),
    -- Giá thuê mỗi ngày, ví dụ: 168.00
    price_per_day DOUBLE,
    -- Tỷ lệ giảm giá, ví dụ :25
    discount_percentage INT DEFAULT 0,
    -- URL hình ảnh xe
    image_url VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

INSERT INTO `cars` (`car_id`, `name`, `description`, `passengers`, `max_speed`, `gearbox_type`, `fuel_type`, `price_per_day`, `discount_percentage`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 'Tesla Model S', 'Free recharge at any station', 4, '100 km/h in 4 seconds', 'Automatic gearbox', 'Electric', 168, 25, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(2, 'BMW i8', 'Hybrid electric sports car', 2, '120 km/h in 4.2 seconds', 'Automatic gearbox', 'Hybrid', 190, 15, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(3, 'Audi e-tron', 'Luxury electric SUV', 5, '110 km/h in 5.7 seconds', 'Automatic gearbox', 'Electric', 200, 20, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(4, 'Mercedes-Benz EQC', 'Electric SUV with long range', 5, '100 km/h in 5.1 seconds', 'Automatic gearbox', 'Electric', 210, 10, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(5, 'Porsche Taycan', 'Electric performance sedan', 4, '125 km/h in 3.5 seconds', 'Automatic gearbox', 'Electric', 250, 18, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(6, 'Chevrolet Bolt', 'Affordable electric hatchback', 4, '90 km/h in 6.5 seconds', 'Automatic gearbox', 'Electric', 95, 5, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(7, 'Nissan Leaf', 'Popular electric car', 4, '80 km/h in 7 seconds', 'Automatic gearbox', 'Electric', 80, 12, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(8, 'Ford Mustang Mach-E', 'Electric SUV with muscle car spirit', 5, '105 km/h in 5.0 seconds', 'Automatic gearbox', 'Electric', 185, 8, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(9, 'Jaguar I-PACE', 'Luxury electric SUV', 5, '110 km/h in 4.8 seconds', 'Automatic gearbox', 'Electric', 220, 20, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(10, 'Hyundai Kona Electric', 'Compact electric SUV', 5, '90 km/h in 7.2 seconds', 'Automatic gearbox', 'Electric', 120, 5, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(11, 'Tesla Model X', 'Family-friendly electric SUV', 7, '105 km/h in 4.4 seconds', 'Automatic gearbox', 'Electric', 260, 22, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(12, 'Kia Soul EV', 'Compact and quirky electric car', 5, '85 km/h in 8.0 seconds', 'Automatic gearbox', 'Electric', 100, 7, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(13, 'Volkswagen ID.4', 'All-electric compact SUV', 5, '95 km/h in 6.8 seconds', 'Automatic gearbox', 'Electric', 130, 10, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(14, 'Mazda MX-30', 'Stylish electric crossover', 4, '80 km/h in 9.1 seconds', 'Automatic gearbox', 'Electric', 90, 6, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(15, 'Honda e', 'Compact city electric car', 4, '75 km/h in 8.3 seconds', 'Automatic gearbox', 'Electric', 85, 3, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(16, 'Lucid Air', 'High-performance electric sedan', 5, '120 km/h in 3.0 seconds', 'Automatic gearbox', 'Electric', 290, 20, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(17, 'Rivian R1T', 'Electric adventure truck', 5, '105 km/h in 3.2 seconds', 'Automatic gearbox', 'Electric', 280, 18, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(18, 'BYD Tang EV', 'Affordable electric SUV', 7, '90 km/h in 6.5 seconds', 'Automatic gearbox', 'Electric', 150, 12, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(19, 'Peugeot e-208', 'Compact electric hatchback', 5, '85 km/h in 7.8 seconds', 'Automatic gearbox', 'Electric', 95, 10, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(20, 'Renault Zoe', 'Popular electric city car', 5, '80 km/h in 8.5 seconds', 'Automatic gearbox', 'Electric', 80, 8, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(21, 'Tesla Model 3', 'Electric sedan with long range', 5, '110 km/h in 3.5 seconds', 'Automatic gearbox', 'Electric', 170, 20, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(22, 'Volvo XC40 Recharge', 'Electric luxury SUV', 5, '100 km/h in 4.9 seconds', 'Automatic gearbox', 'Electric', 225, 15, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(23, 'BMW X3 Electric', 'Luxury compact electric SUV', 5, '105 km/h in 5.2 seconds', 'Automatic gearbox', 'Electric', 210, 10, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(24, 'Mini Cooper SE', 'Compact electric hatchback', 4, '80 km/h in 7.0 seconds', 'Automatic gearbox', 'Electric', 90, 5, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(25, 'Skoda Enyaq iV', 'Practical electric SUV', 5, '95 km/h in 6.9 seconds', 'Automatic gearbox', 'Electric', 135, 12, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(26, 'Fiat 500 Electric', 'Stylish city electric car', 4, '75 km/h in 9.0 seconds', 'Automatic gearbox', 'Electric', 80, 5, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(27, 'Opel Mokka-e', 'Compact electric SUV', 5, '85 km/h in 8.5 seconds', 'Automatic gearbox', 'Electric', 95, 7, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(28, 'Toyota bZ4X', 'Toyota\'s first all-electric SUV', 5, '90 km/h in 7.5 seconds', 'Automatic gearbox', 'Electric', 150, 13, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(29, 'Ford F-150 Lightning', 'Electric version of classic truck', 5, '100 km/h in 4.5 seconds', 'Automatic gearbox', 'Electric', 250, 17, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL),
(30, 'GMC Hummer EV', 'Electric off-road SUV', 5, '100 km/h in 3.5 seconds', 'Automatic gearbox', 'Electric', 350, 22, 'https://i.imgur.com/ZL52Q2D.png', NULL, NULL);
