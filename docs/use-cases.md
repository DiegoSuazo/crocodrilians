# 📋 CASOS DE USO - CROCODILIANS

## 👥 ACTORES DEL SISTEMA

### **1. Usuario Anónimo**
- Puede navegar productos
- Puede ver detalles de productos
- Puede buscar productos
- No puede comprar ni usar carrito

### **2. Usuario Registrado**
- Todas las funciones del usuario anónimo
- Puede registrarse y hacer login
- Puede agregar productos al carrito
- Puede realizar compras
- Puede ver historial de pedidos

### **3. Administrador**
- Todas las funciones del usuario registrado
- Puede gestionar productos (CRUD)
- Puede gestionar categorías
- Puede ver todos los pedidos
- Puede actualizar estados de pedidos

## 🎯 CASOS DE USO PRINCIPALES

### **CU-001: Navegación de Productos**
**Actor:** Usuario Anónimo/Registrado
**Descripción:** El usuario puede navegar y ver productos disponibles

**Flujo Principal:**
1. Usuario accede a la página principal
2. Sistema muestra banner promocional
3. Sistema muestra categorías (Booster Box, Elite Trainer Box)
4. Sistema muestra carrusel de productos por categoría
5. Usuario puede hacer clic en un producto para ver detalles

**Flujo Alternativo:**
- Si no hay productos: Sistema muestra mensaje "No hay productos disponibles"

---

### **CU-002: Búsqueda de Productos**
**Actor:** Usuario Anónimo/Registrado
**Descripción:** El usuario puede buscar productos específicos

**Flujo Principal:**
1. Usuario hace clic en icono de búsqueda
2. Sistema muestra campo de búsqueda
3. Usuario ingresa término de búsqueda
4. Sistema muestra resultados filtrados
5. Usuario puede seleccionar un producto de los resultados

**Flujo Alternativo:**
- Si no hay resultados: Sistema muestra "No se encontraron productos"

---

### **CU-003: Ver Detalle de Producto**
**Actor:** Usuario Anónimo/Registrado
**Descripción:** El usuario puede ver información detallada de un producto

**Flujo Principal:**
1. Usuario selecciona un producto
2. Sistema navega a página de detalle
3. Sistema muestra:
   - Imagen del producto
   - Título y descripción
   - Precio en CLP
   - Stock disponible
   - Selector de cantidad
4. Sistema muestra botones de acción según tipo de usuario

**Precondiciones:**
- El producto debe existir en la base de datos

---

### **CU-004: Registro de Usuario**
**Actor:** Usuario Anónimo
**Descripción:** Un usuario anónimo puede crear una cuenta

**Flujo Principal:**
1. Usuario hace clic en icono de usuario
2. Sistema muestra opciones de login/registro
3. Usuario selecciona "Registrarse"
4. Usuario completa formulario:
   - Email
   - Contraseña
   - Nombre
   - Apellido
   - Teléfono (opcional)
5. Sistema valida datos
6. Sistema crea cuenta y envía email de confirmación
7. Usuario se convierte en Usuario Registrado

**Flujo Alternativo:**
- Si email ya existe: Sistema muestra error
- Si datos inválidos: Sistema muestra errores de validación

---

### **CU-005: Inicio de Sesión**
**Actor:** Usuario Registrado
**Descripción:** Un usuario registrado puede iniciar sesión

**Flujo Principal:**
1. Usuario hace clic en icono de usuario
2. Sistema muestra formulario de login
3. Usuario ingresa email y contraseña
4. Sistema valida credenciales
5. Sistema genera JWT token
6. Sistema redirige a página principal
7. Usuario queda autenticado

**Flujo Alternativo:**
- Si credenciales incorrectas: Sistema muestra error
- Si cuenta no verificada: Sistema solicita verificación

---

### **CU-006: Agregar al Carrito**
**Actor:** Usuario Registrado
**Descripción:** Un usuario autenticado puede agregar productos al carrito

**Flujo Principal:**
1. Usuario está en página de detalle de producto
2. Usuario selecciona cantidad deseada
3. Usuario hace clic en "Agregar al carrito"
4. Sistema verifica stock disponible
5. Sistema agrega producto al carrito
6. Sistema actualiza contador de carrito
7. Sistema muestra confirmación

**Precondiciones:**
- Usuario debe estar autenticado
- Producto debe tener stock disponible

**Flujo Alternativo:**
- Si no hay stock: Sistema muestra error "Producto agotado"
- Si cantidad > stock: Sistema ajusta a stock disponible

---

### **CU-007: Gestionar Carrito**
**Actor:** Usuario Registrado
**Descripción:** Un usuario puede ver y modificar su carrito

**Flujo Principal:**
1. Usuario hace clic en icono de carrito
2. Sistema muestra productos en carrito:
   - Imagen y nombre del producto
   - Precio unitario
   - Cantidad
   - Subtotal
