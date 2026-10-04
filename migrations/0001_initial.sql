CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_src TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_active_sort
  ON products(active, sort_order);

CREATE TABLE IF NOT EXISTS metric_events (
  id TEXT PRIMARY KEY,
  event TEXT NOT NULL CHECK (event IN ('page_view', 'gallery_open', 'product_whatsapp', 'contact_email')),
  target TEXT,
  path TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_metric_events_created_at
  ON metric_events(created_at);

CREATE INDEX IF NOT EXISTS idx_metric_events_event_created_at
  ON metric_events(event, created_at);

INSERT OR IGNORE INTO products (id, slug, name, category, description, image_src, sort_order) VALUES
  ('c156b727-1524-4bcf-820a-8cf1e4c2af05', 'toppers-personalizados', 'Toppers personalizados', 'Tortas', 'Nombre, edad y temática en una pieza con capas, volumen y brillo.', '/assets/trabajos/topper-safari/cover.webp', 10),
  ('8112fcef-33e9-44ce-9617-e0680b37e18f', 'juegos-de-memoria', 'Juegos de memoria', 'Juegos', 'Pares ilustrados y empaque a juego para regalar y seguir jugando.', '/assets/trabajos/memoria-minecraft/cover.webp', 20),
  ('c96b3177-6391-4b74-a540-3e0db6e32d85', 'cajas-para-pintar', 'Cajas para pintar', 'Souvenirs', 'Láminas, colores y empaque personalizado, todo listo para regalar.', '/assets/trabajos/caja-pintar-sirena/cover.webp', 30),
  ('bd12fd10-e0b6-4f33-87ab-18489ee449b8', 'sets-coordinados', 'Sets coordinados', 'Sets', 'Distintas piezas con una misma paleta para que toda la mesa converse.', '/assets/trabajos/topper-candy/cover.webp', 40);
