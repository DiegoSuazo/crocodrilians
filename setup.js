#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🐊 CROCODILIANS - CONFIGURACIÓN SIMPLE 🐊');
console.log('========================================\n');

function run(command, description) {
  try {
    console.log(`📦 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completado\n`);
  } catch (error) {
    console.error(`❌ Error en ${description}:`, error.message);
    process.exit(1);
  }
}

function checkPostgreSQL() {
  console.log('🗄️ Verificando PostgreSQL...');
  
  try {
    execSync('psql --version', { stdio: 'pipe' });
    console.log('✅ PostgreSQL está instalado y en PATH\n');
    return true;
  } catch (error) {
    console.log('⚠️ PostgreSQL no detectado en PATH (esto es normal en Windows)');
    console.log('✅ Continuando con la instalación...\n');
    console.log('💡 Si tienes problemas con la base de datos:');
    console.log('   1. Asegúrate de que PostgreSQL esté ejecutándose');
    console.log('   2. Verifica que la base de datos "crocodilians" exista');
    console.log('   3. Revisa las credenciales en backend/.env\n');
    return true; // Continuar de todas formas
  }
}

function createDatabase() {
  console.log('🗄️ Configurando base de datos...');
  
  const dbExists = fs.existsSync(path.join(__dirname, 'backend', '.env'));
  if (!dbExists) {
    console.log('❌ No se encontró el archivo backend/.env');
    console.log('   Por favor, copia backend/.env.example a backend/.env');
    console.log('   Y configura la DATABASE_URL con tus credenciales de PostgreSQL');
    process.exit(1);
  }
  
  console.log('✅ Archivo .env encontrado\n');
}

function installDependencies() {
  // Instalar dependencias del backend
  console.log('📦 Instalando dependencias del backend...');
  process.chdir('backend');
  run('npm install', 'Instalación de backend');
  
  // Volver a la raíz
  process.chdir('..');
  
  // Instalar dependencias del frontend
  run('npm install', 'Instalación de frontend');
}

function setupPrisma() {
  console.log('🔧 Configurando Prisma...');
  process.chdir('backend');
  
  try {
    // Generar cliente de Prisma
    run('npm run prisma:generate', 'Generación de cliente Prisma');
    
    // Ejecutar migraciones
    run('npm run prisma:migrate', 'Migraciones de base de datos');
    
    // Poblar con datos de ejemplo
    console.log('🌱 Poblando base de datos con datos de ejemplo...');
    try {
      run('npm run prisma:seed', 'Poblar base de datos');
    } catch (error) {
      console.log('⚠️ No se pudo poblar la base de datos (esto es opcional)');
    }
    
  } catch (error) {
    console.error('❌ Error configurando Prisma:', error.message);
    console.log('\n💡 Asegúrate de que:');
    console.log('   1. PostgreSQL esté ejecutándose');
    console.log('   2. Las credenciales en backend/.env sean correctas');
    console.log('   3. La base de datos "crocodilians" exista');
    process.exit(1);
  }
  
  process.chdir('..');
}

function showSuccess() {
  console.log('🎉 INSTALACIÓN COMPLETADA EXITOSAMENTE!');
  console.log('=====================================\n');
  console.log('🚀 Para iniciar el proyecto, ejecuta:');
  console.log('   npm start\n');
  console.log('🌐 URLs disponibles:');
  console.log('   Frontend: http://localhost:5173');
  console.log('   Backend:  http://localhost:5000');
  console.log('   API Docs: http://localhost:5000/api/health\n');
  console.log('👤 Credenciales de prueba:');
  console.log('   Email: admin@crocodilians.cl');
  console.log('   Password: admin123\n');
  console.log('💡 Para detener: Ctrl+C en ambas terminales');
}

// Ejecutar configuración
async function main() {
  try {
    // Verificar PostgreSQL
    if (!checkPostgreSQL()) {
      process.exit(1);
    }
    
    // Verificar configuración de DB
    createDatabase();
    
    // Instalar dependencias
    installDependencies();
    
    // Configurar Prisma
    setupPrisma();
    
    // Mostrar mensaje de éxito
    showSuccess();
    
  } catch (error) {
    console.error('❌ Error durante la configuración:', error.message);
    process.exit(1);
  }
}

main();