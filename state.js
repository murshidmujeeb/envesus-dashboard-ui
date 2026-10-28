// ═══════════════════════════════════════════════════
// ENVESUS SMART WASTE — SHARED FRONTEND STATE
// Single source of truth for all three dashboards
// ═══════════════════════════════════════════════════

const CARTO_API_KEY = 'cb1_4uvs_1_f0e4596920d16f3e3e84916b';

// ─── ZONE DEFINITIONS ───────────────────────────────
const ZONES = {
  'Beach — Main Front Footpath': { color: '#3b82f6', label: 'Beach Promenade',     icon: 'ti-wave-sine' },
  'Private Bus Stand':           { color: '#8b5cf6', label: 'Private Bus Stand',    icon: 'ti-bus' },
  'Beach — Back of Starbucks':   { color: '#06b6d4', label: 'Beach Starbucks Walk', icon: 'ti-coffee' },
  'Beach — Food Kiosk Area':     { color: '#f59e0b', label: 'Beach Food Kiosk',     icon: 'ti-tool-kitchen-2' },
  'KSRTC Terminal':              { color: '#ef4444', label: 'KSRTC Terminal',        icon: 'ti-building-bus' },
  'Mananchira Square':           { color: '#10b981', label: 'Mananchira Square',     icon: 'ti-tree' },
  'Beach — Open Theatre Area':   { color: '#f97316', label: 'Open Theatre',         icon: 'ti-theater' },
};

// ─── STAFF & DRIVERS ────────────────────────────────
const STAFF_MEMBERS = [
  { id: 'ST-01', name: 'Arun Kumar',   role: 'Collection Staff', zone: 'Beach — Main Front Footpath', avatar: 'AK', phone: '+91 94471 11234' },
  { id: 'ST-02', name: 'Priya Nair',   role: 'Collection Staff', zone: 'Private Bus Stand',           avatar: 'PN', phone: '+91 94471 22345' },
  { id: 'ST-03', name: 'Rajan Pillai', role: 'Collection Staff', zone: 'Beach — Back of Starbucks',   avatar: 'RP', phone: '+91 94471 33456' },
  { id: 'ST-04', name: 'Meera Devi',   role: 'Collection Staff', zone: 'Beach — Food Kiosk Area',     avatar: 'MD', phone: '+91 94471 44567' },
  { id: 'ST-05', name: 'Suresh Babu',  role: 'Collection Staff', zone: 'KSRTC Terminal',              avatar: 'SB', phone: '+91 94471 55678' },
  { id: 'ST-06', name: 'Latha Menon',  role: 'Collection Staff', zone: 'Mananchira Square',           avatar: 'LM', phone: '+91 94471 66789' },
  { id: 'ST-07', name: 'Vishnu Das',   role: 'Collection Staff', zone: 'Beach — Open Theatre Area',   avatar: 'VD', phone: '+91 94471 77890' },
];

const DRIVERS = [
  { id: 'DR-01', name: 'Saji Mathew',   vehicle: 'KL-11-BC-5521', vehicleName: 'Truck Alpha', avatar: 'SM', phone: '+91 98471 11234' },
  { id: 'DR-02', name: 'Thomas Kurien', vehicle: 'KL-11-BC-5522', vehicleName: 'Truck Beta',  avatar: 'TK', phone: '+91 98471 22345' },
  { id: 'DR-03', name: 'Bindu Anto',    vehicle: 'KL-11-BC-5523', vehicleName: 'Truck Gamma', avatar: 'BA', phone: '+91 98471 33456' },
  { id: 'DR-04', name: 'George Philip', vehicle: 'KL-11-BC-5524', vehicleName: 'Truck Delta', avatar: 'GP', phone: '+91 98471 44567' },
];

