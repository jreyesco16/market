/* create market database */
create database market;

/* create user(first name, last name, birthday, email, password) table */
create table user(
	user_id int NOT NULL auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    birthday date not null,
    email varchar(80) not null unique,
    password varchar(50) not null,
    user_rating DECIMAL (2,1) DEFAULT 0,
    primary key(user_id)
);

drop table user;

/* create table to holds all the services provided by all users */
create table services(
    services_id int NOT NULL AUTO_INCREMENT ,
    providable_service varchar(50) not null UNIQUE,
    primary key(services_id)
);

DROP TABLE services;

/* create user services */
create table user_services(
    user_service_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    services_id INT NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    duration INT NULL NULL,
    service_rating DECIMAL (2,1) DEFAULT 0,
    PRIMARY KEY (user_service_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE,
    FOREIGN KEY (services_id) REFERENCES services(services_id) ON UPDATE CASCADE
);

drop table user_services;

/* create a request table */
create table request(
    request_id INT AUTO_INCREMENT NOT NULL,
    -- user providing the service       // python make sure that the user aren't the same(easier to handle the error)
    servicer_id INT NOT NULL,
    -- user recieving the service
    reciever_id INT NOT NULL,
    user_service_id INT NOT NULL,
    PRIMARY KEY (request_id),
    FOREIGN KEY (servicer_id) REFERENCES  user(user_id),
    FOREIGN KEY (reciever_id) REFERENCES user(user_id),
    FOREIGN KEY (user_service_id) REFERENCES user_services(user_service_id)
);

drop table request;

create table payment(
    payment_id INT AUTO_INCREMENT NOT NULL,
    request_id INT NOT NULL,
    payment_date date NOT NULL,
    PRIMARY KEY (payment_id),
    FOREIGN KEY (request_id) REFERENCES request(request_id)
);

drop table payment;

create table feedback(
    feedback_id INT AUTO_INCREMENT NOT NULL,
    payment_id INT NOT NULL,
    quality DECIMAL(2,1) NOT NULL,
    speed DECIMAL(2,1) NOT NULL,
    price DECIMAL(2,1) NOT NULL,
    overall_rating DECIMAL (2,1) DEFAULT 0,
    comment VARCHAR(100) NULL,
    PRIMARY KEY (feedback_id),
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id)
);

drop table feedback;

create table business(
    business_id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    name varchar(100) NOT NULL,
    PRIMARY KEY (business_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE
);

drop table business;



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


    

