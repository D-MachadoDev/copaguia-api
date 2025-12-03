import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import logger from './config/logger.js';
import AppError from './shared/errors/AppError.js';

const app = express();

// ════════════════════════════════════════════════════════════════
// MIDDLEWARES DE SEGURIDAD
// ════════════════════════════════════════════════════════════════

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//! POSIBILIDAD DE IMPLEMENTAR REDIS
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Demasiadas solicitudes, intenta más tarde',
  standardHeaders: true, 
  legacyHeaders: false,
});

app.use('/api', generalLimiter);

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,  
  message: 'Demasiados intentos de login'
});

// app.post('/api/auth/login', strictLimiter, loginController); 

// ════════════════════════════════════════════════════════════════
// MIDDLEWARES DE PARSING
// ════════════════════════════════════════════════════════════════

app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// app.use(mongoSanitize()); //! PENDIENTE (seguridad), SOLO FUNCION EN EXPRESS 4.x.x.x 

app.use(compression());

// ════════════════════════════════════════════════════════════════
// LOGGING
// ════════════════════════════════════════════════════════════════

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

// ════════════════════════════════════════════════════════════════
// RUTAS
// ════════════════════════════════════════════════════════════════

// Ruta raíz (home)
app.get('/', (req, res) => {
  res.json({
    message: 'CopaGuia API',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      health: '/api/v1/health',
      docs: '/api/v1/docs',
    },
  });
});

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// ════════════════════════════════════════════════════════════════
// MANEJO DE ERRORES
// ════════════════════════════════════════════════════════════════

// 1. Ruta no encontrada (404)
app.use((req, res, next) => {
  next(new AppError(`Ruta no encontrada: ${req.originalUrl}`, 404));
});

// 2. Manejador global de errores
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500 ;
  err.status = err.status || 'error';

  // Desarrollo: Mostrar stack trace
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    // Producción: Ocultar detalles internos
    
    // Error operacional (esperado)
    if (err.isOperational) {
      res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
      });
    } else {
      // Error de programación (bug)
      logger.error('BUG:', err);
      
      res.status(500).json({
        success: false,
        status: 'error',
        message: 'Algo salió mal',
      });
    }
  }
});

export default app;
