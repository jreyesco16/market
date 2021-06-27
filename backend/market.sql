/* create user(first name, last name, birthday, email, password) table */
create table users(
	id int NOT NULL auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    birthday date not null,
    email varchar(80) not null unique,
    password varchar(50) not null,
    rating DECIMAL (2,1) DEFAULT 0,
    avatar varchar(50) default "user.png",
    date date NOT NULL,
    primary key(id)
);

-- dummy users
insert into users(first_name, last_name, birthday, email, password, date) values ("Micheal", "Jordan", "1963-02-17", "jumpman23@bulls.com", "thebestever", now());
insert into users(first_name, last_name, birthday, email, password, date) values ("Monkey", "D. Luffy", "2000-05-07", "pirateking@gmail.com", "iwantmeat", now());


drop table users;

create table businesses(
	id int NOT NULL auto_increment,
    business varchar(75) not null,
    business_start date not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    birthday date not null,
    email varchar(80) not null unique,
    password varchar(50) not null,
    rating DECIMAL (2,1) DEFAULT 0,
    avatar varchar(50) default "business.png",
    date date NOT NULL,
    primary key(id)
);

drop table businesses;


/* create table to holds all the services provided by all users */
create table services(
    id int NOT NULL AUTO_INCREMENT ,
    service varchar(50) not null UNIQUE,
    primary key(id)
);

-- dummy services
insert into services(service) values ("Mercenary");
insert into services(service) values ("Body Guard");
insert into services(service) values ("Retrevial");
insert into services(service) values ("Software Engineering");
insert into services(service) values ("Software Development");
insert into services(service) values ("Web Development");
insert into services(service) values ("Basketball Coach");

DROP TABLE services;

/* create table that holds all products provided by all users */
create table products(
    id int NOT NULL AUTO_INCREMENT ,
    product varchar(50) not null UNIQUE,
    PRIMARY KEY (id)

);

DROP TABLE  products;

/* create table that holds user services & products they provide*/
create table users_providables(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    business_id INT NULL,
    service_id INT NULL,    -- although service_id and product_id both can't be NULL
    product_id INT NULL,
    fee DECIMAL(18,2) NOT NULL,
    duration INT NULL NULL,
    rating DECIMAL (2,1) DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON UPDATE CASCADE,
    FOREIGN KEY  (product_id) REFERENCES  products(id) ON UPDATE CASCADE
);

-- dummy user services
-- dummy 1 (jesse)
insert into users_providables (user_id, service_id, fee, duration) values(1,4,65000,365);
insert into users_providables (user_id, service_id, fee, duration) values(1,5,55000,365);
insert into users_providables (user_id, service_id, fee, duration) values(1,6, 50000,365);

-- dummy 2 (Luffy)
insert into users_providables (user_id, service_id, fee, duration) values(3,1,500,7);
insert into users_providables (user_id, service_id, fee, duration) values(3,2,400,7);
insert into users_providables (user_id, service_id, fee, duration) values(3,3,400,7);

-- dummy 3 (Micheal)
insert into users_providables (user_id, service_id, fee, duration) values(2, 7, 300000, 365);

drop table users_providables;

/* create a request table */
create table requests(
    id INT AUTO_INCREMENT NOT NULL,
    -- user providing the service       // python make sure that the user aren't the same(easier to handle the error)
    user_servicer_id INT NULL,
    business_servicer_id INT NULL,
    -- user recieving the service
    reciever_id INT NOT NULL,
    service_id INT,
    product_id INT,
    fee DECIMAL(18,2) NOT NULL,
    duration INT NOT NULL,
    rating INT NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_servicer_id) REFERENCES  users(id),
    FOREIGN KEY (business_servicer_id) REFERENCES businesses(id),
    FOREIGN KEY (reciever_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- dummy requests
-- requests for jesse from jordan for software engineering
insert into requests (user_servicer_id,reciever_id,service_id, fee, duration, rating, date) values(1,2,4, 65000.00, 365, 4.5, now());
-- request for jesse from luffy for web development
insert into requests (user_servicer_id,reciever_id,service_id, fee, duration, rating, date) values(1,3,6, 50000.00, 365, 4.7, now() );
-- request for jesse from luffy for software development
insert into requests (user_servicer_id,reciever_id,service_id, fee, duration, rating, date) values(1,3,5, 55000.00, 365, 4.4, now());

drop table requests;

create table payments(
    id INT AUTO_INCREMENT NOT NULL,
    request_id INT NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (request_id) REFERENCES requests(id)
);

-- payment for jesse from luffy for request 2
insert into payments (request_id, date) value (2,now());

drop table payments;

create table feedback(
    id INT AUTO_INCREMENT NOT NULL,
    payment_id INT NOT NULL,
    quality DECIMAL(2,1) NOT NULL,
    speed DECIMAL(2,1) NOT NULL,
    price DECIMAL(2,1) NOT NULL,
    rating DECIMAL (2,1) DEFAULT ((quality + speed + price)/3),
    comment VARCHAR(100) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (payment_id) REFERENCES payments(id)
);

-- dummy feedback
insert into feedback (payment_id,quality,speed,price,comment) values (1,5,3.5,4,"Really good quality websites but a little expensive and slow");

drop table feedback;

-- create query for getting all necessary data for the dashboard
select id,first_name,last_name from users WHERE email="jesserc.2@gmail.com";

-- query for requests only for user_id 1
select
    users.first_name, users.last_name, services.service, users.rating
from requests
    inner join services
        on requests.service_id = services.id
    inner join users
        on requests.reciever_id = users.id
where requests.user_servicer_id = 1;



-- query for feedback for user 1
select
    users.first_name,users.last_name, services.service, feedback.rating
from requests
    inner join users
        on requests.reciever_id = users.id
    inner join payments
        on requests.id = payments.request_id
    inner join feedback
        on payments.id = feedback.payment_id
    inner join services
        on requests.service_id = services.id
where requests.user_servicer_id=1;


-- query to get user first and last name based on their email
select
    users.first_name, users.last_name
from users
where users.email='jesserc.2@gmail.com';

-- query to get all services from users
SELECT
       users_providables.id,
       users_providables.fee,
       users_providables.duration,
       users_providables.rating,
       services.id,
       services.service
FROM users_providables
INNER JOIN services
    ON users_providables.service_id = services.id
WHERE user_id=USER_ID;
