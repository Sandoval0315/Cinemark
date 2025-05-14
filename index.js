import 'dotenv/config';
import mongoose from 'mongoose'; // Importación faltante
import config from './src/config.js';
import app from './app.js';

async function main() {
    try {
        // Verificar conexión a DB
        await mongoose.connect(config.db.URI);
        console.log('MongoDB connected');

        // Iniciar servidor
        app.listen(config.server.port, () => {
            console.log(`Server running on http://localhost:${config.server.port}`);
        });

    } catch (error) {
        console.error('Server startup error:', error);
    }
}

main();