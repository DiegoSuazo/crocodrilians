# 🐊 CROCODILIANS BACKEND API

Backend API REST completo para la plataforma de e-commerce Crocodilians, desarrollado con Node.js, Express, TypeScript y Prisma.

## 🚀 Características

- ✅ **Autenticación JWT** con registro e inicio de sesión
- ✅ **Gestión de productos** con categorías y búsqueda
- ✅ **Sistema de carrito** de compras
- ✅ **Procesamiento de pedidos** con estados y pagos
- ✅ **Sistema de banners** promocionales
- ✅ **Roles de usuario** (cliente/administrador)
- ✅ **Validación de datos** con express-validator
- ✅ **Manejo de errores** centralizado
- ✅ **Rate limiting** para protección
- ✅ **CORS** configurado
- ✅ **Logs** con Morgan
- ✅ **Base de datos PostgreSQL** con Prisma ORM

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipado estático
- **Prisma** - ORM de base de datos
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **express-validator** - Validación
- **helmet** - Seguridad
- **cors** - Cross-Origin Resource Sharing
- **morgan** - Logging

## 📁 Estructura del Proyecto

```
backend/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── src/
│   ├── config/
│   │   ├── database.ts        # Configuración de Prisma
│   │   └── index.ts           # Configuración general
│   ├── controllers/           # Controladores de rutas
│   │   ├── auth.controller.ts
│   │   ├── product.controller.ts
│   │   ├── category.controller.ts
│   │   ├── cart.controller.ts
│   │   ├── order.controller.ts
│   │   └── banner.controller.ts
│   ├── middlewares/           # Middlewares personalizados
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/                # Definición de rutas
│   │   ├── auth.routes.ts
│   │   ├── product.routes.ts
│   │   ├── category.routes.ts
│   │   ├── cart.routes.ts
│   │   ├── order.routes.ts
│   │   ├── banner.routes.ts
│   │   └── index.ts
│   ├── services/              # Lógica de negocio
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── category.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   └── banner.service.ts
│   ├── types/                 # Tipos TypeScript
│   │   └── index.ts
│   ├── utils/                 # Utilidades
│   │   └── auth.utils.ts
│   ├── app.ts                 # Configuración de Express
│   └── server.ts              # Punto de entrada
├── .env.example               # Variables de entorno
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Inicio Rápido

### 1. Clonar e instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/crocodilians?schema=public"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Configurar base de datos

```bash
# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# (Opcional) Abrir Prisma Studio
npm run prisma:studio
```

### 4. Iniciar servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm run build
npm start
```

El servidor estará corriendo en `http://localhost:5000`

### 5. Verificar funcionamiento

```bash
curl http://localhost:5000/api/health
```

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil
- `PUT /api/auth/profile` - Actualizar perfil

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)

### Categorías
- `GET /api/categories` - Listar categorías
- `GET /api/categories/:id` - Obtener categoría
- `GET /api/categories/slug/:slug` - Obtener por slug
- `POST /api/categories` - Crear categoría (Admin)
- `PUT /api/categories/:id` - Actualizar categoría (Admin)
- `DELETE /api/categories/:id` - Eliminar categoría (Admin)

### Carrito
- `GET /api/cart` - Obtener carrito
- `POST /api/cart` - Agregar al carrito
- `PUT /api/cart/:id` - Actualizar item
- `DELETE /api/cart/:id` - Eliminar item
- `DELETE /api/cart` - Vaciar carrito

### Pedidos
- `GET /api/orders` - Listar pedidos
- `GET /api/orders/:id` - Obtener pedido
- `POST /api/orders` - Crear pedido
- `PUT /api/orders/:id/cancel` - Cancelar pedido
- `PUT /api/orders/:id/status` - Actualizar estado (Admin)
- `PUT /api/orders/:id/payment` - Actualizar pago (Admin)

### Banners
- `GET /api/banners` - Listar banners
- `GET /api/banners/:id` - Obtener banner
- `POST /api/banners` - Crear banner (Admin)
- `PUT /api/banners/:id` - Actualizar banner (Admin)
- `DELETE /api/banners/:id` - Eliminar banner (Admin)

### Utilidades
- `GET /api/health` - Health check

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Para acceder a rutas protegidas, incluye el token en el header:

```
Authorization: Bearer <your_jwt_token>
```

Los tokens expiran en 7 días por defecto.

## 📊 Base de Datos

### Migraciones

```bash
# Crear nueva migración
npx prisma migrate dev --name nombre_de_la_migracion

# Resetear base de datos
npx prisma migrate reset
```

### Semillas (Seeds)

```bash
# Ejecutar semillas
npm run prisma:seed
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests con coverage
npm run test:coverage
```

## 📦 Scripts Disponibles

```json
{
  "dev": "nodemon src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:studio": "prisma studio",
  "prisma:seed": "ts-node prisma/seed.ts",
  "lint": "eslint src/**/*.ts",
  "lint:fix": "eslint src/**/*.ts --fix"
}
```

## 🔒 Seguridad

- **Helmet**: Configura headers de seguridad HTTP
- **Rate Limiting**: Limita solicitudes por IP
- **CORS**: Controla orígenes permitidos
- **bcryptjs**: Hash seguro de contraseñas
- **JWT**: Tokens de autenticación firmados
- **Validación**: Sanitización de inputs

## 📈 Monitoreo

- **Morgan**: Logging de requests HTTP
- **Health Check**: Endpoint `/api/health`
- **Error Handling**: Manejo centralizado de errores

## 🚀 Despliegue

### Variables de Producción

```env
NODE_ENV=production
DATABASE_URL="postgresql://user:password@host:5432/db"
JWT_SECRET=your-production-secret-key
CORS_ORIGIN=https://yourdomain.com
```

### Build y Deploy

```bash
npm run build
npm start
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](../LICENSE) para más detalles.

## 📞 Soporte

Para soporte, contacta al equipo de desarrollo o crea un issue en el repositorio.

---

🐊 **Crocodilians** - Tu tienda de juegos de cartas coleccionables