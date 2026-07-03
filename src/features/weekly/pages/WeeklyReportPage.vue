<template>
  <div class="wr-container">
    <el-card shadow="never" class="wr-card">
      <template #header>
        <div class="wr-header">
          <span class="wr-title">周报生成器</span>
          <el-tag size="small" type="info" effect="plain">非生产性效能产出工具</el-tag>
        </div>
      </template>

      <!-- 输入区 -->
      <div class="wr-section">
        <div class="wr-label">本周实际工作内容（可留空，会自动脑补）</div>
        <el-input
          v-model="userInput"
          type="textarea"
          :rows="3"
          placeholder="例：修了 3 个 bug，开了 2 个会，喝了 7 杯奶茶"
          resize="vertical"
        />
      </div>

      <!-- 浓度滑块 -->
      <div class="wr-section">
        <div class="wr-row">
          <span class="wr-label-inline">废话浓度</span>
          <el-slider
            v-model="density"
            :min="1"
            :max="5"
            :step="1"
            :marks="densityMarks"
            class="wr-slider"
          />
        </div>
      </div>

      <!-- 段落数 -->
      <div class="wr-section">
        <div class="wr-row">
          <span class="wr-label-inline">段落数量</span>
          <el-slider
            v-model="paraCount"
            :min="1"
            :max="6"
            :step="1"
            show-stops
            class="wr-slider"
          />
          <span class="wr-num">{{ paraCount }} 段</span>
        </div>
      </div>

      <!-- 生成按钮 -->
      <div class="wr-section">
        <el-button
          type="primary"
          size="large"
          :icon="Refresh"
          @click="generate"
          style="width: 100%;"
        >
          生成周报
        </el-button>
      </div>

      <!-- 输出 -->
      <div class="wr-section" v-if="output">
        <div class="wr-label">生成结果</div>
        <div class="wr-output">{{ output }}</div>
        <div class="wr-meta">
          共 {{ charCount }} 字 · 浓度等级 {{ density }} · {{ paraCount }} 段
        </div>
        <div class="wr-actions">
          <el-button :icon="DocumentCopy" @click="copyResult">
            {{ copied ? '已复制' : '复制' }}
          </el-button>
          <el-button :icon="MagicStick" @click="generate">再来一份</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, DocumentCopy, MagicStick } from '@element-plus/icons-vue'

// 词库
const lib = {
  adj: ['深度', '系统性', '端到端', '全链路', '体系化', '颗粒度精细的', '可复用的', '高ROI的', '结构化', '一体化', '战略级', '心智级', '体感级'],
  verb: ['赋能', '抓住', '对齐', '闭环', '打通', '夯实', '沉淀', '复用', '撬动', '联动', '解构', '重构', '迭代', '收敛', '复盘', '聚焦', '渗透', '辐射'],
  noun: ['抓手', '闭环', '链路', '心智', '颗粒度', '生态位', '基本盘', '护城河', '飞轮', '势能', '杠杆', '触点', '势能差', '价值闭环', '增长曲线', '最小可行路径', '北极星指标', '核心抓手'],
  topic: ['项目推进', '流程优化', '团队协同', '产品体验', '技术架构', '业务支撑', '运营效能', '需求承接', '资源调度', '组织效率'],
  conj: ['通过', '基于', '围绕', '依托', '借助', '结合'],
  outcome: ['形成可复用的方法论', '沉淀为团队级最佳实践', '为后续业务扩展打下坚实基础', '推动了从0到1的关键突破', '实现了量级提升', '完成了关键节点的卡位', '构建起新的增长引擎', '锁定了核心心智'],
  paraOpen: ['本周', '近期', '阶段性', '当前', '面向Q4', '聚焦核心目标'],
  nextOpen: ['下一阶段', '后续', '下周', '接下来', '面向下一周期'],
  reflect: ['复盘来看，仍存在颗粒度不够精细的问题', '过程中暴露出对齐机制的优化空间', '反思后认为节奏可以更加紧凑', '从结果看链路尚有打磨空间']
}

// 状态
const userInput = ref('')
const density = ref(3)
const paraCount = ref(3)
const output = ref('')
const copied = ref(false)

