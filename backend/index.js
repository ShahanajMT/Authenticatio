const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv')

const connectDB = require('./src/config/db');
const authRouter = require('./src/routes/authRouter');


const PORT = process.env.PORT || 3001;

const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use('/api/v1/auth', require('./src/routes/authRouter'));



app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at port ${PORT}`);
});