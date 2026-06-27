import { useEffect, useState } from 'react';
import { weatherData, farmerStats, analyticsData } from '../data/mockData';
import { Loader, Toast } from '../components/ui';
import { cropService } from '../services/api';

export default function Dashboard() {
  const [cropData, setCropData] = useState([]);
  const [cropsLoading, setCropsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // ── Fetch crop tracking data from backend ──────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function fetchCrops() {
      setCropsLoading(true);
      try {
        const data = await cropService.getCropsDashboard();
        if (!cancelled) setCropData(data);
      } catch (err) {
        if (!cancelled) {
          setToast({
            message: `Could not load crop data: ${err.message}`,
            type: 'error',
          });
          // Graceful fallback — show empty table, not a broken page
          setCropData([]);
        }
      } finally {
        if (!cancelled) setCropsLoading(false);
      }
    }

    fetchCrops();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="bg-surface min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Dashboard</h1>
              <p className="text-text-muted text-sm mt-1">Welcome back — here is your farm overview for today.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-xl">
                📍 {weatherData.location}
              </span>
              <span className="px-3 py-2 bg-surface dark:bg-surface-dark rounded-xl text-sm text-text-muted border border-gray-100 dark:border-white/10">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Weather Overview Cards */}
        <section className="mb-8" id="weather-overview">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <span>🌤️</span> Weather Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <WeatherCard icon="🌡️" label="Temperature" value={`${weatherData.current.temperature}°C`} sub={`Feels like ${weatherData.current.feelsLike}°C`} color="from-orange-500 to-red-500" />
            <WeatherCard icon="💧" label="Humidity" value={`${weatherData.current.humidity}%`} sub={weatherData.current.condition} color="from-blue-500 to-cyan-500" />
            <WeatherCard icon="💨" label="Wind Speed" value={`${weatherData.current.windSpeed} km/h`} sub={`Direction: ${weatherData.current.windDirection}`} color="from-teal-500 to-emerald-500" />
            <WeatherCard icon="🌧️" label="Rainfall" value={`${weatherData.current.rainfall} mm`} sub={`UV Index: ${weatherData.current.uvIndex}`} color="from-indigo-500 to-purple-500" />
          </div>
        </section>

        {/* Weather Alerts */}
        {weatherData.alerts.length > 0 && (
          <section className="mb-8" id="weather-alerts">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <span>⚠️</span> Active Alerts
            </h2>
            <div className="space-y-3">
              {weatherData.alerts.map((alert, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border ${alert.type === 'warning' ? 'bg-warning/5 border-warning/20' : 'bg-accent/5 border-accent/20'}`}>
                  <span className="text-xl mt-0.5">{alert.type === 'warning' ? '🔶' : 'ℹ️'}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-text-primary text-sm">{alert.title}</h3>
                      <span className="text-xs text-text-muted">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5-Day Forecast */}
        <section className="mb-8" id="forecast">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <span>📅</span> 5-Day Forecast
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {weatherData.forecast.map((day) => (
              <div key={day.day} className="bg-white dark:bg-card rounded-2xl p-4 border border-gray-100 dark:border-white/10 text-center hover:shadow-md hover:border-primary/20 transition-all duration-200">
                <p className="text-sm font-semibold text-text-primary mb-2">{day.day}</p>
                <span className="text-3xl block mb-2">{day.icon}</span>
                <p className="text-xs text-text-muted mb-1">{day.condition}</p>
                <p className="text-sm font-bold text-text-primary">{day.high}° / {day.low}°</p>
                <p className="text-xs text-accent mt-1">💧 {day.rainChance}%</p>
              </div>
            ))}
          </div>
        </section>

        {/* Farmer Statistics */}
        <section className="mb-8" id="farmer-stats">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <span>👨‍🌾</span> Farmer Statistics
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="👨‍🌾" label="Total Farmers" value={farmerStats.totalFarmers.toLocaleString()} trend="+12% this month" positive />
            <StatCard icon="🌱" label="Active Crops" value={farmerStats.totalCropsTracked.toLocaleString()} trend="+8% this season" positive />
            <StatCard icon="🏘️" label="Cooperatives" value={farmerStats.totalCooperatives} trend="2 new this quarter" positive />
            <StatCard icon="📈" label="Avg Yield Increase" value={`${farmerStats.avgYieldIncrease}%`} trend="vs last season" positive />
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Crop Tracking — now from backend */}
          <section id="crop-tracking">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <span>🌾</span> Crop Tracking
            </h2>
            <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
              {cropsLoading ? (
                <div className="py-10">
                  <Loader text="Loading crop data..." />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface dark:bg-surface-dark">
                        <th className="text-left py-3 px-4 font-semibold text-text-muted text-xs uppercase tracking-wider">Crop</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-muted text-xs uppercase tracking-wider">Area</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-muted text-xs uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-muted text-xs uppercase tracking-wider">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cropData.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-text-muted text-sm">
                            No crop data available.
                          </td>
                        </tr>
                      ) : (
                        cropData.map((crop) => (
                          <tr key={crop.name} className="border-t border-gray-50 dark:border-white/5 hover:bg-surface/50 dark:hover:bg-surface-dark/50 transition-colors">
                            <td className="py-3 px-4 font-medium text-text-primary">{crop.name}</td>
                            <td className="py-3 px-4 text-text-secondary">{crop.area}</td>
                            <td className="py-3 px-4">
                              <StatusBadge status={crop.status} />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all" style={{ width: `${crop.progress}%` }} />
                                </div>
                                <span className="text-xs font-medium text-text-muted w-8">{crop.progress}%</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Analytics Placeholder */}
          <section id="analytics-panel">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <span>📊</span> Yield Analytics
            </h2>
            <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 p-6">
              <p className="text-sm text-text-muted mb-4">Monthly yield performance (tonnes)</p>
              {/* Simple bar chart visualization */}
              <div className="flex items-end gap-3 h-48">
                {analyticsData.monthlyYield.map((item) => {
                  const maxYield = Math.max(...analyticsData.monthlyYield.map((m) => m.yield));
                  const heightPercent = (item.yield / maxYield) * 100;
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-semibold text-text-primary">{item.yield}</span>
                      <div className="w-full bg-surface rounded-t-lg relative overflow-hidden" style={{ height: `${heightPercent}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary-light rounded-t-lg hover:from-primary-dark hover:to-primary transition-all duration-200 cursor-pointer" />
                      </div>
                      <span className="text-xs text-text-muted">{item.month}</span>
                    </div>
                  );
                })}
              </div>

              {/* Crop Distribution */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
                <p className="text-sm text-text-muted mb-3">Crop Distribution</p>
                <div className="space-y-3">
                  {analyticsData.cropDistribution.map((item) => (
                    <div key={item.crop} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-text-primary w-20">{item.crop}</span>
                      <div className="flex-1 h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary/80 to-primary-light rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-text-muted w-10 text-right">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Quick Actions */}
        <section className="mt-8" id="quick-actions">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📸', label: 'Analyze Crop Image', desc: 'Upload a photo for AI analysis', color: 'from-purple-500/10 to-pink-500/10' },
              { icon: '🗣️', label: 'Voice Assistant', desc: 'Ask a farming question', color: 'from-orange-500/10 to-amber-500/10' },
              { icon: '📅', label: 'Plan Harvest', desc: 'Schedule upcoming harvests', color: 'from-blue-500/10 to-cyan-500/10' },
              { icon: '👥', label: 'Manage Farmers', desc: 'View registered farmers', color: 'from-green-500/10 to-emerald-500/10' },
            ].map((action) => (
              <button
                key={action.label}
                className={`bg-gradient-to-br ${action.color} p-5 rounded-2xl border border-gray-100 dark:border-white/10 hover:shadow-md hover:border-primary/20 transition-all duration-200 hover:-translate-y-0.5 text-left group`}
              >
                <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform inline-block">{action.icon}</span>
                <h3 className="font-semibold text-text-primary text-sm mb-1">{action.label}</h3>
                <p className="text-xs text-text-muted">{action.desc}</p>
              </button>
            ))}
          </div>
        </section>
      </div>

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

function WeatherCard({ icon, label, value, sub, color }) {
  return (
    <div className="bg-white dark:bg-card rounded-2xl p-5 border border-gray-100 dark:border-white/10 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} opacity-20 group-hover:opacity-40 transition-opacity`} />
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
      <p className="text-xs text-text-secondary mt-0.5">{sub}</p>
    </div>
  );
}

function StatCard({ icon, label, value, trend, positive }) {
  return (
    <div className="bg-white dark:bg-card rounded-2xl p-5 border border-gray-100 dark:border-white/10 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${positive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
          {trend}
        </span>
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Growing: 'bg-primary/10 text-primary',
    Planted: 'bg-accent/10 text-accent',
    Harvesting: 'bg-warning/10 text-warning',
    Planning: 'bg-secondary/10 text-secondary-dark',
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 dark:bg-white/10 text-text-muted'}`}>
      {status}
    </span>
  );
}
