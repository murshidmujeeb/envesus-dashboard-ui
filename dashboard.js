// ═══════════════════════════════════════════════════════
// ENVESUS ADMIN DASHBOARD — dashboard.js
// Reads from AppState (state.js must be loaded first)
// ═══════════════════════════════════════════════════════

// ─── STATE SHORTHAND ──────────────────────────────────
const BINS   = () => AppState.getBins();
const ROUTES = () => AppState.getRoutes();

const ALERTS_DATA = [
  { type: 'critical', title: 'CB-008 Critical Overflow',   desc: 'Beach Promenade #8 reached 95%. High odor detected.',       time: '2m ago'  },
  { type: 'critical', title: 'CB-035 High Fill Rate',      desc: 'Beach Food Kiosk #3 reached 91%. Fast filling rate.',        time: '15m ago' },
  { type: 'critical', title: 'CB-052 High Fill Rate',      desc: 'Mananchira Square #4 reached 89%. Filling fast.',            time: '28m ago' },
  { type: 'warning',  title: 'CB-043 KSRTC Critical',      desc: 'KSRTC Terminal #3 at 85%. Schedule collection.',             time: '31m ago' },
  { type: 'warning',  title: 'CB-019 Temperature Alert',   desc: 'Private Bus Stand #7 bin temp reading 35°C.',               time: '35m ago' },
  { type: 'info',     title: 'Route Optimization Complete','desc': '7 routes generated using actual Kozhikode bin coordinates.', time: '1h ago'  },
];

// ─── MAPS ─────────────────────────────────────────────
let mainMap = null;
let routeMap = null;
let routeMapInit = false;
let chartsInit = false;
let selectedRouteId = null;
let routeMapLayers = [];
let pendingAssignRouteId = null;

// ─── TAB SWITCHING ────────────────────────────────────
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item[id^="nav-"]').forEach(n => n.classList.remove('active'));
  const tab = document.getElementById('tab-' + tabId);
  const nav = document.getElementById('nav-' + tabId);
  if (tab) tab.classList.add('active');
  if (nav) nav.classList.add('active');

  const titles = {
    dashboard:  'Overview Dashboard',
    monitoring: 'Real-Time Bin Status',
    routes:     'Route Optimization',
    analytics:  'Data Analytics & Trends',
    cameras:    'Surveillance Network',
    alerts:     'Notification Center',
    fleet:      'Fleet Status',
    reports:    'Executive Reports',
  };
  const el = document.getElementById('page-title');
  if (el) el.innerText = titles[tabId] || 'Dashboard';

  if (tabId === 'routes') {
    if (!routeMapInit) setTimeout(initRouteMap, 100);
    else setTimeout(() => { if (routeMap) routeMap.invalidateSize(); }, 150);
    renderRoutePanels();
  }
  if (tabId === 'dashboard' && mainMap) {
    setTimeout(() => { if (mainMap) mainMap.invalidateSize(); }, 150);
  }
  if (tabId === 'analytics' && !chartsInit) initCharts();
  if (tabId === 'fleet') renderFleetCards();
  if (tabId === 'cameras' && !document.querySelector('#cam-grid-container canvas')) initCameras();
}

function updatePill(el) {
  document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}
function setTimeFilter(el, filter) {
  updatePill(el);
  showToast('Showing data for: ' + filter, 'info');
}

// ─── MODALS ───────────────────────────────────────────
function openModal(id, binId) {
  if (binId) {
    const b = AppState.getBin(binId);
    if (!b) return;
    document.getElementById('modal-bin-title').innerHTML = `${b.id} — ${b.name}`;
    document.getElementById('modal-content').innerHTML = `
      <div class="grid-2" style="margin-bottom:16px;">
        <div class="env-card" style="text-align:center;background:var(--bg);padding:16px;border-radius:var(--r-sm);">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:600;margin-bottom:4px;">Current Fill</div>
          <div style="font-size:32px;font-weight:800;color:${getFillHex(b.fill)}">${b.fill}%</div>
          <div class="progress-track" style="margin-top:10px;height:8px;"><div class="progress-fill" style="width:${b.fill}%;background:${getFillHex(b.fill)};"></div></div>
        </div>
        <div class="env-card" style="background:var(--bg);padding:16px;border-radius:var(--r-sm);">
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:600;margin-bottom:8px;">Sensors</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;">
            <div><span class="text-muted">Temp</span><div style="font-weight:700;">${b.temp}°C</div></div>
            <div><span class="text-muted">Odor</span><div style="font-weight:700;color:${b.odor > 50 ? 'var(--critical)' : 'var(--success)'}">${b.odor} AQI</div></div>
            <div><span class="text-muted">Battery</span><div style="font-weight:700;color:var(--success)">${b.bat}%</div></div>
            <div><span class="text-muted">Type</span><div style="font-weight:700">${b.type}</div></div>
          </div>
        </div>
      </div>
      <div style="background:var(--bg);padding:16px;border-radius:var(--r-sm);font-size:13px;line-height:2;">
        <span class="text-muted">Zone:</span> <b>${b.zone}</b><br>
        <span class="text-muted">Coords:</span> <span style="font-family:var(--mono)">${b.lat.toFixed(5)}, ${b.lng.toFixed(5)}</span><br>
        <span class="text-muted">Last Collected:</span> <b>${b.time}</b>
        <span class="badge ${getBadgeClass(b.fill)}" style="margin-left:12px">${getStatusLabel(b.fill)}</span>
        ${b.collected ? `<br><span class="badge badge-success">✓ Collected ${b.collectedAt || ''}</span>` : ''}
      </div>`;
  }
  const overlay = document.getElementById(id);
  if (overlay) { overlay.style.display = 'flex'; requestAnimationFrame(() => overlay.classList.add('active')); }
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) { overlay.classList.remove('active'); setTimeout(() => { if (!overlay.classList.contains('active')) overlay.style.display = 'none'; }, 250); }
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id)); });
document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); document.getElementById('global-search')?.focus(); } });

