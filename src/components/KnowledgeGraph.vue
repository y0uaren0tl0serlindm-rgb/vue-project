<template>
  <div class="graph-container">
    <div class="header">
      <div class="header-left">
        <div class="header-subtitle">Network Ops</div>
        <div class="header-title">知识图谱</div>
      </div>
      <div class="stats">
        <div v-for="s in statList" :key="s.key" class="stat-item">
          <div class="stat-number" :style="{ color: s.color }">{{ stats[s.key] }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
      <div class="filters">
        <button
          v-for="f in filterList" :key="f.key"
          :class="['filter-btn', { active: filter === f.key }]"
          @click="filter = f.key"
        >{{ f.label }}</button>
      </div>
    </div>

    <div ref="containerRef" class="graph-area">
      <svg :width="svgWidth" :height="svgHeight"
        @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp">
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0d1929" />
            <stop offset="100%" stop-color="#0a0e1a" />
          </radialGradient>
          <radialGradient v-for="n in nodes" :key="`grad-${n.id}`" :id="`grad-${n.id}`" cx="50%" cy="50%" r="50%">
            <stop offset="0%" :stop-color="groupColors[n.group]" stop-opacity="0.9" />
            <stop offset="100%" :stop-color="groupColors[n.group]" stop-opacity="0.5" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect :width="svgWidth" :height="svgHeight" fill="url(#bgGrad)" />

        <circle v-for="(dot, i) in gridDots" :key="`dot-${i}`"
          :cx="dot.x" :cy="dot.y" r="0.8" fill="#1e2d3d" opacity="0.6" />

        <line v-for="(e, i) in visibleEdges" :key="`edge-${i}`"
          :x1="positions[e.source]?.x" :y1="positions[e.source]?.y"
          :x2="positions[e.target]?.x" :y2="positions[e.target]?.y"
          :stroke="selected === e.source || selected === e.target ? '#58a6ff' : '#1e2d3d'"
          :stroke-width="selected === e.source || selected === e.target ? 2 : 1"
          :opacity="selected === e.source || selected === e.target ? 0.9 : 0.5" />

        <g v-for="n in visibleNodes" :key="n.id"
          :transform="`translate(${positions[n.id]?.x ?? 0},${positions[n.id]?.y ?? 0})`"
          :style="{ cursor: dragging === n.id ? 'grabbing' : 'grab' }"
          @mousedown="(e) => onMouseDown(e, n.id)"
          @click="(e) => onNodeClick(e, n.id)">
          <circle v-if="selected === n.id" :r="(n.size||14)+8" fill="none"
            :stroke="groupColors[n.group]" stroke-width="2" opacity="0.4" filter="url(#glow-strong)" />
          <circle :r="(n.size||14)+3" fill="none" :stroke="groupColors[n.group]"
            stroke-width="1" :opacity="selected === n.id ? 0.8 : 0.2" />
          <circle :r="n.size||14" :fill="`url(#grad-${n.id})`"
            :stroke="groupColors[n.group]" :stroke-width="selected === n.id ? 2 : 1"
            :filter="selected === n.id ? 'url(#glow)' : undefined" />
          <circle v-if="n.status" :cx="(n.size||14)*0.6" :cy="-(n.size||14)*0.6"
            r="4" :fill="groupColors[n.group]" stroke="#0a0e1a" stroke-width="1.5" />
          <text text-anchor="middle" :dy="(n.size||14)+14"
            :font-size="n.id === 'network_ops' ? 11 : 9"
            :fill="selected === n.id ? '#f0f6fc' : '#8b949e'"
            font-family="'JetBrains Mono', monospace"
            style="user-select:none;pointer-events:none">{{ n.label }}</text>
        </g>
      </svg>

      <div v-if="selectedNode" class="detail-panel"
        :style="{ borderLeftColor: groupColors[selectedNode.group] }">
        <div class="detail-title">{{ selectedNode.label }}</div>
        <div v-if="selectedNode.status" class="detail-badge"
          :style="{ background: `${groupColors[selectedNode.group]}22`, color: groupColors[selectedNode.group] }">
          {{ statusLabels[selectedNode.status] }}
        </div>
        <div class="detail-meta">
          连接数：{{ edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).length }}
        </div>
      </div>

      <div class="legend">
        <div v-for="l in legendList" :key="l.label" class="legend-item">
          <div class="legend-dot" :style="{ background: l.color }" />
          <span class="legend-label">{{ l.label }}</span>
        </div>
      </div>

      <div class="hint">拖拽节点 · 点击查看详情</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const groupColors = {
  core: '#f5c518', osi: '#7eb8f7', done: '#4ade80', partial: '#fbbf24', todo: '#6b7280',
}
const statusLabels = { done: '已完成', partial: '进行中', todo: '未开始' }

