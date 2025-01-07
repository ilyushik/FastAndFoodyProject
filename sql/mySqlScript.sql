CREATE TABLE IF NOT EXISTS category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS delivery_way (
    id INT PRIMARY KEY AUTO_INCREMENT,
    way VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS promo_code (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_way (
    id INT PRIMARY KEY AUTO_INCREMENT,
    way VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS item (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(64),
    price INT NOT NULL,
    description TEXT NOT NULL,
    image varchar(256),
    category VARCHAR(32) REFERENCES category(category_name)
);

CREATE TABLE IF NOT EXISTS order_item (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount INT NOT NULL,
    total INT NOT NULL ,
    item_id INT REFERENCES Item(id)
);

CREATE TABLE IF NOT EXISTS person(
  id int PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(32) NOT NULL ,
  surname VARCHAR(32) NOT NULL,
  phone VARCHAR(16) NOT NULL UNIQUE ,
  email VARCHAR(64) NOT NULL UNIQUE ,
  username VARCHAR(32) UNIQUE NOT NULL,
  person_password VARCHAR(32) CHECK (length(person_password) > 7),
  person_role VARCHAR(32) NOT NULL REFERENCES user_role(id),
  image varchar(256)
);

CREATE TABLE IF NOT EXISTS basket (
    id INT PRIMARY KEY AUTO_INCREMENT,
    person_id INT REFERENCES person(id)
);

CREATE TABLE IF NOT EXISTS city(
    id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL ,
    longitude decimal(8, 6) NOT NULL ,
    latitude decimal(8, 6) NOT NULL
);

CREATE TABLE IF NOT EXISTS restaurant(
    id int PRIMARY KEY AUTO_INCREMENT,
    admin_id int UNIQUE NOT NULL REFERENCES person(id)  ,
    address VARCHAR(64) NOT NULL UNIQUE ,
    longitude decimal(8, 6) NOT NULL ,
    latitude decimal(8, 6) NOT NULL ,
    city_id int REFERENCES city(id),
    phone VARCHAR(16) NOT NULL ,
    email VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS purchase(
    id int PRIMARY KEY AUTO_INCREMENT,
    wish text,
    restaurant_id int NOT NULL REFERENCES restaurant(id) ,
    payment_way VARCHAR(32) NOT NULL REFERENCES payment_way(id) ,
    promo_code int REFERENCES promo_code(id),
    status VARCHAR(32) NOT NULL REFERENCES status(id) ,
    delivery_way VARCHAR(32) NOT NULL REFERENCES delivery_way(id) ,
    person_id int REFERENCES person(id),
    address VARCHAR(64),
    date timestamp NOT NULL,
    sum INT NOT NULL
);

ALTER TABLE order_item ADD COLUMN purchase int references purchase(id);
ALTER TABLE order_item ADD COLUMN basket int references basket(id)