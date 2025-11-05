# 🐊 CROCODILIANS - E-COMMERCE SIMPLIFICADO

Un e-commerce moderno para cartas coleccionables desarrollado con **React + TypeScript + PostgreSQL**.

## 🚀 INSTALACIÓN RÁPIDA (2 comandos)

```bash
# 1. Configurar todo automáticamente
npm run setup

# 2. Iniciar el proyecto
npm start
```

¡Ya está! Ve a http://localhost:5173

## 📋 Requisitos Previos

- **Node.js** (versión 16+)
- **PostgreSQL** instalado y ejecutándose

### Instalar PostgreSQL:
- **Windows**: [Descargar aquí](https://www.postgresql.org/download/windows/)
- **Mac**: `brew install postgresql` 
- **Ubuntu**: `sudo apt install postgresql postgresql-contrib`

## 🎯 Configuración Manual (si prefieres paso a paso)

1. **Crear base de datos:**
```sql
CREATE DATABASE crocodilians;
CREATE USER croc_user WITH PASSWORD 'croc_pass';
GRANT ALL PRIVILEGES ON DATABASE crocodilians TO croc_user;
```

2. **Configurar variables:**
```bash
cp backend/.env.example backend/.env
# (Ya está preconfigurado)
```

3. **Instalar y ejecutar:**
```bash
npm run setup  # Instala todo
npm start      # Inicia frontend + backend
```

## 🌐 URLs Disponibles

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000  
- **API Test**: http://localhost:5000/api/health
- **Base de Datos**: `npm run db:studio`

## 👤 Credenciales de Prueba

- **Email**: admin@crocodilians.cl
- **Password**: admin123

## 🛠️ Comandos Útiles

```bash
npm start         # Iniciar todo (frontend + backend)
npm run backend   # Solo backend
npm run frontend  # Solo frontend
npm run db:studio # Ver base de datos
node test-api.js  # Probar API
```

## 🔧 Solución de Problemas

**Error de PostgreSQL:**
1. Verifica que PostgreSQL esté corriendo
2. Revisa credenciales en `backend/.env`
3. Asegúrate que la BD `crocodilians` existe

**Puerto ocupado:**
```bash
# Windows: netstat -ano | findstr :5000
# Linux/Mac: lsof -ti:5000 | xargs kill -9
```

## 🏗️ Tecnologías

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Prisma
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT + bcrypt

## 📁 Estructura

```
crocodilians/
├── src/           # React frontend
├── backend/       # API Express
├── public/        # Assets
├── setup.js       # Script instalación
└── INSTALACION-SIMPLE.md  # Guía detallada
```

---

**¿Problemas?** Lee [`INSTALACION-SIMPLE.md`](INSTALACION-SIMPLE.md) para guía paso a paso detallada.
