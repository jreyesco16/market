/* create alphax database */
create database alphax;

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
    
/* create stock(

