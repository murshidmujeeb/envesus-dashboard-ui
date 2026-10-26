// ═══ CONFIG ═══
const CARTO_API_KEY = 'cb1_4uvs_1_f0e4596920d16f3e3e84916b'; // <-- Paste your CARTO API Key here

// ═══ DATA ═══
const BINS = [
  { id: 'CB-001', name: 'Beach Promenade #1', zone: 'Beach — Main Front Footpath', lat: 11.250885, lng: 75.7714416, fill: 37, type: 'Plastic', temp: 29, odor: 22, bat: 83, time: '2h ago', cam: 'CAM-01' },
  { id: 'CB-002', name: 'Beach Promenade #2', zone: 'Beach — Main Front Footpath', lat: 11.25126, lng: 75.771228, fill: 54, type: 'Mixed', temp: 30, odor: 29, bat: 96, time: '3h ago', cam: 'CAM-02' },
  { id: 'CB-003', name: 'Beach Promenade #3', zone: 'Beach — Main Front Footpath', lat: 11.251116, lng: 75.771277, fill: 74, type: 'Dry', temp: 32, odor: 48, bat: 81, time: '4h ago', cam: 'CAM-03' },
  { id: 'CB-004', name: 'Beach Promenade #4', zone: 'Beach — Main Front Footpath', lat: 11.25093, lng: 75.771349, fill: 48, type: 'Plastic', temp: 28, odor: 18, bat: 94, time: '5h ago', cam: 'CAM-04' },
  { id: 'CB-005', name: 'Beach Promenade #5', zone: 'Beach — Main Front Footpath', lat: 11.251356, lng: 75.7712031, fill: 25, type: 'Plastic', temp: 29, odor: 25, bat: 79, time: '6h ago', cam: 'CAM-05' },
  { id: 'CB-006', name: 'Beach Promenade #6', zone: 'Beach — Main Front Footpath', lat: 11.251782, lng: 75.7710573, fill: 42, type: 'Mixed', temp: 30, odor: 32, bat: 92, time: '45m ago', cam: 'CAM-06' },
  { id: 'CB-007', name: 'Beach Promenade #7', zone: 'Beach — Main Front Footpath', lat: 11.252208, lng: 75.7709114, fill: 59, type: 'Dry', temp: 31, odor: 39, bat: 77, time: '2h ago', cam: 'CAM-07' },
  { id: 'CB-008', name: 'Beach Promenade #8', zone: 'Beach — Main Front Footpath', lat: 11.252634, lng: 75.7707655, fill: 95, type: 'Plastic', temp: 37, odor: 83, bat: 90, time: '3h ago', cam: 'CAM-08' },
  { id: 'CB-009', name: 'Beach Promenade #9', zone: 'Beach — Main Front Footpath', lat: 11.253060, lng: 75.7706197, fill: 53, type: 'Plastic', temp: 29, odor: 28, bat: 75, time: '4h ago', cam: 'CAM-09' },
  { id: 'CB-010', name: 'Beach Promenade #10', zone: 'Beach — Main Front Footpath', lat: 11.253486, lng: 75.7704738, fill: 30, type: 'Mixed', temp: 30, odor: 35, bat: 88, time: '5h ago', cam: 'CAM-10' },
  { id: 'CB-011', name: 'Beach Promenade #11', zone: 'Beach — Main Front Footpath', lat: 11.253912, lng: 75.770328, fill: 68, type: 'Dry', temp: 34, odor: 56, bat: 73, time: '6h ago', cam: 'CAM-11' },
  { id: 'CB-012', name: 'Beach Promenade #12', zone: 'Beach — Main Front Footpath', lat: 11.254338, lng: 75.7701821, fill: 24, type: 'Plastic', temp: 28, odor: 24, bat: 86, time: '45m ago', cam: 'CAM-12' },
  { id: 'CB-013', name: 'Private Bus Stand #1', zone: 'Private Bus Stand', lat: 11.2584107, lng: 75.7868887, fill: 41, type: 'Mixed', temp: 29, odor: 31, bat: 71, time: '2h ago', cam: 'CAM-13' },
  { id: 'CB-014', name: 'Private Bus Stand #2', zone: 'Private Bus Stand', lat: 11.2584826, lng: 75.7870353, fill: 88, type: 'Dry', temp: 37, odor: 89, bat: 84, time: '3h ago', cam: 'CAM-14' },
  { id: 'CB-015', name: 'Private Bus Stand #3', zone: 'Private Bus Stand', lat: 11.2585634, lng: 75.7869162, fill: 35, type: 'Organic', temp: 31, odor: 20, bat: 97, time: '4h ago', cam: 'CAM-15' },
  { id: 'CB-016', name: 'Private Bus Stand #4', zone: 'Private Bus Stand', lat: 11.2586353, lng: 75.7870261, fill: 52, type: 'Mixed', temp: 28, odor: 27, bat: 82, time: '5h ago', cam: 'CAM-16' },
  { id: 'CB-017', name: 'Private Bus Stand #5', zone: 'Private Bus Stand', lat: 11.2589522, lng: 75.7874917, fill: 29, type: 'Mixed', temp: 29, odor: 34, bat: 95, time: '6h ago', cam: 'CAM-17' },
  { id: 'CB-018', name: 'Private Bus Stand #6', zone: 'Private Bus Stand', lat: 11.2590241, lng: 75.7876383, fill: 46, type: 'Dry', temp: 30, odor: 16, bat: 80, time: '45m ago', cam: 'CAM-18' },
  { id: 'CB-019', name: 'Private Bus Stand #7', zone: 'Private Bus Stand', lat: 11.2591049, lng: 75.7875192, fill: 76, type: 'Organic', temp: 33, odor: 49, bat: 93, time: '2h ago', cam: 'CAM-19' },
  { id: 'CB-020', name: 'Private Bus Stand #8', zone: 'Private Bus Stand', lat: 11.2591768, lng: 75.7876291, fill: 40, type: 'Mixed', temp: 28, odor: 30, bat: 78, time: '3h ago', cam: 'CAM-20' },
  { id: 'CB-021', name: 'Private Bus Stand #9', zone: 'Private Bus Stand', lat: 11.2582392, lng: 75.7863767, fill: 57, type: 'Mixed', temp: 29, odor: 37, bat: 91, time: '4h ago', cam: 'CAM-20' },
  { id: 'CB-022', name: 'Private Bus Stand #10', zone: 'Private Bus Stand', lat: 11.2583111, lng: 75.7865233, fill: 34, type: 'Dry', temp: 30, odor: 19, bat: 76, time: '5h ago', cam: 'CAM-20' },
  { id: 'CB-023', name: 'Private Bus Stand #11', zone: 'Private Bus Stand', lat: 11.2583919, lng: 75.7864042, fill: 51, type: 'Organic', temp: 31, odor: 26, bat: 89, time: '6h ago', cam: 'CAM-20' },
  { id: 'CB-024', name: 'Private Bus Stand #12', zone: 'Private Bus Stand', lat: 11.2584638, lng: 75.7865141, fill: 28, type: 'Mixed', temp: 28, odor: 33, bat: 74, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-025', name: 'Starbucks Beach Walk #1', zone: 'Beach — Back of Starbucks', lat: 11.2485781, lng: 75.7723073, fill: 45, type: 'Dry', temp: 29, odor: 15, bat: 87, time: '2h ago', cam: 'CAM-20' },
  { id: 'CB-026', name: 'Starbucks Beach Walk #2', zone: 'Beach — Back of Starbucks', lat: 11.2490561, lng: 75.7721262, fill: 22, type: 'Plastic', temp: 30, odor: 22, bat: 72, time: '3h ago', cam: 'CAM-20' },
  { id: 'CB-027', name: 'Starbucks Beach Walk #3', zone: 'Beach — Back of Starbucks', lat: 11.249534, lng: 75.7719452, fill: 82, type: 'Mixed', temp: 35, odor: 87, bat: 85, time: '4h ago', cam: 'CAM-20' },
  { id: 'CB-028', name: 'Starbucks Beach Walk #4', zone: 'Beach — Back of Starbucks', lat: 11.250012, lng: 75.7717641, fill: 56, type: 'Dry', temp: 28, odor: 36, bat: 70, time: '5h ago', cam: 'CAM-20' },
  { id: 'CB-029', name: 'Starbucks Beach Walk #5', zone: 'Beach — Back of Starbucks', lat: 11.250393, lng: 75.7716792, fill: 33, type: 'Dry', temp: 29, odor: 18, bat: 83, time: '6h ago', cam: 'CAM-20' },
  { id: 'CB-030', name: 'Starbucks Beach Walk #6', zone: 'Beach — Back of Starbucks', lat: 11.250296, lng: 75.7717754, fill: 62, type: 'Plastic', temp: 32, odor: 45, bat: 96, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-031', name: 'Starbucks Beach Walk #7', zone: 'Beach — Back of Starbucks', lat: 11.250199, lng: 75.7718717, fill: 27, type: 'Mixed', temp: 31, odor: 32, bat: 81, time: '2h ago', cam: 'CAM-20' },
  { id: 'CB-032', name: 'Starbucks Beach Walk #8', zone: 'Beach — Back of Starbucks', lat: 11.250102, lng: 75.7719679, fill: 44, type: 'Dry', temp: 28, odor: 39, bat: 94, time: '3h ago', cam: 'CAM-20' },
  { id: 'CB-033', name: 'Beach Food Kiosk #1', zone: 'Beach — Food Kiosk Area', lat: 11.2583946, lng: 75.7691647, fill: 21, type: 'Organic', temp: 29, odor: 21, bat: 79, time: '4h ago', cam: 'CAM-20' },
  { id: 'CB-034', name: 'Beach Food Kiosk #2', zone: 'Beach — Food Kiosk Area', lat: 11.2582109, lng: 75.7692478, fill: 38, type: 'Mixed', temp: 30, odor: 28, bat: 92, time: '5h ago', cam: 'CAM-20' },
  { id: 'CB-035', name: 'Beach Food Kiosk #3', zone: 'Beach — Food Kiosk Area', lat: 11.2580272, lng: 75.769331, fill: 91, type: 'Organic', temp: 37, odor: 80, bat: 77, time: '6h ago', cam: 'CAM-20' },
  { id: 'CB-036', name: 'Beach Food Kiosk #4', zone: 'Beach — Food Kiosk Area', lat: 11.2578435, lng: 75.7694141, fill: 32, type: 'Plastic', temp: 28, odor: 17, bat: 90, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-037', name: 'Beach Food Kiosk #5', zone: 'Beach — Food Kiosk Area', lat: 11.2576598, lng: 75.7694973, fill: 49, type: 'Organic', temp: 29, odor: 24, bat: 75, time: '2h ago', cam: 'CAM-20' },
  { id: 'CB-038', name: 'Beach Food Kiosk #6', zone: 'Beach — Food Kiosk Area', lat: 11.2574761, lng: 75.7695804, fill: 26, type: 'Mixed', temp: 30, odor: 31, bat: 88, time: '3h ago', cam: 'CAM-20' },
  { id: 'CB-039', name: 'Beach Food Kiosk #7', zone: 'Beach — Food Kiosk Area', lat: 11.2572924, lng: 75.7696636, fill: 43, type: 'Organic', temp: 31, odor: 38, bat: 73, time: '4h ago', cam: 'CAM-20' },
  { id: 'CB-040', name: 'Beach Food Kiosk #8', zone: 'Beach — Food Kiosk Area', lat: 11.2571087, lng: 75.7697467, fill: 71, type: 'Plastic', temp: 33, odor: 55, bat: 86, time: '5h ago', cam: 'CAM-20' },
  { id: 'CB-041', name: 'KSRTC Terminal #1', zone: 'KSRTC Terminal', lat: 11.2593992, lng: 75.7809506, fill: 37, type: 'Mixed', temp: 29, odor: 27, bat: 71, time: '6h ago', cam: 'CAM-20' },
  { id: 'CB-042', name: 'KSRTC Terminal #2', zone: 'KSRTC Terminal', lat: 11.2593992, lng: 75.7814086, fill: 54, type: 'Plastic', temp: 30, odor: 34, bat: 84, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-043', name: 'KSRTC Terminal #3', zone: 'KSRTC Terminal', lat: 11.2593992, lng: 75.7818665, fill: 85, type: 'Dry', temp: 36, odor: 88, bat: 97, time: '2h ago', cam: 'CAM-20' },
  { id: 'CB-044', name: 'KSRTC Terminal #4', zone: 'KSRTC Terminal', lat: 11.2593992, lng: 75.7823245, fill: 48, type: 'Mixed', temp: 28, odor: 23, bat: 82, time: '3h ago', cam: 'CAM-20' },
  { id: 'CB-045', name: 'KSRTC Terminal #5', zone: 'KSRTC Terminal', lat: 11.2593992, lng: 75.7827825, fill: 25, type: 'Mixed', temp: 29, odor: 30, bat: 95, time: '4h ago', cam: 'CAM-20' },
  { id: 'CB-046', name: 'KSRTC Terminal #6', zone: 'KSRTC Terminal', lat: 11.2593992, lng: 75.7832405, fill: 42, type: 'Plastic', temp: 30, odor: 37, bat: 80, time: '5h ago', cam: 'CAM-20' },
  { id: 'CB-047', name: 'KSRTC Terminal #7', zone: 'KSRTC Terminal', lat: 11.2593992, lng: 75.7836984, fill: 65, type: 'Dry', temp: 34, odor: 47, bat: 93, time: '6h ago', cam: 'CAM-20' },
  { id: 'CB-048', name: 'KSRTC Terminal #8', zone: 'KSRTC Terminal', lat: 11.2593992, lng: 75.7841564, fill: 36, type: 'Mixed', temp: 28, odor: 26, bat: 78, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-049', name: 'Mananchira Square #1', zone: 'Mananchira Square', lat: 11.25426, lng: 75.7792661, fill: 53, type: 'Organic', temp: 29, odor: 33, bat: 91, time: '2h ago', cam: 'CAM-20' },
  { id: 'CB-050', name: 'Mananchira Square #2', zone: 'Mananchira Square', lat: 11.25426, lng: 75.7797241, fill: 30, type: 'Mixed', temp: 30, odor: 15, bat: 76, time: '3h ago', cam: 'CAM-20' },
  { id: 'CB-051', name: 'Mananchira Square #3', zone: 'Mananchira Square', lat: 11.25426, lng: 75.780182, fill: 47, type: 'Plastic', temp: 31, odor: 22, bat: 89, time: '4h ago', cam: 'CAM-20' },
  { id: 'CB-052', name: 'Mananchira Square #4', zone: 'Mananchira Square', lat: 11.25426, lng: 75.78064, fill: 89, type: 'Dry', temp: 36, odor: 82, bat: 74, time: '5h ago', cam: 'CAM-20' },
  { id: 'CB-053', name: 'Mananchira Square #5', zone: 'Mananchira Square', lat: 11.25426, lng: 75.781098, fill: 41, type: 'Organic', temp: 29, odor: 36, bat: 87, time: '6h ago', cam: 'CAM-20' },
  { id: 'CB-054', name: 'Mananchira Square #6', zone: 'Mananchira Square', lat: 11.25426, lng: 75.7815559, fill: 58, type: 'Mixed', temp: 30, odor: 18, bat: 72, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-055', name: 'Mananchira Square #7', zone: 'Mananchira Square', lat: 11.25426, lng: 75.7820139, fill: 35, type: 'Plastic', temp: 31, odor: 25, bat: 85, time: '2h ago', cam: 'CAM-20' },
  { id: 'CB-056', name: 'Open Theatre Beach #1', zone: 'Beach — Open Theatre Area', lat: 11.2584112, lng: 75.7688667, fill: 52, type: 'Plastic', temp: 28, odor: 32, bat: 70, time: '3h ago', cam: 'CAM-20' },
  { id: 'CB-057', name: 'Open Theatre Beach #2', zone: 'Beach — Open Theatre Area', lat: 11.2584471, lng: 75.7690224, fill: 29, type: 'Mixed', temp: 29, odor: 39, bat: 83, time: '4h ago', cam: 'CAM-20' },
  { id: 'CB-058', name: 'Open Theatre Beach #3', zone: 'Beach — Open Theatre Area', lat: 11.258519, lng: 75.7688301, fill: 70, type: 'Dry', temp: 33, odor: 58, bat: 96, time: '5h ago', cam: 'CAM-20' },
  { id: 'CB-059', name: 'Open Theatre Beach #4', zone: 'Beach — Open Theatre Area', lat: 11.2585639, lng: 75.768995, fill: 23, type: 'Organic', temp: 31, odor: 28, bat: 81, time: '6h ago', cam: 'CAM-20' },
  { id: 'CB-060', name: 'Open Theatre Beach #5', zone: 'Beach — Open Theatre Area', lat: 11.2586088, lng: 75.7689217, fill: 40, type: 'Plastic', temp: 28, odor: 35, bat: 94, time: '45m ago', cam: 'CAM-20' },
];

const ALERTS = [
  { type: 'critical', title: 'CB-008 Critical Overflow', desc: 'Beach Promenade #8 reached 95%. High odor detected.', time: '2m ago' },
  { type: 'critical', title: 'CB-035 High Fill Rate', desc: 'Beach Food Kiosk #3 reached 91%. Fast filling rate.', time: '15m ago' },
  { type: 'critical', title: 'CB-052 High Fill Rate', desc: 'Mananchira Square #4 reached 89%. Filling fast.', time: '28m ago' },
  { type: 'warning', title: 'CB-019 Temperature Alert', desc: 'Private Bus Stand #7 bin temp reading 35°C.', time: '35m ago' },
  { type: 'info', title: 'Route Optimization', desc: 'System generated dynamic road route for 5 critical bins across Beach & Kozhikode Bus Stands.', time: '1h ago' }
];

const FLEET = [
  { id: 'KL-11-BC-5521', name: 'Truck Alpha (Beach Sector)', status: 'En Route', progress: 65 },
  { id: 'KL-11-BC-5522', name: 'Truck Beta (Private Bus Stand)', status: 'Collecting', progress: 40 },
  { id: 'KL-11-BC-5523', name: 'Truck Gamma (KSRTC & Mananchira)', status: 'Returning', progress: 90 },
  { id: 'KL-11-BC-5524', name: 'Truck Delta (Standby)', status: 'Idle', progress: 0 }
];

// ═══ UTILS ═══
function getFillColor(v) { return v >= 80 ? 'var(--critical)' : v >= 50 ? 'var(--warning)' : 'var(--success)'; }
function getFillHex(v) { return v >= 80 ? '#dc2626' : v >= 50 ? '#d97706' : '#16a34a'; }
function getBadge(v) { return v >= 80 ? 'badge-critical' : v >= 50 ? 'badge-warning' : 'badge-success'; }
function getStatus(v) { return v >= 80 ? 'Critical' : v >= 50 ? 'Warning' : 'Normal'; }

function showToast(msg, type = 'info') {
  const c = document.getElementById('toast-container'), t = document.createElement('div');
  t.className = `toast ${type}`;
  const icons = { success: 'ti-check', warning: 'ti-alert-triangle', error: 'ti-x', info: 'ti-info-circle' };
  t.innerHTML = `<i class="ti ${icons[type] || icons.info}"></i><span>${msg}</span>`;
  c.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 350); }, 3000);
}

// ═══ TAB SWITCHING ═══
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  const nav = document.querySelector(`.nav-item[onclick="switchTab('${tabId}')"]`);
  if (nav) nav.classList.add('active');
  const titles = { dashboard: 'Overview Dashboard', monitoring: 'Real-Time Bin Status', routes: 'AI Route Optimization', analytics: 'Data Analytics & Trends', cameras: 'Surveillance Network', alerts: 'Notification Center', fleet: 'Fleet Status', reports: 'Executive Reports & Dashboards' };
  document.getElementById('page-title').innerText = titles[tabId] || 'Overview Dashboard';
  if (tabId === 'routes' && !routeMapInit) setTimeout(initRouteMap, 100);
  if (tabId === 'analytics' && !chartsInit) initCharts();
}

// ═══ MODALS ═══
function openModal(id, binId = null) {
  if (binId) {
    const b = BINS.find(x => x.id === binId);
    document.getElementById('modal-bin-title').innerHTML = `${b.id} — ${b.name}`;
    document.getElementById('modal-content').innerHTML = `
      <div class="grid-2" style="margin-bottom:16px;">
        <div class="env-card" style="text-align:center;">
          <div class="env-label">Current Fill</div>
          <div class="env-value" style="color:${getFillHex(b.fill)}">${b.fill}%</div>
          <div class="progress-bar" style="margin-top:10px;height:8px;"><div class="progress-fill" style="width:${b.fill}%;background:${getFillColor(b.fill)};"></div></div>
        </div>
        <div class="env-card">
          <div class="env-label">Sensors</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;font-size:12px;">
            <div><span class="text-muted">Temp</span><div class="fw-600">${b.temp}°C</div></div>
            <div><span class="text-muted">Odor</span><div class="fw-600 ${b.odor > 50 ? 'text-critical' : 'text-success'}">${b.odor} AQI</div></div>
            <div><span class="text-muted">Battery</span><div class="fw-600 text-success">${b.bat}%</div></div>
            <div><span class="text-muted">Type</span><div class="fw-600">${b.type}</div></div>
          </div>
        </div>
      </div>
      <div class="env-card" style="font-size:13px;line-height:2;">
        <span class="text-muted">Zone:</span> <b>${b.zone}</b><br>
        <span class="text-muted">Coords:</span> <span class="font-mono">${b.lat.toFixed(4)}, ${b.lng.toFixed(4)}</span><br>
        <span class="text-muted">Last Collected:</span> <b>${b.time}</b>
        <span class="badge ${getBadge(b.fill)}" style="margin-left:12px">${getStatus(b.fill)}</span>
      </div>`;
  }
  document.getElementById(id).classList.add('active');
}
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// ═══ BUTTON HANDLERS ═══
function triggerExport() { showToast('Generating CSV report...', 'info'); setTimeout(() => showToast('Report downloaded!', 'success'), 1500); }
function saveSettings() { closeModal('settings-modal'); showToast('Settings saved.', 'success'); }
function scheduleCollection() { closeModal('bin-modal'); showToast('Pickup prioritized.', 'success'); }
function dispatchAllRoutes() { showToast('Routes dispatched to GPS units.', 'success'); }
function downloadFootage() { showToast('Compiling footage logs...', 'info'); setTimeout(() => showToast('Archive (1.2GB) downloading.', 'success'), 2000); }
function toggleRecording(btn) {
  if (btn.innerText.includes('REC')) { btn.innerHTML = '<i class="ti ti-player-stop"></i> Stop'; btn.style.background = 'var(--bg)'; btn.style.color = 'var(--text)'; btn.style.borderColor = 'var(--border)'; showToast('Recording enabled.', 'warning'); }
  else { btn.innerHTML = '<i class="ti ti-player-record"></i> REC All'; btn.style.background = 'var(--critical)'; btn.style.color = '#fff'; btn.style.borderColor = 'var(--critical)'; showToast('Recording stopped.', 'info'); }
}

// ═══ RENDERERS ═══
function renderDashboard() {
  // Vertical Bars
  document.getElementById('mini-bin-grid').innerHTML = BINS.map(b => `
    <div class="bar-item-wrapper" onclick="openModal('bin-modal','${b.id}')" title="${b.name}: ${b.fill}%">
      <div class="bar-item">
        <div class="bar-item-fill" style="height:${b.fill}%; background:${getFillColor(b.fill)}"></div>
      </div>
      <div class="bar-item-label">${b.id.split('-')[1]}</div>
    </div>
  `).join('');

  // Alerts styling updated to match insights theme
  const html = ALERTS.map(a => {
    let bg = 'var(--info-bg)';
    let color = 'var(--info)';
    let icon = 'ti-info-circle';
    if (a.type === 'critical') { bg = 'var(--critical-bg)'; color = 'var(--critical)'; icon = 'ti-alert-triangle'; }
    if (a.type === 'warning') { bg = 'var(--warning-bg)'; color = 'var(--warning)'; icon = 'ti-alert-circle'; }

    return `
      <div class="item-card" style="align-items:flex-start;background:${bg};border-color:transparent;padding:12px;cursor:pointer;">
        <i class="ti ${icon}" style="color:${color};font-size:20px;margin-right:10px;"></i>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px;">${a.title}</div>
          <div style="font-size:12px;color:var(--text);line-height:1.4;">${a.desc}</div>
        </div>
        <div style="font-size:11px;font-weight:600;color:${color};">${a.time}</div>
      </div>
    `;
  }).join('');
  document.getElementById('dash-alerts-list').innerHTML = html;
  const fa = document.getElementById('full-alerts-list'); if (fa) fa.innerHTML = html;
  // Fleet
  const fl = document.getElementById('fleet-list');
  if (fl) fl.innerHTML = FLEET.map(f => `<div class="list-item"><div class="list-icon info"><i class="ti ti-truck"></i></div><div class="list-content"><div class="list-title">${f.name} <span class="badge ${f.progress > 0 ? 'badge-success' : 'badge-neutral'}" style="margin-left:8px">${f.status}</span></div><div class="progress-bar" style="margin-top:8px;max-width:300px;"><div class="progress-fill" style="width:${f.progress}%;background:var(--info);"></div></div></div><div class="fw-600" style="color:var(--info)">${f.progress}%</div></div>`).join('');
  renderTable(); renderCameras();
}

function renderTable(search = '') {
  const zone = document.getElementById('filter-zone')?.value;
  const status = document.getElementById('filter-status')?.value;
  let f = BINS;
  if (zone) f = f.filter(b => b.zone === zone);
  if (status === 'critical') f = f.filter(b => b.fill >= 80);
  else if (status === 'warning') f = f.filter(b => b.fill >= 50 && b.fill < 80);
  else if (status === 'normal') f = f.filter(b => b.fill < 50);
  if (search) { const s = search.toLowerCase(); f = f.filter(b => b.id.toLowerCase().includes(s) || b.name.toLowerCase().includes(s) || b.zone.toLowerCase().includes(s)); }
  const tb = document.getElementById('bin-table-body'); if (!tb) return;
  tb.innerHTML = f.map(b => `<tr onclick="openModal('bin-modal','${b.id}')"><td class="font-mono fw-600" style="color:var(--primary)">${b.id}</td><td><div class="fw-600">${b.name}</div><div style="font-size:11px;color:var(--text-muted)">${b.zone}</div></td><td><div class="progress-wrap"><div class="progress-bar" style="width:80px"><div class="progress-fill" style="width:${b.fill}%;background:${getFillColor(b.fill)}"></div></div><span class="progress-text" style="color:${getFillHex(b.fill)}">${b.fill}%</span></div></td><td>${b.type}</td><td><div style="font-size:11px"><i class="ti ti-temperature text-warning"></i> ${b.temp}°C</div><div style="font-size:11px"><i class="ti ti-battery-3 text-success"></i> ${b.bat}%</div></td><td class="text-muted">${b.time}</td><td><span class="badge ${getBadge(b.fill)}">${getStatus(b.fill)}</span></td><td><button class="btn btn-sm" onclick="event.stopPropagation();scheduleCollection()"><i class="ti ti-truck"></i> Pick</button></td></tr>`).join('');
}

let searchTimeout;
function handleSearch(v) { clearTimeout(searchTimeout); searchTimeout = setTimeout(() => { switchTab('monitoring'); renderTable(v); }, 300); }

function renderCameras() {
  const c = document.getElementById('cam-grid-container'); if (!c) return;
  c.innerHTML = Array(8).fill(0).map((_, i) => `<div class="cam-feed" onclick="showToast('Camera ${i + 1} fullscreen view','info')"><canvas id="cam-${i}"></canvas><div class="cam-overlay"></div><div style="position:absolute;top:10px;left:12px;color:#fff;font-size:14px"><i class="ti ti-video"></i></div><div class="cam-live">● LIVE</div><div class="cam-label"><div class="cam-name">CAM-0${i + 1} · ${BINS[i].name}</div><div class="cam-status">1080p · 30fps</div></div></div>`).join('');
  setTimeout(() => { for (let i = 0; i < 8; i++) { const cv = document.getElementById(`cam-${i}`); if (cv) { const ctx = cv.getContext('2d'); cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, cv.width, cv.height); ctx.strokeStyle = 'rgba(255,255,255,0.08)'; for (let j = 0; j < cv.width; j += 18) { ctx.beginPath(); ctx.moveTo(j, 0); ctx.lineTo(j, cv.height); ctx.stroke(); } ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(cv.width / 2 - 20, cv.height / 2, 40, cv.height / 2); } } }, 150);
}

// ═══ MAPS ═══
let mainMap, routeMap, routeMapInit = false;

function getCartoTileUrl(style = 'light_all') {
  const base = `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png`;
  return CARTO_API_KEY ? `${base}?key=${CARTO_API_KEY}` : base;
}

function initMainMap() {
  mainMap = L.map('map', { scrollWheelZoom: false }).setView([11.260, 75.780], 13);
  L.tileLayer(getCartoTileUrl('light_all'), {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(mainMap);
  const bounds = L.latLngBounds();
  BINS.forEach(b => {
    const col = getFillHex(b.fill);
    const icon = L.divIcon({ className: '', html: `<div style="width:26px;height:26px;background:${col};border-radius:50%;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700;">${b.fill}</div>`, iconSize: [26, 26], iconAnchor: [13, 13] });
    L.marker([b.lat, b.lng], { icon }).addTo(mainMap).bindPopup(`<div style="min-width:170px;font-family:Inter,sans-serif"><div style="font-weight:600;font-size:14px;margin-bottom:2px">${b.name}</div><div style="font-size:11px;color:#64748b;margin-bottom:8px">${b.id} · ${b.zone}</div><div class="badge ${getBadge(b.fill)}" style="margin-bottom:8px">${b.fill}% Full</div><br><button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;margin-top:4px" onclick="openModal('bin-modal','${b.id}')">View Details</button></div>`);
    bounds.extend([b.lat, b.lng]);
  });
  if (BINS.length > 0) mainMap.fitBounds(bounds, { padding: [30, 30] });
}

function initRouteMap() {
  routeMapInit = true;
  routeMap = L.map('route-map', { scrollWheelZoom: false }).setView([11.260, 75.780], 13);
  L.tileLayer(getCartoTileUrl('light_all'), {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(routeMap);
  const crit = BINS.filter(b => b.fill >= 80).slice(0, 5);
  if (crit.length < 2) return;
  crit.forEach((b, i) => { const icon = L.divIcon({ className: '', html: `<div style="width:24px;height:24px;background:var(--primary);border-radius:50%;border:2px solid #fff;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;box-shadow:0 2px 6px rgba(0,0,0,.2)">${i + 1}</div>`, iconSize: [24, 24], iconAnchor: [12, 12] }); L.marker([b.lat, b.lng], { icon }).bindPopup(`Stop ${i + 1}: ${b.name}`).addTo(routeMap); });
  const coords = crit.map(b => `${b.lng},${b.lat}`).join(';');
  showToast('Calculating road routes via OSRM...', 'info');
  fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`)
    .then(r => r.json()).then(data => {
      if (data.code !== 'Ok') throw new Error('OSRM Error');
      const route = data.routes[0];
      L.geoJSON(route.geometry, { style: { color: '#0d9488', weight: 5, opacity: .75, dashArray: '10,6' } }).addTo(routeMap);
      const km = (route.distance / 1000).toFixed(1), mins = Math.round(route.duration / 60);
      document.getElementById('route-cards-container').innerHTML = `
        <div class="route-card"><div class="route-color" style="background:var(--critical)"></div><div class="route-details"><div class="route-header"><div class="route-title">Priority Route Alpha</div><span class="badge badge-critical">Dispatch Ready</span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0;font-size:12px"><div><i class="ti ti-ruler-2 text-muted"></i> <b>${km} km</b> (Road)</div><div><i class="ti ti-clock text-muted"></i> <b>~${mins} min</b></div><div><i class="ti ti-map-pin text-muted"></i> <b>${crit.length} Stops</b></div><div><i class="ti ti-truck text-muted"></i> KL-11-BC-5521</div></div><div style="font-size:11px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:8px"><b>Path:</b> ${crit.map(b => b.name.split(' ')[0]).join(' → ')}</div><button class="btn btn-primary btn-sm" style="width:100%;margin-top:10px;justify-content:center" onclick="dispatchAllRoutes()">Dispatch</button></div></div>
        <div class="route-card" style="opacity:.5"><div class="route-color" style="background:var(--warning)"></div><div class="route-details"><div class="route-header"><div class="route-title">Secondary Route Beta</div><span class="badge badge-warning">Building...</span></div><div style="font-size:12px;margin-top:6px" class="text-muted">Awaiting more bins to hit warning threshold.</div></div></div>`;
      routeMap.fitBounds(L.latLngBounds(crit.map(b => [b.lat, b.lng])), { padding: [50, 50] });
    }).catch(() => { showToast('Routing API failed. Using fallback.', 'error'); L.polyline(crit.map(b => [b.lat, b.lng]), { color: '#0d9488', weight: 4, dashArray: '5,5' }).addTo(routeMap); });
}

// ═══ CHARTS ═══
let chartsInit = false;
function initCharts() {
  chartsInit = true;
  Chart.defaults.font.family = "'Plus Jakarta Sans',sans-serif";
  Chart.defaults.color = '#6b7280';

  const zc = document.getElementById('zoneChart');
  if (zc) {
    const zoneCounts = {};
    BINS.forEach(b => { zoneCounts[b.zone] = (zoneCounts[b.zone] || 0) + 1; });
    const labels = Object.keys(zoneCounts);
    const data = Object.values(zoneCounts);
    new Chart(zc, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#1e3a5f', '#3b82f6', '#0d9488', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 10, font: { size: 10 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw} bins`
            }
          }
        }
      }
    });
  }

  const ab = document.getElementById('analytics-bar');
  if (ab) {
    new Chart(ab, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Waste (Tonnes)',
          data: [120, 135, 125, 145, 160, 155],
          backgroundColor: '#3b82f6',
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: '#f3f4f6' }, border: { dash: [4, 4] } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  const al = document.getElementById('analytics-line');
  if (al) {
    const ctx = al.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

    new Chart(al, {
      type: 'line',
      data: {
        labels: ['Now', '+4h', '+8h', '+12h', '+16h', '+20h', '+24h'],
        datasets: [
          {
            label: 'Predicted Fill %',
            data: [62, 68, 75, 82, 85, 78, 70],
            borderColor: '#10b981',
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10b981',
            pointRadius: 3,
            borderWidth: 2
          },
          {
            label: 'Threshold',
            data: [80, 80, 80, 80, 80, 80, 80],
            borderColor: '#ef4444',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: '#f3f4f6' }, min: 40, max: 100 }
        }
      }
    });
  }

  // Reports Charts
  initReportsCharts();
}

