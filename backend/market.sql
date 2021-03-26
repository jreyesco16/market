/* create market database */
create database market;

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

drop table business;


/* create table to holds all the services provided by all users */
create table services(
    id int NOT NULL AUTO_INCREMENT ,
    service varchar(50) not null UNIQUE,
    primary key(id)
);

DROP TABLE services;

/* create table that holds all products provided by all users */
create table products(
    id int NOT NULL AUTO_INCREMENT ,
    product varchar(50) not null UNIQUE,
    PRIMARY KEY (id)

);

DROP TABLE  products;

/* create table that holds user services & products they provide*/
create table users_services_products(
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

drop table users_services_products;

/* create a request table */
create table requests(
    id INT AUTO_INCREMENT NOT NULL,
    -- user providing the service       // python make sure that the user aren't the same(easier to handle the error)
    servicer_id INT NOT NULL,
    -- user recieving the service
    reciever_id INT NOT NULL,
    service_id INT,
    product_id INT,
    fee DECIMAL(18,2) NOT NULL,
    duration INT NOT NULL,
    rating INT NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (servicer_id) REFERENCES  users(id),
    FOREIGN KEY (reciever_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

drop table requests;

create table payments(
    id INT AUTO_INCREMENT NOT NULL,
    request_id INT NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (request_id) REFERENCES requests(id)
);

drop table payments;

create table feedback(
    id INT AUTO_INCREMENT NOT NULL,
    payment_id INT NOT NULL,
    quality DECIMAL(2,1) NOT NULL,
    speed DECIMAL(2,1) NOT NULL,
    price DECIMAL(2,1) NOT NULL,
    rating DECIMAL (2,1) DEFAULT 0,
    comment VARCHAR(100) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (payment_id) REFERENCES payments(id)
);

drop table feedback;




-- insert dummy data for testing

    -- dummy users
insert into user(first_name, last_name, birthday, email, password) values ("Micheal", "Jordan", "1963-02-17", "jumpman23@bulls.com", "thebestever");
insert into user(first_name, last_name, birthday, email, password) values ("Monkey", "D. Luffy", "2000-05-07", "pirateking@gmail.com", "iwantmeat");


    -- dummy services
insert into services(providable_service) values ("Mercenary"); 
insert into services(providable_service) values ("Body Guard");
insert into services(providable_service) values ("Retrevial");
insert into services(providable_service) values ("Software Engineering");
insert into services(providable_service) values ("Software Development");
insert into services(providable_service) values ("Web Development");
insert into services(providable_service) values ("Basketball Coach");


    -- dummy user services
-- dummy 1 (jesse)
insert into user_services (user_id, services_id, price, duration) values(1,4,65000,365);
insert into user_services (user_id, services_id, price, duration) values(1,5,55000,365);
insert into user_services (user_id, services_id, price, duration) values(1,6, 50000,365);

-- dummy 2 (Luffy)
insert into user_services (user_id, services_id, price, duration) values(3,1,500,7);
insert into user_services (user_id, services_id, price, duration) values(3,2,400,7);
insert into user_services (user_id, services_id, price, duration) values(3,3,400,7);

-- dummy 3 (Micheal)
insert into user_services (user_id, services_id, price, duration) values(2, 7, 300000, 365);

    -- dummy requests

-- requests for jesse from jordan for software engineering
insert into request (servicer_id,reciever_id,user_service_id) values(1,2,1);
-- request for jesse from luffy for web development
insert into request (servicer_id,reciever_id,user_service_id) values(1,3,3);
-- request for jesse from luffy for software development 
insert into request (servicer_id,reciever_id,user_service_id) values(1,3,2);

    -- dummy payments

-- payment for jesse from luffy for request 2
insert into payment (request_id,payment_date) value (2,"2021-03-05");

    -- dummy feedback
insert into feedback (payment_id,quality,speed,price,comment) values (1,5,3.5,4,"Really good quality websites but a little expensive and slow");


-- create query for getting all necessary data for the dashboard
select user_id,first_name,last_name from user WHERE email="jesserc.2@gmail.com";
-- query for requests
select
    -- have to add a field for user rating
    user.first_name, user.last_name, services.providable_service, user.user_rating
from request 
    inner join payment
        on payment.request_id != request.request_id
    inner join feedback
        on payment.payment_id = feedback.payment_id
    inner join user_services
        on request.user_service_id = user_services.user_service_id
    inner join services
        on user_services.services_id = services.services_id
    inner join user
        on request.reciever_id = user.user_id
where request.servicer_id = 1;

select 
    request.request_id
from request
    inner join payment
        on payment.request_id != request.request_id
    inner join feedback
        on payment.payment_id = feedback.payment_id;


-- query for feedback
select 
    -- have to add a field for overall rating
    user.first_name,user.last_name, services.providable_service, feedback.overall_rating
from request
    inner join user 
        on request.reciever_id = user.user_id
    inner join user_services
        on request.user_service_id = user_services.user_service_id
    inner join services
        on user_services.services_id = services.services_id
    inner join payment
        on request.request_id = payment.request_id
    inner join feedback
        on payment.payment_id = feedback.payment_id
where request.servicer_id=1;


-- query to get user first and last name based on their email
select 
    user.first_name, user.last_name
from user
where user.email='jesserc.2@gmail.com';


-- add a link to the users pic
alter table user
    add avatar varchar(50) default "avatar.png"
    after password;

alter table user drop COLUMN avatar;

    

