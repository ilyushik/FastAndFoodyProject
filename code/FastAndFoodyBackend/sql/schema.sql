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
                                    category INT REFERENCES category(id)
    );

CREATE TABLE IF NOT EXISTS order_item (
                                          id INT PRIMARY KEY AUTO_INCREMENT,
                                          amount INT NOT NULL,
                                          total INT NOT NULL ,
                                          item_id INT REFERENCES item(id)
    );

CREATE TABLE IF NOT EXISTS person(
                                     id int PRIMARY KEY AUTO_INCREMENT,
                                     name VARCHAR(32) NOT NULL ,
                                    email VARCHAR(64) NOT NULL UNIQUE ,
                                    person_role INT NOT NULL REFERENCES user_role(id),
                                    image varchar(256)
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
                                    payment_way INT NOT NULL REFERENCES payment_way(id) ,
                                    promo_code int REFERENCES promo_code(id),
                                    status INT NOT NULL REFERENCES status(id) ,
                                    delivery_way INT NOT NULL REFERENCES delivery_way(id) ,
                                    person_id int REFERENCES person(id) ON DELETE CASCADE ,
                                    address VARCHAR(64),
                                    date timestamp NOT NULL,
                                    sum INT NOT NULL,
                                    email varchar(60)
    );

ALTER TABLE order_item ADD COLUMN purchase int references purchase(id) on delete cascade ;

INSERT INTO category(category_name)
VALUES ('Cold drinks'), ('Hot drinks'), ('Beef'), ('Pork'), ('Fish and chicken'), ('Desserts'), ('Breakfasts'), ('Fries and sauces');

INSERT INTO delivery_way(way)
VALUES ('Delivery'), ('Pick up');

INSERT INTO status(status_name)
VALUES ('In progress'), ('Delivered'), ('On way'), ('Canceled');

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

