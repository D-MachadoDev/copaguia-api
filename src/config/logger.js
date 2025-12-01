import winston, { error } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import { time } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { combine, timestamp, printf, colorize } = winston.format;

// Formato personalizado para los logs
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Configuración del logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        error({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ),
    transports: [
        // Archivo de logs generales 
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/app.log'),
            format: winston.format.json()
        }),
        // Archivo de logs de errores
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error',
            format: winston.format.json()
        })
    ]
});

// Si no estamos en producción, también loguear a la consola
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                consoleFormat
            )
        })
    );
}

export default logger;

            
    