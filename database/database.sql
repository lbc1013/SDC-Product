CREATE DATABASE sdcProduct;

CREATE TABLE IF NOT EXISTS productDetail (
  id INT PRIMARY KEY,
  productName VARCHAR(255),
  slogan VARCHAR(255),
  description VARCHAR(255),
  category VARCHAR(255),
  defaultPrice VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS feature (
  id INT PRIMARY KEY,
  feature VARCHAR(255),
  value VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS relatedProduct (
  id INT PRIMARY KEY,
  relatedId int
);

CREATE TABLE IF NOT EXISTS skus (
  id INT PRIMARY KEY,
  styleId int,
  size VARCHAR(255),
  quantity VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS styles (
  id INT PRIMARY KEY,
  styleId int,
  styleName VARCHAR(255),
  originalPrice VARCHAR(255),
  salePrice VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS photos (
  id INT PRIMARY KEY,
  styleId int,
  thumbnailUrl VARCHAR(255),
  url VARCHAR(255)
);