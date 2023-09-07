CREATE DATABASE JM_veiculos;
USE JM_veiculos;

CREATE TABLE veiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano_fabricacao INT NOT NULL,
    estado ENUM('novo', 'usado') NOT NULL,
    km_rodados INT NOT NULL,
    passagem_leilao BOOLEAN NOT NULL,
    formas_pagamento VARCHAR(100) NOT NULL
);

select * from veiculo;

INSERT INTO veiculo (tipo, cor, marca, modelo, ano_fabricacao, estado, km_rodados, passagem_leilao, formas_pagamento)
VALUES
    ('carro', 'prata', 'Toyota', 'Corolla', 2019, 'usado', 60000, 0, 'à vista'),
    ('moto', 'verde', 'Kawasaki', 'Ninja 300', 2021, 'novo', 500, 0, 'parcelado'),
    ('carro', 'branco', 'Volkswagen', 'Golf', 2017, 'usado', 75000, 0, 'à vista'),
    ('moto', 'azul', 'Yamaha', 'YZF-R1', 2022, 'novo', 200, 0, 'parcelado'),
    ('carro', 'preto', 'BMW', 'X5', 2020, 'usado', 30000, 0, 'à vista');