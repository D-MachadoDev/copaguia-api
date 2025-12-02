import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/database.js";
import logger from "./config/logger.js";

const PORT = process.env.PORT || 4000;

async function startServer() {
    try { 

        await connectDB();

        app.listen(PORT, () => {
            logger.info(`Servidor ejecutándose en el puerto ${PORT}`);
            logger.info(`Entorno: ${process.env.NODE_ENV}`);
            logger.info(`API URL: http://localhost:${PORT}/api/v1`);
        });

    } catch (error) {
        logger.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }

    process.on('SIGINT', async () => {
    if (server) {
        server.close(() => {
        logger.info('Servidor cerrado');
        process.exit(0);
        });
    }
    });
}

startServer();