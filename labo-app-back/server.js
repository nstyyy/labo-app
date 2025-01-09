require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const materialRoutes = require('./routes/materialRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/material', materialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));