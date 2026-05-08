<template>
  <main class="home-stage">

    <!-- 主模块 -->
    <HomeHero />
    <section class="module-grid" aria-label="main modules">
      <RouterLink
        v-for="module in modules"
        :key="module.key"
        :to="module.to"
        class="module-card"
        :class="module.key"
      >

      
        <div class="module-visual" aria-hidden="true">
          <div v-if="module.key === 'photo'" class="photo-frame">
            <span class="sun"></span>
            <span class="leaf leaf-a"></span>
            <span class="leaf leaf-b"></span>
            <span class="water water-a"></span>
            <span class="water water-b"></span>
          </div>

          <div v-if="module.key === 'linux'" class="terminal-frame">
            <div class="terminal-bar">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <pre>
                  $ ssh sisyphus
                  $ doom sync
                  $ git status
              <span>nothing to commit</span>
            </pre>
          </div>

          <div v-if="module.key === 'bbb'" class="board-frame">
            <div class="chip">AM335x</div>
            <div class="pins left"></div>
            <div class="pins right"></div>
            <div class="trace trace-a"></div>
            <div class="trace trace-b"></div>
            <div class="trace trace-c"></div>
          </div>
        </div>

        <div class="module-copy">
          <h2>{{ module.title }}</h2>
          <p>{{ module.line }}</p>
        </div>
      </RouterLink>
    </section>

  </main>
</template>

<script setup>
import HomeHero from '@/components/home/HomeHero.vue'
import { ref, onMounted } from 'vue'

const API_URL = 'http://101.37.12.221:3001/api/fragments/random?limit=1'

const modules = [
  {
    key: 'photo',
    title: '拍™的照片',
    to: '/projects/photography',
    line: '俺寻思这么拍能行',
  },
  {
    key: 'linux',
    title: '周报生成器',
    to: '/weekly',
    line: '针对赋能，紧握抓手',
  },
  {
    key: 'bbb',
    title: 'BBB',
    to: '/electronics',
    line: '上电。串口输出。第一个可执行文件。',
  },
]

const notes = ref([])

async function loadRandomNotes() {
  try {
    const res = await fetch(API_URL)

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    notes.value = await res.json()
  } catch (error) {
    console.error('Failed to load notes:', error)

    notes.value = [
      {
        id: 'fallback',
        title: '姑妄言之',
        text: '服务器没有回应，于是页面暂时保持沉默。',
      },
    ]
  }
}

onMounted(loadRandomNotes)
</script>

<style scoped>
.home-stage {
  --bg: #090a09;
  --panel: rgba(255, 255, 255, 0.045);
  --panel-strong: rgba(255, 255, 255, 0.075);
  --line: rgba(255, 255, 255, 0.09);
  --line-strong: rgba(255, 255, 255, 0.18);
  --text: #eceee9;
  --muted: #979d93;
  --dim: #5d645b;
  --green: #9af5c8;
  --warm: #d8c38b;
  --blue: #9db7e8;

  min-height: 100vh;
  color: var(--text);
  padding: clamp(20px, 4vw, 56px);
  background:
    radial-gradient(circle at 12% 4%, rgba(154, 245, 200, 0.1), transparent 28%),
    radial-gradient(circle at 92% 12%, rgba(157, 183, 232, 0.09), transparent 28%),
    linear-gradient(180deg, #10110f 0%, var(--bg) 48%, #050605 100%);
  overflow: hidden;
  position: relative;
}

.home-stage::before,
.home-stage::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.home-stage::before {
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.032) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at top, #000 0%, transparent 72%);
}

.home-stage::after {
  opacity: 0.025;
  background-image: radial-gradient(circle, #fff 0 0.45px, transparent 0.8px);
  background-size: 10px 10px;
}




.module-grid {
  display: grid;
  grid-template-columns: 1.12fr 0.94fr 0.94fr;
  gap: 18px;
  margin-top: 18px;
}

.module-card {
  min-height: 420px;
  color: var(--text);
  text-decoration: none;
  border: 1px solid var(--line);
  border-radius: 30px;
  background: var(--panel);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    background 0.28s ease;
}

.module-card:hover {
  transform: translateY(-6px);
  border-color: var(--line-strong);
  background: var(--panel-strong);
}

.module-card.photo {
  min-height: 520px;
}

.module-visual {
  flex: 1;
  min-height: 260px;
  display: grid;
  place-items: center;
  position: relative;
}

.module-visual::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.09), transparent 38%);
}

