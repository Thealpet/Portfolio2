CREATE DATABASE shopDB;
USE shopDB;

CREATE TABLE plants (
    id          INT unsigned NOT NULL AUTO_INCREMENT,
    image       VARCHAR(1024) NOT NULL,
    name        VARCHAR(100) NOT NULL,
    shortDescription VARCHAR(200) NOT NULL,
    longDescription VARCHAR(1000) NOT NULL,
    price       INT NOT NULL,
    PRIMARY KEY (id)
);



INSERT INTO plants (image, name, shortDescription, longDescription, price) VALUES
("https://www.plantasjen.no/dw/image/v2/BCMR_PRD/on/demandware.static/-/Sites-inriver-catalog/default/dw07f82e62/images/large/Aloe%20vera%2015cm.jpg?sh=618&sfrm=png", 'Aloe Vera', 'A plant that likes hot climat.', 'Aloe Vera i a cactus-like plant. It does not need a lot of water and is easy to take care of.', 259),
("https://cdn.pixabay.com/photo/2019/10/07/09/01/rose-4532168_960_720.jpg", 'Rosebouquet', 'Pretty flower to give to someone you like!', 'Buy this bouquet of 15 roses if you want to be romantic or decorate your home.', 199),
("https://www.plantandpot.nz/wp-content/uploads/2016/12/20161211_170345-e1484530778306.jpg", 'Cactus', 'Perfect fit for those who wants an easy plant to take care of!', 'A cactus can survive under any circumstances, and is therefore the perfect plant to have in your home. The only thing that can hurt a cactus is if you overwater it. In other words, it does not have to be watered often.', 399),
("https://cdn.pixabay.com/photo/2020/02/04/16/41/tulips-4818753_960_720.jpg", 'Tulip', 'A flower that comes in many colors.', 'These flowers bloom in the spring and generally comes in red, pink, yellow or white. If you buy these flowers you will get a pack of 10 tulips in different colors!', 179),
("https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Orchid_in_pot.jpg/398px-Orchid_in_pot.jpg", 'Orchid', 'A potted plant with a height of 50 cm.', 'Easy and elegant plant that blooms for a long time. This makes for a nice decoration in your home.', 149),
("https://cdn.pixabay.com/photo/2019/08/26/15/30/olives-4432049_960_720.jpg", 'Olive tree', 'This plants needs a sunny spot in your home!', 'Grow your own olive tree inside. As long as you have a sunny spot in your home and a semi-high ceiling, this plant is for you!', 699),
("https://cdn.pixabay.com/photo/2016/07/15/02/03/palm-1518108_960_720.jpg", 'Dwarf palm', 'Light watering and a sunny environment!', 'This plant likes a sunny environment and does not need too much watering. It can also handle some cold weather. Perfect for that tropical vibe.', 799),
("https://snappygoat.com/b/a6fba9f0ddc62837e440b09517fc15cb71cc952c", 'Ivy', 'Fantastic and brightening plant for your home!', 'The plant likes light and to dry out a bit before watering. When providing the Ivy plant with this, the plant will grow for a long time', 239),
("https://live.staticflickr.com/3748/9892095024_77ac44af20_b.jpg", 'Japanfatsia', 'A sturdy plant that can live in cold weather.', 'Japanfatsia gets its name from Japan where it originates from. The plant has palmlike leaves and thrives best in partial shade or shade.', 119);


CREATE USER 'user' IDENTIFIED BY 'G1f3HiAq45';
GRANT SELECT, INSERT ON plants TO 'user'; 

CREATE TABLE cart (
    id          INT unsigned NOT NULL AUTO_INCREMENT,
    image       VARCHAR(1024) NOT NULL,
    name        VARCHAR(100) NOT NULL,
    price       INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE USER 'shopper' IDENTIFIED BY 'hGm75Uv32dS';
GRANT INSERT, DELETE, SELECT ON cart TO 'shopper';

