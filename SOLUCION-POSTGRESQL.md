# 🛠️ SOLUCIÓN POSTGRESQL - PASO A PASO

## 🚨 Tu problema actual:
```
Error: P1001: Can't reach database server at localhost:5432
Error de sistema 5. Acceso denegado.
```

## ✅ SOLUCIÓN (Escoge una opción):

### 🔥 OPCIÓN 1: INICIAR CON SERVICIOS (MÁS FÁCIL)

1. **Presiona** `Windows + R`
2. **Escribe** `services.msc` y presiona Enter
3. **Busca** en la lista: `postgresql-x64-18`
4. **Clic derecho** sobre `postgresql-x64-18`
5. **Selecciona** "Iniciar"
6. **Clic derecho** nuevamente → "Propiedades"
7. **Cambiar** "Tipo de inicio" a **"Automático"**
8. **Clic** "Aplicar" y "Aceptar"

### 🔥 OPCIÓN 2: TERMINAL COMO ADMINISTRADOR

1. **Clic derecho** en el botón de Windows
2. **Selecciona** "Terminal (Administrador)" o "PowerShell (Administrador)"
3. **Ejecuta**:
```cmd
net start postgresql-x64-18
```

### 🔥 OPCIÓN 3: CREAR LA BASE DE DATOS MANUALMENTE

Si PostgreSQL ya está corriendo pero no tienes la base de datos:

1. **Abre** "SQL Shell (psql)" desde el menú de Windows
2. **Presiona Enter** varias veces (usa valores por defecto)
3. **Ingresa** la contraseña que pusiste al instalar PostgreSQL
4. **Ejecuta**:
```sql
CREATE DATABASE crocodilians;
CREATE USER croc_user WITH PASSWORD 'croc_pass';
GRANT ALL PRIVILEGES ON DATABASE crocodilians TO croc_user;
\q
```

## 🧪 VERIFICAR QUE FUNCIONA

Después de iniciar PostgreSQL, ejecuta:
```bash
npm run setup
```

Si ves esto:
```
✅ PostgreSQL está instalado
📦 Instalando dependencias del backend...
```

¡Significa que ya está funcionando!

## 🚀 DESPUÉS DEL SETUP

```bash
npm start    # Inicia todo
```

URLs:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

**💡 Una vez que hagas esto, PostgreSQL se iniciará automáticamente siempre que prendas tu computadora.**