// ─── TOAST ────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icons = { success: 'ti-check', warning: 'ti-alert-triangle', error: 'ti-x', info: 'ti-info-circle' };
  t.innerHTML = `<i class="ti ${icons[type] || icons.info}"></i><span>${msg}</span>`;
  c.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 350); }, 3000);
}

// ─── DASHBOARD STATS ──────────────────────────────────
function updateDashboardStats() {
  const bins = BINS();
  const avg = Math.round(bins.reduce((s, b) => s + b.fill, 0) / bins.length);
  const critical = bins.filter(b => b.fill >= 80).length;
  const collected = bins.filter(b => b.collected).length;

  const avgEl = document.getElementById('dash-avg-fill');
  const critEl = document.getElementById('dash-critical');
  const colEl  = document.getElementById('dash-collected');
  if (avgEl) avgEl.textContent = avg + '%';
  if (critEl) critEl.textContent = critical;
  if (colEl) colEl.textContent = collected;
}

// ─── MAIN MAP ─────────────────────────────────────────
function initMainMap() {
  const el = document.getElementById('map');
  if (!el || mainMap) return;

  mainMap = L.map('map').setView([11.2550, 75.7760], 14);
  L.tileLayer(getCartoTileUrl(), {
    attribution: '© <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd', maxZoom: 19,
  }).addTo(mainMap);

  renderMapMarkers();
}

function renderMapMarkers() {
  if (!mainMap) return;
  BINS().forEach(bin => {
    const color = bin.collected ? '#9ca3af' : getFillHex(bin.fill);
    const icon = L.divIcon({
      className: '',
      html: `<div style="width:30px;height:30px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:800;">${bin.collected ? '✓' : bin.fill + '%'}</div>`,
      iconSize: [30, 30], iconAnchor: [15, 15],
    });
    L.marker([bin.lat, bin.lng], { icon })
      .addTo(mainMap)
      .bindPopup(`<b>${bin.id}</b><br>${bin.name}<br>Fill: ${bin.fill}%<br>Zone: ${bin.zone}${bin.collected ? '<br>✓ Collected' : ''}`)
      .on('click', () => openModal('bin-modal', bin.id));
  });
}

// ─── FILL LEVEL MATRIX ────────────────────────────────
function renderMiniBinGrid() {
  const container = document.getElementById('mini-bin-grid');
  if (!container) return;
  container.innerHTML = BINS().map(bin => {
    const pct = bin.fill;
    const color = getFillHex(pct);
    return `<div class="bar-item-wrapper">
      <div class="bar-item" onclick="openModal('bin-modal','${bin.id}')" title="${bin.id}: ${pct}%">
        <div class="bar-item-fill" style="height:${pct}%;background:${color};border-radius:6px;"></div>
      </div>
      <div class="bar-item-label">${bin.id.replace('CB-','')}</div>
    </div>`;
  }).join('');
}

// ─── ALERTS ───────────────────────────────────────────
function renderAlerts() {
  const icons = { critical: 'ti-alert-triangle', warning: 'ti-alert-circle', info: 'ti-info-circle' };
  const colors = { critical: 'var(--critical)', warning: 'var(--warning)', info: 'var(--info)' };
  const bgs    = { critical: 'var(--critical-bg)', warning: 'var(--warning-bg)', info: 'var(--info-bg)' };

  const html = ALERTS_DATA.map(a => `
    <div class="item-card" style="background:${bgs[a.type]};border-color:transparent;">
      <div><i class="ti ${icons[a.type]}" style="color:${colors[a.type]};font-size:20px;margin-right:12px;"></i></div>
      <div class="item-info">
        <div class="item-title">${a.title}</div>
        <div class="item-subtitle">${a.desc}</div>
      </div>
      <div style="font-size:12px;color:var(--text-muted);white-space:nowrap;margin-left:12px;">${a.time}</div>
    </div>`).join('');

  const dashList = document.getElementById('dash-alerts-list');
  const fullList = document.getElementById('full-alerts-list');
  if (dashList) dashList.innerHTML = html;
  if (fullList) fullList.innerHTML = html;
}

