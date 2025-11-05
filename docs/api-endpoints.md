# 🛠️ DOCUMENTACIÓN DE API - CROCODILIANS

## 📋 ÍNDICE

- [Autenticación](#autenticación)
- [Productos](#productos)
- [Categorías](#categorías)
- [Carrito](#carrito)
- [Pedidos](#pedidos)
- [Banners](#banners)
- [Códigos de Error](#códigos-de-error)

## 🔐 AUTENTICACIÓN

### **POST /api/auth/register**
Registra un nuevo usuario.

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+56912345678"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "usuario@example.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "+56912345678",
      "isAdmin": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  },
  "message": "Usuario registrado exitosamente"
}
```

### **POST /api/auth/login**
Inicia sesión de usuario.

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "usuario@example.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "+56912345678",
      "isAdmin": false
    },
    "token": "jwt_token_here"
  },
  "message": "Inicio de sesión exitoso"
}
```

### **GET /api/auth/profile**
Obtiene el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "usuario@example.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "phone": "+56912345678",
    "isAdmin": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### **PUT /api/auth/profile**
Actualiza el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "firstName": "Juan Carlos",
  "lastName": "Pérez González",
  "phone": "+56987654321"
}
```

## 🛍️ PRODUCTOS

### **GET /api/products**
Obtiene lista de productos con filtros opcionales.

**Query Parameters:**
- `categoryId`: Filtrar por categoría
- `search`: Buscar por título o descripción
- `isActive`: true/false (default: true)
- `page`: Número de página (default: 1)
- `limit`: Productos por página (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "product_id",
      "title": "Producto Ejemplo",
      "description": "Descripción del producto",
      "price": 29990.00,
      "stock": 50,
      "imageUrl": "https://example.com/image.jpg",
      "isActive": true,
      "category": {
        "id": "category_id",
        "name": "Categoría",
        "slug": "categoria"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### **GET /api/products/:id**
Obtiene detalles de un producto específico.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "product_id",
    "title": "Producto Ejemplo",
    "description": "Descripción detallada",
    "price": 29990.00,
    "stock": 50,
    "imageUrl": "https://example.com/image.jpg",
    "images": ["url1", "url2"],
    "metadata": { "set": "Base", "rarity": "Common" },
    "isActive": true,
    "category": {
      "id": "category_id",
      "name": "Categoría",
      "slug": "categoria"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### **POST /api/products** *(Admin)*
Crea un nuevo producto.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "title": "Nuevo Producto",
  "description": "Descripción del producto",
  "price": 19990.00,
  "stock": 100,
  "categoryId": "category_id",
  "imageUrl": "https://example.com/image.jpg",
  "images": ["url1", "url2"],
  "metadata": { "set": "Premium", "rarity": "Rare" }
}
```

## 📂 CATEGORÍAS

### **GET /api/categories**
Obtiene lista de categorías.

**Query Parameters:**
- `includeInactive`: true/false (default: false)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "category_id",
      "name": "Pokémon TCG",
      "slug": "pokemon-tcg",
      "description": "Juegos de cartas coleccionables",
      "imageUrl": "https://example.com/category.jpg",
      "isActive": true,
      "_count": {
        "products": 25
      }
    }
  ]
}
```

### **GET /api/categories/:id**
Obtiene detalles de una categoría específica.

### **GET /api/categories/slug/:slug**
Obtiene categoría por slug con productos incluidos.

## 🛒 CARRITO

### **GET /api/cart**
Obtiene el carrito del usuario autenticado.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "cart_item_id",
        "quantity": 2,
        "product": {
          "id": "product_id",
          "title": "Producto",
          "price": 29990.00,
          "imageUrl": "https://example.com/image.jpg",
          "stock": 50
        }
      }
    ],
    "total": 59980.00,
    "itemCount": 1
  }
}
```

### **POST /api/cart**
Agrega producto al carrito.

**Request Body:**
```json
{
  "productId": "product_id",
  "quantity": 1
}
```

### **PUT /api/cart/:id**
Actualiza cantidad de item en carrito.

**Request Body:**
```json
{
  "quantity": 3
}
```

### **DELETE /api/cart/:id**
Elimina item del carrito.

### **DELETE /api/cart**
Vacía el carrito completo.

## 📦 PEDIDOS

### **GET /api/orders**
Obtiene pedidos del usuario (o todos si es admin).

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "order_id",
      "orderNumber": "ORD-1234567890-ABCDEF",
      "status": "PENDING",
      "totalAmount": 59980.00,
      "paymentStatus": "PENDING",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": "user_id",
        "email": "usuario@example.com",
        "firstName": "Juan",
        "lastName": "Pérez"
      },
      "orderItems": [
        {
          "id": "order_item_id",
          "quantity": 2,
          "unitPrice": 29990.00,
          "totalPrice": 59980.00,
          "product": {
            "id": "product_id",
            "title": "Producto",
            "imageUrl": "https://example.com/image.jpg"
          }
        }
      ]
    }
  ]
}
```

### **GET /api/orders/:id**
Obtiene detalles de un pedido específico.

### **POST /api/orders**
Crea un nuevo pedido desde el carrito.

**Request Body:**
```json
{
  "shippingAddress": {
    "street": "Calle Falsa 123",
    "city": "Santiago",
    "state": "RM",
    "postalCode": "1234567",
    "country": "Chile"
  },
  "paymentMethod": "transferencia",
  "notes": "Entregar en horario de oficina"
}
```

### **PUT /api/orders/:id/cancel** *(Usuario/Admin)*
Cancela un pedido.

### **PUT /api/orders/:id/status** *(Admin)*
Actualiza estado del pedido.

**Request Body:**
```json
{
  "status": "CONFIRMED"
}
```

### **PUT /api/orders/:id/payment** *(Admin)*
Actualiza estado de pago.

**Request Body:**
```json
{
  "paymentStatus": "COMPLETED"
}
```

## 🖼️ BANNERS

### **GET /api/banners**
Obtiene banners activos.

**Query Parameters:**
- `includeInactive`: true/false (default: false)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "banner_id",
      "title": "Oferta Especial",
      "imageUrl": "https://example.com/banner.jpg",
      "linkUrl": "https://example.com/oferta",
      "isActive": true,
      "displayOrder": 1,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### **POST /api/banners** *(Admin)*
Crea un nuevo banner.

**Request Body:**
```json
{
  "title": "Nueva Oferta",
  "imageUrl": "https://example.com/banner.jpg",
  "linkUrl": "https://example.com/oferta",
  "displayOrder": 1
}
```

## ❌ CÓDIGOS DE ERROR

### **Errores Comunes**

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Errores de validación",
  "details": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Token de autenticación no proporcionado"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "error": "Acceso denegado. Se requieren permisos de administrador"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Producto no encontrado"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Error interno del servidor"
}
```

## 🔒 AUTENTICACIÓN

Todos los endpoints protegidos requieren el header:
```
Authorization: Bearer <jwt_token>
```

Los tokens JWT expiran en 7 días por defecto.

## 📊 ENUMERACIONES

### **Estados de Pedido**
- `PENDING`: Pendiente
- `CONFIRMED`: Confirmado
- `PROCESSING`: Procesando
- `SHIPPED`: Enviado
- `DELIVERED`: Entregado
- `CANCELLED`: Cancelado

### **Estados de Pago**
- `PENDING`: Pendiente
- `PROCESSING`: Procesando
- `COMPLETED`: Completado
- `FAILED`: Fallido
- `REFUNDED`: Reembolsado

## 🚀 INICIO RÁPIDO

1. **Instalar dependencias:**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

3. **Configurar base de datos:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

5. **Verificar API:**
   ```
   GET http://localhost:5000/api/health
   ```

## 📝 NOTAS IMPORTANTES

- Todos los precios están en pesos chilenos (CLP)
- Las imágenes deben ser URLs válidas
- Los slugs de categorías deben ser únicos
- Los números de orden son únicos y generados automáticamente
- El stock se actualiza automáticamente al crear pedidos
- Los pedidos cancelados restauran el stock automáticamente