// ─── BIN DATA ───────────────────────────────────────
const BINS_DATA = [
  { id: 'CB-001', name: 'Beach Promenade #1',  zone: 'Beach — Main Front Footpath', lat: 11.250885,  lng: 75.7714416, fill: 37, type: 'Plastic',  temp: 29, odor: 22, bat: 83, time: '2h ago',  cam: 'CAM-01' },
  { id: 'CB-002', name: 'Beach Promenade #2',  zone: 'Beach — Main Front Footpath', lat: 11.25126,   lng: 75.771228,  fill: 54, type: 'Mixed',    temp: 30, odor: 29, bat: 96, time: '3h ago',  cam: 'CAM-02' },
  { id: 'CB-003', name: 'Beach Promenade #3',  zone: 'Beach — Main Front Footpath', lat: 11.251116,  lng: 75.771277,  fill: 74, type: 'Dry',      temp: 32, odor: 48, bat: 81, time: '4h ago',  cam: 'CAM-03' },
  { id: 'CB-004', name: 'Beach Promenade #4',  zone: 'Beach — Main Front Footpath', lat: 11.25093,   lng: 75.771349,  fill: 48, type: 'Plastic',  temp: 28, odor: 18, bat: 94, time: '5h ago',  cam: 'CAM-04' },
  { id: 'CB-005', name: 'Beach Promenade #5',  zone: 'Beach — Main Front Footpath', lat: 11.251356,  lng: 75.7712031, fill: 25, type: 'Plastic',  temp: 29, odor: 25, bat: 79, time: '6h ago',  cam: 'CAM-05' },
  { id: 'CB-006', name: 'Beach Promenade #6',  zone: 'Beach — Main Front Footpath', lat: 11.251782,  lng: 75.7710573, fill: 42, type: 'Mixed',    temp: 30, odor: 32, bat: 92, time: '45m ago', cam: 'CAM-06' },
  { id: 'CB-007', name: 'Beach Promenade #7',  zone: 'Beach — Main Front Footpath', lat: 11.252208,  lng: 75.7709114, fill: 59, type: 'Dry',      temp: 31, odor: 39, bat: 77, time: '2h ago',  cam: 'CAM-07' },
  { id: 'CB-008', name: 'Beach Promenade #8',  zone: 'Beach — Main Front Footpath', lat: 11.252634,  lng: 75.7707655, fill: 95, type: 'Plastic',  temp: 37, odor: 83, bat: 90, time: '3h ago',  cam: 'CAM-08' },
  { id: 'CB-009', name: 'Beach Promenade #9',  zone: 'Beach — Main Front Footpath', lat: 11.253060,  lng: 75.7706197, fill: 53, type: 'Plastic',  temp: 29, odor: 28, bat: 75, time: '4h ago',  cam: 'CAM-09' },
  { id: 'CB-010', name: 'Beach Promenade #10', zone: 'Beach — Main Front Footpath', lat: 11.253486,  lng: 75.7704738, fill: 30, type: 'Mixed',    temp: 30, odor: 35, bat: 88, time: '5h ago',  cam: 'CAM-10' },
  { id: 'CB-011', name: 'Beach Promenade #11', zone: 'Beach — Main Front Footpath', lat: 11.253912,  lng: 75.770328,  fill: 68, type: 'Dry',      temp: 34, odor: 56, bat: 73, time: '6h ago',  cam: 'CAM-11' },
  { id: 'CB-012', name: 'Beach Promenade #12', zone: 'Beach — Main Front Footpath', lat: 11.254338,  lng: 75.7701821, fill: 24, type: 'Plastic',  temp: 28, odor: 24, bat: 86, time: '45m ago', cam: 'CAM-12' },
  { id: 'CB-013', name: 'Private Bus Stand #1',  zone: 'Private Bus Stand', lat: 11.2584107, lng: 75.7868887, fill: 41, type: 'Mixed',   temp: 29, odor: 31, bat: 71, time: '2h ago',  cam: 'CAM-13' },
  { id: 'CB-014', name: 'Private Bus Stand #2',  zone: 'Private Bus Stand', lat: 11.2584826, lng: 75.7870353, fill: 88, type: 'Dry',     temp: 37, odor: 89, bat: 84, time: '3h ago',  cam: 'CAM-14' },
  { id: 'CB-015', name: 'Private Bus Stand #3',  zone: 'Private Bus Stand', lat: 11.2585634, lng: 75.7869162, fill: 35, type: 'Organic', temp: 31, odor: 20, bat: 97, time: '4h ago',  cam: 'CAM-15' },
  { id: 'CB-016', name: 'Private Bus Stand #4',  zone: 'Private Bus Stand', lat: 11.2586353, lng: 75.7870261, fill: 52, type: 'Mixed',   temp: 28, odor: 27, bat: 82, time: '5h ago',  cam: 'CAM-16' },
  { id: 'CB-017', name: 'Private Bus Stand #5',  zone: 'Private Bus Stand', lat: 11.2589522, lng: 75.7874917, fill: 29, type: 'Mixed',   temp: 29, odor: 34, bat: 95, time: '6h ago',  cam: 'CAM-17' },
  { id: 'CB-018', name: 'Private Bus Stand #6',  zone: 'Private Bus Stand', lat: 11.2590241, lng: 75.7876383, fill: 46, type: 'Dry',     temp: 30, odor: 16, bat: 80, time: '45m ago', cam: 'CAM-18' },
  { id: 'CB-019', name: 'Private Bus Stand #7',  zone: 'Private Bus Stand', lat: 11.2591049, lng: 75.7875192, fill: 76, type: 'Organic', temp: 33, odor: 49, bat: 93, time: '2h ago',  cam: 'CAM-19' },
  { id: 'CB-020', name: 'Private Bus Stand #8',  zone: 'Private Bus Stand', lat: 11.2591768, lng: 75.7876291, fill: 40, type: 'Mixed',   temp: 28, odor: 30, bat: 78, time: '3h ago',  cam: 'CAM-20' },
  { id: 'CB-021', name: 'Private Bus Stand #9',  zone: 'Private Bus Stand', lat: 11.2582392, lng: 75.7863767, fill: 57, type: 'Mixed',   temp: 29, odor: 37, bat: 91, time: '4h ago',  cam: 'CAM-20' },
  { id: 'CB-022', name: 'Private Bus Stand #10', zone: 'Private Bus Stand', lat: 11.2583111, lng: 75.7865233, fill: 34, type: 'Dry',     temp: 30, odor: 19, bat: 76, time: '5h ago',  cam: 'CAM-20' },
  { id: 'CB-023', name: 'Private Bus Stand #11', zone: 'Private Bus Stand', lat: 11.2583919, lng: 75.7864042, fill: 51, type: 'Organic', temp: 31, odor: 26, bat: 89, time: '6h ago',  cam: 'CAM-20' },
  { id: 'CB-024', name: 'Private Bus Stand #12', zone: 'Private Bus Stand', lat: 11.2584638, lng: 75.7865141, fill: 28, type: 'Mixed',   temp: 28, odor: 33, bat: 74, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-025', name: 'Starbucks Beach Walk #1', zone: 'Beach — Back of Starbucks', lat: 11.2485781, lng: 75.7723073, fill: 45, type: 'Dry',     temp: 29, odor: 15, bat: 87, time: '2h ago',  cam: 'CAM-20' },
  { id: 'CB-026', name: 'Starbucks Beach Walk #2', zone: 'Beach — Back of Starbucks', lat: 11.2490561, lng: 75.7721262, fill: 22, type: 'Plastic', temp: 30, odor: 22, bat: 72, time: '3h ago',  cam: 'CAM-20' },
  { id: 'CB-027', name: 'Starbucks Beach Walk #3', zone: 'Beach — Back of Starbucks', lat: 11.249534,  lng: 75.7719452, fill: 82, type: 'Mixed',   temp: 35, odor: 87, bat: 85, time: '4h ago',  cam: 'CAM-20' },
  { id: 'CB-028', name: 'Starbucks Beach Walk #4', zone: 'Beach — Back of Starbucks', lat: 11.250012,  lng: 75.7717641, fill: 56, type: 'Dry',     temp: 28, odor: 36, bat: 70, time: '5h ago',  cam: 'CAM-20' },
  { id: 'CB-029', name: 'Starbucks Beach Walk #5', zone: 'Beach — Back of Starbucks', lat: 11.250393,  lng: 75.7716792, fill: 33, type: 'Dry',     temp: 29, odor: 18, bat: 83, time: '6h ago',  cam: 'CAM-20' },
  { id: 'CB-030', name: 'Starbucks Beach Walk #6', zone: 'Beach — Back of Starbucks', lat: 11.250296,  lng: 75.7717754, fill: 62, type: 'Plastic', temp: 32, odor: 45, bat: 96, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-031', name: 'Starbucks Beach Walk #7', zone: 'Beach — Back of Starbucks', lat: 11.250199,  lng: 75.7718717, fill: 27, type: 'Mixed',   temp: 31, odor: 32, bat: 81, time: '2h ago',  cam: 'CAM-20' },
  { id: 'CB-032', name: 'Starbucks Beach Walk #8', zone: 'Beach — Back of Starbucks', lat: 11.250102,  lng: 75.7719679, fill: 44, type: 'Dry',     temp: 28, odor: 39, bat: 94, time: '3h ago',  cam: 'CAM-20' },
  { id: 'CB-033', name: 'Beach Food Kiosk #1', zone: 'Beach — Food Kiosk Area', lat: 11.256659, lng: 75.769689, fill: 21, type: 'Organic', temp: 29, odor: 21, bat: 79, time: '4h ago',  cam: 'CAM-20' },
  { id: 'CB-034', name: 'Beach Food Kiosk #2', zone: 'Beach — Food Kiosk Area', lat: 11.256396, lng: 75.769764, fill: 38, type: 'Mixed',   temp: 30, odor: 28, bat: 92, time: '5h ago',  cam: 'CAM-20' },
  { id: 'CB-035', name: 'Beach Food Kiosk #3', zone: 'Beach — Food Kiosk Area', lat: 11.256134, lng: 75.769839, fill: 91, type: 'Organic', temp: 37, odor: 80, bat: 77, time: '6h ago',  cam: 'CAM-20' },
  { id: 'CB-036', name: 'Beach Food Kiosk #4', zone: 'Beach — Food Kiosk Area', lat: 11.255871, lng: 75.769914, fill: 32, type: 'Plastic', temp: 28, odor: 17, bat: 90, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-037', name: 'Beach Food Kiosk #5', zone: 'Beach — Food Kiosk Area', lat: 11.255609, lng: 75.76999,  fill: 49, type: 'Organic', temp: 29, odor: 24, bat: 75, time: '2h ago',  cam: 'CAM-20' },
  { id: 'CB-038', name: 'Beach Food Kiosk #6', zone: 'Beach — Food Kiosk Area', lat: 11.255346, lng: 75.770065, fill: 26, type: 'Mixed',   temp: 30, odor: 31, bat: 88, time: '3h ago',  cam: 'CAM-20' },
  { id: 'CB-039', name: 'Beach Food Kiosk #7', zone: 'Beach — Food Kiosk Area', lat: 11.255084, lng: 75.77014,  fill: 43, type: 'Organic', temp: 31, odor: 38, bat: 73, time: '4h ago',  cam: 'CAM-20' },
  { id: 'CB-040', name: 'Beach Food Kiosk #8', zone: 'Beach — Food Kiosk Area', lat: 11.254821, lng: 75.770215, fill: 71, type: 'Plastic', temp: 33, odor: 55, bat: 86, time: '5h ago',  cam: 'CAM-20' },
  { id: 'CB-041', name: 'KSRTC Terminal #1', zone: 'KSRTC Terminal', lat: 11.2594302, lng: 75.7821496, fill: 37, type: 'Mixed',   temp: 29, odor: 27, bat: 71, time: '6h ago',  cam: 'CAM-20' },
  { id: 'CB-042', name: 'KSRTC Terminal #2', zone: 'KSRTC Terminal', lat: 11.2594547, lng: 75.7823698, fill: 54, type: 'Plastic', temp: 30, odor: 34, bat: 84, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-043', name: 'KSRTC Terminal #3', zone: 'KSRTC Terminal', lat: 11.2594804, lng: 75.7826003, fill: 85, type: 'Dry',     temp: 36, odor: 88, bat: 97, time: '2h ago',  cam: 'CAM-20' },
  { id: 'CB-044', name: 'KSRTC Terminal #4', zone: 'KSRTC Terminal', lat: 11.2595049, lng: 75.7828205, fill: 48, type: 'Mixed',   temp: 28, odor: 23, bat: 82, time: '3h ago',  cam: 'CAM-20' },
  { id: 'CB-045', name: 'KSRTC Terminal #5', zone: 'KSRTC Terminal', lat: 11.2592663, lng: 75.7821802, fill: 25, type: 'Mixed',   temp: 29, odor: 30, bat: 95, time: '4h ago',  cam: 'CAM-20' },
  { id: 'CB-046', name: 'KSRTC Terminal #6', zone: 'KSRTC Terminal', lat: 11.2592885, lng: 75.7823987, fill: 42, type: 'Plastic', temp: 30, odor: 37, bat: 80, time: '5h ago',  cam: 'CAM-20' },
  { id: 'CB-047', name: 'KSRTC Terminal #7', zone: 'KSRTC Terminal', lat: 11.2593117, lng: 75.7826275, fill: 65, type: 'Dry',     temp: 34, odor: 47, bat: 93, time: '6h ago',  cam: 'CAM-20' },
  { id: 'CB-048', name: 'KSRTC Terminal #8', zone: 'KSRTC Terminal', lat: 11.2593339, lng: 75.782846,  fill: 36, type: 'Mixed',   temp: 28, odor: 26, bat: 78, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-049', name: 'Mananchira Square #1', zone: 'Mananchira Square', lat: 11.255512, lng: 75.779431, fill: 53, type: 'Organic', temp: 29, odor: 33, bat: 91, time: '2h ago',  cam: 'CAM-20' },
  { id: 'CB-050', name: 'Mananchira Square #2', zone: 'Mananchira Square', lat: 11.255594, lng: 75.780143, fill: 30, type: 'Mixed',   temp: 30, odor: 15, bat: 76, time: '3h ago',  cam: 'CAM-20' },
  { id: 'CB-051', name: 'Mananchira Square #3', zone: 'Mananchira Square', lat: 11.255391, lng: 75.780633, fill: 47, type: 'Plastic', temp: 31, odor: 22, bat: 89, time: '4h ago',  cam: 'CAM-20' },
  { id: 'CB-052', name: 'Mananchira Square #4', zone: 'Mananchira Square', lat: 11.25485,  lng: 75.78135,  fill: 89, type: 'Dry',     temp: 36, odor: 82, bat: 74, time: '5h ago',  cam: 'CAM-20' },
  { id: 'CB-053', name: 'Mananchira Square #5', zone: 'Mananchira Square', lat: 11.253736, lng: 75.782029, fill: 41, type: 'Organic', temp: 29, odor: 36, bat: 87, time: '6h ago',  cam: 'CAM-20' },
  { id: 'CB-054', name: 'Mananchira Square #6', zone: 'Mananchira Square', lat: 11.253822, lng: 75.779524, fill: 58, type: 'Mixed',   temp: 30, odor: 18, bat: 72, time: '45m ago', cam: 'CAM-20' },
  { id: 'CB-055', name: 'Mananchira Square #7', zone: 'Mananchira Square', lat: 11.253952, lng: 75.780748, fill: 35, type: 'Plastic', temp: 31, odor: 25, bat: 85, time: '2h ago',  cam: 'CAM-20' },
  { id: 'CB-056', name: 'Open Theatre Beach #1', zone: 'Beach — Open Theatre Area', lat: 11.2584112, lng: 75.7688667, fill: 52, type: 'Plastic', temp: 28, odor: 32, bat: 70, time: '3h ago',  cam: 'CAM-20' },
  { id: 'CB-057', name: 'Open Theatre Beach #2', zone: 'Beach — Open Theatre Area', lat: 11.2584471, lng: 75.7690224, fill: 29, type: 'Mixed',   temp: 29, odor: 39, bat: 83, time: '4h ago',  cam: 'CAM-20' },
  { id: 'CB-058', name: 'Open Theatre Beach #3', zone: 'Beach — Open Theatre Area', lat: 11.258519,  lng: 75.7688301, fill: 70, type: 'Dry',     temp: 33, odor: 58, bat: 96, time: '5h ago',  cam: 'CAM-20' },
  { id: 'CB-059', name: 'Open Theatre Beach #4', zone: 'Beach — Open Theatre Area', lat: 11.2585639, lng: 75.768995,  fill: 23, type: 'Organic', temp: 31, odor: 28, bat: 81, time: '6h ago',  cam: 'CAM-20' },
  { id: 'CB-060', name: 'Open Theatre Beach #5', zone: 'Beach — Open Theatre Area', lat: 11.2586088, lng: 75.7689217, fill: 40, type: 'Plastic', temp: 28, odor: 35, bat: 94, time: '45m ago', cam: 'CAM-20' },
];

// ─── SHARED STATE ─────────────────────────────────────
// Persisted to localStorage under key 'envesus_state'

const DEFAULT_STATE = {
  // All 60 bins with collection status
  bins: BINS_DATA.map(b => ({ ...b, collected: false, collectedAt: null, collectedBy: null })),

  // Routes: each has an id, zone, binIds (ordered by nearest-neighbour), staff, driver, status
  routes: [
    {
      id: 'RT-01', label: 'Beach Promenade Route',
      zone: 'Beach — Main Front Footpath',
      binIds: ['CB-008','CB-003','CB-011','CB-007','CB-009','CB-002','CB-001','CB-006','CB-004','CB-010','CB-005','CB-012'],
      staffId: 'ST-01', driverId: 'DR-01',
      status: 'active', // active | dispatched | complete
      color: '#3b82f6',
    },
    {
      id: 'RT-02', label: 'Private Bus Stand Route',
      zone: 'Private Bus Stand',
      binIds: ['CB-014','CB-019','CB-021','CB-023','CB-016','CB-013','CB-022','CB-024','CB-015','CB-020','CB-018','CB-017'],
      staffId: 'ST-02', driverId: 'DR-02',
      status: 'active',
      color: '#8b5cf6',
    },
    {
      id: 'RT-03', label: 'Beach Starbucks Walk Route',
      zone: 'Beach — Back of Starbucks',
      binIds: ['CB-027','CB-030','CB-028','CB-032','CB-031','CB-029','CB-025','CB-026'],
      staffId: 'ST-03', driverId: 'DR-03',
      status: 'active',
      color: '#06b6d4',
    },
    {
      id: 'RT-04', label: 'Food Kiosk Route',
      zone: 'Beach — Food Kiosk Area',
      binIds: ['CB-035','CB-040','CB-033','CB-034','CB-036','CB-037','CB-038','CB-039'],
      staffId: 'ST-04', driverId: 'DR-04',
      status: 'active',
      color: '#f59e0b',
    },
    {
      id: 'RT-05', label: 'KSRTC Terminal Route',
      zone: 'KSRTC Terminal',
      binIds: ['CB-043','CB-047','CB-042','CB-046','CB-041','CB-045','CB-044','CB-048'],
      staffId: 'ST-05', driverId: 'DR-01',
      status: 'active',
      color: '#ef4444',
    },
    {
      id: 'RT-06', label: 'Mananchira Square Route',
      zone: 'Mananchira Square',
      binIds: ['CB-052','CB-054','CB-049','CB-050','CB-051','CB-053','CB-055'],
      staffId: 'ST-06', driverId: 'DR-02',
      status: 'active',
      color: '#10b981',
    },
    {
      id: 'RT-07', label: 'Open Theatre Route',
      zone: 'Beach — Open Theatre Area',
      binIds: ['CB-058','CB-056','CB-057','CB-059','CB-060'],
      staffId: 'ST-07', driverId: 'DR-03',
      status: 'active',
      color: '#f97316',
    },
  ],

  // Demo session role
  currentRole: 'admin', // admin | staff | driver
  currentStaffId: 'ST-01',
  currentDriverId: 'DR-01',

  lastReset: new Date().toISOString(),
};

// ─── STATE MANAGEMENT ────────────────────────────────
const AppState = (() => {
  const STORAGE_KEY = 'envesus_state_v3';
  let _state = null;
  const _listeners = [];

  function _load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge to handle new fields
        _state = {
          ...DEFAULT_STATE,
          ...parsed,
          bins: parsed.bins || DEFAULT_STATE.bins,
          routes: parsed.routes || DEFAULT_STATE.routes,
        };
      } else {
        _state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
    } catch (e) {
      _state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  }

  function _save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(_state)); } catch (e) {}
  }

  function _notify() {
    _listeners.forEach(fn => { try { fn(_state); } catch (e) {} });
  }

  return {
    init() {
      _load();
      if (typeof window !== 'undefined') {
        window.addEventListener('storage', (e) => {
          if (e.key === STORAGE_KEY) {
            _load();
            _notify();
          }
        });
      }
    },

    get(key) {
      if (!_state) _load();
      return key ? _state[key] : _state;
    },

    getBins() { return _state.bins; },
    getBin(id) { return _state.bins.find(b => b.id === id); },
    getRoutes() { return _state.routes; },
    getRoute(id) { return _state.routes.find(r => r.id === id); },

    getBinsForZone(zone) {
      return _state.bins.filter(b => b.zone === zone);
    },

    getBinsForRoute(routeId) {
      const route = this.getRoute(routeId);
      if (!route) return [];
      return route.binIds.map(id => _state.bins.find(b => b.id === id)).filter(Boolean);
    },

    getRouteProgress(routeId) {
      const bins = this.getBinsForRoute(routeId);
      const done = bins.filter(b => b.collected).length;
      return { total: bins.length, done, remaining: bins.length - done, pct: bins.length ? Math.round(done / bins.length * 100) : 0 };
    },

    getStaffRoutes(staffId) {
      return _state.routes.filter(r => r.staffId === staffId);
    },

    getDriverRoutes(driverId) {
      return _state.routes.filter(r => r.driverId === driverId);
    },

    // Collect a bin (staff action)
    collectBin(binId, staffId) {
      const bin = _state.bins.find(b => b.id === binId);
      if (!bin) return false;
      bin.collected = true;
      bin.collectedAt = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      bin.collectedBy = staffId;
      _save();
      _notify();
      return true;
    },

    // Undo collect (for demo reset)
    uncollectBin(binId) {
      const bin = _state.bins.find(b => b.id === binId);
      if (!bin) return;
      bin.collected = false;
      bin.collectedAt = null;
      bin.collectedBy = null;
      _save();
      _notify();
    },

    // Assign staff/driver to route
    assignRoute(routeId, staffId, driverId) {
      const route = _state.routes.find(r => r.id === routeId);
      if (!route) return;
      if (staffId) route.staffId = staffId;
      if (driverId) route.driverId = driverId;
      _save();
      _notify();
    },

    // Update route order (nearest-neighbour result)
    updateRouteBins(routeId, orderedBinIds) {
      const route = _state.routes.find(r => r.id === routeId);
      if (!route) return;
      route.binIds = orderedBinIds;
      _save();
      _notify();
    },

    // Update route status
    setRouteStatus(routeId, status) {
      const route = _state.routes.find(r => r.id === routeId);
      if (!route) return;
      route.status = status;
      _save();
      _notify();
    },

    // Role switching
    setRole(role, userId) {
      _state.currentRole = role;
      if (role === 'staff') _state.currentStaffId = userId;
      if (role === 'driver') _state.currentDriverId = userId;
      _save();
      _notify();
    },

    // Subscribe to changes
    subscribe(fn) { _listeners.push(fn); },

    // Reset demo to defaults
    reset() {
      localStorage.removeItem(STORAGE_KEY);
      _state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      _save();
      _notify();
    },
  };
})();

// ─── NEAREST-NEIGHBOUR ROUTE OPTIMISER ───────────────
function nearestNeighbour(bins) {
  if (!bins || bins.length === 0) return [];
  // Sort: prioritise critical bins first as starting candidates
  const critical = bins.filter(b => b.fill >= 80).sort((a, b) => b.fill - a.fill);
  const rest = bins.filter(b => b.fill < 80);
  const pool = [...critical, ...rest].map(b => ({ ...b }));

  const dist = (a, b) => Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));

  const ordered = [pool.shift()];
  while (pool.length > 0) {
    const last = ordered[ordered.length - 1];
    let minD = Infinity, minI = 0;
    pool.forEach((b, i) => { const d = dist(last, b); if (d < minD) { minD = d; minI = i; } });
    ordered.push(pool.splice(minI, 1)[0]);
  }
  return ordered.map(b => b.id);
}

