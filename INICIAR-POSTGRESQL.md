# 🗄️ CÓMO INICIAR POSTGRESQL EN WINDOWS

## 🚨 PROBLEMA DETECTADO
Tu PostgreSQL está instalado pero no está ejecutándose.

## ✅ SOLUCIÓN RÁPIDA

### Opción 1: Servicios de Windows (Recomendado)
1. **Presiona** `Windows + R`
2. **Escribe** `services.msc` y presiona Enter
3. **Busca** `postgresql-x64-18` en la lista
4. **Clic derecho** → "Iniciar"
5. **Clic derecho** → "Propiedades" → Cambiar a "Automático" para que inicie siempre

### Opción 2: Administrador de Tareas
1. **Ctrl + Shift + Esc** para abrir el Administrador de Tareas
2. **Pestaña "Servicios"**
3. **Buscar** `postgresql-x64-18`
4. **Clic derecho** → "Iniciar"

### Opción 3: Línea de Comandos (Como Administrador)
1. **Clic derecho** en el menú de Windows
2. **Seleccionar** "Terminal (Administrador)"
3. **Ejecutar**:
```cmd
net start postgresql-x64-18
```

## 🔍 VERIFICAR QUE FUNCIONA
```bash
# Verificar que el servicio esté ejecutándose
sc query postgresql-x64-18

# Debe mostrar: STATE : 4 RUNNING
```

## 🐊 DESPUÉS DE INICIAR POSTGRESQL

Una vez que PostgreSQL esté ejecutándose, regresa al proyecto y ejecuta:

```bash
# Crear la base de datos
npm run setup

# Iniciar el proyecto
npm start
```

## 💡 CONSEJOS
- PostgreSQL debe estar **ejecutándose siempre** antes de usar el proyecto
- Si cierras la computadora, PostgreSQL se detiene (a menos que lo configures como automático)
- Puedes verificar si está corriendo en el Administrador de Tareas → Servicios

---
**¿Sigues teniendo problemas?** PostgreSQL debe estar ejecutándose para que el proyecto funcione.