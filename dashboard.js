// ═══ DATA ═══
const BINS = [
  {id:'CB-001',name:'Mananchira Square',zone:'Mananchira',lat:11.2588,lng:75.7804,fill:92,type:'Mixed',temp:34,odor:62,bat:71,time:'3h ago',cam:'CAM-01'},
  {id:'CB-002',name:'SM Street Entrance',zone:'SM Street',lat:11.2590,lng:75.7820,fill:45,type:'Organic',temp:31,odor:28,bat:88,time:'1h ago',cam:'CAM-02'},
  {id:'CB-003',name:'Palayam Market',zone:'Palayam',lat:11.2532,lng:75.7804,fill:87,type:'Organic',temp:38,odor:75,bat:45,time:'5h ago',cam:'CAM-03'},
  {id:'CB-004',name:'Kottakkal Junction',zone:'Kottakkal',lat:11.2620,lng:75.7900,fill:25,type:'Dry',temp:30,odor:15,bat:95,time:'30m ago',cam:'CAM-04'},
  {id:'CB-005',name:'Calicut Beach',zone:'Calicut Beach',lat:11.2670,lng:75.7730,fill:81,type:'Plastic',temp:31,odor:38,bat:78,time:'4h ago',cam:'CAM-05'},
  {id:'CB-006',name:'Mavoor Road Signal',zone:'Mavoor Road',lat:11.2700,lng:75.7850,fill:68,type:'Mixed',temp:33,odor:45,bat:82,time:'2h ago',cam:'CAM-06'},
  {id:'CB-007',name:'Medical College Gate',zone:'Medical College',lat:11.2680,lng:75.8100,fill:55,type:'Medical',temp:28,odor:20,bat:90,time:'1h ago',cam:'CAM-07'},
  {id:'CB-008',name:'Nadakkavu Circle',zone:'Nadakkavu',lat:11.2520,lng:75.7900,fill:95,type:'Mixed',temp:36,odor:80,bat:30,time:'8h ago',cam:'CAM-08'},
  {id:'CB-009',name:'Railway Station',zone:'Palayam',lat:11.2505,lng:75.7813,fill:76,type:'Mixed',temp:34,odor:50,bat:65,time:'3h ago',cam:'CAM-09'},
  {id:'CB-010',name:'KSRTC Bus Stand',zone:'Mavoor Road',lat:11.2710,lng:75.7840,fill:89,type:'Mixed',temp:35,odor:65,bat:55,time:'6h ago',cam:'CAM-10'},
  {id:'CB-011',name:'Focus Mall',zone:'Mavoor Road',lat:11.2650,lng:75.7820,fill:42,type:'Plastic',temp:30,odor:22,bat:89,time:'1h ago',cam:'CAM-11'},
  {id:'CB-012',name:'Tali Temple Pond',zone:'Palayam',lat:11.2480,lng:75.7850,fill:35,type:'Organic',temp:29,odor:18,bat:92,time:'45m ago',cam:'CAM-12'},
  {id:'CB-013',name:'Sarovaram Bio Park',zone:'Eranjipalam',lat:11.2660,lng:75.7950,fill:20,type:'Dry',temp:28,odor:10,bat:98,time:'20m ago',cam:'CAM-13'},
  {id:'CB-014',name:'Hilite Mall Junction',zone:'Thondayad',lat:11.2550,lng:75.8200,fill:72,type:'Mixed',temp:32,odor:40,bat:75,time:'2h ago',cam:'CAM-14'},
  {id:'CB-015',name:'MIMS Hospital',zone:'Mini Bypass',lat:11.2450,lng:75.8050,fill:60,type:'Medical',temp:29,odor:25,bat:85,time:'1.5h ago',cam:'CAM-15'},
  {id:'CB-016',name:'West Hill Barracks',zone:'West Hill',lat:11.2800,lng:75.7700,fill:15,type:'Mixed',temp:27,odor:8,bat:99,time:'10m ago',cam:'CAM-16'},
  {id:'CB-017',name:'Vellayil Harbor',zone:'Vellayil',lat:11.2750,lng:75.7650,fill:88,type:'Organic',temp:35,odor:70,bat:40,time:'7h ago',cam:'CAM-17'},
  {id:'CB-018',name:'Meenchanda',zone:'Bypass',lat:11.2300,lng:75.7900,fill:54,type:'Mixed',temp:31,odor:30,bat:80,time:'1h ago',cam:'CAM-18'},
  {id:'CB-019',name:'Cyberpark',zone:'Thondayad',lat:11.2580,lng:75.8300,fill:33,type:'Plastic',temp:29,odor:15,bat:94,time:'30m ago',cam:'CAM-19'},
  {id:'CB-020',name:'Bhatt Road Beach',zone:'West Hill',lat:11.2850,lng:75.7600,fill:79,type:'Mixed',temp:32,odor:45,bat:68,time:'3h ago',cam:'CAM-20'},
];
for(let i=21;i<=50;i++){
  const c=Math.random()>0.8;
  BINS.push({id:`CB-${String(i).padStart(3,'0')}`,name:`Street Sector ${i}`,zone:['Mananchira','SM Street','Palayam','Kottakkal','Calicut Beach'][Math.floor(Math.random()*5)],lat:11.25+(Math.random()*0.04-0.02),lng:75.78+(Math.random()*0.04-0.02),fill:c?Math.floor(80+Math.random()*20):Math.floor(10+Math.random()*60),type:['Mixed','Organic','Plastic','Dry'][Math.floor(Math.random()*4)],temp:Math.floor(28+Math.random()*10),odor:c?Math.floor(50+Math.random()*40):Math.floor(10+Math.random()*30),bat:Math.floor(40+Math.random()*60),time:`${Math.floor(1+Math.random()*5)}h ago`,cam:`CAM-${i}`});
}

