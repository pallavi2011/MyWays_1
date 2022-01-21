const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors')

connectDB();
app.use(cors());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});
app.use(express.json({ extended: false}));


app.get('/', (req, res) => res.send('Api Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/blog', require('./routes/api/blog'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));


