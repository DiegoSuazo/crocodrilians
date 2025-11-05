        # 🗄️ MODELO DE BASE DE DATOS - CROCODILIANS

        ## 📊 DIAGRAMA ENTIDAD-RELACIÓN (ER)

        ```
        ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
        │     USERS       │    │   CATEGORIES    │    │    PRODUCTS     │
        ├─────────────────┤    ├─────────────────┤    ├─────────────────┤
        │ id (PK)         │    │ id (PK)         │    │ id (PK)         │
        │ email           │    │ name            │    │ title           │
        │ password_hash   │    │ slug            │    │ description     │
        │ first_name      │    │ description     │    │ price           │
        │ last_name       │    │ image_url       │    │ stock           │
        │ phone           │    │ is_active       │    │ category_id (FK)│
        │ is_admin        │    │ created_at      │    │ image_url       │
        │ created_at      │    └─────────────────┘    │ images (JSON)   │
        │ updated_at      │                           │ metadata (JSON) │
        └─────────────────┘                           │ is_active       │
                │                                     │ created_at      │
                │                                     │ updated_at      │
                │                                     └─────────────────┘
                │                                            │
                │                                            │
                │    ┌─────────────────┐                     │
                │    │   ADDRESSES     │                     │
                │    ├─────────────────┤                     │
                │    │ id (PK)         │                     │
                │    │ user_id (FK)    │◄────────────────────┘
                │    │ street          │                     │
                │    │ city            │                     │
                │    │ state           │                     │
                │    │ postal_code     │                     │
                │    │ country         │                     │
                │    │ is_default      │                     │
                │    │ created_at      │                     │
                │    └─────────────────┘                     │
                │                                            │
                │    ┌─────────────────┐                     │
                │    │   CART_ITEMS    │                     │
                │    ├─────────────────┤                     │
                │    │ id (PK)         │                     │
                │    │ user_id (FK)    │◄────────────────────┤
                │    │ product_id (FK) │◄────────────────────┘
                │    │ quantity        │
                │    │ created_at      │
                │    │ updated_at      │
                │    └─────────────────┘
                │
                │    ┌─────────────────┐
                │    │     ORDERS      │
                │    ├─────────────────┤
                │    │ id (PK)         │
                │    │ user_id (FK)    │◄────────────────────┘
                │    │ order_number    │
                │    │ status          │
                │    │ total_amount    │
                │    │ shipping_addr   │
                │    │ payment_method  │
                │    │ payment_status  │
                │    │ notes           │
                │    │ created_at      │
                │    │ updated_at      │
                │    └─────────────────┘
                            │
                            │
                ┌─────────────────┐
                │  ORDER_ITEMS    │
                ├─────────────────┤
                │ id (PK)         │
                │ order_id (FK)   │◄────────────────────┘
                │ product_id (FK) │
                │ quantity        │
                │ unit_price      │
                │ total_price     │
                │ product_snapshot│
                └─────────────────┘

        ┌─────────────────┐
        │    BANNERS      │
        ├─────────────────┤
        │ id (PK)         │
        │ title           │
        │ image_url       │
        │ link_url        │
        │ is_active       │
        │ display_order   │
        │ created_at      │
        └─────────────────┘
        ```

        ## 🔗 RELACIONES DETALLADAS

        ### **1. USERS → ADDRESSES (1:N)**
        - Un usuario puede tener múltiples direcciones
        - Una dirección pertenece a un solo usuario
        - Relación: `users.id` ← `addresses.user_id`

        ### **2. USERS → CART_ITEMS (1:N)**
        - Un usuario puede tener múltiples items en su carrito
        - Un item del carrito pertenece a un solo usuario
        - Relación: `users.id` ← `cart_items.user_id`

        ### **3. USERS → ORDERS (1:N)**
        - Un usuario puede tener múltiples pedidos
        - Un pedido pertenece a un solo usuario
        - Relación: `users.id` ← `orders.user_id`

        ### **4. CATEGORIES → PRODUCTS (1:N)**
        - Una categoría puede tener múltiples productos
        - Un producto pertenece a una sola categoría
        - Relación: `categories.id` ← `products.category_id`

        ### **5. PRODUCTS → CART_ITEMS (1:N)**
        - Un producto puede estar en múltiples carritos
        - Un item del carrito referencia a un solo producto
        - Relación: `products.id` ← `cart_items.product_id`

        ### **6. PRODUCTS → ORDER_ITEMS (1:N)**
        - Un producto puede estar en múltiples pedidos
        - Un item del pedido referencia a un solo producto
        - Relación: `products.id` ← `order_items.product_id`

        ### **7. ORDERS → ORDER_ITEMS (1:N)**
        - Un pedido puede tener múltiples items
        - Un item pertenece a un solo pedido
        - Relación: `orders.id` ← `order_items.order_id`

        ## 📋 CARDINALIDADES

        | Relación | Cardinalidad | Descripción |
        |----------|--------------|-------------|
        | User → Address | 1:N | Un usuario, múltiples direcciones |
        | User → Cart_Item | 1:N | Un usuario, múltiples items en carrito |
        | User → Order | 1:N | Un usuario, múltiples pedidos |
        | Category → Product | 1:N | Una categoría, múltiples productos |
        | Product → Cart_Item | 1:N | Un producto, múltiples carritos |
        | Product → Order_Item | 1:N | Un producto, múltiples pedidos |
        | Order → Order_Item | 1:N | Un pedido, múltiples items |

        ## 🔑 CLAVES Y RESTRICCIONES

        ### **Claves Primarias (PK)**
        - Todas las tablas usan `UUID` como clave primaria
        - Generación automática con `gen_random_uuid()`

        ### **Claves Foráneas (FK)**
        - `addresses.user_id` → `users.id`
        - `cart_items.user_id` → `users.id`
        - `cart_items.product_id` → `products.id`
        - `products.category_id` → `categories.id`
        - `orders.user_id` → `users.id`
        - `order_items.order_id` → `orders.id`
        - `order_items.product_id` → `products.id`

        ### **Restricciones Únicas**
        - `users.email` - Un email por usuario
        - `categories.slug` - Un slug por categoría
        - `orders.order_number` - Número de pedido único
        - `cart_items(user_id, product_id)` - Un producto por usuario en carrito

        ### **Restricciones de Integridad**
        - `CASCADE DELETE` en `addresses`, `cart_items` cuando se elimina usuario
        - `SET NULL` en `orders` cuando se elimina usuario (mantener historial)
        - `RESTRICT` en `products` cuando se elimina categoría