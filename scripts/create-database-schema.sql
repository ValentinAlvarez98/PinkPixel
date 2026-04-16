-- Script SQL para crear la estructura de base de datos PostgreSQL

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  category_id VARCHAR(50) NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  base_price DECIMAL(10, 2) NOT NULL,
  is_customizable BOOLEAN DEFAULT FALSE,
  mercadolibre_url TEXT,
  whatsapp_url TEXT,
  subcategory VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por categoría
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_customizable ON products(is_customizable);

-- Tabla de imágenes de productos
CREATE TABLE IF NOT EXISTS product_images (
  id VARCHAR(50) PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 1,
  alt_text VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para ordenar imágenes
CREATE INDEX idx_product_images_product ON product_images(product_id, display_order);

-- Tabla de variantes de productos (ej: Color, Tamaño, Tema)
CREATE TABLE IF NOT EXISTS product_variants (
  id VARCHAR(50) PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, -- "Color", "Tamaño", "Tema"
  type VARCHAR(20) NOT NULL CHECK (type IN ('select', 'radio', 'button')),
  is_required BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para obtener variantes de un producto
CREATE INDEX idx_product_variants_product ON product_variants(product_id, display_order);

-- Tabla de opciones de variantes
CREATE TABLE IF NOT EXISTS variant_options (
  id VARCHAR(50) PRIMARY KEY,
  variant_id VARCHAR(50) NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, -- "Rojo", "Grande", "Unicornio"
  price_modifier DECIMAL(10, 2) DEFAULT 0, -- Modificador de precio
  stock_quantity INTEGER,
  is_available BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para obtener opciones de una variante
CREATE INDEX idx_variant_options_variant ON variant_options(variant_id, display_order);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