function initReportsCharts() {
  const rcEff = document.getElementById('report-efficiency-chart');
  if (rcEff) {
    new Chart(rcEff, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          { label: 'Target', data: [95, 95, 95, 95, 95, 95], type: 'line', borderColor: '#ef4444', borderWidth: 2, pointRadius: 0, borderDash: [5, 5] },
          { label: 'Actual (%)', data: [88, 92, 90, 96, 94, 98], backgroundColor: '#10b981', borderRadius: 4 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 80, max: 100 } } }
    });
  }

  const rcFuel = document.getElementById('report-fuel-chart');
  if (rcFuel) {
    new Chart(rcFuel, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{ label: 'Liters Consumed', data: [1200, 1150, 1080, 980], borderColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.1)', fill: true, tension: 0.4 }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const rcCarb = document.getElementById('report-carbon-chart');
  if (rcCarb) {
    new Chart(rcCarb, {
      type: 'bar',
      data: {
        labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D'],
        datasets: [{ label: 'CO2e Offset (Tons)', data: [45, 30, 60, 25], backgroundColor: '#3b82f6', borderRadius: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}

// ═══ NAVIGATION LOGIC ═══
function updatePill(el) {
  document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

function setTimeFilter(el, range) {
  updatePill(el);
  switchTab('dashboard');

  // Mock data update based on filter
  const avgFillEl = document.getElementById('dash-avg-fill');
  const criticalEl = document.getElementById('dash-critical');

  if (range === 'today') {
    if (avgFillEl) avgFillEl.innerText = '45%';
    if (criticalEl) criticalEl.innerText = '2';
    showToast('Data updated to Today\'s metrics');
  } else if (range === 'week') {
    if (avgFillEl) avgFillEl.innerText = '58%';
    if (criticalEl) criticalEl.innerText = '5';
    showToast('Data updated to This Week\'s metrics');
  } else if (range === 'month') {
    if (avgFillEl) avgFillEl.innerText = '62%';
    if (criticalEl) criticalEl.innerText = '7';
    showToast('Data updated to This Month\'s metrics');
  }
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
  renderDashboard(); initMainMap(); initCharts();
  document.querySelectorAll('.modal-overlay').forEach(el => { el.addEventListener('click', e => { if (e.target === el) el.classList.remove('active'); }); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active')); });
});
