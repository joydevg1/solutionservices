CREATE DATABASE IF NOT EXISTS urban_services;
USE urban_services;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  service_id INT NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  address TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'received',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT
);

INSERT IGNORE INTO services (id, title, category, price, description) VALUES
  (1, 'Home Cleaning', 'Cleaning', 999, 'Professional full-home cleaning services, including kitchen, bathroom, bedroom, living room, and balcony cleaning. Add-on services include deep cleaning, sofa cleaning, and kitchen chimney cleaning.'),
  (2, 'Salon at Home', 'Beauty', 799, 'Salon-quality haircuts, styling, waxing, threading, manicure, pedicure, and grooming at your home.'),
  (3, 'Appliance Repair', 'Repair', 899, 'Fast appliance repair for washing machines, refrigerators, microwave ovens, air conditioners, water heaters, and kitchen chimneys.'),
  (4, 'Plumbing', 'Home Services', 699, 'Reliable plumbing solutions for blocked drains, leaky taps, faucet installation, pipe repair, geyser repair, and bathroom fittings.'),
  (5, 'Electrical Services', 'Home Services', 749, 'Certified electricians for wiring, switchboard installation, fan and light fitting, inverter service, and safety inspections.'),
  (6, 'Pest Control', 'Cleaning', 849, 'Professional pest control for mosquitoes, cockroaches, rodents, ants, termites, and household pests with safe chemical treatments.');

INSERT IGNORE INTO settings (setting_key, setting_value) VALUES
  ('notificationEmail', 'orders@example.com'),
  ('whatsappMessage', 'A new order has arrived. Please follow up immediately.');
