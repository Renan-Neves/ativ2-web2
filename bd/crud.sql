create database crud;
use crud;


CREATE TABLE cliente(
cli_id INT NOT NULL AUTO_INCREMENT,
cli_nome VARCHAR(255) NOT NULL,
cli_idade int NOT NULL,
PRIMARY KEY (cli_id)
);


create table endereco (
	end_cod int PRIMARY KEY AUTO_INCREMENT,
    end_cep varchar(8) UNIQUE,
	end_bairro varchar(30),
    end_rua varchar(30),
    end_numero int
);