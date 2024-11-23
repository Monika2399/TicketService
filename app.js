// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ticketRoutes = require('./routes/ticket.js');
const connectDB = require('./dbConfig.js');


const app = express();
app.use(cors());
app.use(express.json());


// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use the authentication routes
app.use('/ticket', ticketRoutes);

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

module.exports = app; // Export the app for testing