const ALERTS = [
  {type:'critical',title:'CB-008 Critical Overflow',desc:'Nadakkavu Circle bin reached 95%. High odor detected.',time:'2m ago'},
  {type:'critical',title:'CB-001 High Fill Rate',desc:'Mananchira Square bin filling unusually fast.',time:'15m ago'},
  {type:'warning',title:'CB-003 Temperature Alert',desc:'Palayam Market bin temp reading 38°C.',time:'32m ago'},
  {type:'info',title:'Route Optimization',desc:'System suggests merging Route 2 and 4 based on traffic.',time:'1h ago'}
];

const FLEET = [
  {id:'KL-11-BC-5521',name:'Truck Alpha (North)',status:'En Route',progress:65},
  {id:'KL-11-BC-5522',name:'Truck Beta (Market)',status:'Collecting',progress:40},
  {id:'KL-11-BC-5523',name:'Truck Gamma (Beach)',status:'Returning',progress:90},
  {id:'KL-11-BC-5524',name:'Truck Delta (Standby)',status:'Idle',progress:0}
];

// ═══ UTILS ═══
function getFillColor(v){return v>=80?'var(--critical)':v>=50?'var(--warning)':'var(--success)';}
function getFillHex(v){return v>=80?'#dc2626':v>=50?'#d97706':'#16a34a';}
function getBadge(v){return v>=80?'badge-critical':v>=50?'badge-warning':'badge-success';}
function getStatus(v){return v>=80?'Critical':v>=50?'Warning':'Normal';}

function showToast(msg,type='info'){
  const c=document.getElementById('toast-container'),t=document.createElement('div');
  t.className=`toast ${type}`;
  const icons={success:'ti-check',warning:'ti-alert-triangle',error:'ti-x',info:'ti-info-circle'};
  t.innerHTML=`<i class="ti ${icons[type]||icons.info}"></i><span>${msg}</span>`;
  c.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),350);},3000);
}

// ═══ TAB SWITCHING ═══
function switchTab(tabId){
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('tab-'+tabId).classList.add('active');
  const nav=document.querySelector(`.nav-item[onclick="switchTab('${tabId}')"]`);
  if(nav)nav.classList.add('active');
  const titles={dashboard:'Overview Dashboard',monitoring:'Real-Time Bin Status',routes:'AI Route Optimization',analytics:'Data Analytics & Trends',cameras:'Surveillance Network',alerts:'Notification Center',fleet:'Fleet Status',reports:'Executive Reports & Dashboards'};
  document.getElementById('page-title').innerText=titles[tabId] || 'Overview Dashboard';
  if(tabId==='routes' && !routeMapInit) setTimeout(initRouteMap,100);
  if(tabId==='analytics'&&!chartsInit)initCharts();
}

