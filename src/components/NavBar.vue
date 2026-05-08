<template>
  <header class="nav-wrap">
    <nav class="nav-bar" aria-label="main navigation">
      <div class="nav-left">
        <button class="hamburger" type="button" aria-label="toggle sidebar" @click="$emit('toggle-sidebar')">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <RouterLink to="/" class="brand" aria-label="go home">
          <span class="brand-mark">◌</span>
          <span class="brand-text">SISYPHUS</span>
        </RouterLink>
      </div>

      <div class="nav-center">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-link">
          <!-- 注释掉这行显示index 但是保留index属性  <span class="nav-index">{{ item.index }}</span>  -->
          <span>{{ item.label }}</span>
        </RouterLink>
      </div>

      <div class="nav-right">
        <span class="quiet-tag">field · shell · board</span>
      </div>
    </nav>
  </header>
</template>

<script setup>
defineEmits(['toggle-sidebar'])

const navItems = [
  { index: '01', label: '摄影', to: '/projects/photography' },
  { index: '02', label: 'Linux', to: '/notes' },
  { index: '03', label: 'BBB', to: '/electronics' },
]
</script>

<style scoped>
.nav-wrap {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 14px clamp(14px, 4vw, 56px) 0;
  pointer-events: none;
}

.nav-bar {
  height: 58px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 999px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.075), rgba(255,255,255,0.026)),
    rgba(9, 10, 9, 0.68);
  box-shadow:
    0 18px 70px rgba(0, 0, 0, 0.36),
    inset 0 1px 0 rgba(255,255,255,0.06);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  pointer-events: auto;
}

.nav-left,
.nav-center,
.nav-right {
  display: flex;
  align-items: center;
}

.nav-left {
  gap: 10px;
}

.hamburger {
  width: 38px;
  height: 38px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  background: rgba(255,255,255,0.035);
  cursor: pointer;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    background 0.22s ease;
}

.hamburger span {
  width: 14px;
  height: 1px;
  border-radius: 999px;
  background: rgba(236, 238, 233, 0.72);
  transition:
    width 0.22s ease,
    background 0.22s ease;
}

.hamburger:hover {
  transform: translateY(-1px);
  border-color: rgba(154,245,200,0.28);
  background: rgba(154,245,200,0.07);
}

.hamburger:hover span {
  background: #9af5c8;
}

.hamburger:hover span:nth-child(2) {
  width: 18px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 38px;
  padding: 0 14px 0 10px;
  color: #eceee9;
  text-decoration: none;
  border-radius: 999px;
  transition:
    background 0.22s ease,
    color 0.22s ease;
}

.brand:hover {
  background: rgba(255,255,255,0.045);
}

.brand-mark {
  width: 22px;
  height: 22px;
  display: inline-grid;
  place-items: center;
  color: #9af5c8;
  font-size: 18px;
  line-height: 1;
  text-shadow: 0 0 18px rgba(154,245,200,0.35);
}

.brand-text {
  font-family: var(--font-mono, 'IBM Plex Mono', ui-monospace, monospace);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2em;
}

.nav-center {
  justify-content: center;
  gap: 6px;
}

.nav-link {
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  border-radius: 999px;
  color: #979d93;
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 0.04em;
  transition:
    color 0.22s ease,
    background 0.22s ease,
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.nav-link:hover {
  color: #eceee9;
  background: rgba(255,255,255,0.045);
  transform: translateY(-1px);
}

.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  color: #9af5c8;
  background: rgba(154,245,200,0.09);
  box-shadow: inset 0 0 0 1px rgba(154,245,200,0.13);
}

.nav-index {
  color: #5d645b;
  font-family: var(--font-mono, 'IBM Plex Mono', ui-monospace, monospace);
  font-size: 10px;
  letter-spacing: 0.08em;
}

.nav-link.router-link-active .nav-index,
.nav-link.router-link-exact-active .nav-index {
  color: rgba(154,245,200,0.78);
}

.nav-right {
  justify-content: flex-end;
}

.quiet-tag {
  padding: 0 14px;
  color: #5d645b;
  font-family: var(--font-mono, 'IBM Plex Mono', ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: 0.12em;
  white-space: nowrap;
}

@media (max-width: 880px) {
  .nav-bar {
    grid-template-columns: auto 1fr;
  }

  .nav-center {
    justify-content: flex-end;
  }

  .nav-right {
    display: none;
  }

  .brand-text {
    display: none;
  }
}

@media (max-width: 640px) {
  .nav-wrap {
    padding: 10px 10px 0;
  }

  .nav-bar {
    height: auto;
    min-height: 56px;
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 10px;
    border-radius: 24px;
  }

  .nav-left {
    justify-content: space-between;
  }

  .brand-text {
    display: inline;
  }

  .nav-center {
    width: 100%;
    justify-content: stretch;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  .nav-link {
    justify-content: center;
    padding: 0 10px;
  }

  .nav-index {
    display: none;
  }
}
</style>
