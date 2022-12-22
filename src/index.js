const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const db = require('./config/db');
const initWebRoute = require('./routes');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

db.connect();
initWebRoute(app);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to express</h1>")
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
