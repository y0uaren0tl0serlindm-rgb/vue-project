<template>
  <div class="detail-page" v-if="item">

    <div class="detail-topbar">
      <button class="back-btn" @click="$router.back()">← 返回</button>
      <span class="breadcrumb">电子 / {{ item.name }}</span>
    </div>

    <div class="detail-hero">
      <div class="detail-icon">{{ item.icon }}</div>
      <div class="detail-hero-info">
        <div class="detail-name">{{ item.name }}</div>
        <div class="detail-meta">
          <span class="status-badge" :class="item.status">{{ statusLabel[item.status] }}</span>
          <span class="type-badge">{{ typeLabel[item.type] }}</span>
        </div>
        <div class="detail-tags">
          <span class="tag" v-for="t in item.tags" :key="t">{{ t }}</span>
        </div>
      </div>
    </div>

    <div class="detail-grid">

      <div class="panel panel-wide">
        <div class="panel-title">// 简介</div>
        <p class="detail-desc">{{ item.detail }}</p >
      </div>

      <div class="panel">
        <div class="panel-title">// 规格</div>
        <div class="specs">
          <div class="spec-row" v-for="s in item.specs" :key="s.label">
            <span class="spec-label">{{ s.label }}</span>
            <span class="spec-value">{{ s.value }}</span>
          </div>
        </div>
      </div>

      <div class="panel" v-if="item.links.length">
        <div class="panel-title">// 相关链接</div>
        <div class="links">
          <a
            v-for="l in item.links"
            :key="l.label"
            :href="l.url"
            target="_blank"
            class="link-item"
          >
            <span>{{ l.label }}</span>
            <span class="link-arrow">↗</span>
          </a >
        </div>
      </div>

    </div>
  </div>

  <div v-else class="not-found">
    <p>找不到该项目</p >
    <button @click="$router.back()">← 返回</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { items } from '../electronics.js'

const route = useRoute()
const item = computed(() => items.find(i => i.id === route.params.id))

const statusLabel = { active: '运行中', wip: '进行中', done: '已归档', idle: '待机' }
const typeLabel = { project: '项目', device: '设备', study: '学习' }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+SC:wght@300;400;500&display=swap');

.detail-page {
  min-height: 100vh;
  background: #111;
  padding: 0 0 40px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #ccc;
}

.detail-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 32px;
  border-bottom: 1px solid #1a1a1a;
  background: #0d0d0d;
}

.back-btn {
  background: none;
  border: 1px solid #222;
  color: #555;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
  font-family: 'IBM Plex Mono', monospace;
  transition: all 0.15s;
}

.back-btn:hover { border-color: #e5c07b; color: #e5c07b; }

.breadcrumb {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #333;
}

.detail-hero {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 32px 32px 0;
}

.detail-icon {
  font-size: 48px;
  line-height: 1;
  padding: 16px;
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 12px;
}

.detail-hero-info { display: flex; flex-direction: column; gap: 10px; }

.detail-name {
  font-size: 24px;
  color: #eee;
  font-weight: 500;
}

.detail-meta { display: flex; align-items: center; gap: 10px; }

.status-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 3px 10px;
  border-radius: 10px;
  border: 1px solid;
}

.status-badge.active { color: #42b883; border-color: rgba(66,184,131,0.3); background: rgba(66,184,131,0.08); }
.status-badge.wip    { color: #e5c07b; border-color: rgba(229,192,123,0.3); background: rgba(229,192,123,0.08); }
.status-badge.done   { color: #555;    border-color: #2a2a2a; }

.type-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #444;
  border: 1px solid #222;
  border-radius: 10px;
  padding: 3px 10px;
}

.detail-tags { display: flex; flex-wrap: wrap; gap: 6px; }

.tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #444;
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 4px;
  padding: 2px 8px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 24px 32px;
}

.panel {
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 20px;
}

.panel-wide { grid-column: span 2; }

.panel-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #e5c07b;
  letter-spacing: 1px;
  margin-bottom: 14px;
}

.detail-desc {
  font-size: 13px;
  color: #777;
  line-height: 2;
  white-space: pre-line;
}

.specs { display: flex; flex-direction: column; gap: 0; }

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #1f1f1f;
  font-size: 13px;
}

.spec-row:last-child { border-bottom: none; }
.spec-label { color: #444; font-family: 'IBM Plex Mono', monospace; font-size: 11px; }
.spec-value { color: #aaa; }

.links { display: flex; flex-direction: column; gap: 8px; }

.link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #111;
  border: 1px solid #1f1f1f;
  border-radius: 6px;
  text-decoration: none;
  color: #777;
  font-size: 13px;
  transition: all 0.15s;
}

.link-item:hover { border-color: #e5c07b; color: #e5c07b; }
.link-arrow { font-size: 12px; }

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 100px;
  color: #333;
  font-family: 'IBM Plex Mono', monospace;
}
</style>
