/**
 * Mock Data for the Agriculture Platform
 * 
 * This file centralizes all mock/placeholder data used across the platform.
 * When backend integration is ready, replace these with actual API calls
 * from the services/ directory.
 * 
 * Future integration points:
 * - Weather data → OpenWeather API via backend
 * - Farmer data → Supabase PostgreSQL
 * - Analytics → Backend aggregation endpoints
 * - AI insights → Google Gemini API
 */

// ─── Weather Data (Replace with OpenWeather API) ─────────────────────────
export const weatherData = {
  location: 'Dehradun, Uttarakhand',
  current: {
    temperature: 28,
    feelsLike: 31,
    humidity: 72,
    windSpeed: 12,
    windDirection: 'NW',
    rainfall: 2.4,
    condition: 'Partly Cloudy',
    uvIndex: 6,
    visibility: 8,
    pressure: 1012,
    icon: '⛅',
  },
  forecast: [
    { day: 'Today', high: 30, low: 22, condition: 'Partly Cloudy', icon: '⛅', rainChance: 40 },
    { day: 'Tomorrow', high: 32, low: 23, condition: 'Sunny', icon: '☀️', rainChance: 10 },
    { day: 'Wednesday', high: 29, low: 21, condition: 'Rain', icon: '🌧️', rainChance: 80 },
    { day: 'Thursday', high: 27, low: 20, condition: 'Thunderstorm', icon: '⛈️', rainChance: 90 },
    { day: 'Friday', high: 31, low: 22, condition: 'Sunny', icon: '☀️', rainChance: 15 },
  ],
  alerts: [
    {
      type: 'warning',
      title: 'Heavy Rainfall Expected',
      message: 'Heavy rainfall predicted for Wednesday-Thursday. Secure harvested crops and ensure proper drainage in fields.',
      timestamp: '2 hours ago',
    },
    {
      type: 'info',
      title: 'Optimal Planting Window',
      message: 'Soil moisture levels are ideal for planting wheat and mustard this week.',
      timestamp: '5 hours ago',
    },
  ],
};

// ─── Farmer Statistics (Replace with Supabase queries) ───────────────────
export const farmerStats = {
  totalFarmers: 1284,
  activeFarmers: 956,
  totalCooperatives: 42,
  totalDistricts: 8,
  totalCropsTracked: 3450,
  upcomingHarvests: 128,
  avgYieldIncrease: 23,
  alertsActive: 5,
};

// ─── Crop Data (Replace with backend API) ────────────────────────────────
export const cropData = [
  { name: 'Rice (Basmati)', area: '450 hectares', status: 'Growing', health: 'Good', progress: 72 },
  { name: 'Wheat', area: '380 hectares', status: 'Planted', health: 'Excellent', progress: 25 },
  { name: 'Sugarcane', area: '220 hectares', status: 'Growing', health: 'Fair', progress: 58 },
  { name: 'Soybean', area: '190 hectares', status: 'Harvesting', health: 'Good', progress: 95 },
  { name: 'Mustard', area: '160 hectares', status: 'Planning', health: 'N/A', progress: 5 },
];

// ─── Crops Catalog (Replace with backend API / Supabase) ─────────────────
// Richer per-crop records used on the Crops page (cards + details).
export const cropsCatalog = [
  {
    id: 'crop-rice-basmati',
    name: 'Rice (Basmati)',
    icon: '🌾',
    variety: 'Pusa Basmati 1509',
    district: 'Udham Singh Nagar',
    area: 450,
    areaUnit: 'hectares',
    status: 'Growing',
    health: 'Good',
    progress: 72,
    plantedDate: '2026-03-18',
    expectedHarvest: '2026-09-10',
    yieldEstimate: 3.8,
    yieldUnit: 'tonnes/hectare',
    season: 'Kharif',
    farmers: 312,
    notes: 'Healthy tillering observed; recommend nitrogen top-dressing before flowering stage.',
  },
  {
    id: 'crop-wheat',
    name: 'Wheat',
    icon: '🌿',
    variety: 'HD-3086',
    district: 'Haridwar',
    area: 380,
    areaUnit: 'hectares',
    status: 'Planted',
    health: 'Excellent',
    progress: 25,
    plantedDate: '2026-05-02',
    expectedHarvest: '2026-10-25',
    yieldEstimate: 4.5,
    yieldUnit: 'tonnes/hectare',
    season: 'Rabi',
    farmers: 248,
    notes: 'Germination rate above 90%. Soil moisture levels optimal for current growth stage.',
  },
  {
    id: 'crop-sugarcane',
    name: 'Sugarcane',
    icon: '🎋',
    variety: 'Co-0238',
    district: 'Dehradun',
    area: 220,
    areaUnit: 'hectares',
    status: 'Growing',
    health: 'Fair',
    progress: 58,
    plantedDate: '2026-02-12',
    expectedHarvest: '2027-01-15',
    yieldEstimate: 68,
    yieldUnit: 'tonnes/hectare',
    season: 'Annual',
    farmers: 96,
    notes: 'Minor red rot symptoms reported in 2 fields — recommend disease scouting this week.',
  },
  {
    id: 'crop-soybean',
    name: 'Soybean',
    icon: '🫘',
    variety: 'JS 95-60',
    district: 'Nainital',
    area: 190,
    areaUnit: 'hectares',
    status: 'Harvesting',
    health: 'Good',
    progress: 95,
    plantedDate: '2026-06-20',
    expectedHarvest: '2026-10-05',
    yieldEstimate: 2.1,
    yieldUnit: 'tonnes/hectare',
    season: 'Kharif',
    farmers: 154,
    notes: 'Harvesting underway across most plots. Dry weather window favorable for the next 5 days.',
  },
  {
    id: 'crop-mustard',
    name: 'Mustard',
    icon: '🌼',
    variety: 'Pusa Bold',
    district: 'Almora',
    area: 160,
    areaUnit: 'hectares',
    status: 'Planning',
    health: 'N/A',
    progress: 5,
    plantedDate: null,
    expectedHarvest: '2027-02-20',
    yieldEstimate: 1.6,
    yieldUnit: 'tonnes/hectare',
    season: 'Rabi',
    farmers: 88,
    notes: 'Seed procurement in progress. Sowing recommended in the next optimal planting window.',
  },
  {
    id: 'crop-potato',
    name: 'Potato',
    icon: '🥔',
    variety: 'Kufri Jyoti',
    district: 'Chamoli',
    area: 95,
    areaUnit: 'hectares',
    status: 'Growing',
    health: 'Excellent',
    progress: 64,
    plantedDate: '2026-04-05',
    expectedHarvest: '2026-08-15',
    yieldEstimate: 22,
    yieldUnit: 'tonnes/hectare',
    season: 'Zaid',
    farmers: 61,
    notes: 'Tuber bulking stage progressing well with adequate irrigation.',
  },
];