// ─── CARTO TILE URL ──────────────────────────────────
function getCartoTileUrl() {
  return `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`;
}

// ─── UTILS ───────────────────────────────────────────
function getFillColor(v)  { return v >= 80 ? 'var(--critical)' : v >= 50 ? 'var(--warning)' : 'var(--success)'; }
function getFillHex(v)    { return v >= 80 ? '#dc2626' : v >= 50 ? '#d97706' : '#16a34a'; }
function getBadgeClass(v) { return v >= 80 ? 'badge-critical' : v >= 50 ? 'badge-warning' : 'badge-success'; }
function getStatusLabel(v){ return v >= 80 ? 'Critical' : v >= 50 ? 'Warning' : 'Normal'; }

function estimateDistance(bins) {
  if (!bins || bins.length < 2) return '—';
  let total = 0;
  for (let i = 1; i < bins.length; i++) {
    const a = bins[i - 1], b = bins[i];
    const dlat = (b.lat - a.lat) * 111000;
    const dlng = (b.lng - a.lng) * 111000 * Math.cos(a.lat * Math.PI / 180);
    total += Math.sqrt(dlat * dlat + dlng * dlng);
  }
  return (total / 1000).toFixed(1) + ' km (est.)';
}

function estimateDuration(bins) {
  if (!bins || bins.length < 2) return '—';
  let d = 0;
  for (let i = 1; i < bins.length; i++) {
    const a = bins[i - 1], b = bins[i];
    const dlat = (b.lat - a.lat) * 111000;
    const dlng = (b.lng - a.lng) * 111000 * Math.cos(a.lat * Math.PI / 180);
    d += Math.sqrt(dlat * dlat + dlng * dlng);
  }
  const mins = Math.round((d / 1000) * 4 + bins.length * 3); // 4min/km + 3min per stop
  return mins < 60 ? `${mins} min` : `${Math.floor(mins/60)}h ${mins%60}m`;
}

// Initialise on load
AppState.init();
