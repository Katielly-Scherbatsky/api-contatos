CREATE DATABASE api_contato_bd;
use api_contato_bd;

create table contatos (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	data_nasc DATE,
	telefone VARCHAR(50),
	email VARCHAR(50)
);
insert into contatos (nome, data_nasc, telefone, email) values ('Averil', '2016-08-21', '(608) 8148796', 'amapholm0@webeden.co.uk');
insert into contatos (nome, data_nasc, telefone, email) values ('Wood', '2007-11-15', '(192) 3266202', 'wbramford1@rambler.ru');
insert into contatos (nome, data_nasc, telefone, email) values ('Anjanette', '2019-01-15', '(764) 6273931', 'arewcastle2@ucoz.com');
insert into contatos (nome, data_nasc, telefone, email) values ('Donella', '2022-12-17', '(374) 3088980', 'dfusedale3@opensource.org');
insert into contatos (nome, data_nasc, telefone, email) values ('Hobie', '2013-04-05', '(575) 1375899', 'hgoodale4@reverbnation.com');


create table categoria (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL
);

INSERT into categoria (nome) VALUES('esportes');
INSERT into categoria (nome) VALUES('filmes');
INSERT into categoria (nome) VALUES('series');
INSERT into categoria (nome) VALUES('jogos');