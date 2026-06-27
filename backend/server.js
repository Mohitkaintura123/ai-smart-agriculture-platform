/**
 * AI Smart Agriculture Platform — Backend Server
 * Week 4: Node.js + Express REST API (in-memory)
 *
 * Start dev server:  npm run dev   (nodemon)
 * Start prod server: npm start     (node)
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const cropsRouter = require('./routes/crops');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

// ─── App Setup ────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:5173', 'http://localhost:4173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Smart Agriculture Platform API is running.',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/crops', cropsRouter);

// ─── 404 Catch-All (unknown routes) ──────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Route not found. Available: GET/POST /api/crops, GET/PUT/DELETE /api/crops/:id, GET /api/crops/search?q=`,
  });
});

// ─── Centralized Error Handler ────────────────────────────────────────────────
// Must be LAST — 4-argument signature tells Express it's an error handler
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `✅ Backend server running on http://localhost:${PORT}`);
  console.log('\x1b[36m%s\x1b[0m', `   API health: http://localhost:${PORT}/api/health`);
  console.log('\x1b[36m%s\x1b[0m', `   Crops API:  http://localhost:${PORT}/api/crops`);
  console.log('\x1b[35m%s\x1b[0m', `   Accepting requests from: ${CLIENT_URL}`);
});

module.exports = app;
