# 🐊 CROCODILIANS - INSTALACIÓN SIMPLE

## 📋 Requisitos Previos

1. **Node.js** (versión 16 o superior)
2. **PostgreSQL** instalado y ejecutándose

### Instalar PostgreSQL:
- **Windows**: [Descargar aquí](https://www.postgresql.org/download/windows/)
- **Mac**: `brew install postgresql`
- **Ubuntu**: `sudo apt install postgresql postgresql-contrib`

## 🚀 Instalación en 3 Pasos

### 1. Configurar Base de Datos
```bash
# Conectar a PostgreSQL como superusuario
psql -U postgres

# Crear la base de datos
CREATE DATABASE crocodilians;

# Crear usuario (opcional pero recomendado)
CREATE USER croc_user WITH PASSWORD 'croc_pass';
GRANT ALL PRIVILEGES ON DATABASE crocodilians TO croc_user;

# Salir de PostgreSQL
\q
```

### 2. Configurar Variables de Entorno
```bash
# Copiar el archivo de ejemplo
cp backend/.env.example backend/.env

# Editar backend/.env si es necesario
# (Ya está preconfigurado con las credenciales de arriba)
```

### 3. Instalar y Ejecutar
```bash
# Instalar todo automáticamente
npm run setup

# Iniciar el proyecto
npm start
```

## 🌐 Acceder al Proyecto

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Prueba API**: http://localhost:5000/api/health

## 👤 Usuario de Prueba

- **Email**: admin@crocodilians.cl  
- **Password**: admin123

## 🛑 Para Detener

Presiona `Ctrl+C` en ambas terminales que se abrieron.

## 🔧 Comandos Útiles

```bash
npm start          # Iniciar frontend + backend
npm run backend    # Solo backend
npm run frontend   # Solo frontend
npm run db:studio  # Ver base de datos en navegador
```

## ❌ Solución de Problemas

### Error de conexión a PostgreSQL
1. Verifica que PostgreSQL esté ejecutándose
2. Revisa las credenciales en `backend/.env`
3. Asegúrate de que la base de datos `crocodilians` exista

### Puerto ya en uso
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac  
lsof -ti:5000 | xargs kill -9
```

### Reinstalar dependencias
```bash
# Limpiar y reinstalar
rm -rf node_modules backend/node_modules
npm run setup
```

---

**¿Tienes problemas?** Revisa que PostgreSQL esté instalado y ejecutándose. Todo lo demás es automático. 🚀