// ─── ZONE CHART ───────────────────────────────────────
function initZoneChart() {
  const ctx = document.getElementById('zoneChart');
  if (!ctx) return;
  const bins = BINS();
  const zones = Object.keys(ZONES);
  const avgs = zones.map(z => {
    const zBins = bins.filter(b => b.zone === z);
    return zBins.length ? Math.round(zBins.reduce((s, b) => s + b.fill, 0) / zBins.length) : 0;
  });

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: zones.map(z => ZONES[z].label),
      datasets: [{ data: avgs, backgroundColor: zones.map(z => ZONES[z].color), borderWidth: 3, borderColor: '#fff' }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '60%',
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11, family: "'Plus Jakarta Sans'" }, boxWidth: 12, padding: 12 } },
      },
    },
  });
}

// ─── BIN TABLE ────────────────────────────────────────
function renderTable() {
  const zone    = document.getElementById('filter-zone')?.value || '';
  const status  = document.getElementById('filter-status')?.value || '';
  const search  = document.getElementById('global-search')?.value.toLowerCase() || '';
  const tbody   = document.getElementById('bin-table-body');
  if (!tbody) return;

  let bins = BINS().filter(b => {
    if (zone   && b.zone !== zone) return false;
    if (status === 'critical' && b.fill < 80) return false;
    if (status === 'warning'  && (b.fill < 50 || b.fill >= 80)) return false;
    if (status === 'normal'   && b.fill >= 50) return false;
    if (search && !`${b.id} ${b.name} ${b.zone}`.toLowerCase().includes(search)) return false;
    return true;
  });

  tbody.innerHTML = bins.map(b => `
    <tr onclick="openModal('bin-modal','${b.id}')">
      <td><span style="font-family:var(--mono);font-weight:700;">${b.id}</span></td>
      <td><div style="font-weight:600;">${b.name}</div><div style="font-size:12px;color:var(--text-muted);">${b.zone}</div></td>
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="progress-track" style="width:80px;height:8px;"><div class="progress-fill" style="width:${b.fill}%;background:${getFillHex(b.fill)};"></div></div>
          <span style="font-weight:700;color:${getFillHex(b.fill)}">${b.fill}%</span>
        </div>
      </td>
      <td><span class="badge badge-info" style="font-size:11px;">${b.type}</span></td>
      <td><span style="font-size:12px;">🌡 ${b.temp}°C · 🔋 ${b.bat}%</span></td>
      <td><span class="badge ${getBadgeClass(b.fill)}">${getStatusLabel(b.fill)}</span></td>
      <td>${b.collected ? `<span class="badge badge-success">✓ ${b.collectedAt || 'Done'}</span>` : '<span style="color:var(--text-muted);font-size:12px;">Pending</span>'}</td>
      <td><button class="btn" style="font-size:12px;padding:6px 12px;" onclick="openModal('bin-modal','${b.id}');event.stopPropagation();">View</button></td>
    </tr>`).join('');
}

function handleSearch(value) {
  renderTable();
}

// ─── ROUTE OPTIMIZATION ───────────────────────────────
function initRouteMap() {
  const el = document.getElementById('route-map');
  if (!el || routeMap) return;
  routeMap = L.map('route-map').setView([11.2550, 75.7760], 13);
  L.tileLayer(getCartoTileUrl(), { attribution: '© CARTO', subdomains: 'abcd', maxZoom: 19 }).addTo(routeMap);
  routeMapInit = true;
  // Show all bins on the route map initially
  renderAllRoutesOnMap();
}

function renderAllRoutesOnMap() {
  if (!routeMap) return;
  routeMapLayers.forEach(l => l.remove());
  routeMapLayers = [];

  const routes = ROUTES();
  const allBins = AppState.getBins();

  routes.forEach(route => {
    const bins = AppState.getBinsForRoute(route.id);
    if (bins.length >= 2) {
      const line = L.polyline(bins.map(b => [b.lat, b.lng]), {
        color: route.color, weight: 2.5, opacity: 0.6, dashArray: '6, 8',
      }).addTo(routeMap);
      routeMapLayers.push(line);
    }
    bins.forEach((bin, idx) => {
      const color = bin.collected ? '#9ca3af' : route.color;
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:26px;height:26px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:800;">${idx + 1}</div>`,
        iconSize: [26, 26], iconAnchor: [13, 13],
      });
      const m = L.marker([bin.lat, bin.lng], { icon }).addTo(routeMap)
        .bindPopup(`<b>${bin.id}</b><br>${bin.name}<br>Route: ${route.id}<br>Fill: ${bin.fill}%`);
      routeMapLayers.push(m);
    });
  });

  // Fit all bins
  const allCoords = allBins.map(b => [b.lat, b.lng]);
  try { routeMap.fitBounds(allCoords, { padding: [20, 20] }); } catch (e) {}
}

