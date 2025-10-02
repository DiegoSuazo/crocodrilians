-- 🗄️ BASE DE DATOS CROCODILIANS (ESPAÑOL)

CREATE DATABASE IF NOT EXISTS crocodilians;
USE crocodilians;

-- 1️⃣ USUARIOS
CREATE TABLE usuarios (
    id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    correo VARCHAR(255) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    telefono VARCHAR(50),
    es_admin BOOLEAN DEFAULT FALSE,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2️⃣ CATEGORÍAS
CREATE TABLE categorias (
    id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    nombre VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    url_imagen VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3️⃣ PRODUCTOS
CREATE TABLE productos (
    id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2),
    stock INT DEFAULT 0,
    categoria_id CHAR(36),
    url_imagen VARCHAR(255),
    imagenes JSON,
    metadatos JSON,
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);

-- 4️⃣ DIRECCIONES
CREATE TABLE direcciones (
    id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    usuario_id CHAR(36),
    calle VARCHAR(255),
    ciudad VARCHAR(100),
    region VARCHAR(100),
    codigo_postal VARCHAR(20),
    pais VARCHAR(100),
    predeterminada BOOLEAN DEFAULT FALSE,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_direccion_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 5️⃣ ITEMS DEL CARRITO
CREATE TABLE carrito_items (
    id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    usuario_id CHAR(36),
    producto_id CHAR(36),
    cantidad INT DEFAULT 1,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_carrito_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_carrito_producto FOREIGN KEY (producto_id) REFERENCES productos(id),
    UNIQUE(usuario_id, producto_id)
);

-- 6️⃣ PEDIDOS
CREATE TABLE pedidos (
    id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    usuario_id CHAR(36),
    numero_pedido VARCHAR(100) NOT NULL UNIQUE,
    estado VARCHAR(50),
    monto_total DECIMAL(10,2),
    direccion_envio VARCHAR(255),
    metodo_pago VARCHAR(50),
    estado_pago VARCHAR(50),
    notas TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- 7️⃣ ITEMS DEL PEDIDO
CREATE TABLE pedido_items (
    id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    pedido_id CHAR(36),
    producto_id CHAR(36),
    cantidad INT DEFAULT 1,
    precio_unitario DECIMAL(10,2),
    precio_total DECIMAL(10,2),
    snapshot_producto JSON,
    CONSTRAINT fk_item_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    CONSTRAINT fk_item_producto FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- 8️⃣ BANNERS
CREATE TABLE banners (
    id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    titulo VARCHAR(255),
    url_imagen VARCHAR(255),
    url_enlace VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    orden_muestra INT DEFAULT 0,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);