3. Usuario puede:
   - Modificar cantidades
   - Eliminar productos
   - Proceder al checkout
4. Sistema actualiza totales automáticamente

**Precondiciones:**
- Usuario debe estar autenticado

---

### **CU-008: Proceso de Compra (Checkout)**
**Actor:** Usuario Registrado
**Descripción:** Un usuario puede completar la compra de productos en su carrito

**Flujo Principal:**
1. Usuario hace clic en "Proceder al checkout"
2. Sistema muestra resumen del pedido
3. Usuario selecciona/ingresa dirección de envío
4. Usuario selecciona método de pago
5. Sistema calcula costos de envío
6. Usuario confirma pedido
7. Sistema procesa pago
8. Sistema crea pedido en base de datos
9. Sistema actualiza stock de productos
10. Sistema envía email de confirmación
11. Sistema muestra página de confirmación

**Precondiciones:**
- Usuario debe estar autenticado
- Carrito debe tener productos
- Productos deben tener stock disponible

**Flujo Alternativo:**
- Si pago falla: Sistema muestra error y mantiene carrito
- Si stock insuficiente: Sistema actualiza carrito y notifica

---

### **CU-009: Ver Historial de Pedidos**
**Actor:** Usuario Registrado
**Descripción:** Un usuario puede ver sus pedidos anteriores

**Flujo Principal:**
1. Usuario accede a su perfil
2. Usuario selecciona "Mis pedidos"
3. Sistema muestra lista de pedidos:
   - Número de pedido
   - Fecha
   - Estado
   - Total
4. Usuario puede hacer clic en un pedido para ver detalles
5. Sistema muestra detalle completo del pedido

**Precondiciones:**
- Usuario debe estar autenticado

---

### **CU-010: Gestión de Productos (Admin)**
**Actor:** Administrador
**Descripción:** Un administrador puede gestionar el catálogo de productos

**Flujo Principal:**
1. Administrador accede al panel de administración
2. Sistema muestra lista de productos
3. Administrador puede:
   - Crear nuevo producto
   - Editar producto existente
   - Eliminar producto
   - Actualizar stock
   - Cambiar estado (activo/inactivo)
4. Sistema valida y guarda cambios
5. Sistema actualiza catálogo

**Precondiciones:**
- Usuario debe tener rol de administrador

---

## 🔄 DIAGRAMAS DE FLUJO

### **Flujo de Compra Completo**
```
Usuario Anónimo
       ↓
   Navegar Productos
       ↓
   Ver Detalle
       ↓
   ¿Quiere Comprar?
       ↓
   Registrarse/Login
       ↓
   Usuario Registrado
       ↓
   Agregar al Carrito
       ↓
   Gestionar Carrito
       ↓
   Checkout
       ↓
   Procesar Pago
       ↓
   Confirmar Pedido
       ↓
   Email Confirmación
```

### **Flujo de Gestión de Stock**
```
Producto Agregado al Carrito
       ↓
   Verificar Stock
       ↓
   ¿Stock Disponible?
       ↓ (Sí)
   Reservar Stock
       ↓
   Procesar Pago
       ↓
   ¿Pago Exitoso?
       ↓ (Sí)
   Confirmar Venta
       ↓
   Actualizar Stock
       ↓
   Liberar Reserva
```

## 📊 MATRIZ DE CASOS DE USO

| Caso de Uso | Usuario Anónimo | Usuario Registrado | Administrador |
|-------------|-----------------|-------------------|---------------|
| Navegar Productos | ✅ | ✅ | ✅ |
| Buscar Productos | ✅ | ✅ | ✅ |
| Ver Detalle | ✅ | ✅ | ✅ |
| Registrarse | ✅ | ❌ | ❌ |
| Iniciar Sesión | ❌ | ✅ | ✅ |
| Agregar al Carrito | ❌ | ✅ | ✅ |
| Gestionar Carrito | ❌ | ✅ | ✅ |
| Realizar Compra | ❌ | ✅ | ✅ |
| Ver Historial | ❌ | ✅ | ✅ |
| Gestionar Productos | ❌ | ❌ | ✅ |
| Ver Todos los Pedidos | ❌ | ❌ | ✅ |

## 🎯 CRITERIOS DE ACEPTACIÓN

### **Para CU-006 (Agregar al Carrito)**
- ✅ El producto se agrega correctamente al carrito
- ✅ La cantidad no puede exceder el stock disponible
- ✅ Se muestra confirmación visual al usuario
- ✅ El contador del carrito se actualiza
- ✅ Solo usuarios autenticados pueden agregar productos

### **Para CU-008 (Proceso de Compra)**
- ✅ El pedido se crea con número único
- ✅ El stock se actualiza correctamente
- ✅ Se envía email de confirmación
- ✅ El carrito se vacía después de compra exitosa
- ✅ Se maneja correctamente el fallo de pago