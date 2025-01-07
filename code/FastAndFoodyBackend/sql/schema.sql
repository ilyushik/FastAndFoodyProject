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
ALTER TABLE order_item ADD COLUMN basket int references basket(id);

INSERT INTO category(category_name)
VALUES ('Cold_drinks'), ('Hot_drinks'), ('Beef'), ('Pork'), ('Fish_and_chicken'), ('Desserts'), ('Breakfasts'), ('Fries_and_sauces');

INSERT INTO delivery_way(way)
VALUES ('Delivery'), ('PickUp');

INSERT INTO status(status_name)
VALUES ('In_progress'), ('Delivered'), ('On_way'), ('Canceled');

INSERT INTO promo_code(code)
VALUES ('asjkdhf234'), ('lkjm5kn345'), ('mbnzxcv234'), ('asdf243fsc'), ('3245mml322');

INSERT INTO payment_way(way)
VALUES ('Card'), ('Cash');

INSERT INTO user_role(role)
VALUES ('ROLE_CLIENT'), ('ROLE_ADMIN'), ('ROLE_OWNER');


# INSERT INTO Item(item_name, price, description, prep_time, category, image)
# VALUES
#     ('Бургер зі свининою', 35, 'asdfa;slkjhfljahsdlfkjhalkjshdflas', 10, 'Pork', 3),
#     ('Чізбургер з рибою', 30, 'asdfalksjdlhflkjahsldkfjhlakjhsdflf', 10, 'Fish_and_chicken', 2),
#     ('Картопля по-запорізьки', 60, 'sadflgkja;skdjflkajsldkjfhlakf', 15, 'Fries_and_sauces', 5),
#     ('Австрійский сніданок', 50, 'saldkfg;lakjsdlkfjlaskjdf;lkjsdj', 20, 'Breakfasts', 4),
#     ('Флет уайт', 20, 'lksjhlkjfhsaldkjfhakjhsdlkfjhakjhsdlfkhalkf', 7, 'Hot_drinks', 6);
#
# INSERT INTO Item(item_name, price, description, prep_time, category, image)
# VALUES
#     ('Гамбургер зі смаженою куркою', 120.00, 'Смачний гамбургер зі смаженою куркою, салатом і соусом', 10, 'Fish_and_chicken', 7),
#     ('Картопля фрі', 70.00, 'Хрустка картопля фрі з сіллю', 8, 'Fries_and_sauces', 8),
#     ('Чікен нагетс', 100.00, 'Соковиті курячі нагетси з паніровкою', 12, 'Fish_and_chicken', 9),
#     ('Чізбургер', 130.00, 'Гамбургер з сиром, салатом і соусом', 10, 'Fish_and_chicken', 10),
#     ('Піца пепероні', 180.00, 'Піца з пепероні та сиром', 15, 'Fries_and_sauces', 11),
#     ('Кока-кола 0,5л', 50.00, 'Газований напій Кока-кола', 2, 'Cold_drinks', 12),
#     ('Чай з лимоном', 40.00, 'Ароматний чай з додаванням лимону', 3, 'Hot_drinks', 13),
#     ('Фреш апельсиновий 0,3л', 90.00, 'Свіжий фреш з апельсинів', 5, 'Cold_drinks', 14),
#     ('Хот-дог', 110.00, 'Хрусткий хлібець зі смаженою сосискою', 7, 'Fries_and_sauces', 15),
#     ('Салат Цезар з куркою', 150.00, 'Салат з куркою, сухариками і соусом Цезар', 10, 'Breakfasts', 16);

# INSERT INTO Order_Item(count, prep_time, price, item_id)
# VALUES (1, 45, 60, 3),
#        (2, 45, 40, 5),
#        (3, 23, 150, 4),
#        (4, 20, 240, 3),
#        (5, 23, 150, 2);

INSERT INTO person(name, surname, phone, email, username, person_password, person_role, image)
VALUES ('Ілля', 'Камаралі', '+380972224444', 'kamaraliilya@gmail.com', 'IlliaKamarali', '12345678', 3, 1),
       ('Ілля', 'Кисельов', '+380972342344', 'illia.kamarali.work@gmail.com', '1902Illia', '14141414', 2, 1),
       ('Богдан', 'Хохлов', '+380923234234', 'khokhlov@gmail.com', 'Bodya0301', '01010101', 2, 1),
       ('Андрій', 'Мацієвский', '+380972435678', 'matsiev2006@gmail.com', 'SushiMaster', '11111111', 2, 1),
       ('Денис', 'Кухарик', '+380978765432', 'kykharykden11223@gmail.com', 'Kukhar_ua', '11112222', 2, 1);