const nodes = [
  { id: 'network_ops', label: '网络运维', group: 'core', size: 28 },
  { id: 'layer1', label: '物理层 L1', group: 'osi', size: 18 },
  { id: 'layer2', label: '数据链路层 L2', group: 'osi', size: 18 },
  { id: 'layer3', label: '网络层 L3', group: 'osi', size: 18 },
  { id: 'layer4', label: '传输层 L4', group: 'osi', size: 18 },
  { id: 'layer7', label: '应用层 L7', group: 'osi', size: 18 },
  { id: 'gns3', label: 'GNS3', group: 'done', size: 14, status: 'done' },
  { id: 'physical_link', label: '物理连线', group: 'done', size: 12, status: 'done' },
  { id: 'vlan', label: 'VLAN', group: 'done', size: 16, status: 'done' },
  { id: 'trunk', label: 'Trunk / dot1q', group: 'done', size: 14, status: 'done' },
  { id: 'stp', label: 'STP 生成树', group: 'todo', size: 14, status: 'todo' },
  { id: 'lacp', label: '链路聚合 LACP', group: 'todo', size: 14, status: 'todo' },
  { id: 'static_route', label: '静态路由', group: 'done', size: 15, status: 'done' },
  { id: 'ospf', label: 'OSPF', group: 'done', size: 16, status: 'done' },
  { id: 'bgp', label: 'BGP', group: 'done', size: 16, status: 'done' },
  { id: 'nat', label: 'NAT', group: 'done', size: 15, status: 'done' },
  { id: 'acl', label: 'ACL / iptables', group: 'done', size: 15, status: 'done' },
  { id: 'inter_vlan', label: 'Inter-VLAN', group: 'done', size: 14, status: 'done' },
  { id: 'qos', label: 'QoS', group: 'todo', size: 13, status: 'todo' },
  { id: 'mpls', label: 'MPLS', group: 'todo', size: 13, status: 'todo' },
  { id: 'tcp_ip', label: 'TCP/IP', group: 'done', size: 15, status: 'done' },
  { id: 'wireshark', label: 'Wireshark 抓包', group: 'done', size: 15, status: 'done' },
  { id: 'netmiko', label: 'Netmiko 自动化', group: 'done', size: 15, status: 'done' },
  { id: 'ansible', label: 'Ansible', group: 'todo', size: 14, status: 'todo' },
  { id: 'python_net', label: 'Python 网络自动化', group: 'partial', size: 15, status: 'partial' },
  { id: 'monitoring', label: '监控体系', group: 'todo', size: 18 },
  { id: 'zabbix', label: 'Zabbix', group: 'todo', size: 13, status: 'todo' },
  { id: 'prometheus', label: 'Prometheus', group: 'todo', size: 13, status: 'todo' },
  { id: 'grafana', label: 'Grafana', group: 'todo', size: 13, status: 'todo' },
  { id: 'troubleshoot', label: '排障方法论', group: 'partial', size: 16, status: 'partial' },
  { id: 'fault_sim', label: '故障模拟训练', group: 'todo', size: 13, status: 'todo' },
  { id: 'systematic', label: '系统化流程', group: 'todo', size: 13, status: 'todo' },
  { id: 'cert', label: '认证路线', group: 'todo', size: 16 },
  { id: 'ccna', label: 'CCNA', group: 'todo', size: 13, status: 'todo' },
  { id: 'hcip', label: 'HCIP-Datacom', group: 'todo', size: 13, status: 'todo' },
]

