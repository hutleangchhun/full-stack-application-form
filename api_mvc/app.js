import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoute.js'

dotenv.config(); 

const app = express();
const port = process.env.PORT || 8080; 

// Enable CORS for specific origins and HTTP methods
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend React app (adjust as necessary)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods like GET, POST, PUT, DELETE
    allowedHeaders: ['Content-Type', 'Authorization'], // You can adjust headers as per your needs
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the user routes for handling all user-related requests
app.use('/api', userRoutes); // Prefix all user routes with `/api`
app.use('/api/message', messageRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api`);
});