INSERT INTO person(name, surname, phone, email, username, person_password, person_role, image) VALUES
                                                                                                   ('Олексій', 'Семененко', '+380987654321', 'oleksiy.semenenko@example.com', 'oleksiy_semenenko', '11111130', 1, 1),
                                                                                                   ('Юлія', 'Полякова', '+380876543210', 'yuliya.polyakova@example.com', 'yuliya_polyakova', '22222257', 1, 1),
                                                                                                   ('Максим', 'Коваленко', '+380765432109', 'maxim.kovalenko@example.com', 'maxim_kovalenko', '33333368', 1, 1),
                                                                                                   ('Оксана', 'Біліч', '+380654321098', 'oksana.bilich@example.com', 'oksana_bilich', '44444424', 1, 1),
                                                                                                   ('Андрій', 'Петров', '+380543210987', 'andriy.petrov@example.com', 'andriy_petrov', '55555535', 1, 1);

INSERT INTO city(name, longitude, latitude) VALUES
                                                ('Маріуполь', 47.104500, 37.543761),
                                                ('Чернігів', 51.503600, 31.286362),
                                                ('Запоріжжя', 47.830958, 35.167202),
                                                ('Київ', 50.442673, 30.490800),
                                                ('Дніпро', 48.473107, 35.002404);

INSERT INTO city(name, longitude, latitude) VALUES
                                                ('Львів', 49.839683, 24.029717),
                                                ('Одеса', 46.482526, 30.723309),
                                                ('Харків', 49.9935, 36.2304),
                                                ('Тернопіль', 49.5535, 25.5948),
                                                ('Івано-Франківськ', 48.9226, 24.7111),
                                                ('Черкаси', 49.4444, 32.0595),
                                                ('Житомир', 50.2633, 28.6587),
                                                ('Ужгород', 48.6208, 22.2879),
                                                ('Рівне', 50.6199, 26.2516),
                                                ('Суми', 50.9077, 34.7981);

INSERT INTO restaurant(admin_id, address, longitude, latitude, city_id, phone, email)
VALUES (5, 'вул. Вишгородська 3', 48.459832, 35.031861, 5, '+380685573589', 'fastandfoodycorp@gmail.com'),
       (4, 'вул. Портова 6', 50.432090, 30.519048, 4, '+380984575567', 'fastandfoodycorp@gmail.com'),
       (3, 'бул. Шевченка 12', 47.862232, 35.080849, 3, '+380977842869', 'fastandfoodycorp@gmail.com'),
       (2, 'просп. Миру 154', 51.505058, 31.272312, 2, '+380687412589', 'fastandfoodycorp@gmail.com'),
       (1, 'просп. Соборний 198', 47.097155, 37.544608, 1, '+380671234675', 'fastandfoodycorp@gmail.com');


# INSERT INTO purchase(prep_time, wish, restaurant_id, payment_way, promo_code, status, delivery_way, order_item_id, person_id, address, date, sum)
# VALUES
#     (12, 'asdasdflkasdafas', 2, 'Card', 1, 'In_progress', 'PickUp', 2, 2, null, '2024-03-11 12:00:00', 210),
#     (42, 'asdasdflkadsfghds', 3, 'Cash', 2, 'Delivered', 'Delivery', 3, 3, 'Харківське шосе, 148', '2023-09-20 12:00:00', 240),
#     (45, 'asdasdflksdfgsdsfgs', 4, 'Card',3, 'On_way', 'PickUp', 4, 4, null,  '2024-02-20 12:00:00', 150),
#     (24, 'asdasdflkassdfgsdf', 5, 'Cash', 4, 'In_progress', 'PickUp', 5, 5, null, '2023-10-20 12:00:00', 40);

# UPDATE order_item SET purchase_id = 1 WHERE order_item.id = 1;
# UPDATE order_item SET purchase_id = 4 WHERE order_item.id = 2;
# UPDATE order_item SET purchase_id = 3 WHERE order_item.id = 3;
# UPDATE order_item SET purchase_id = 2 WHERE order_item.id = 4;
# UPDATE order_item SET purchase_id = 1 WHERE order_item.id = 5;
