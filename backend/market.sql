/* create market database */
create database market;

/* create user(first name, last name, birthday, email, password) table */
create table visiter(
	visiter_id int auto_increment,
    visiter_count int DEFAULT 0 NOT NULL,
    PRIMARY KEY (visiter_id)
);

update visiter set visiter_count=1 where visiter_id=1;

select visiter_count from visiter where visiter_id = 1