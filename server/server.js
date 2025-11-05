require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/vote', require('./routes/vote'));

app.use('/api/voter', require('./routes/voter'));
app.use('/api/election', require('./routes/election'));
app.use('/api/candidate', require('./routes/candidate'));
app.use('/api/result', require('./routes/result'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));