// ─── Analytics Data (Replace with backend aggregation) ───────────────────
export const analyticsData = {
  monthlyYield: [
    { month: 'Jan', yield: 120 },
    { month: 'Feb', yield: 95 },
    { month: 'Mar', yield: 180 },
    { month: 'Apr', yield: 210 },
    { month: 'May', yield: 290 },
    { month: 'Jun', yield: 340 },
  ],
  cropDistribution: [
    { crop: 'Rice', percentage: 35 },
    { crop: 'Wheat', percentage: 28 },
    { crop: 'Sugarcane', percentage: 18 },
    { crop: 'Soybean', percentage: 12 },
    { crop: 'Other', percentage: 7 },
  ],
};

// ─── Feature Cards Data ──────────────────────────────────────────────────
export const features = [
  {
    icon: '🌤️',
    title: 'Weather Intelligence',
    description: 'Real-time weather data, forecasts, and alerts tailored for your district. Plan farm activities with confidence using accurate predictions.',
  },
  {
    icon: '🌾',
    title: 'Crop Health Analysis',
    description: 'Upload crop images to detect diseases, nutrient deficiencies, and growth issues using AI-powered image analysis technology.',
  },
  {
    icon: '🤖',
    title: 'AI Farm Assistant',
    description: 'Get personalized agricultural guidance in Hindi and English. Ask questions about crops, pests, fertilizers, and best practices.',
  },
  {
    icon: '📅',
    title: 'Harvest Planning',
    description: 'Optimize harvest schedules based on weather patterns, crop maturity, and market conditions for maximum yield and profit.',
  },
  {
    icon: '🔬',
    title: 'Disease Detection',
    description: 'Early detection of crop diseases through advanced image recognition. Get treatment recommendations before problems spread.',
  },
  {
    icon: '📊',
    title: 'Farm Analytics',
    description: 'Track crop performance, yield trends, and regional reports. Make data-driven decisions to improve productivity season after season.',
  },
];

// ─── Districts in Uttarakhand ────────────────────────────────────────────
export const districts = [
  'Dehradun',
  'Haridwar',
  'Almora',
  'Chamoli',
  'Udham Singh Nagar',
  'Nainital',
  'Uttarkashi',
  'Pithoragarh',
];

// ─── Supported Languages ────────────────────────────────────────────────
export const languages = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
];

// ─── AI Assistant Mock Conversation (Replace with Google Gemini API) ─────
export const aiQuickPrompts = [
  { icon: '🌱', text: 'When should I plant wheat in Haridwar this season?' },
  { icon: '🐛', text: 'How do I treat red rot disease in sugarcane?' },
  { icon: '🌧️', text: 'Will the rain this week affect my rice harvest?' },
  { icon: '💰', text: 'What fertilizer schedule maximizes mustard yield?' },
];

export const aiExampleConversation = [
  {
    id: 'msg-1',
    role: 'user',
    text: 'My rice leaves are turning yellow at the tips. What could be causing this?',
    timestamp: '9:02 AM',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    text: 'Yellowing at the leaf tips in rice is often a sign of nitrogen deficiency, especially during the tillering stage. It can also indicate early leaf blight if you see brown spots forming. Based on Udham Singh Nagar district data, soil nitrogen levels have been below average this season.',
    timestamp: '9:02 AM',
  },
  {
    id: 'msg-3',
    role: 'user',
    text: 'How much urea should I apply per hectare?',
    timestamp: '9:03 AM',
  },
  {
    id: 'msg-4',
    role: 'assistant',
    text: 'For Basmati rice at the tillering stage, a top-dressing of 40-45 kg of urea per hectare is typically recommended, split into two applications a week apart. Apply after draining excess water from the field for better nutrient uptake.',
    timestamp: '9:03 AM',
  },
];

export const aiAssistantCapabilities = [
  { icon: '💬', label: 'Text Chat', desc: 'Ask farming questions in Hindi or English' },
  { icon: '🎙️', label: 'Voice Queries', desc: 'Speak your question instead of typing' },
  { icon: '📷', label: 'Image Analysis', desc: 'Upload crop photos for disease detection' },
  { icon: '📊', label: 'Data-Backed Answers', desc: 'Grounded in weather & district data' },
];

