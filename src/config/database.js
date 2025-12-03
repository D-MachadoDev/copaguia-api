import mongoose from 'mongoose';
import logger from './logger.js';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    logger.info(`MongoDB conectado: ${conn.connection.host}`);
    logger.info(`Base de datos: ${conn.connection.name}`);

    // Eventos de conexión
    mongoose.connection.on('error', (err) => {
      logger.error('Error de conexión MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB desconectado');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconectado');
    });

    // Cerrar conexión al terminar proceso
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('Conexión MongoDB cerrada por terminación de app');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    logger.error('Error conectando a MongoDB:', error);
    throw error;
  }
}

export function getDB() {
  return mongoose.connection;
}