/**
 * Crops Controller
 * Handles all business logic for crop endpoints.
 * Uses in-memory data/crops.js array as the data source.
 */

const crops = require('../data/crops');
const { v4: uuidv4 } = require('uuid');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function notFound(id) {
  return Object.assign(new Error(`Crop with id '${id}' not found`), { status: 404 });
}

function badRequest(msg) {
  return Object.assign(new Error(msg), { status: 400 });
}

// ─── GET /api/crops ───────────────────────────────────────────────────────────
/**
 * Returns all crops.
 * Supports optional ?status= filter (case-insensitive).
 */
function getAllCrops(req, res) {
  const { status } = req.query;

  let result = [...crops];

  if (status) {
    result = result.filter(
      (c) => c.status.toLowerCase() === status.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
}

// ─── GET /api/crops/search?q= ─────────────────────────────────────────────────
/**
 * Full-text search across name, variety, district, season.
 * Must be registered BEFORE the :id route to avoid 'search' being parsed as an id.
 */
function searchCrops(req, res, next) {
  const q = (req.query.q || '').trim().toLowerCase();

  if (!q) {
    return next(badRequest('Query parameter "q" is required for search.'));
  }

  const results = crops.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.variety.toLowerCase().includes(q) ||
      c.district.toLowerCase().includes(q) ||
      (c.season && c.season.toLowerCase().includes(q))
  );

  res.status(200).json({
    success: true,
    count: results.length,
    query: q,
    data: results,
  });
}

// ─── GET /api/crops/:id ───────────────────────────────────────────────────────
function getCropById(req, res, next) {
  const crop = crops.find((c) => c.id === req.params.id);
  if (!crop) return next(notFound(req.params.id));

  res.status(200).json({
    success: true,
    data: crop,
  });
}

// ─── POST /api/crops ──────────────────────────────────────────────────────────
/**
 * Creates a new crop.
 * Required fields: name, variety, district, area, areaUnit, status, season.
 */
function createCrop(req, res, next) {
  const {
    name,
    variety,
    district,
    area,
    areaUnit,
    status,
    season,
    icon,
    health,
    progress,
    plantedDate,
    expectedHarvest,
    yieldEstimate,
    yieldUnit,
    farmers,
    notes,
  } = req.body;

  // Validation
  if (!name || !variety || !district || area == null || !areaUnit || !status || !season) {
    return next(
      badRequest(
        'Missing required fields: name, variety, district, area, areaUnit, status, season.'
      )
    );
  }

  if (typeof area !== 'number' || area <= 0) {
    return next(badRequest('"area" must be a positive number.'));
  }

  const validStatuses = ['Planning', 'Planted', 'Growing', 'Harvesting'];
  if (!validStatuses.includes(status)) {
    return next(
      badRequest(`"status" must be one of: ${validStatuses.join(', ')}.`)
    );
  }

  const id = `crop-${uuidv4()}`;

  const newCrop = {
    id,
    name,
    icon: icon || '🌱',
    variety,
    district,
    area,
    areaUnit,
    status,
    health: health || 'Good',
    progress: typeof progress === 'number' ? progress : 0,
    plantedDate: plantedDate || null,
    expectedHarvest: expectedHarvest || null,
    yieldEstimate: typeof yieldEstimate === 'number' ? yieldEstimate : null,
    yieldUnit: yieldUnit || 'tonnes/hectare',
    season,
    farmers: typeof farmers === 'number' ? farmers : 0,
    notes: notes || '',
  };

  crops.push(newCrop);

  res.status(201).json({
    success: true,
    message: 'Crop created successfully.',
    data: newCrop,
  });
}

// ─── PUT /api/crops/:id ───────────────────────────────────────────────────────
/**
 * Full / partial update of a crop.
 * Only provided fields are updated; all others are preserved.
 */
function updateCrop(req, res, next) {
  const index = crops.findIndex((c) => c.id === req.params.id);
  if (index === -1) return next(notFound(req.params.id));

  const updates = req.body;

  // Validate status if provided
  const validStatuses = ['Planning', 'Planted', 'Growing', 'Harvesting'];
  if (updates.status && !validStatuses.includes(updates.status)) {
    return next(
      badRequest(`"status" must be one of: ${validStatuses.join(', ')}.`)
    );
  }

  // Validate area if provided
  if (updates.area !== undefined && (typeof updates.area !== 'number' || updates.area <= 0)) {
    return next(badRequest('"area" must be a positive number.'));
  }

  // Prevent id overwrite
  delete updates.id;

  const updated = { ...crops[index], ...updates };
  crops[index] = updated;

  res.status(200).json({
    success: true,
    message: 'Crop updated successfully.',
    data: updated,
  });
}

// ─── DELETE /api/crops/:id ────────────────────────────────────────────────────
function deleteCrop(req, res, next) {
  const index = crops.findIndex((c) => c.id === req.params.id);
  if (index === -1) return next(notFound(req.params.id));

  crops.splice(index, 1);

  // 204 No Content — no body
  res.status(204).send();
}

module.exports = {
  getAllCrops,
  searchCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
};
