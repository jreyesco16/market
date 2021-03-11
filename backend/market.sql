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
    primary key(user_id)
);

-- drop table user;

/* create table to holds all the services provided by all users */
create table services(
    services_id int NOT NULL AUTO_INCREMENT ,
    providable_service varchar(50) not null UNIQUE,
    primary key(services_id)
);

-- DROP TABLE user_services;

/* create user services */
create table user_services(
    user_service_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    services_id INT NOT NULL,
    price   INT NOT NULL,
    duration INT NULL NULL,
    PRIMARY KEY (user_service_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE,
    FOREIGN KEY (services_id) REFERENCES services(services_id) ON UPDATE CASCADE
);

-- drop table user_services;

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

-- drop table request;

create table payment(
    payment_id INT AUTO_INCREMENT NOT NULL,
    request_id INT NOT NULL,
    -- user recieving payment 
    servicer_id INT NOT NULL,
    -- user sending the service (recieved service)
    reciever_id INT NOT NULL,
    amout DECIMAL(18,2) NOT NULL,
    payment_date date NOT NULL,
    PRIMARY KEY (payment_id),
    FOREIGN KEY (request_id) REFERENCES request(request_id),
    FOREIGN KEY (servicer_id) REFERENCES user(user_id),
    FOREIGN KEY (reciever_id) REFERENCES user(user_id)
);

-- drop table payment;

create table feedback(
    feedback_id INT AUTO_INCREMENT NOT NULL,
    servicer_id INT NOT NULL,
    reciever_id INT NOT NULL,
    request_id INT NOT NULL,
    quality DECIMAL(1,1) NOT NULL,
    speed DECIMAL(1,1) NOT NULL,
    price DECIMAL(1,1) NOT NULL,
    comment VARCHAR(100) NULL,
    PRIMARY KEY (feedback_id),
    FOREIGN KEY (servicer_id) REFERENCES user(user_id),
    FOREIGN KEY (reciever_id) REFERENCES user(user_id),
    FOREIGN KEY (request_id) REFERENCES request(request_id)
);

-- drop table feedback;

create table business(
    business_id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    name varchar(100) NOT NULL,
    PRIMARY KEY (business_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE
);


-- drop table business;