// ═══ MODALS ═══
function openModal(id,binId=null){
  if(binId){
    const b=BINS.find(x=>x.id===binId);
    document.getElementById('modal-bin-title').innerHTML=`${b.id} — ${b.name}`;
    document.getElementById('modal-content').innerHTML=`
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
            <div><span class="text-muted">Odor</span><div class="fw-600 ${b.odor>50?'text-critical':'text-success'}">${b.odor} AQI</div></div>
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
function closeModal(id){document.getElementById(id).classList.remove('active');}

// ═══ BUTTON HANDLERS ═══
function triggerExport(){showToast('Generating CSV report...','info');setTimeout(()=>showToast('Report downloaded!','success'),1500);}
function saveSettings(){closeModal('settings-modal');showToast('Settings saved.','success');}
function scheduleCollection(){closeModal('bin-modal');showToast('Pickup prioritized.','success');}
function dispatchAllRoutes(){showToast('Routes dispatched to GPS units.','success');}
function downloadFootage(){showToast('Compiling footage logs...','info');setTimeout(()=>showToast('Archive (1.2GB) downloading.','success'),2000);}
function toggleRecording(btn){
  if(btn.innerText.includes('REC')){btn.innerHTML='<i class="ti ti-player-stop"></i> Stop';btn.style.background='var(--bg)';btn.style.color='var(--text)';btn.style.borderColor='var(--border)';showToast('Recording enabled.','warning');}
  else{btn.innerHTML='<i class="ti ti-player-record"></i> REC All';btn.style.background='var(--critical)';btn.style.color='#fff';btn.style.borderColor='var(--critical)';showToast('Recording stopped.','info');}
}

// ═══ RENDERERS ═══
function renderDashboard(){
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
    if(a.type === 'critical') { bg = 'var(--critical-bg)'; color = 'var(--critical)'; icon = 'ti-alert-triangle'; }
    if(a.type === 'warning') { bg = 'var(--warning-bg)'; color = 'var(--warning)'; icon = 'ti-alert-circle'; }
    
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
  document.getElementById('dash-alerts-list').innerHTML=html;
  const fa=document.getElementById('full-alerts-list');if(fa)fa.innerHTML=html;
  // Fleet
  const fl=document.getElementById('fleet-list');
  if(fl)fl.innerHTML=FLEET.map(f=>`<div class="list-item"><div class="list-icon info"><i class="ti ti-truck"></i></div><div class="list-content"><div class="list-title">${f.name} <span class="badge ${f.progress>0?'badge-success':'badge-neutral'}" style="margin-left:8px">${f.status}</span></div><div class="progress-bar" style="margin-top:8px;max-width:300px;"><div class="progress-fill" style="width:${f.progress}%;background:var(--info);"></div></div></div><div class="fw-600" style="color:var(--info)">${f.progress}%</div></div>`).join('');
  renderTable();renderCameras();
}

function renderTable(search=''){
  const zone=document.getElementById('filter-zone')?.value;
  const status=document.getElementById('filter-status')?.value;
  let f=BINS;
  if(zone)f=f.filter(b=>b.zone===zone);
  if(status==='critical')f=f.filter(b=>b.fill>=80);
  else if(status==='warning')f=f.filter(b=>b.fill>=50&&b.fill<80);
  else if(status==='normal')f=f.filter(b=>b.fill<50);
  if(search){const s=search.toLowerCase();f=f.filter(b=>b.id.toLowerCase().includes(s)||b.name.toLowerCase().includes(s)||b.zone.toLowerCase().includes(s));}
  const tb=document.getElementById('bin-table-body');if(!tb)return;
  tb.innerHTML=f.map(b=>`<tr onclick="openModal('bin-modal','${b.id}')"><td class="font-mono fw-600" style="color:var(--primary)">${b.id}</td><td><div class="fw-600">${b.name}</div><div style="font-size:11px;color:var(--text-muted)">${b.zone}</div></td><td><div class="progress-wrap"><div class="progress-bar" style="width:80px"><div class="progress-fill" style="width:${b.fill}%;background:${getFillColor(b.fill)}"></div></div><span class="progress-text" style="color:${getFillHex(b.fill)}">${b.fill}%</span></div></td><td>${b.type}</td><td><div style="font-size:11px"><i class="ti ti-temperature text-warning"></i> ${b.temp}°C</div><div style="font-size:11px"><i class="ti ti-battery-3 text-success"></i> ${b.bat}%</div></td><td class="text-muted">${b.time}</td><td><span class="badge ${getBadge(b.fill)}">${getStatus(b.fill)}</span></td><td><button class="btn btn-sm" onclick="event.stopPropagation();scheduleCollection()"><i class="ti ti-truck"></i> Pick</button></td></tr>`).join('');
}

let searchTimeout;
function handleSearch(v){clearTimeout(searchTimeout);searchTimeout=setTimeout(()=>{switchTab('monitoring');renderTable(v);},300);}

function renderCameras(){
  const c=document.getElementById('cam-grid-container');if(!c)return;
  c.innerHTML=Array(8).fill(0).map((_,i)=>`<div class="cam-feed" onclick="showToast('Camera ${i+1} fullscreen view','info')"><canvas id="cam-${i}"></canvas><div class="cam-overlay"></div><div style="position:absolute;top:10px;left:12px;color:#fff;font-size:14px"><i class="ti ti-video"></i></div><div class="cam-live">● LIVE</div><div class="cam-label"><div class="cam-name">CAM-0${i+1} · ${BINS[i].name}</div><div class="cam-status">1080p · 30fps</div></div></div>`).join('');
  setTimeout(()=>{for(let i=0;i<8;i++){const cv=document.getElementById(`cam-${i}`);if(cv){const ctx=cv.getContext('2d');cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;ctx.fillStyle='#0f172a';ctx.fillRect(0,0,cv.width,cv.height);ctx.strokeStyle='rgba(255,255,255,0.08)';for(let j=0;j<cv.width;j+=18){ctx.beginPath();ctx.moveTo(j,0);ctx.lineTo(j,cv.height);ctx.stroke();}ctx.fillStyle='rgba(255,255,255,0.15)';ctx.fillRect(cv.width/2-20,cv.height/2,40,cv.height/2);}}},150);
}

// ═══ MAPS ═══
let mainMap,routeMap,routeMapInit=false;

function initMainMap(){
  mainMap=L.map('map', { scrollWheelZoom: false }).setView([11.260,75.780],13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OpenStreetMap & CartoDB',maxZoom:19}).addTo(mainMap);
  const bounds = L.latLngBounds();
  BINS.forEach(b=>{
    const col=getFillHex(b.fill);
    const icon=L.divIcon({className:'',html:`<div style="width:26px;height:26px;background:${col};border-radius:50%;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700;">${b.fill}</div>`,iconSize:[26,26],iconAnchor:[13,13]});
    L.marker([b.lat,b.lng],{icon}).addTo(mainMap).bindPopup(`<div style="min-width:170px;font-family:Inter,sans-serif"><div style="font-weight:600;font-size:14px;margin-bottom:2px">${b.name}</div><div style="font-size:11px;color:#64748b;margin-bottom:8px">${b.id} · ${b.zone}</div><div class="badge ${getBadge(b.fill)}" style="margin-bottom:8px">${b.fill}% Full</div><br><button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;margin-top:4px" onclick="openModal('bin-modal','${b.id}')">View Details</button></div>`);
    bounds.extend([b.lat,b.lng]);
  });
  if(BINS.length > 0) mainMap.fitBounds(bounds, { padding: [30, 30] });
}