function renderSingleRouteOnMap(routeId) {
  if (!routeMap) { initRouteMap(); return; }
  routeMapLayers.forEach(l => l.remove());
  routeMapLayers = [];

  const route = AppState.getRoute(routeId);
  if (!route) return;
  const bins = AppState.getBinsForRoute(routeId);

  // Route polyline
  if (bins.length >= 2) {
    const line = L.polyline(bins.map(b => [b.lat, b.lng]), {
      color: route.color, weight: 4, opacity: 0.8, dashArray: '8, 10',
    }).addTo(routeMap);
    routeMapLayers.push(line);

    // Animated arrowhead effect — number each stop
    bins.forEach((bin, idx) => {
      const color = bin.collected ? '#9ca3af' : route.color;
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:800;">${bin.collected ? '✓' : (idx + 1)}</div>`,
        iconSize: [32, 32], iconAnchor: [16, 16],
      });
      const m = L.marker([bin.lat, bin.lng], { icon }).addTo(routeMap)
        .bindPopup(`<b>Stop ${idx + 1}: ${bin.id}</b><br>${bin.name}<br>Fill: ${bin.fill}%${bin.collected ? '<br>✓ Collected' : ''}`);
      routeMapLayers.push(m);
    });
  }

  try { routeMap.fitBounds(bins.map(b => [b.lat, b.lng]), { padding: [30, 30] }); } catch (e) {}

  // Update map label
  const label = document.getElementById('route-map-label');
  if (label) label.textContent = `— ${route.label}  ·  ${estimateDistance(bins)}  ·  ${estimateDuration(bins)}`;
  const assignBtn = document.getElementById('assign-btn');
  if (assignBtn) assignBtn.style.display = 'inline-flex';
}

function renderRoutePanels() {
  const container = document.getElementById('route-cards-container');
  if (!container) return;
  const zoneFilter = document.getElementById('route-filter-zone')?.value || '';
  const statusFilter = document.getElementById('route-filter-status')?.value || '';

  let routes = ROUTES();
  if (zoneFilter) routes = routes.filter(r => r.zone === zoneFilter);
  if (statusFilter === 'done') routes = routes.filter(r => AppState.getRouteProgress(r.id).pct === 100);
  else if (statusFilter === 'progress') routes = routes.filter(r => { const p = AppState.getRouteProgress(r.id); return p.pct > 0 && p.pct < 100; });
  else if (statusFilter === 'pending') routes = routes.filter(r => AppState.getRouteProgress(r.id).pct === 0);

  const countLabel = document.getElementById('route-count-label');
  if (countLabel) countLabel.textContent = `Showing ${routes.length} of ${ROUTES().length} routes`;

  if (routes.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:40px 20px;color:var(--text-muted);background:var(--surface);border-radius:var(--r);"><i class="ti ti-route-off" style="font-size:32px;display:block;margin-bottom:8px;"></i>No routes match filters</div>`;
    return;
  }

  container.innerHTML = routes.map(route => {
    const bins = AppState.getBinsForRoute(route.id);
    const progress = AppState.getRouteProgress(route.id);
    const staff = STAFF_MEMBERS.find(s => s.id === route.staffId);
    const driver = DRIVERS.find(d => d.id === route.driverId);
    const isSelected = route.id === selectedRouteId;

    return `
    <div class="route-card" style="border-left-color:${route.color};${isSelected ? 'box-shadow:0 0 0 2px ' + route.color + ';' : ''}"
      onclick="selectRouteOnMap('${route.id}', this)">
      <div class="route-card-header">
        <div>
          <div class="route-card-id">${route.id}</div>
          <div class="route-card-label">${route.label}</div>
          <div class="route-card-zone"><i class="ti ti-map-pin" style="font-size:11px;"></i> ${route.zone}</div>
        </div>
        <span class="badge ${progress.pct === 100 ? 'badge-success' : progress.pct > 0 ? 'badge-warning' : 'badge-info'}" style="flex-shrink:0">
          ${progress.pct === 100 ? '✓ Done' : progress.pct > 0 ? 'In Progress' : 'Pending'}
        </span>
      </div>

      <div class="route-card-meta">
        <span><i class="ti ti-route"></i> ${bins.length} stops</span>
        <span><i class="ti ti-ruler"></i> ${estimateDistance(bins)}</span>
        <span><i class="ti ti-clock"></i> ${estimateDuration(bins)}</span>
      </div>

      <!-- Progress -->
      <div style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
          <span style="color:var(--text-muted)">${progress.done}/${progress.total} collected</span>
          <span style="font-weight:700;color:${route.color}">${progress.pct}%</span>
        </div>
        <div class="progress-track" style="height:6px;">
          <div class="progress-fill" style="width:${progress.pct}%;background:${route.color};"></div>
        </div>
      </div>

      <div class="route-card-assignment">
        <span class="assignment-pill"><i class="ti ti-user"></i> ${staff ? staff.name : '—'}</span>
        <span class="assignment-pill"><i class="ti ti-truck"></i> ${driver ? driver.vehicleName : '—'}</span>
      </div>

      <div style="display:flex;gap:8px;">
        <button class="btn" style="font-size:12px;flex:1;" onclick="openAssignModal('${route.id}');event.stopPropagation();"><i class="ti ti-user-plus"></i> Assign</button>
        <button class="btn" style="font-size:12px;flex:1;" onclick="reOptimizeRoute('${route.id}');event.stopPropagation();"><i class="ti ti-brain"></i> Re-optimize</button>
      </div>
    </div>`;
  }).join('');
}

