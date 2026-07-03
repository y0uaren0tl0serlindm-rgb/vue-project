<template>
  <Transition name="fade">
    <div v-if="open" class="overlay" @click="closeSidebar"></div>
  </Transition>

  <Transition name="slide">
    <aside v-if="open" class="sidebar">
      <div class="sidebar-header">
        <span class="sidebar-logo">⬡ SYS</span>
        <button class="sidebar-close" type="button" @click="closeSidebar">✕</button>
      </div>

      <div class="sidebar-user">
        <div class="sidebar-avatar">S</div>
        <div>
          <div class="sidebar-name">Sisyphus</div>
          <div class="sidebar-role">信息部 · 开发</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="sidebar-section">导航</div>
        <RouterLink to="/" @click="closeSidebar" class="sidebar-link">
          <span>🏠</span> 主页
        </RouterLink>
        <RouterLink to="/electronics" @click="closeSidebar" class="sidebar-link">
          <span>⚡</span> 电子
        </RouterLink>
        <RouterLink to="/info" @click="closeSidebar" class="sidebar-link">
          <span>🌐</span> 信息
        </RouterLink>
        <RouterLink to="/notes" @click="closeSidebar" class="sidebar-link">
          <span>✏️</span> 笔记
        </RouterLink>
      </nav>

      <div class="sidebar-divider"></div>

      <nav class="sidebar-nav">
        <div class="sidebar-section">工具</div>
        <a class="sidebar-link" href="#">
          <span>⚙️</span> 设置
        </a>
        <a class="sidebar-link" href="#">
          <span>📊</span> 统计
        </a>
      </nav>

      <div class="sidebar-footer">
        <span class="sidebar-version">v0.1.0 · sisyphus</span>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:open'])

const closeSidebar = () => {
  emit('update:open', false)
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 199;
  backdrop-filter: blur(2px);
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  background: #1a1a1a;
  border-right: 1px solid #2a2a2a;
  z-index: 200;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans SC', sans-serif;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #222;
}

.sidebar-logo {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 15px;
  color: #42b883;
  letter-spacing: 2px;
}

.sidebar-close {
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 4px;
  transition: all 0.15s;
}

.sidebar-close:hover { color: #fff; background: #2a2a2a; }

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid #222;
}

.sidebar-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b883, #2d8f63);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono', monospace;
  flex-shrink: 0;
}

.sidebar-name {
  font-size: 14px;
  color: #ddd;
  font-weight: 500;
}

.sidebar-role {
  font-size: 11px;
  color: #555;
  margin-top: 2px;
  font-family: 'IBM Plex Mono', monospace;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 12px 12px 0;
  gap: 2px;
}

.sidebar-section {
  font-size: 10px;
  color: #444;
  letter-spacing: 1.5px;
  padding: 4px 8px 8px;
  font-family: 'IBM Plex Mono', monospace;
  text-transform: uppercase;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 6px;
  color: #777;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.15s;
}

.sidebar-link:hover { background: #222; color: #ddd; }
.sidebar-link.router-link-active { background: rgba(66,184,131,0.1); color: #42b883; }

.sidebar-divider {
  height: 1px;
  background: #222;
  margin: 12px 20px;
}

.sidebar-footer {
  margin-top: auto;
  padding: 16px 20px;
  border-top: 1px solid #222;
}

.sidebar-version {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #333;
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.slide-enter-active,
.slide-leave-active { transition: transform 0.25s ease; }
.slide-enter-from,
.slide-leave-to { transform: translateX(-100%); }
</style>
