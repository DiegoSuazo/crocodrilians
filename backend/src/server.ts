import app from './app';
import { config } from './config';
import prisma from './config/database';

const PORT = config.port;

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║           🐊 CROCODILIANS API SERVER 🐊                  ║
║                                                           ║
║   Servidor corriendo en: http://localhost:${PORT}        ║
║   Entorno: ${config.nodeEnv}                             ║
║   Documentación: http://localhost:${PORT}/api/health     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ UNHANDLED REJECTION! Cerrando servidor...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err: Error) => {
  console.error('❌ UNCAUGHT EXCEPTION! Cerrando servidor...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Manejo de señales de terminación
process.on('SIGTERM', async () => {
  console.log('👋 SIGTERM recibido. Cerrando servidor gracefully...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('👋 SIGINT recibido. Cerrando servidor gracefully...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});