function initRouteMap(){
  routeMapInit=true;
  routeMap=L.map('route-map', { scrollWheelZoom: false }).setView([11.260,75.780],13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{maxZoom:19}).addTo(routeMap);
  const crit=BINS.filter(b=>b.fill>=80).slice(0,5);
  if(crit.length<2)return;
  crit.forEach((b,i)=>{const icon=L.divIcon({className:'',html:`<div style="width:24px;height:24px;background:var(--primary);border-radius:50%;border:2px solid #fff;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;box-shadow:0 2px 6px rgba(0,0,0,.2)">${i+1}</div>`,iconSize:[24,24],iconAnchor:[12,12]});L.marker([b.lat,b.lng],{icon}).bindPopup(`Stop ${i+1}: ${b.name}`).addTo(routeMap);});
  const coords=crit.map(b=>`${b.lng},${b.lat}`).join(';');
  showToast('Calculating road routes via OSRM...','info');
  fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`)
    .then(r=>r.json()).then(data=>{
      if(data.code!=='Ok')throw new Error('OSRM Error');
      const route=data.routes[0];
      L.geoJSON(route.geometry,{style:{color:'#0d9488',weight:5,opacity:.75,dashArray:'10,6'}}).addTo(routeMap);
      const km=(route.distance/1000).toFixed(1),mins=Math.round(route.duration/60);
      document.getElementById('route-cards-container').innerHTML=`
        <div class="route-card"><div class="route-color" style="background:var(--critical)"></div><div class="route-details"><div class="route-header"><div class="route-title">Priority Route Alpha</div><span class="badge badge-critical">Dispatch Ready</span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0;font-size:12px"><div><i class="ti ti-ruler-2 text-muted"></i> <b>${km} km</b> (Road)</div><div><i class="ti ti-clock text-muted"></i> <b>~${mins} min</b></div><div><i class="ti ti-map-pin text-muted"></i> <b>${crit.length} Stops</b></div><div><i class="ti ti-truck text-muted"></i> KL-11-BC-5521</div></div><div style="font-size:11px;color:var(--text-muted);border-top:1px solid var(--border);padding-top:8px"><b>Path:</b> ${crit.map(b=>b.name.split(' ')[0]).join(' → ')}</div><button class="btn btn-primary btn-sm" style="width:100%;margin-top:10px;justify-content:center" onclick="dispatchAllRoutes()">Dispatch</button></div></div>
        <div class="route-card" style="opacity:.5"><div class="route-color" style="background:var(--warning)"></div><div class="route-details"><div class="route-header"><div class="route-title">Secondary Route Beta</div><span class="badge badge-warning">Building...</span></div><div style="font-size:12px;margin-top:6px" class="text-muted">Awaiting more bins to hit warning threshold.</div></div></div>`;
      routeMap.fitBounds(L.latLngBounds(crit.map(b=>[b.lat,b.lng])),{padding:[50,50]});
    }).catch(()=>{showToast('Routing API failed. Using fallback.','error');L.polyline(crit.map(b=>[b.lat,b.lng]),{color:'#0d9488',weight:4,dashArray:'5,5'}).addTo(routeMap);});
}

// ═══ CHARTS ═══
let chartsInit=false;
function initCharts(){
  chartsInit=true;
  Chart.defaults.font.family="'Plus Jakarta Sans',sans-serif";
  Chart.defaults.color='#6b7280';
  
  const zc = document.getElementById('zoneChart');
  if(zc) {
    new Chart(zc, {
      type: 'doughnut',
      data: {
        labels: ['Mananchira','SM Street','Palayam','Kottakkal','Others'],
        datasets: [{
          data: [25, 20, 15, 10, 30],
          backgroundColor: ['#111827', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'],
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
          legend: { position: 'right', labels: { boxWidth: 10, font: { size: 12 } } },
          tooltip: { enabled: true }
        }
      }
    });
  }

  const ab = document.getElementById('analytics-bar');
  if(ab) {
    new Chart(ab, {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
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
          y: { grid: { color: '#f3f4f6' }, border: { dash: [4,4] } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }
  
  const al = document.getElementById('analytics-line');
  if(al) {
    const ctx = al.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
    
    new Chart(al, {
      type: 'line',
      data: {
        labels: ['Now','+4h','+8h','+12h','+16h','+20h','+24h'],
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
            borderDash: [5,5],
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
  if(rcEff) {
    new Chart(rcEff, {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [
          { label: 'Target', data: [95, 95, 95, 95, 95, 95], type: 'line', borderColor: '#ef4444', borderWidth: 2, pointRadius: 0, borderDash: [5,5] },
          { label: 'Actual (%)', data: [88, 92, 90, 96, 94, 98], backgroundColor: '#10b981', borderRadius: 4 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 80, max: 100 } } }
    });
  }

  const rcFuel = document.getElementById('report-fuel-chart');
  if(rcFuel) {
    new Chart(rcFuel, {
      type: 'line',
      data: {
        labels: ['Week 1','Week 2','Week 3','Week 4'],
        datasets: [{ label: 'Liters Consumed', data: [1200, 1150, 1080, 980], borderColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.1)', fill: true, tension: 0.4 }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const rcCarb = document.getElementById('report-carbon-chart');
  if(rcCarb) {
    new Chart(rcCarb, {
      type: 'bar',
      data: {
        labels: ['Zone A','Zone B','Zone C','Zone D'],
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
    if(avgFillEl) avgFillEl.innerText = '45%';
    if(criticalEl) criticalEl.innerText = '2';
    showToast('Data updated to Today\'s metrics');
  } else if (range === 'week') {
    if(avgFillEl) avgFillEl.innerText = '58%';
    if(criticalEl) criticalEl.innerText = '5';
    showToast('Data updated to This Week\'s metrics');
  } else if (range === 'month') {
    if(avgFillEl) avgFillEl.innerText = '62%';
    if(criticalEl) criticalEl.innerText = '7';
    showToast('Data updated to This Month\'s metrics');
  }
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded',()=>{
  renderDashboard();initMainMap();initCharts();
  document.querySelectorAll('.modal-overlay').forEach(el=>{el.addEventListener('click',e=>{if(e.target===el)el.classList.remove('active');});});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal-overlay.active').forEach(m=>m.classList.remove('active'));});
});
