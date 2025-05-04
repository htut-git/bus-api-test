import express from 'express';
import dotenv from 'dotenv';
import busRoutes from './routes/busRoutes.mjs';
import { sequelize } from './config/db.mjs';
import './models/index.mjs';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// API routes
app.use('/api/buses', busRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        app.listen(PORT, () => {
            console.log(`Server is running at: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
}
// Call the function
startServer();