const edges = [
  { source: 'network_ops', target: 'layer1' },
  { source: 'network_ops', target: 'layer2' },
  { source: 'network_ops', target: 'layer3' },
  { source: 'network_ops', target: 'layer4' },
  { source: 'network_ops', target: 'layer7' },
  { source: 'network_ops', target: 'monitoring' },
  { source: 'network_ops', target: 'troubleshoot' },
  { source: 'network_ops', target: 'cert' },
  { source: 'layer1', target: 'gns3' },
  { source: 'layer1', target: 'physical_link' },
  { source: 'layer2', target: 'vlan' },
  { source: 'layer2', target: 'trunk' },
  { source: 'layer2', target: 'stp' },
  { source: 'layer2', target: 'lacp' },
  { source: 'vlan', target: 'trunk' },
  { source: 'vlan', target: 'inter_vlan' },
  { source: 'layer3', target: 'static_route' },
  { source: 'layer3', target: 'ospf' },
  { source: 'layer3', target: 'bgp' },
  { source: 'layer3', target: 'nat' },
  { source: 'layer3', target: 'acl' },
  { source: 'layer3', target: 'inter_vlan' },
  { source: 'layer3', target: 'qos' },
  { source: 'layer3', target: 'mpls' },
  { source: 'static_route', target: 'ospf' },
  { source: 'ospf', target: 'bgp' },
  { source: 'layer4', target: 'tcp_ip' },
  { source: 'layer4', target: 'wireshark' },
  { source: 'layer7', target: 'netmiko' },
  { source: 'layer7', target: 'ansible' },
  { source: 'layer7', target: 'python_net' },
  { source: 'netmiko', target: 'python_net' },
  { source: 'python_net', target: 'ansible' },
  { source: 'monitoring', target: 'zabbix' },
  { source: 'monitoring', target: 'prometheus' },
  { source: 'monitoring', target: 'grafana' },
  { source: 'prometheus', target: 'grafana' },
  { source: 'troubleshoot', target: 'wireshark' },
  { source: 'troubleshoot', target: 'fault_sim' },
  { source: 'troubleshoot', target: 'systematic' },
  { source: 'cert', target: 'ccna' },
  { source: 'cert', target: 'hcip' },
]

const containerRef = ref(null)
const svgWidth = ref(800)
const svgHeight = ref(600)
const positions = ref({})
const selected = ref(null)
const filter = ref('all')
const dragging = ref(null)
const dragOffset = { x: 0, y: 0 }
const dragMoved = ref(false)
let animFrame = null
const posRef = { current: {} }
const velRef = { current: {} }
const pinnedRef = { current: new Set() }

const filterList = [
  { key: 'all', label: '全部' }, { key: 'done', label: '已完成' },
  { key: 'partial', label: '进行中' }, { key: 'todo', label: '未开始' },
]
const statList = [
  { key: 'done', label: '已完成', color: '#4ade80' },
  { key: 'partial', label: '进行中', color: '#fbbf24' },
  { key: 'todo', label: '未开始', color: '#6b7280' },
]
const legendList = [
  { color: '#f5c518', label: '核心' }, { color: '#7eb8f7', label: 'OSI 层级' },
  { color: '#4ade80', label: '已完成' }, { color: '#fbbf24', label: '进行中' },
  { color: '#6b7280', label: '未开始' },
]

const stats = computed(() => ({
  done: nodes.filter(n => n.status === 'done').length,
  partial: nodes.filter(n => n.status === 'partial').length,
  todo: nodes.filter(n => n.status === 'todo').length,
}))

const visibleNodes = computed(() => {
  if (filter.value === 'all') return nodes
  if (filter.value === 'done') return nodes.filter(n => n.status === 'done')
  if (filter.value === 'partial') return nodes.filter(n => n.status === 'partial')
  return nodes.filter(n => n.status === 'todo' || !n.status)
})

