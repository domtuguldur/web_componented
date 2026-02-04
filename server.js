const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const moviesRouter = require('./routes/Movie');

const app= express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = 'mongodb://127.0.0.1:27017/cinema';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.use('/api/movies', moviesRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});