DROP TABLE IF EXISTS features, photos, productDetail, relatedProduct, skus, styles;

CREATE TABLE IF NOT EXISTS productDetail (
  id SERIAL,
  productName VARCHAR(255),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(255),
  defaultPrice VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL,
  productId INT,
  feature VARCHAR(255),
  value VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES productDetail (id)
);

CREATE TABLE IF NOT EXISTS relatedProduct (
  id SERIAL,
  productId INT,
  relatedId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES productDetail (id)
);

CREATE TABLE IF NOT EXISTS styles (
  id SERIAL,
  productId INT,
  styleName VARCHAR(255),
  salePrice VARCHAR(20),
  originalPrice VARCHAR(20),
  defaultStyle Boolean,
  PRIMARY KEY(id),
  FOREIGN KEY (productId) REFERENCES productDetail (id)
);

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL,
  styleId INT,
  size VARCHAR(20),
  quantity INT,
  PRIMARY KEY(id),
  FOREIGN KEY (styleId) REFERENCES styles (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL,
  styleId INT,
  thumbnailUrl TEXT,
  url TEXT,
  FOREIGN KEY (styleId) REFERENCES styles (id)
);

-- THIS IS TO LOAD DATA FROM CSV FILES TO DB --
-- \COPY productDetail FROM './csv/product.csv' DELIMITER ',' CSV HEADER;
-- \COPY features FROM './csv/features.csv' DELIMITER ',' CSV HEADER;
-- \COPY relatedProduct FROM './csv/related.csv' DELIMITER ',' CSV HEADER;
-- \COPY styles FROM './csv/styles.csv' DELIMITER ',' CSV HEADER;
-- \COPY skus FROM './csv/skus.csv' DELIMITER ',' CSV HEADER;
-- \COPY photos FROM './csv/photos.csv' DELIMITER ',' CSV HEADER;