const visibleIds = computed(() => new Set(visibleNodes.value.map(n => n.id)))
const visibleEdges = computed(() =>
  edges.filter(e => visibleIds.value.has(e.source) && visibleIds.value.has(e.target))
)
const selectedNode = computed(() => nodes.find(n => n.id === selected.value))
const gridDots = computed(() => {
  const dots = []
  for (let i = 0; i < Math.floor(svgWidth.value / 40); i++)
    for (let j = 0; j < Math.floor(svgHeight.value / 40); j++)
      dots.push({ x: (i + 0.5) * 40, y: (j + 0.5) * 40 })
  return dots
})

function onMouseDown(e, id) {
  e.preventDefault()
  dragging.value = id
  dragMoved.value = false
  const p = posRef.current[id]
  const rect = containerRef.value.querySelector('svg').getBoundingClientRect()
  dragOffset.x = e.clientX - rect.left - p.x
  dragOffset.y = e.clientY - rect.top - p.y
  pinnedRef.current.add(id)
}

function onMouseMove(e) {
  if (!dragging.value) return
  dragMoved.value = true
  const rect = containerRef.value.querySelector('svg').getBoundingClientRect()
  posRef.current[dragging.value] = {
    x: Math.max(50, Math.min(svgWidth.value - 50, e.clientX - rect.left - dragOffset.x)),
    y: Math.max(50, Math.min(svgHeight.value - 50, e.clientY - rect.top - dragOffset.y)),
  }
  velRef.current[dragging.value] = { x: 0, y: 0 }
  positions.value = { ...posRef.current }
}

function onMouseUp() {
  if (dragging.value) {
    pinnedRef.current.delete(dragging.value)
    dragging.value = null
  }
}

function onNodeClick(e, id) {
  if (!dragMoved.value) selected.value = selected.value === id ? null : id
}

function initSimulation() {
  const w = svgWidth.value
  const h = svgHeight.value
  const cx = w / 2, cy = h / 2
  const angleMap = {
    layer1: 0, layer2: Math.PI * 0.4, layer3: Math.PI * 0.8,
    layer4: Math.PI * 1.2, layer7: Math.PI * 1.6,
    monitoring: Math.PI * 0.9, troubleshoot: Math.PI * 1.3, cert: Math.PI * 1.7,
  }
  const pos = {}, vel = {}
  nodes.forEach((n, i) => {
    if (n.id === 'network_ops') { pos[n.id] = { x: cx, y: cy } }
    else if (angleMap[n.id] !== undefined) {
      pos[n.id] = { x: cx + Math.cos(angleMap[n.id]) * 180, y: cy + Math.sin(angleMap[n.id]) * 180 }
    } else {
      const a = i * 2.399963
      const r = 100 + (i % 6) * 55
      pos[n.id] = { x: Math.max(50, Math.min(w-50, cx + Math.cos(a)*r)), y: Math.max(50, Math.min(h-50, cy + Math.sin(a)*r)) }
    }
    vel[n.id] = { x: 0, y: 0 }
  })
  posRef.current = pos
  velRef.current = vel
  positions.value = { ...pos }

  let alpha = 1
  const simulate = () => {
    if (alpha > 0.005) {
      alpha *= 0.985
      const p = posRef.current, v = velRef.current, pin = pinnedRef.current
      nodes.forEach(a => {
        if (pin.has(a.id)) return
        nodes.forEach(b => {
          if (a.id === b.id) return
          const dx = p[a.id].x - p[b.id].x, dy = p[a.id].y - p[b.id].y
          const d = Math.sqrt(dx*dx + dy*dy) || 1
          const s = (5000 / (d*d)) * alpha
          v[a.id].x += (dx/d)*s; v[a.id].y += (dy/d)*s
        })
      })
      edges.forEach(e => {
        const pa = p[e.source], pb = p[e.target]
        if (!pa || !pb) return
        const dx = pb.x-pa.x, dy = pb.y-pa.y
        const d = Math.sqrt(dx*dx+dy*dy)||1
        const f = ((d-130)/d)*0.25*alpha
        if (!pin.has(e.source)) { v[e.source].x += dx*f; v[e.source].y += dy*f }
        if (!pin.has(e.target)) { v[e.target].x -= dx*f; v[e.target].y -= dy*f }
      })
      nodes.forEach(n => {
        if (pin.has(n.id) || n.id === 'network_ops') return
        v[n.id].x += (cx - p[n.id].x) * 0.004 * alpha
        v[n.id].y += (cy - p[n.id].y) * 0.004 * alpha
        v[n.id].x *= 0.75; v[n.id].y *= 0.75
        p[n.id].x = Math.max(50, Math.min(w-50, p[n.id].x + v[n.id].x))
        p[n.id].y = Math.max(50, Math.min(h-50, p[n.id].y + v[n.id].y))
      })
      if (p['network_ops']) { p['network_ops'].x = cx; p['network_ops'].y = cy }
      positions.value = { ...p }
    }
    animFrame = requestAnimationFrame(simulate)
  }
  animFrame = requestAnimationFrame(simulate)
}