.module-copy {
  padding: 0 26px 28px;
  position: relative;
}

.module-copy h2 {
  margin: 0;
  font-size: clamp(34px, 4vw, 62px);
  line-height: 0.95;
  letter-spacing: -0.08em;
  font-weight: 600;
}

.module-copy p:last-child {
  margin: 18px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.9;
}

.photo-frame {
  width: min(68%, 360px);
  aspect-ratio: 0.78;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 28px;
  background:
    radial-gradient(circle at 60% 32%, rgba(216, 195, 139, 0.24), transparent 10%),
    linear-gradient(145deg, rgba(154, 245, 200, 0.18), transparent 45%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
  box-shadow:
    inset 0 0 70px rgba(0, 0, 0, 0.26),
    0 24px 70px rgba(0, 0, 0, 0.28);
  position: relative;
  overflow: hidden;
}

.photo-frame::after {
  content: '';
  position: absolute;
  inset: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
}

.sun {
  position: absolute;
  right: 22%;
  top: 18%;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--warm);
  filter: blur(0.2px);
  box-shadow: 0 0 50px rgba(216, 195, 139, 0.34);
}

.leaf {
  position: absolute;
  width: 46%;
  height: 18%;
  border-radius: 100% 0 100% 0;
  background: linear-gradient(90deg, rgba(154, 245, 200, 0.42), rgba(154, 245, 200, 0.06));
  border: 1px solid rgba(154, 245, 200, 0.22);
}

.leaf-a {
  left: 18%;
  top: 50%;
  transform: rotate(-24deg);
}

.leaf-b {
  right: 10%;
  top: 60%;
  transform: rotate(18deg) scale(0.82);
}

.water {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.5);
}

.water-a {
  left: 39%;
  top: 52%;
}

.water-b {
  right: 26%;
  top: 65%;
  width: 6px;
  height: 6px;
}

.terminal-frame {
  width: min(78%, 360px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.34);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
  overflow: hidden;
}

.terminal-bar {
  height: 38px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
}

.terminal-bar i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.24);
}

.terminal-frame pre {
  margin: 0;
  padding: 22px;
  min-height: 180px;
  color: var(--green);
  font-family: var(--font-mono, 'IBM Plex Mono', ui-monospace, monospace);
  font-size: 13px;
  line-height: 2;
  white-space: pre-wrap;
}

.terminal-frame span {
  color: var(--dim);
}

.board-frame {
  width: min(76%, 330px);
  aspect-ratio: 1.34;
  border: 1px solid rgba(157, 183, 232, 0.22);
  border-radius: 26px;
  background:
    linear-gradient(135deg, rgba(157, 183, 232, 0.16), transparent 55%),
    rgba(10, 16, 24, 0.55);
  position: relative;
  box-shadow:
    inset 0 0 80px rgba(157, 183, 232, 0.06),
    0 24px 70px rgba(0, 0, 0, 0.32);
}

.chip {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 110px;
  height: 82px;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.24);
  color: var(--blue);
  font-family: var(--font-mono, 'IBM Plex Mono', ui-monospace, monospace);
  font-size: 12px;
}

.pins {
  position: absolute;
  top: 18%;
  bottom: 18%;
  width: 18px;
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.32) 0 5px,
    transparent 5px 13px
  );
}

.pins.left {
  left: 22px;
}

.pins.right {
  right: 22px;
}

.trace {
  position: absolute;
  height: 1px;
  background: rgba(157, 183, 232, 0.38);
  transform-origin: left center;
}

.trace-a {
  left: 48px;
  top: 38%;
  width: 84px;
}

.trace-b {
  right: 48px;
  top: 56%;
  width: 86px;
}

.trace-c {
  left: 43%;
  top: 72%;
  width: 76px;
  transform: rotate(90deg);
}

.thin-notes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 18px;
}

.thin-note {
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 22px;
  background: rgba(255, 255, 255, 0.028);
}

.thin-note span {
  color: var(--green);
  font-family: var(--font-mono, 'IBM Plex Mono', ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: 0.2em;
}

.thin-note p {
  margin: 12px 0 0;
  color: var(--muted);
  line-height: 1.9;
  font-size: 14px;
}



  
</style>
