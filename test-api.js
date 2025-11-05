#!/usr/bin/env node

/**
 * Script de prueba rápida para verificar que la API funciona
 * Ejecutar con: node test-api.js
 */

const https = require('https');
const http = require('http');

const API_BASE = 'http://localhost:5000/api';

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function testAPI() {
  console.log('🧪 Probando API de Crocodilians...\n');

  try {
    // Test 1: Health check
    console.log('1️⃣ Probando health check...');
    const health = await makeRequest(`${API_BASE}/health`);
    if (health.status === 200) {
      console.log('✅ Health check: OK');
      console.log(`   Mensaje: ${health.data.message}`);
    } else {
      console.log('❌ Health check: FAILED');
      return;
    }

    // Test 2: Obtener productos
    console.log('\n2️⃣ Probando obtener productos...');
    const products = await makeRequest(`${API_BASE}/products`);
    if (products.status === 200) {
      console.log('✅ Productos: OK');
      console.log(`   Total productos: ${products.data.data?.length || 0}`);
    } else {
      console.log('❌ Productos: FAILED');
      console.log(`   Status: ${products.status}`);
    }

    // Test 3: Obtener categorías
    console.log('\n3️⃣ Probando obtener categorías...');
    const categories = await makeRequest(`${API_BASE}/categories`);
    if (categories.status === 200) {
      console.log('✅ Categorías: OK');
      console.log(`   Total categorías: ${categories.data.data?.length || 0}`);
    } else {
      console.log('❌ Categorías: FAILED');
      console.log(`   Status: ${categories.status}`);
    }

    // Test 4: Obtener banners
    console.log('\n4️⃣ Probando obtener banners...');
    const banners = await makeRequest(`${API_BASE}/banners`);
    if (banners.status === 200) {
      console.log('✅ Banners: OK');
      console.log(`   Total banners: ${banners.data.data?.length || 0}`);
    } else {
      console.log('❌ Banners: FAILED');
      console.log(`   Status: ${banners.status}`);
    }

    // Test 5: Intentar login con credenciales de prueba
    console.log('\n5️⃣ Probando login con credenciales de prueba...');
    const loginData = JSON.stringify({
      email: 'admin@crocodilians.cl',
      password: 'admin123'
    });

    const loginOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    };

    try {
      const login = await makeRequest(`${API_BASE}/auth/login`, loginOptions);
      if (login.status === 200) {
        console.log('✅ Login: OK');
        console.log(`   Usuario: ${login.data.data.user.email}`);
        console.log(`   Token generado: ${login.data.data.token ? 'Sí' : 'No'}`);
      } else {
        console.log('❌ Login: FAILED');
        console.log(`   Status: ${login.status}`);
        console.log(`   Error: ${login.data.error || 'Desconocido'}`);
      }
    } catch (error) {
      console.log('❌ Login: ERROR');
      console.log(`   Error: ${error.message}`);
    }

    console.log('\n🎉 Pruebas completadas!');
    console.log('\n💡 Próximos pasos:');
    console.log('   🌐 Abrir http://localhost:5173 en el navegador');
    console.log('   📚 Ver documentación: docs/api-endpoints.md');
    console.log('   🔧 Usar Postman para probar más endpoints');

  } catch (error) {
    console.log('\n❌ Error conectando a la API:');
    console.log(`   ${error.message}`);
    console.log('\n💡 Asegúrate de que:');
    console.log('   1. El backend esté ejecutándose en http://localhost:5000');
    console.log('   2. La base de datos esté configurada correctamente');
    console.log('   3. Hayas ejecutado las migraciones de Prisma');
  }
}

// Ejecutar pruebas
testAPI();