onMounted(() => {
  if (containerRef.value) {
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      svgWidth.value = width; svgHeight.value = height
    })
    ro.observe(containerRef.value)
    svgWidth.value = containerRef.value.clientWidth
    svgHeight.value = containerRef.value.clientHeight
  }
  initSimulation()
})
onUnmounted(() => { if (animFrame) cancelAnimationFrame(animFrame) })
</script>

<style scoped>
.graph-container { width:100vw; height:100vh; background:#0a0e1a; font-family:'JetBrains Mono','Cascadia Code',monospace; color:#c9d1d9; display:flex; flex-direction:column; overflow:hidden; }
.header { padding:12px 24px; border-bottom:1px solid #1e2d3d; display:flex; align-items:center; justify-content:space-between; background:rgba(10,14,26,0.95); flex-shrink:0; }
.header-subtitle { font-size:13px; color:#58a6ff; letter-spacing:3px; text-transform:uppercase; }
.header-title { font-size:20px; font-weight:700; color:#f0f6fc; margin-top:2px; }
.stats { display:flex; gap:20px; }
.stat-item { text-align:center; }
.stat-number { font-size:22px; font-weight:700; }
.stat-label { font-size:10px; color:#8b949e; margin-top:2px; }
.filters { display:flex; gap:6px; }
.filter-btn { padding:4px 12px; border-radius:4px; border:1px solid #30363d; background:transparent; color:#8b949e; font-size:11px; cursor:pointer; font-family:inherit; transition:all 0.2s; }
.filter-btn.active { border-color:#58a6ff; background:rgba(88,166,255,0.15); color:#58a6ff; }
.graph-area { flex:1; position:relative; overflow:hidden; }
.detail-panel { position:absolute; bottom:20px; left:20px; background:rgba(13,19,35,0.95); border:1px solid #1e2d3d; border-left:3px solid; border-radius:8px; padding:14px 18px; min-width:220px; backdrop-filter:blur(12px); box-shadow:0 4px 24px rgba(0,0,0,0.5); }
.detail-title { font-size:14px; font-weight:700; color:#f0f6fc; margin-bottom:6px; }
.detail-badge { display:inline-block; padding:2px 8px; border-radius:4px; font-size:10px; margin-bottom:8px; }
.detail-meta { font-size:10px; color:#6b7280; }
.legend { position:absolute; bottom:20px; right:20px; background:rgba(13,19,35,0.9); border:1px solid #1e2d3d; border-radius:8px; padding:12px 16px; backdrop-filter:blur(8px); }
.legend-item { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
.legend-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.legend-label { font-size:10px; color:#8b949e; }
.hint { position:absolute; top:12px; left:50%; transform:translateX(-50%); font-size:10px; color:#30363d; pointer-events:none; }
</style>
