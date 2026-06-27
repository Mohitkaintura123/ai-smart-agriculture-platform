/**
 * Crops Router
 * Mounts all /api/crops endpoints.
 *
 * IMPORTANT: /search must be declared before /:id so Express doesn't
 * treat the literal string "search" as a dynamic :id value.
 */

const express = require('express');
const router = express.Router();
const {
  getAllCrops,
  searchCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
} = require('../controllers/cropsController');

// GET /api/crops/search?q=<term>
router.get('/search', searchCrops);

// GET /api/crops
router.get('/', getAllCrops);

// GET /api/crops/:id
router.get('/:id', getCropById);

// POST /api/crops
router.post('/', createCrop);

// PUT /api/crops/:id
router.put('/:id', updateCrop);

// DELETE /api/crops/:id
router.delete('/:id', deleteCrop);

module.exports = router;