function selectRouteOnMap(routeId, el) {
  selectedRouteId = routeId;
  document.querySelectorAll('.route-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  renderSingleRouteOnMap(routeId);
  pendingAssignRouteId = routeId;
}

function openAssignModal(routeId) {
  pendingAssignRouteId = routeId;
  const route = AppState.getRoute(routeId);
  if (!route) return;

  document.getElementById('assign-modal-body').innerHTML = `
    <div style="margin-bottom:4px;font-size:13px;color:var(--text-muted);">Route: <b>${route.id} — ${route.label}</b></div>
    <label style="display:block;margin:16px 0 8px;font-size:14px;font-weight:600;">Collection Staff</label>
    <select class="search-input" style="width:100%;padding:10px 16px;" id="modal-assign-staff">
      ${STAFF_MEMBERS.map(s => `<option value="${s.id}" ${s.id === route.staffId ? 'selected' : ''}>${s.name} — ${s.zone.split('—').pop().trim()}</option>`).join('')}
    </select>
    <label style="display:block;margin:16px 0 8px;font-size:14px;font-weight:600;">Driver</label>
    <select class="search-input" style="width:100%;padding:10px 16px;" id="modal-assign-driver">
      ${DRIVERS.map(d => `<option value="${d.id}" ${d.id === route.driverId ? 'selected' : ''}>${d.name} — ${d.vehicleName}</option>`).join('')}
    </select>`;

  openModal('assign-modal');
}

function saveRouteAssignment() {
  const staffId  = document.getElementById('modal-assign-staff')?.value;
  const driverId = document.getElementById('modal-assign-driver')?.value;
  if (!pendingAssignRouteId) return;
  AppState.assignRoute(pendingAssignRouteId, staffId, driverId);
  closeModal('assign-modal');
  renderRoutePanels();
  renderFleetCards();
  showToast('Route assignment updated', 'success');
}

function reOptimizeRoute(routeId) {
  const route = AppState.getRoute(routeId);
  if (!route) return;
  const bins = AppState.getBinsForZone(route.zone);
  const ordered = nearestNeighbour(bins);
  AppState.updateRouteBins(routeId, ordered);
  renderRoutePanels();
  if (selectedRouteId === routeId) renderSingleRouteOnMap(routeId);
  showToast(`${routeId} re-optimized`, 'success');
}

function optimizeAllRoutes() {
  ROUTES().forEach(route => {
    const bins = AppState.getBinsForZone(route.zone);
    const ordered = nearestNeighbour(bins);
    AppState.updateRouteBins(route.id, ordered);
  });
  renderRoutePanels();
  renderAllRoutesOnMap();
  showToast('All 7 routes re-optimized', 'success');
}

function dispatchAllRoutes() {
  ROUTES().forEach(r => AppState.setRouteStatus(r.id, 'dispatched'));
  renderRoutePanels();
  showToast('All routes dispatched', 'success');
}

// ─── FLEET STATUS ─────────────────────────────────────
function renderFleetCards() {
  const container = document.getElementById('fleet-cards-container');
  if (!container) return;

  const routes = ROUTES();
  const allDriverRoutes = {};
  routes.forEach(r => {
    if (!allDriverRoutes[r.driverId]) allDriverRoutes[r.driverId] = [];
    allDriverRoutes[r.driverId].push(r);
  });

  container.innerHTML = DRIVERS.map(driver => {
    const driverRoutes = allDriverRoutes[driver.id] || [];
    const progress = driverRoutes.reduce((agg, r) => {
      const p = AppState.getRouteProgress(r.id);
      return { done: agg.done + p.done, total: agg.total + p.total };
    }, { done: 0, total: 0 });
    const pct = progress.total ? Math.round(progress.done / progress.total * 100) : 0;

    const statusColors = { 0: '#6b7280', 1: '#3b82f6', 100: '#10b981' };
    const statusLabel = pct === 100 ? 'Complete' : pct > 0 ? 'In Progress' : 'Standby';
    const iconBg = pct === 100 ? '#d1fae5' : pct > 0 ? '#dbeafe' : '#f3f4f6';
    const iconColor = pct === 100 ? '#10b981' : pct > 0 ? '#3b82f6' : '#6b7280';

    const assignedRouteIds = driverRoutes.map(r => r.id).join(', ') || '—';
    const assignedStaff = [...new Set(driverRoutes.map(r => {
      const s = STAFF_MEMBERS.find(st => st.id === r.staffId);
      return s ? s.name : '?';
    }))].join(', ') || '—';

    return `
    <div class="fleet-card">
      <div class="fleet-vehicle-icon" style="background:${iconBg};color:${iconColor};">
        <i class="ti ti-truck" style="font-size:26px;"></i>
      </div>
      <div class="fleet-info">
        <div class="fleet-vehicle-id">${driver.vehicle} — ${driver.vehicleName}</div>
        <div class="fleet-route-label">Driver: <b>${driver.name}</b></div>
        <div class="fleet-staff-driver">
          <span><i class="ti ti-route"></i> ${assignedRouteIds}</span>
          <span><i class="ti ti-user"></i> ${assignedStaff}</span>
          <span style="background:${iconBg};color:${iconColor};padding:2px 10px;border-radius:var(--r-full);font-weight:700;font-size:11px;">${statusLabel}</span>
        </div>
        <div style="margin-top:6px;font-size:12px;color:var(--text-secondary);display:flex;gap:14px;flex-wrap:wrap;">
          <span><i class="ti ti-map-pin text-blue"></i> Last location: <b>${driverRoutes.length ? driverRoutes[0].zone.split('—').pop().trim() + ' Depot' : 'Calicut Municipal Yard'}</b></span>
          <span><i class="ti ti-gas-station text-warning"></i> Operational · Fuel: <b>85%</b></span>
        </div>
        <div style="margin-top:6px;font-size:11px;color:var(--text-muted);background:#fef3c7;color:#92400e;display:inline-block;padding:2px 8px;border-radius:var(--r-full);">
          <i class="ti ti-info-circle"></i> Simulated status — live GPS not connected
        </div>
      </div>
      <div class="fleet-progress-wrap">
        <div class="fleet-progress-header">
          <span class="fleet-progress-label">Progress</span>
          <span class="fleet-progress-pct" style="color:${iconColor}">${pct}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%;background:${iconColor};"></div>
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:6px;text-align:right;">
          ${progress.done}/${progress.total} stops collected
        </div>
        <button class="btn" style="width:100%;margin-top:10px;font-size:12px;" onclick="openFleetReassign('${driver.id}')">
          <i class="ti ti-edit"></i> Reassign
        </button>
      </div>
    </div>`;
  }).join('');
}

function openFleetReassign(driverId) {
  // Populate fleet assign modal
  const routeSelect = document.getElementById('fleet-assign-route');
  const staffSelect = document.getElementById('fleet-assign-staff');
  const driverSelect = document.getElementById('fleet-assign-driver');
  if (!routeSelect) return;

  routeSelect.innerHTML = '<option value="">Select route...</option>' +
    ROUTES().map(r => `<option value="${r.id}">${r.id} — ${r.label}</option>`).join('');
  staffSelect.innerHTML = STAFF_MEMBERS.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  driverSelect.innerHTML = DRIVERS.map(d => `<option value="${d.id}" ${d.id === driverId ? 'selected' : ''}>${d.name} — ${d.vehicleName}</option>`).join('');

  openModal('assign-fleet-modal');
}

function saveFleetAssignment() {
  const routeId  = document.getElementById('fleet-assign-route')?.value;
  const staffId  = document.getElementById('fleet-assign-staff')?.value;
  const driverId = document.getElementById('fleet-assign-driver')?.value;
  if (!routeId) { showToast('Please select a route', 'warning'); return; }
  AppState.assignRoute(routeId, staffId, driverId);
  closeModal('assign-fleet-modal');
  renderFleetCards();
  renderRoutePanels();
  showToast('Fleet assignment updated', 'success');
}

// ─── ACTIONS ──────────────────────────────────────────
function scheduleCollection() {
  closeModal('bin-modal');
  showToast('Collection scheduled', 'success');
}

function triggerExport() {
  const bins = BINS();
  const rows = [['Bin ID','Zone','Fill %','Type','Temp','Odor','Battery','Collected','Last Collected']];
  bins.forEach(b => rows.push([b.id, b.zone, b.fill, b.type, b.temp, b.odor, b.bat, b.collected ? 'Yes' : 'No', b.time]));
  const csv = rows.map(r => r.join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = `envesus_bins_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  showToast('CSV export downloaded', 'success');
}

function saveSettings() {
  closeModal('settings-modal');
  showToast('Settings saved', 'success');
}

function resetDemo() {
  AppState.reset();
  closeModal('settings-modal');
  updateDashboardStats();
  renderTable();
  renderRoutePanels();
  renderFleetCards();
  showToast('Demo data reset to defaults', 'info');
}

// ─── CAMERAS ──────────────────────────────────────────
function initCameras() {
  const grid = document.getElementById('cam-grid-container');
  if (!grid) return;
  const cameras = BINS().slice(0, 8).map((b, i) => ({ id: `CAM-0${i+1}`, bin: b.id, zone: b.zone }));
  grid.innerHTML = cameras.map(cam => `
    <div class="cam-feed" onclick="showToast('Opening ${cam.id} fullscreen')">
      <canvas id="${cam.id}-canvas" width="320" height="180"></canvas>
      <div class="cam-overlay"></div>
      <div class="cam-live">● LIVE</div>
      <div class="cam-label">
        <div class="cam-name">${cam.id} — ${cam.bin}</div>
        <div class="cam-status">${cam.zone.split('—').pop().trim()}</div>
      </div>
    </div>`).join('');

  cameras.forEach(cam => {
    const canvas = document.getElementById(cam.id + '-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;
    const hue = Math.floor(Math.random() * 40 + 150);
    function draw() {
      ctx.fillStyle = `hsl(${hue},40%,${Math.floor(10 + Math.sin(t*0.04)*5)}%)`;
      ctx.fillRect(0, 0, 320, 180);
      for (let i = 0; i < 12; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`;
        ctx.fillRect(Math.random()*320, Math.random()*180, Math.random()*60+20, Math.random()*40+10);
      }
      ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.sin(t*0.1)*0.02})`;
      ctx.fillRect(0, t % 180, 320, 1);
      t++;
      requestAnimationFrame(draw);
    }
    draw();
  });
}

function downloadFootage() { showToast('Preparing footage download...', 'info'); }
function toggleRecording(btn) {
  const isRec = btn.classList.toggle('recording');
  btn.innerHTML = isRec ? '<i class="ti ti-player-stop"></i> Stop REC' : '<i class="ti ti-player-record"></i> REC All';
  showToast(isRec ? 'Recording started' : 'Recording stopped', isRec ? 'success' : 'info');
}

// ─── ANALYTICS CHARTS ─────────────────────────────────
function initCharts() {
  chartsInit = true;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'];
  const chartDefaults = { font: { family: "'Plus Jakarta Sans'" }, color: '#6b7280' };

  const barCtx = document.getElementById('analytics-bar');
  if (barCtx) new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        { label: 'Plastic', data: [42,38,55,61,48,52,67,71,58,65], backgroundColor: '#3b82f6', borderRadius: 6 },
        { label: 'Organic', data: [28,32,29,36,41,44,38,42,37,45], backgroundColor: '#10b981', borderRadius: 6 },
        { label: 'Dry Waste', data: [18,21,24,19,22,25,27,23,26,28], backgroundColor: '#f59e0b', borderRadius: 6 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: chartDefaults } }, scales: { x: { stacked: true, ticks: chartDefaults }, y: { stacked: true, ticks: chartDefaults } } },
  });

  const lineCtx = document.getElementById('analytics-line');
  if (lineCtx) new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['6am','9am','12pm','3pm','6pm','9pm'],
      datasets: [
        { label: 'Beach Zone', data: [22,35,61,78,88,72], borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', tension: 0.4, fill: true },
        { label: 'Bus Stands', data: [41,55,68,82,79,65], borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.1)', tension: 0.4, fill: true },
        { label: 'Mananchira', data: [18,28,44,56,61,52], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.4, fill: true },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: chartDefaults } }, scales: { x: { ticks: chartDefaults }, y: { min: 0, max: 100, ticks: chartDefaults } } },
  });

  const effCtx = document.getElementById('report-efficiency-chart');
  if (effCtx) new Chart(effCtx, {
    type: 'bar',
    data: { labels: months, datasets: [{ label: 'On-time %', data: [88,85,91,87,92,89,94,93,90,95], backgroundColor: '#10b981', borderRadius: 6 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: chartDefaults } }, scales: { y: { min: 80, max: 100, ticks: chartDefaults }, x: { ticks: chartDefaults } } },
  });

  const fuelCtx = document.getElementById('report-fuel-chart');
  if (fuelCtx) new Chart(fuelCtx, {
    type: 'line',
    data: { labels: months, datasets: [{ label: 'Liters', data: [340,320,310,295,280,265,270,258,245,240], borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', tension: 0.4, fill: true }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: chartDefaults } }, scales: { x: { ticks: chartDefaults }, y: { ticks: chartDefaults } } },
  });

  const carbonCtx = document.getElementById('report-carbon-chart');
  if (carbonCtx) new Chart(carbonCtx, {
    type: 'bar',
    data: { labels: months, datasets: [{ label: 'CO2e (tonnes)', data: [2.1,2.4,2.8,3.1,3.4,3.7,3.5,3.9,4.1,4.2], backgroundColor: 'rgba(16,185,129,0.7)', borderRadius: 6, borderColor: '#10b981', borderWidth: 1 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: chartDefaults } }, scales: { x: { ticks: chartDefaults }, y: { ticks: chartDefaults } } },
  });
}

// ─── ROLE SELECTOR ────────────────────────────────────
function populateRolePicker() {
  const staffOpts = document.getElementById('staff-options');
  const driverOpts = document.getElementById('driver-options');

  if (staffOpts) staffOpts.innerHTML = STAFF_MEMBERS.map(s => `
    <div class="role-option" onclick="selectRole('staff', '${s.id}')">
      <div class="role-option-avatar" style="background:linear-gradient(135deg,#10b981,#065f46)">${s.avatar}</div>
      <div>
        <div class="role-option-name">${s.name}</div>
        <div class="role-option-sub">${s.zone.split('—').pop().trim()}</div>
      </div>
      <i class="ti ti-arrow-right" style="color:rgba(255,255,255,0.3);margin-left:auto;"></i>
    </div>`).join('');

  if (driverOpts) driverOpts.innerHTML = DRIVERS.map(d => `
    <div class="role-option" onclick="selectRole('driver', '${d.id}')">
      <div class="role-option-avatar" style="background:linear-gradient(135deg,#f59e0b,#b45309)">${d.avatar}</div>
      <div>
        <div class="role-option-name">${d.name}</div>
        <div class="role-option-sub">${d.vehicleName}</div>
      </div>
      <i class="ti ti-arrow-right" style="color:rgba(255,255,255,0.3);margin-left:auto;"></i>
    </div>`).join('');
}

function toggleStaffPicker() {
  const picker = document.getElementById('staff-picker');
  const chevron = document.getElementById('staff-picker-chevron');
  const visible = picker.style.display !== 'none';
  picker.style.display = visible ? 'none' : 'block';
  chevron.className = visible ? 'ti ti-chevron-down' : 'ti ti-chevron-up';
  chevron.style.color = 'rgba(255,255,255,0.3)';
}

function toggleDriverPicker() {
  const picker = document.getElementById('driver-picker');
  const chevron = document.getElementById('driver-picker-chevron');
  const visible = picker.style.display !== 'none';
  picker.style.display = visible ? 'none' : 'block';
  chevron.className = visible ? 'ti ti-chevron-down' : 'ti ti-chevron-up';
  chevron.style.color = 'rgba(255,255,255,0.3)';
}

function openRoleOverlay() {
  populateRolePicker();
  const overlay = document.getElementById('role-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });
  }
}

function closeRoleOverlay() {
  const overlay = document.getElementById('role-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 300);
  }
}

function selectRole(role, userId) {
  AppState.setRole(role, userId);
  closeRoleOverlay();

  if (role === 'admin') {
    const app = document.getElementById('admin-app');
    if (app) app.style.display = 'flex';
    setTimeout(() => {
      initMainMap();
      updateDashboardStats();
      renderAlerts();
      initZoneChart();
      renderMiniBinGrid();
      renderTable();
    }, 200);
  } else if (role === 'staff') {
    window.location.href = userId ? `staff.html?staff=${userId}` : 'staff.html';
  } else if (role === 'driver') {
    window.location.href = userId ? `driver.html?driver=${userId}` : 'driver.html';
  }
}

// ─── SUBSCRIBE TO STATE CHANGES ───────────────────────
AppState.subscribe(() => {
  updateDashboardStats();
  renderTable();
  if (document.getElementById('tab-routes')?.classList.contains('active')) {
    renderRoutePanels();
    if (selectedRouteId) renderSingleRouteOnMap(selectedRouteId);
  }
  if (document.getElementById('tab-fleet')?.classList.contains('active')) {
    renderFleetCards();
  }
  if (mainMap) {
    mainMap.eachLayer(l => { if (l instanceof L.Marker) l.remove(); });
    renderMapMarkers();
  }
});

// ─── INIT ─────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  populateRolePicker();

  // Always show role selector fresh (so demo is easy to navigate)
  const overlay = document.getElementById('role-overlay');
  const adminApp = document.getElementById('admin-app');

  // If returning from staff/driver via #role-selector anchor
  if (hash === '#role-selector') {
    adminApp.style.display = 'none';
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    history.replaceState(null, '', window.location.pathname);
    return;
  }

  const savedRole = AppState.get('currentRole');
  if (savedRole === 'admin') {
    overlay.style.display = 'none';
    adminApp.style.display = 'flex';
    setTimeout(() => {
      initMainMap();
      updateDashboardStats();
      renderAlerts();
      initZoneChart();
      renderMiniBinGrid();
      renderTable();
    }, 100);
  } else {
    adminApp.style.display = 'none';
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
  }
});
