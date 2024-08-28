require('dotenv').config();
const app = require('./app');
const http = require('http');
const WebSocket = require('ws');
const sequelize = require('./config/dbConfig');

// Define the port
const PORT = process.env.PORT || 3000;

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Connect to MySQL with Sequelize and sync models
sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL with Sequelize');
        return sequelize.sync();  // Sync models with the database
    })
    .then(() => {
        // Start the server after successful DB connection
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Sequelize connection failed:', err);
    });
