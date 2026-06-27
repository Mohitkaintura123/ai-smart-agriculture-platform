import { useEffect, useMemo, useState } from 'react';
import { Button, Input, Modal, Loader, Toast } from '../components/ui';
import { cropService } from '../services/api';

const STATUS_STYLES = {
  Growing: 'bg-primary/10 text-primary',
  Planted: 'bg-accent/10 text-accent',
  Harvesting: 'bg-warning/10 text-warning',
  Planning: 'bg-secondary/10 text-secondary-dark',
};

const HEALTH_STYLES = {
  Excellent: 'bg-success/10 text-success',
  Good: 'bg-primary/10 text-primary',
  Fair: 'bg-warning/10 text-warning',
  Poor: 'bg-danger/10 text-danger',
  'N/A': 'bg-gray-100 dark:bg-white/5 text-text-muted',
};

const STATUS_FILTERS = ['All', 'Planning', 'Planted', 'Growing', 'Harvesting'];

export default function Crops() {
  const [cropsCatalog, setCropsCatalog] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // ── Fetch crops from backend on mount ──────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function fetchCrops() {
      setIsLoading(true);
      try {
        const data = await cropService.getCropsCatalog();
        if (!cancelled) setCropsCatalog(data);
      } catch (err) {
        if (!cancelled) {
          setToast({
            message: `Failed to load crops: ${err.message}`,
            type: 'error',
          });
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchCrops();
    return () => { cancelled = true; };
  }, []);

  // ── Client-side filter (no extra API call needed for status/search) ─────────
  const filteredCrops = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return cropsCatalog.filter((crop) => {
      const matchesStatus = statusFilter === 'All' || crop.status === statusFilter;
      const matchesSearch =
        !term ||
        crop.name.toLowerCase().includes(term) ||
        crop.variety.toLowerCase().includes(term) ||
        crop.district.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, statusFilter, cropsCatalog]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className="bg-surface min-h-screen">
      {/* Page Header */}
      <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Crops</h1>
              <p className="text-text-muted text-sm mt-1">
                Track area, status, growth progress, and yield estimates across all tracked crops.
              </p>
            </div>
            <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-xl whitespace-nowrap">
              🌾 {cropsCatalog.length} Crops Tracked
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by crop name, variety, or district..."
              value={searchTerm}
              onChange={handleSearchChange}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              }
            />
          </div>
          <div className="flex flex-wrap gap-2" id="crop-status-filters">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  statusFilter === status
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white dark:bg-card text-text-secondary border-gray-200 dark:border-white/10 hover:border-primary/30'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Crop Cards Grid */}
        {isLoading ? (
          <Loader text="Fetching crops from server..." />
        ) : filteredCrops.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10">
            <span className="text-4xl block mb-3">🔍</span>
            <p className="text-text-secondary font-medium">No crops match your search.</p>
            <p className="text-text-muted text-sm mt-1">Try a different keyword or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop) => (
              <CropCard key={crop.id} crop={crop} onViewDetails={() => setSelectedCrop(crop)} />
            ))}
          </div>
        )}
      </div>

      {/* Crop Details Modal */}
      <Modal
        isOpen={!!selectedCrop}
        onClose={() => setSelectedCrop(null)}
        title={selectedCrop ? `${selectedCrop.icon}  ${selectedCrop.name}` : ''}
        size="lg"
        footer={<Button text="Close" variant="outline" onClick={() => setSelectedCrop(null)} />}
      >
        {selectedCrop && <CropDetails crop={selectedCrop} />}
      </Modal>

      {/* Toast for API errors */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={!!toast}
          onClose={() => setToast(null)}
          duration={5000}
        />
      )}
    </main>
  );
}

/* ── Sub-components ─────────────────────────────────────────────── */

function CropCard({ crop, onViewDetails }) {
  return (
    <article
      className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      id={`crop-card-${crop.id}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center text-2xl shrink-0">
            {crop.icon}
          </div>
          <div>
            <h3 className="font-bold text-text-primary leading-tight">{crop.name}</h3>
            <p className="text-xs text-text-muted mt-0.5">{crop.variety}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${STATUS_STYLES[crop.status] || 'bg-gray-100 text-text-muted'}`}>
          {crop.status}
        </span>
      </div>

      {/* Area / District / Yield */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-surface dark:bg-surface-dark rounded-xl py-2.5 px-1">
          <p className="text-sm font-bold text-text-primary">{crop.area}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mt-0.5">{crop.areaUnit.split('/')[0] || 'hectares'}</p>
        </div>
        <div className="bg-surface dark:bg-surface-dark rounded-xl py-2.5 px-1">
          <p className="text-sm font-bold text-text-primary">{crop.yieldEstimate}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mt-0.5">{crop.yieldUnit.replace('tonnes/hectare', 't/ha')}</p>
        </div>
        <div className="bg-surface dark:bg-surface-dark rounded-xl py-2.5 px-1">
          <span className={`inline-block px-1.5 py-0.5 rounded-md text-[11px] font-semibold ${HEALTH_STYLES[crop.health] || HEALTH_STYLES['N/A']}`}>
            {crop.health}
          </span>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mt-1">Health</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-text-secondary">Growth Progress</span>
          <span className="text-xs font-bold text-text-primary">{crop.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all"
            style={{ width: `${crop.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between text-xs text-text-muted pt-3 border-t border-gray-50 dark:border-white/5">
        <span>📍 {crop.district}</span>
        <button
          onClick={onViewDetails}
          className="text-primary font-semibold hover:text-primary-dark transition-colors"
          id={`crop-details-button-${crop.id}`}
        >
          View Details →
        </button>
      </div>
    </article>
  );
}

function CropDetails({ crop }) {
  const detailRows = [
    { label: 'Season', value: crop.season },
    { label: 'District', value: crop.district },
    { label: 'Area Tracked', value: `${crop.area} ${crop.areaUnit}` },
    { label: 'Estimated Yield', value: `${crop.yieldEstimate} ${crop.yieldUnit}` },
    { label: 'Farmers Involved', value: crop.farmers },
    { label: 'Planted Date', value: crop.plantedDate || 'Not yet planted' },
    { label: 'Expected Harvest', value: crop.expectedHarvest },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {detailRows.map((row) => (
          <div key={row.label} className="bg-surface dark:bg-surface-dark rounded-xl p-3">
            <p className="text-[11px] text-text-muted uppercase tracking-wide">{row.label}</p>
            <p className="text-sm font-semibold text-text-primary mt-0.5">{row.value}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-text-secondary">Growth Progress</span>
          <span className="text-sm font-bold text-text-primary">{crop.progress}%</span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all"
            style={{ width: `${crop.progress}%` }}
          />
        </div>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
        <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1.5">Field Notes</p>
        <p className="text-sm text-text-secondary leading-relaxed">{crop.notes}</p>
      </div>
    </div>
  );
}
