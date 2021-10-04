--stockprices table
drop database if exists ceo;
create database ceo;

-- use database
\c ceo

-- tables quries
create table ceo(ceo_id serial primary key, name varchar, company_name varchar,globalrank int,salary int, email varchar);


