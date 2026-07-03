<template>
  <div class="wheel-page">
    <h2>🎯 决策大转盘</h2>
    <p class="subtitle">让宇宙帮你做决定</p>

    <div class="layout">
      <!-- 转盘区域 -->
      <div class="wheel-panel">
        <div class="wheel-wrapper">
          <div class="pointer">▼</div>
          <svg
            :viewBox="`0 0 ${size} ${size}`"
            :style="wheelStyle"
            @transitionend="onSpinEnd"
            class="wheel-svg"
          >
            <g :transform="`translate(${size / 2}, ${size / 2})`">
              <path
                v-for="(opt, idx) in options"
                :key="`p-${idx}`"
                :d="slicePath(idx)"
                :fill="colors[idx % colors.length]"
                stroke="white"
                stroke-width="3"
              />
              <text
                v-for="(opt, idx) in options"
                :key="`t-${idx}`"
                :transform="textTransform(idx)"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="white"
                font-size="22"
                font-weight="bold"
                style="pointer-events: none; user-select: none"
              >
                {{ truncate(opt) || `选项${idx + 1}` }}
              </text>
              <circle r="22" fill="#333" />
            </g>
          </svg>
        </div>

        <el-button
          type="danger"
          size="large"
          :disabled="spinning"
          @click="spin"
          class="spin-btn"
        >
          {{ spinning ? '转动中…' : '🎲 转一下' }}
        </el-button>

        <transition name="result-fade">
          <div v-if="result" class="result-box">
            <div class="result-label">命运的选择是</div>
            <div class="result-text">{{ result }}</div>
          </div>
        </transition>
      </div>

      <!-- 选项编辑(可折叠) -->
      <div class="options-panel">
        <div class="options-header" @click="showOptions = !showOptions">
          <span>⚙️ 选项设置（{{ options.length }}）</span>
          <span class="toggle-icon">{{ showOptions ? '▲' : '▼' }}</span>
        </div>
        <div v-show="showOptions" class="options-body">
          <div v-for="(opt, idx) in options" :key="idx" class="option-row">
            <el-input
              v-model="options[idx]"
              :placeholder="`选项 ${idx + 1}`"
              size="default"
            />
            <el-button
              circle
              size="small"
              :disabled="options.length <= 2"
              @click="removeOption(idx)"
            >✕</el-button>
          </div>
          <el-button
            type="primary"
            plain
            :disabled="options.length >= 10"
            @click="addOption"
            style="width: 100%; margin-top: 4px"
          >＋ 添加选项</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const size = 420                      // SVG 内部坐标系尺寸,渲染时由 CSS 缩放
const radius = 190
const colors = [
  '#FF6B6B', '#4ECDC4', '#FFD93D', '#A8E6CF',
  '#FF8B94', '#B4A7D6', '#6BCB77', '#FFAAA5',
  '#95E1D3', '#F38BA8'
]

const options = ref(['吃米饭', '吃面条', '吃饺子', '点外卖', '饿着'])
const rotation = ref(0)
const spinning = ref(false)
const result = ref('')
const winner = ref('')
const showOptions = ref(false)        // 手机端默认折叠

const sliceAngle = computed(() => 360 / options.value.length)

const wheelStyle = computed(() => ({
  transform: `rotate(${rotation.value}deg)`,
  transition: spinning.value
    ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.16, 0.99)'
    : 'none',
  transformOrigin: 'center center'    // 显式设置,避免某些浏览器默认 0,0
}))

function slicePath(i) {
  const a = sliceAngle.value
  const start = (i * a - 90) * Math.PI / 180
  const end = ((i + 1) * a - 90) * Math.PI / 180
  const x1 = radius * Math.cos(start)
  const y1 = radius * Math.sin(start)
  const x2 = radius * Math.cos(end)
  const y2 = radius * Math.sin(end)
  const largeArc = a > 180 ? 1 : 0
  return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
}

function textTransform(i) {
  const a = sliceAngle.value
  const angleDeg = i * a + a / 2 - 90
  const rad = angleDeg * Math.PI / 180
  const r = radius * 0.62
  const x = r * Math.cos(rad)
  const y = r * Math.sin(rad)
  let textAngle = angleDeg + 90
  if (textAngle > 90 && textAngle < 270) textAngle -= 180
  return `translate(${x}, ${y}) rotate(${textAngle})`
}

function truncate(str) {
  if (!str) return ''
  return str.length > 6 ? str.slice(0, 6) + '…' : str
}

function addOption() { options.value.push('') }
function removeOption(idx) { options.value.splice(idx, 1) }

function spin() {
  if (spinning.value) return
  result.value = ''
  const N = options.value.length
  const idx = Math.floor(Math.random() * N)
  winner.value = options.value[idx] || `选项${idx + 1}`

  const targetAngle = -(idx + 0.5) * (360 / N)
  const currentMod = ((rotation.value % 360) + 360) % 360
  const targetMod = ((targetAngle % 360) + 360) % 360
  let delta = targetMod - currentMod
  if (delta <= 0) delta += 360

  spinning.value = true
  rotation.value += 8 * 360 + delta
}

function onSpinEnd() {
  spinning.value = false
  result.value = winner.value
}
</script>

<style scoped>
.wheel-page {
  text-align: center;
  padding: 16px;
  font-family: system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
  min-height: 100vh;
}

h2 {
  font-size: 22px;
  margin: 0 0 6px;
}

.subtitle {
  color: #888;
  font-size: 13px;
  margin: 0 0 16px;
}

.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.wheel-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.wheel-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}

/* 关键:转盘根据视窗自动缩放,最大 400px */
.wheel-svg {
  width: min(82vw, 400px);
  height: min(82vw, 400px);
  display: block;
}

.pointer {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 36px;
  color: #ff4757;
  z-index: 10;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.spin-btn {
  min-width: 160px;
  font-size: 17px;
  height: 46px;          /* 移动端按钮要够大,46px 是触控友好高度 */
}

.result-box {
  margin-top: 16px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #FFD93D, #FF8B94);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(255, 139, 148, 0.4);
}

.result-label {
  font-size: 12px;
  color: white;
  opacity: 0.9;
}

.result-text {
  font-size: 22px;
  color: white;
  font-weight: bold;
  margin-top: 2px;
}

.result-fade-enter-active {
  transition: all 0.5s ease-out;
}

.result-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.8);
}

/* 选项面板 */
.options-panel {
  width: min(90vw, 400px);
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 8px;
}

.options-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f5f7fa;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  user-select: none;
}

.toggle-icon {
  font-size: 12px;
  color: #909399;
}

.options-body {
  padding: 12px;
}

.option-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

/* 桌面端:横向布局 + 选项默认展开样式 */
@media (min-width: 768px) {
  .wheel-page {
    padding: 24px;
  }

  h2 {
    font-size: 28px;
  }

  .subtitle {
    font-size: 14px;
    margin-bottom: 24px;
  }

  .layout {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 40px;
    max-width: 900px;
    margin: 0 auto;
  }

  .options-panel {
    order: -1;             /* 桌面端选项放左边 */
    margin-top: 0;
  }

  .wheel-svg {
    width: 400px;
    height: 400px;
  }

  .result-text {
    font-size: 26px;
  }
}
</style>