const densityMarks = {
  1: '克制',
  2: '温和',
  3: '标准',
  4: '浓郁',
  5: '高浓缩'
}

const charCount = computed(() => output.value.replace(/\s/g, '').length)

// 工具函数
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const pickN = (arr, n) => {
  const copy = [...arr]
  const result = []
  for (let i = 0; i < n && copy.length > 0; i++) {
    result.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0])
  }
  return result
}
const fakeMetric = () => `约 ${Math.floor(Math.random() * 80 + 17)}.${Math.floor(Math.random() * 9)}%`

// 段落构造
function buildPara(d, input, isFirst) {
  const open = isFirst
    ? pick(lib.paraOpen)
    : pick([...lib.paraOpen, ...lib.nextOpen])
  const topic = pick(lib.topic)
  const sentences = []

  // 句一：开场总述
  const verbs = pickN(lib.verb, Math.min(d, 3))
  const nouns = pickN(lib.noun, Math.min(d, 3))
  let s1 = `${open}围绕${topic}方向，`
  s1 += `${pick(lib.conj)}${pick(lib.adj)}的方式`
  s1 += `${verbs.join('与')}了${nouns.join('、')}`
  if (d >= 3) s1 += `，提升${pick(lib.noun)}${fakeMetric()}`
  s1 += '。'
  sentences.push(s1)

  // 句二：融合用户输入
  if (input && input.trim()) {
    const verbs2 = pickN(lib.verb, 2)
    let s2 = `具体表现为：${pick(lib.conj)}${pick(lib.adj)}的执行节奏，`
    s2 += `${verbs2.join('并')}了"${input.trim()}"这一关键事项，`
    s2 += `${pick(lib.outcome)}。`
    sentences.push(s2)
  } else if (d >= 2) {
    const fakeVerbs = pickN(lib.verb, 2)
    const fakeNouns = pickN(lib.noun, 2)
    let s2 = `具体动作上，${fakeVerbs.join('并')}了${fakeNouns.join('与')}，`
    s2 += `${pick(lib.outcome)}。`
    sentences.push(s2)
  }

  // 句三：浓度 4+ 加反思
  if (d >= 4) {
    sentences.push(pick(lib.reflect) + '，' + pick(lib.nextOpen) + '将持续' + pick(lib.verb) + '。')
  }

  // 句四：浓度 5 加金句
  if (d >= 5) {
    const grand = pickN(lib.noun, 3)
    sentences.push(`整体来看，${grand.join('、')}三位一体的格局正在形成，${pick(lib.outcome)}。`)
  }

  return sentences.join('')
}

// 生成
function generate() {
  const paras = []
  for (let i = 0; i < paraCount.value; i++) {
    paras.push(buildPara(
      density.value,
      i === 0 ? userInput.value : '',
      i === 0
    ))
  }
  output.value = paras.join('\n\n')
  copied.value = false
}

// 复制
async function copyResult() {
  try {
    await navigator.clipboard.writeText(output.value)
    copied.value = true
    ElMessage.success('已复制到剪贴板')
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    ElMessage.error('复制失败，请手动复制')
  }
}
</script>

<style scoped>
.wr-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
}

.wr-card {
  border-radius: 12px;
}

.wr-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wr-title {
  font-size: 16px;
  font-weight: 500;
}

.wr-section {
  margin-bottom: 20px;
}

.wr-section:last-child {
  margin-bottom: 0;
}

.wr-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-bottom: 8px;
}

.wr-label-inline {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  min-width: 80px;
  flex-shrink: 0;
}

.wr-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.wr-slider {
  flex: 1;
  margin: 0 8px;
}

.wr-num {
  font-size: 14px;
  font-weight: 500;
  min-width: 50px;
  text-align: right;
}

.wr-output {
  background: var(--el-fill-color-light);
  border-radius: 8px;
  padding: 16px 20px;
  font-size: 14px;
  line-height: 1.9;
  white-space: pre-wrap;
  color: var(--el-text-color-primary);
  font-family: var(--font-mono, 'Sarasa Mono SC Nerd', 'IBM Plex Mono', ui-monospace, monospace);
}

.wr-meta {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
  margin-top: 8px;
}

.wr-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.wr-actions .el-button {
  flex: 1;
}
</style>