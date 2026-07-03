<template>
  <div class="info-page">

    <!-- 顶部状态栏 -->
    <div class="status-bar">
      <div class="server-status">
        <div class="pulse-dot"></div>
        <span class="server-name">sisyphus</span>
        <span class="server-online">ONLINE</span>
      </div>
      <div class="time-display">{{ timeStr }}</div>
    </div>

    <div class="grid">

      <!-- 网络学习进度 -->
      <div class="panel panel-wide">
        <div class="panel-title">// 网络学习路径</div>
        <div class="roadmap">
          <div
            v-for="(step, i) in roadmap"
            :key="i"
            class="roadmap-item"
            :class="step.status"
          >
            <div class="roadmap-dot"></div>
            <div class="roadmap-content">
              <span class="roadmap-name">{{ step.name }}</span>
              <span class="roadmap-status-label">{{ roadmapLabel[step.status] }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快捷工具 -->
      <div class="panel">
        <div class="panel-title">// 工具</div>
        <div class="tools-grid">
          <a
            v-for="tool in tools"
            :key="tool.name"
            :href="tool.link"
            target="_blank"
            class="tool-btn"
          >
            <span class="tool-icon">{{ tool.icon }}</span>
            <span class="tool-name">{{ tool.name }}</span>
          </a >
        </div>
      </div>

      <!-- 常用命令 -->
      <div class="panel">
        <div class="panel-title">// 速查命令</div>
        <div class="cmd-list">
          <div
            v-for="cmd in commands"
            :key="cmd.cmd"
            class="cmd-item"
            @click="copyCmd(cmd.cmd)"
            :class="{ copied: copiedCmd === cmd.cmd }"
            title="点击复制"
          >
            <div class="cmd-label">{{ cmd.label }}</div>
            <code class="cmd-code">{{ cmd.cmd }}</code>
            <span class="cmd-copy">{{ copiedCmd === cmd.cmd ? '✓' : '⎘' }}</span>
          </div>
        </div>
      </div>

      <!-- IP 备忘 -->
      <div class="panel">
        <div class="panel-title">// 地址备忘</div>
        <div class="ip-list">
          <div class="ip-item" v-for="ip in ipList" :key="ip.label">
            <span class="ip-label">{{ ip.label }}</span>
            <code class="ip-addr">{{ ip.addr }}</code>
            <span class="ip-note">{{ ip.note }}</span>
          </div>
        </div>
      </div>

      <!-- 待办 -->
      <div class="panel">
        <div class="panel-title">// 待处理</div>
        <div class="todo-list">
          <div
            v-for="todo in todos"
            :key="todo.text"
            class="todo-item"
            :class="{ done: todo.done }"
            @click="todo.done = !todo.done"
          >
            <div class="todo-check">{{ todo.done ? '✓' : '○' }}</div>
            <span class="todo-text">{{ todo.text }}</span>
            <span class="todo-tag" :style="{ color: tagColor[todo.tag] }">{{ todo.tag }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const now = ref(new Date())
let timer
onMounted(() => { timer = setInterval(() => now.value = new Date(), 1000) })
onUnmounted(() => clearInterval(timer))

const timeStr = computed(() =>
  now.value.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
)

const roadmap = [
  { name: '静态路由', status: 'done' },
  { name: 'OSPF', status: 'done' },
  { name: 'BGP', status: 'current' },
  { name: 'VLAN / Trunk', status: 'done' },
  { name: 'ACL', status: 'done' },
  { name: 'NAT', status: 'done' },
  { name: 'Wireshark 抓包', status: 'done' },
  { name: 'Python / Netmiko 自动化', status: 'pending' },
]

const roadmapLabel = { done: '✓ 完成', current: '▶ 进行中', pending: '○ 待学' }

const tools = [
  { name: 'GNS3', icon: '🖧', link: 'http://localhost:3080' },
  { name: '笔记服务', icon: '📄', link: 'http://101.37.12.221:8080' },
  { name: 'Tailscale', icon: '🔒', link: 'https://login.tailscale.com' },
  { name: '企微开发文档', icon: '📋', link: 'https://developer.work.weixin.qq.com' },
  { name: 'Vue 文档', icon: '💚', link: 'https://cn.vuejs.org' },
  { name: 'FRR 文档', icon: '🌐', link: 'https://docs.frrouting.org' },
]

const commands = [
  { label: 'SSH 连服务器', cmd: 'ssh sisyphus@sisyphus' },
  { label: '查看路由表', cmd: 'ip route show' },
  { label: 'Ping 测试', cmd: 'ping -c 4 8.8.8.8' },
  { label: '端口监听', cmd: 'ss -tlnp' },
  { label: 'Tailscale 状态', cmd: 'tailscale status' },
]

const copiedCmd = ref('')
function copyCmd(cmd) {
  navigator.clipboard.writeText(cmd)
  copiedCmd.value = cmd
  setTimeout(() => copiedCmd.value = '', 1500)
}

const ipList = [
  { label: 'sisyphus', addr: '100.x.x.x', note: 'Tailscale' },
  { label: '笔记服务', addr: '101.37.12.221:8080', note: 'HTTP' },
  { label: 'GNS3', addr: 'localhost:3080', note: '本地' },
]

const tagColor = { '网络': '#61afef', '开发': '#42b883', '运维': '#e5c07b' }

const todos = ref([
  { text: 'BGP 路由策略实验', done: false, tag: '网络' },
  { text: 'Python Netmiko 自动化练习', done: false, tag: '网络' },
  { text: '企微工作台接口调研', done: false, tag: '开发' },
  { text: '打印机驱动文档整理', done: true, tag: '运维' },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+SC:wght@300;400;500&display=swap');

.info-page {
  min-height: 100vh;
  background: #111;
  padding: 0 0 40px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #ccc;
}

/* 状态栏 */
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  background: #0d0d0d;
  border-bottom: 1px solid #1a1a1a;
  font-family: 'IBM Plex Mono', monospace;
}

.server-status { display: flex; align-items: center; gap: 10px; }

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #61afef;
  box-shadow: 0 0 6px #61afef;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.server-name { font-size: 13px; color: #eee; }
.server-online { font-size: 10px; color: #61afef; letter-spacing: 1.5px; }
.time-display { font-size: 12px; color: #333; }

/* 网格 */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 24px 32px;
}

.panel {
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 20px;
}

.panel-wide { grid-column: span 3; }

.panel-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #61afef;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

/* 路径图 */
.roadmap {
  display: flex;
  gap: 0;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.roadmap-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #222;
  background: #111;
  transition: all 0.15s;
}

.roadmap-item.done { border-color: rgba(66,184,131,0.2); }
.roadmap-item.current { border-color: #61afef; background: rgba(97,175,239,0.06); }
.roadmap-item.pending { opacity: 0.4; }

.roadmap-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #333;
  flex-shrink: 0;
}

.roadmap-item.done .roadmap-dot { background: #42b883; }
.roadmap-item.current .roadmap-dot { background: #61afef; box-shadow: 0 0 6px #61afef; }

.roadmap-content { display: flex; flex-direction: column; gap: 2px; }

.roadmap-name { font-size: 13px; color: #ccc; }
.roadmap-item.current .roadmap-name { color: #fff; }

.roadmap-status-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #444;
}

.roadmap-item.done .roadmap-status-label { color: #42b883; }
.roadmap-item.current .roadmap-status-label { color: #61afef; }

/* 工具 */
.tools-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #111;
  border: 1px solid #222;
  border-radius: 6px;
  text-decoration: none;
  color: #777;
  font-size: 12px;
  transition: all 0.15s;
}

.tool-btn:hover { background: #1f1f1f; color: #ccc; border-color: #2a2a2a; }
.tool-icon { font-size: 16px; }

/* 命令 */
.cmd-list { display: flex; flex-direction: column; gap: 6px; }

.cmd-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  background: #111;
  border: 1px solid #1f1f1f;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.cmd-item:hover { border-color: #2a2a2a; background: #141414; }
.cmd-item.copied { border-color: rgba(66,184,131,0.3); }

.cmd-label { font-size: 11px; color: #444; min-width: 90px; }

.cmd-code {
  flex: 1;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: #aaa;
}

.cmd-copy {
  font-size: 12px;
  color: #333;
  transition: color 0.15s;
}

.cmd-item.copied .cmd-copy { color: #42b883; }

/* IP */
.ip-list { display: flex; flex-direction: column; gap: 8px; }

.ip-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #1f1f1f;
  font-size: 12px;
}

.ip-label { color: #555; min-width: 70px; }
.ip-addr { font-family: 'IBM Plex Mono', monospace; color: #61afef; flex: 1; }
.ip-note { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #333; }

/* 待办 */
.todo-list { display: flex; flex-direction: column; gap: 6px; }

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  background: #111;
  border: 1px solid #1f1f1f;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 13px;
}

.todo-item:hover { background: #141414; }
.todo-item.done .todo-text { text-decoration: line-through; color: #333; }

.todo-check {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: #444;
  min-width: 14px;
}

.todo-item.done .todo-check { color: #42b883; }
.todo-text { flex: 1; color: #bbb; }
.todo-item.done .todo-text { color: #333; }

.todo-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
}
</style>
