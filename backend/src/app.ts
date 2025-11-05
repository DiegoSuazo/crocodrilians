import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import routes from './routes';
import { errorHandler, notFound } from './middlewares/error.middleware';

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Demasiadas solicitudes desde esta IP, por favor intente más tarde',
});
app.use('/api', limiter);

// Middlewares de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rutas
app.use('/api', routes);

// Ruta raíz
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Crocodilians API',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

export default app;