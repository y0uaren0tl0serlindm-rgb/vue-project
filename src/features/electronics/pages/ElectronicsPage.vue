<template>
  <div class="electronics-page">
    <div class="topbar">
      <div class="topbar-left">
        <h2 class="page-title">// 电子</h2>
        <span class="sub">项目 · 设备 · 开发</span>
      </div>
      <div class="topbar-right">
        <button
          v-for="f in filters"
          :key="f"
          class="filter-btn"
          :class="{ active: activeFilter === f }"
          @click="activeFilter = f"
        >{{ f }}</button>
      </div>
    </div>

    <div class="cards">
      <div
        v-for="item in filtered"
        :key="item.id"
        class="card"
        :class="'card--' + item.type"
        @click="$router.push('/electronics/' + item.id)"
      >
        <div class="card-head">
          <span class="card-icon">{{ item.icon }}</span>
          <span class="status-badge" :class="item.status">{{ statusLabel[item.status] }}</span>
        </div>
        <div class="card-name">{{ item.name }}</div>
        <div class="card-desc">{{ item.desc }}</div>
        <div class="card-tags">
          <span class="tag" v-for="t in item.tags" :key="t">{{ t }}</span>
        </div>
        <div class="card-footer">
          <span class="card-type-label">{{ typeLabel[item.type] }}</span>
          <span class="card-enter">查看详情 →</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { items } from '@/features/electronics/data/electronics'

const activeFilter = ref('全部')
const filters = ['全部', '项目', '设备', '学习']
const statusLabel = { active: '运行中', wip: '进行中', done: '已归档', idle: '待机' }
const typeLabel = { project: '项目', device: '设备', study: '学习' }

const filtered = computed(() => {
  if (activeFilter.value === '全部') return items
  const map = { '项目': 'project', '设备': 'device', '学习': 'study' }
  return items.filter(i => i.type === map[activeFilter.value])
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+SC:wght@300;400;500&display=swap');

.electronics-page {
  min-height: 100vh;
  background: #111;
  padding: 28px 32px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #ccc;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.topbar-left { display: flex; align-items: baseline; gap: 14px; }

.page-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  color: #e5c07b;
  font-weight: 600;
  letter-spacing: 1px;
}

.sub { font-size: 12px; color: #333; font-family: 'IBM Plex Mono', monospace; }

.topbar-right { display: flex; gap: 6px; }

.filter-btn {
  background: none;
  border: 1px solid #222;
  color: #555;
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 12px;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.15s;
}

.filter-btn:hover { border-color: #333; color: #aaa; }
.filter-btn.active { border-color: #e5c07b; color: #e5c07b; background: rgba(229,192,123,0.08); }

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

.card {
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  transition: all 0.15s;
  border-left: 3px solid transparent;
}

.card--project { border-left-color: #61afef; }
.card--device  { border-left-color: #e5c07b; }
.card--study   { border-left-color: #42b883; }

.card:hover {
  background: #1e1e1e;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.card-head { display: flex; justify-content: space-between; align-items: center; }
.card-icon { font-size: 22px; }

.status-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid;
}

.status-badge.active { color: #42b883; border-color: rgba(66,184,131,0.3); background: rgba(66,184,131,0.08); }
.status-badge.wip    { color: #e5c07b; border-color: rgba(229,192,123,0.3); background: rgba(229,192,123,0.08); }
.status-badge.done   { color: #555;    border-color: #2a2a2a; background: #1f1f1f; }

.card-name { font-size: 15px; color: #eee; font-weight: 500; }
.card-desc { font-size: 12px; color: #555; line-height: 1.6; flex: 1; }

.card-tags { display: flex; flex-wrap: wrap; gap: 6px; }

.tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #444;
  background: #1f1f1f;
  border: 1px solid #252525;
  border-radius: 4px;
  padding: 2px 7px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #1f1f1f;
}

.card-type-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #333;
}

.card-enter {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #444;
  transition: color 0.15s;
}

.card:hover .card-enter { color: #e5c07b; }
</style>