INSERT INTO person(name, email, person_role, image)
VALUES ('Illia', 'kamarali@gmail.com',3, 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/face1.png?alt=media&token=16531758-4933-487c-bf2a-8a027acf307a'),
       ('Illia', 'illia.work@gmail.com', 2, 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/face2.png?alt=media&token=00b3ff76-f272-4fde-a6ad-07f83088d115'),
       ('Bohdan', 'khokhlov@gmail.com', 2, 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/face3.png?alt=media&token=68f1684a-d5cd-4698-9b86-fffbd734ea77'),
       ('Andriy', 'matsiev2006@gmail.com', 2, 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/face4.png?alt=media&token=b7fe6dde-d9ae-49ba-8fb5-d5fa0aeade12'),
       ('Denis', 'kykharykden11223@gmail.com', 2, 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/face5.png?alt=media&token=1491c5c7-7391-4a6b-9071-b95a883e7207');

INSERT INTO city(name, latitude, longitude) VALUES
                                                ('Paris', 48.856613, 2.352222),
                                                ('Berlin', 52.520008, 13.404954),
                                                ('Rome', 41.902782, 12.496366),
                                                ('Madrid', 40.416775, -3.703790),
                                                ('Vienna', 48.208174, 16.373819);

INSERT INTO city(name, latitude, longitude) VALUES
                                                ('Amsterdam', 52.367573, 4.904139),
                                                ('Prague', 50.075539, 14.437800),
                                                ('Brussels', 50.850346, 4.351721),
                                                ('Copenhagen', 55.676098, 12.568337),
                                                ('Lisbon', 38.716174, -9.139287),
                                                ('Warsaw', 52.229676, 21.012229),
                                                ('Budapest', 47.497913, 19.040236),
                                                ('Helsinki', 60.169856, 24.938379),
                                                ('Stockholm', 59.329323, 18.068581),
                                                ('Athens', 37.983810, 23.727539);

INSERT INTO restaurant(admin_id, address, latitude, longitude, city_id, phone, email)
VALUES (5, 'Champs-Élysées 12', 48.870848, 2.307515, 1, '+33123456789', 'eurodiningparis@gmail.com'),
       (4, 'Unter den Linden 35', 52.517038, 13.388860, 2, '+49301234567', 'eurodiningberlin@gmail.com'),
       (3, 'Via del Corso 89', 41.900104, 12.483348, 3, '+390612345678', 'eurodiningrome@gmail.com'),
       (2, 'Gran Via 45', 40.419598, -3.707439, 4, '+34912345678', 'eurodiningmadrid@gmail.com'),
       (1, 'Mariahilfer Str. 50', 48.196981, 16.338546, 5, '+43112345678', 'eurodiningvienna@gmail.com');


INSERT INTO item (item_name, price, description, image, category) VALUES
                                                                      ('Coca-Cola', 1.50, 'Chilled carbonated drink', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/coca-cola.webp?alt=media&token=d3df8ed6-b022-43b4-9e8c-5340d639a6bd', 1),
                                                                      ('Pepsi', 1.50, 'Carbonated cola-flavored drink', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/pepsi.webp?alt=media&token=c026e508-dfb3-40c8-96a7-cb05babcbbc0', 1),
                                                                      ('Americano', 2.00, 'Classic black coffee', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/Americano.jpg?alt=media&token=51f7eac8-ad1b-46dd-9c63-4e7cfa4f8acc', 2),
                                                                      ('Cappuccino', 2.50, 'Coffee with milk foam', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/cappucino.jpeg?alt=media&token=98c9ce65-0eaa-4049-9eeb-6f810043285a', 2),
                                                                      ('Beef Burger', 5.00, 'Juicy burger with beef patty', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/beef_burger.jpg?alt=media&token=b4f4894b-c557-4471-90db-3de401fe5c75', 3),
                                                                      ('Beef Steak', 8.00, 'Medium-rare beef steak', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/beaf_steak.jpg?alt=media&token=19c6d043-9f95-4f7a-a464-c3cabfe7e4ab', 3),
                                                                      ('Pork Kebab', 6.50, 'Marinated pork skewers', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/pork_kebab.jpg?alt=media&token=8567f2fa-4795-45fc-8949-550d7cf019c9', 4),
                                                                      ('BBQ Ribs', 7.50, 'Pork ribs in BBQ sauce', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/bbq_ribs.jpg?alt=media&token=7bc5aac6-50ec-4083-8067-a6078ea8d6d0', 4),
                                                                      ('Salmon Fillet', 9.00, 'Baked salmon with lemon', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/salmon_fillet.jpg?alt=media&token=4f7ceefd-0328-4986-87d0-c721ce0dcd32', 5),
                                                                      ('Chicken Nuggets', 4.50, 'Crispy chicken nuggets', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/chicken_nuggets.jpg?alt=media&token=9d76767d-fea5-403c-a0d3-c1f19c6512f2', 5),
                                                                      ('Chocolate Cake', 3.50, 'Rich chocolate-flavored cake', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/chocolate_cake.webp?alt=media&token=ac549991-5d9d-4ea0-bf3c-c037a6883fc6', 6),
                                                                      ('Ice Cream', 2.50, 'Vanilla ice cream with topping', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/ice_cream.jpeg?alt=media&token=6b9b70f5-980d-44f2-ae9c-e940c6d9960c', 6),
                                                                      ('Cheese Omelet', 4.00, 'Omelet with cheese and herbs', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/cheese_omelette.jpg?alt=media&token=540b98a1-5894-4793-aa5f-b6af6443579e', 7),
                                                                      ('Pancakes with Honey', 3.50, 'Thin pancakes with natural honey', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/pancakes_honey.jpg?alt=media&token=74c3dccf-df4f-4a1e-8e35-8275829aa33c', 7),
                                                                      ('French Fries', 2.00, 'Golden crispy french fries', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/french_fries.jpg?alt=media&token=9dc6929e-d92d-4cf7-9762-73548b50219c', 8),
                                                                      ('BBQ Sauce', 1.00, 'Smoky-flavored barbecue sauce', 'https://firebasestorage.googleapis.com/v0/b/dailylog-44de4.appspot.com/o/bbq_sauce.webp?alt=media&token=568ab7fd-c4d7-4b40-9f9a-edfd75b5264d', 8);



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
