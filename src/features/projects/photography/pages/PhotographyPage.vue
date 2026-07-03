<template>
  <div class="photo-page">

    <!-- 顶栏 -->
    <div class="topbar">
      <button class="back-btn" @click="$router.back()">← 返回</button>
      <span class="breadcrumb">项目 / 摄影成长档案</span>
    </div>

    <!-- 英雄区 -->
    <div class="hero">
      <div class="hero-left">
        <div class="hero-icon">📷</div>
        <div>
          <h1 class="hero-title">摄影成长档案</h1>
          <p class="hero-sub">Nikon Z7 II · 昆虫 · 微距 · 风景</p>
        </div>
      </div>
      <div class="hero-stats">
        <div class="hstat" v-for="s in heroStats" :key="s.label">
          <span class="hstat-val">{{ s.val }}</span>
          <span class="hstat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <!-- 模块标签 -->
    <div class="module-tabs">
      <button
        v-for="m in modules"
        :key="m.id"
        class="mod-tab"
        :class="{ active: activeModule === m.id }"
        @click="activeModule = m.id"
      >
        {{ m.icon }} {{ m.name }}
      </button>
    </div>

    <!-- 内容区 -->
    <div class="content">

      <!-- 1. 拍摄日志 -->
      <div v-if="activeModule === 'log'">
        <div class="section-header">
          <span class="section-title">拍摄日志</span>
          <span class="section-sub">每次出行的记录</span>
        </div>
        <div class="log-list">
          <div class="log-item" v-for="log in shootingLogs" :key="log.id">
            <div class="log-date-col">
              <span class="log-date">{{ log.date }}</span>
              <span class="log-weather">{{ log.weather }}</span>
            </div>
            <div class="log-body">
              <div class="log-head">
                <span class="log-location">📍 {{ log.location }}</span>
                <div class="log-subjects">
                  <span class="subject-tag" v-for="s in log.subjects" :key="s">{{ s }}</span>
                </div>
              </div>
              <p class="log-note">{{ log.note }}</p>
              <div class="log-foot">
                <span class="log-meta">满意张数 <b>{{ log.keepers }}</b></span>
                <span class="log-meta">时长 <b>{{ log.duration }}</b></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 问题追踪 -->
      <div v-if="activeModule === 'issues'">
        <div class="section-header">
          <span class="section-title">问题追踪</span>
          <span class="section-sub">遇到的技术难题与解法</span>
        </div>
        <div class="issue-list">
          <div class="issue-item" v-for="issue in issues" :key="issue.id">
            <div class="issue-head">
              <span class="issue-title">{{ issue.title }}</span>
              <span class="issue-status" :class="issue.status">{{ issueStatusLabel[issue.status] }}</span>
            </div>
            <div class="issue-block">
              <div class="issue-label">问题</div>
              <p class="issue-text">{{ issue.problem }}</p>
            </div>
            <div class="issue-block" v-if="issue.attempt">
              <div class="issue-label">当时处理</div>
              <p class="issue-text">{{ issue.attempt }}</p>
            </div>
            <div class="issue-block solved" v-if="issue.solution">
              <div class="issue-label">✓ 解法</div>
              <p class="issue-text">{{ issue.solution }}</p>
            </div>
            <div class="issue-tags">
              <span class="tag" v-for="t in issue.tags" :key="t">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 物种档案 -->
      <div v-if="activeModule === 'species'">
        <div class="section-header">
          <span class="section-title">物种档案</span>
          <span class="section-sub">拍到的昆虫与生物记录</span>
        </div>
        <div class="species-grid">
          <div class="species-card" v-for="sp in species" :key="sp.id">
            <div class="species-head">
              <span class="species-icon">{{ sp.icon }}</span>
              <span class="species-first" title="第一次拍到">{{ sp.firstSeen }}</span>
            </div>
            <div class="species-name">{{ sp.name }}</div>
            <div class="species-latin">{{ sp.latin }}</div>
            <div class="species-diff">
              <span class="diff-label">拍摄难点</span>
              <span class="diff-text">{{ sp.difficulty }}</span>
            </div>
            <div class="species-note">{{ sp.note }}</div>
          </div>
        </div>
      </div>

      <!-- 4. 器材笔记 -->
      <div v-if="activeModule === 'gear'">
        <div class="section-header">
          <span class="section-title">器材笔记</span>
          <span class="section-sub">用出来的经验，不是参数表</span>
        </div>
        <div class="gear-list">
          <div class="gear-section" v-for="g in gear" :key="g.name">
            <div class="gear-name">
              <span class="gear-icon">{{ g.icon }}</span>
              {{ g.name }}
            </div>
            <div class="gear-notes">
              <div class="gear-note-item" v-for="(note, i) in g.notes" :key="i">
                <span class="note-dot" :class="note.type"></span>
                <div>
                  <span class="note-type-label">{{ gearNoteLabel[note.type] }}</span>
                  <p class="note-body">{{ note.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. 灵感与思考 -->
      <div v-if="activeModule === 'thoughts'">
        <div class="section-header">
          <span class="section-title">灵感与思考</span>
          <span class="section-sub">触动、观察、感悟</span>
        </div>
        <div class="thought-list">
          <div class="thought-item" v-for="t in thoughts" :key="t.id">
            <div class="thought-meta">
              <span class="thought-date">{{ t.date }}</span>
              <span class="thought-type" :class="t.type">{{ thoughtTypeLabel[t.type] }}</span>
            </div>
            <p class="thought-body">{{ t.content }}</p>
            <div class="thought-tags" v-if="t.tags">
              <span class="tag" v-for="tag in t.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    heroStats,
    shootingLogs,
    issues,
    species,
    gear,
    thoughts
} from '@/features/projects/photography/data/photography'

const activeModule = ref('log')

const modules = [
  { id: 'log',      icon: '📅', name: '拍摄日志' },
  { id: 'issues',   icon: '🔧', name: '问题追踪' },
  { id: 'species',  icon: '🦋', name: '物种档案' },
  { id: 'gear',     icon: '🎛️', name: '器材笔记' },
  { id: 'thoughts', icon: '💭', name: '灵感思考' },
]

// 问题追踪
const issueStatusLabel = { unsolved: '未解决', solved: '已解决', internalized: '已内化' }
// 器材笔记
const gearNoteLabel = { good: '优点', limit: '局限', tip: '技巧', wishlist: '待补' }
// 灵感与思考
const thoughtTypeLabel = { inspiration: '灵感', reflection: '思考', observation: '观察' }

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+SC:wght@300;400;500&display=swap');

.photo-page {
  min-height: 100vh;
  background: #111;
  padding: 0 0 60px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #ccc;
}

/* 顶栏 */
.topbar {
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

.back-btn:hover { border-color: #c678dd; color: #c678dd; }

.breadcrumb {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #333;
}

/* 英雄区 */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 32px;
  border-bottom: 1px solid #1a1a1a;
}

.hero-left { display: flex; align-items: center; gap: 18px; }

.hero-icon {
  font-size: 40px;
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 14px;
  line-height: 1;
}

.hero-title {
  font-size: 20px;
  color: #eee;
  font-weight: 500;
  margin: 0 0 6px;
}

.hero-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #444;
  margin: 0;
}

.hero-stats { display: flex; gap: 32px; }

.hstat { text-align: center; }

.hstat-val {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 24px;
  font-weight: 600;
  color: #c678dd;
}

.hstat-label {
  font-size: 11px;
  color: #444;
}

/* 模块标签 */
.module-tabs {
  display: flex;
  gap: 4px;
  padding: 16px 32px;
  border-bottom: 1px solid #1a1a1a;
  background: #0d0d0d;
}

.mod-tab {
  background: none;
  border: 1px solid transparent;
  color: #555;
  border-radius: 6px;
  padding: 7px 16px;
  font-size: 13px;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.15s;
}

.mod-tab:hover { color: #aaa; background: #1a1a1a; }

.mod-tab.active {
  color: #c678dd;
  border-color: rgba(198,120,221,0.3);
  background: rgba(198,120,221,0.06);
}

/* 内容区 */
.content { padding: 28px 32px; }

.section-header {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 20px;
}

.section-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: #c678dd;
  letter-spacing: 1px;
}

.section-sub {
  font-size: 12px;
  color: #333;
  font-family: 'IBM Plex Mono', monospace;
}

/* 拍摄日志 */
.log-list { display: flex; flex-direction: column; gap: 14px; }

.log-item {
  display: flex;
  gap: 20px;
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 18px 20px;
  transition: border-color 0.15s;
}

.log-item:hover { border-color: #2a2a2a; }

.log-date-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 70px;
  padding-right: 20px;
  border-right: 1px solid #222;
}

.log-date {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #555;
  writing-mode: horizontal-tb;
}

.log-weather { font-size: 18px; }

.log-body { flex: 1; display: flex; flex-direction: column; gap: 10px; }

.log-head { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }

.log-location {
  font-size: 13px;
  color: #aaa;
  font-weight: 500;
}

.subject-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #c678dd;
  border: 1px solid rgba(198,120,221,0.2);
  border-radius: 4px;
  padding: 2px 7px;
  background: rgba(198,120,221,0.05);
}

.log-note {
  font-size: 13px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}

.log-foot { display: flex; gap: 20px; }

.log-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #444;
}

.log-meta b { color: #888; }

/* 问题追踪 */
.issue-list { display: flex; flex-direction: column; gap: 14px; }

.issue-item {
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.issue-head { display: flex; align-items: center; justify-content: space-between; }

.issue-title { font-size: 14px; color: #eee; font-weight: 500; }

.issue-status {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid;
}

.issue-status.unsolved  { color: #e06c75; border-color: rgba(224,108,117,0.3); background: rgba(224,108,117,0.06); }
.issue-status.solved    { color: #42b883; border-color: rgba(66,184,131,0.3); background: rgba(66,184,131,0.06); }
.issue-status.internalized { color: #61afef; border-color: rgba(97,175,239,0.3); background: rgba(97,175,239,0.06); }

.issue-block {
  background: #111;
  border-left: 2px solid #2a2a2a;
  border-radius: 0 4px 4px 0;
  padding: 10px 14px;
}

.issue-block.solved { border-left-color: rgba(66,184,131,0.4); }

.issue-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #444;
  margin-bottom: 6px;
}

.issue-block.solved .issue-label { color: #42b883; }

.issue-text { font-size: 13px; color: #666; line-height: 1.7; margin: 0; }

.issue-tags { display: flex; gap: 6px; flex-wrap: wrap; }

/* 物种档案 */
.species-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.species-card {
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.15s;
}

.species-card:hover { border-color: #2a2a2a; }

.species-head { display: flex; justify-content: space-between; align-items: center; }

.species-icon { font-size: 24px; }

.species-first {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #333;
}

.species-name { font-size: 15px; color: #eee; font-weight: 500; }

.species-latin {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #444;
  font-style: italic;
}

.species-diff {
  background: #111;
  border-radius: 4px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.diff-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #e5c07b;
}

.diff-text { font-size: 12px; color: #666; }

.species-note { font-size: 12px; color: #555; line-height: 1.7; }

/* 器材笔记 */
.gear-list { display: flex; flex-direction: column; gap: 24px; }

.gear-section {
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 20px;
}

.gear-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: #eee;
  font-weight: 500;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #222;
}

.gear-icon { font-size: 20px; }

.gear-notes { display: flex; flex-direction: column; gap: 12px; }

.gear-note-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.note-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.note-dot.good     { background: #42b883; }
.note-dot.limit    { background: #e06c75; }
.note-dot.tip      { background: #e5c07b; }
.note-dot.wishlist { background: #61afef; }

.note-type-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #444;
  display: block;
  margin-bottom: 3px;
}

.note-body { font-size: 13px; color: #666; line-height: 1.7; margin: 0; }

/* 灵感思考 */
.thought-list { display: flex; flex-direction: column; gap: 14px; }

.thought-item {
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.15s;
}

.thought-item:hover { border-color: #2a2a2a; }

.thought-meta { display: flex; align-items: center; gap: 12px; }

.thought-date {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #444;
}

.thought-type {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid;
}

.thought-type.inspiration { color: #c678dd; border-color: rgba(198,120,221,0.3); background: rgba(198,120,221,0.06); }
.thought-type.reflection  { color: #61afef; border-color: rgba(97,175,239,0.3); background: rgba(97,175,239,0.06); }
.thought-type.observation { color: #42b883; border-color: rgba(66,184,131,0.3); background: rgba(66,184,131,0.06); }

.thought-body {
  font-size: 13px;
  color: #777;
  line-height: 1.9;
  margin: 0;
  border-left: 2px solid #222;
  padding-left: 14px;
}

.thought-tags { display: flex; gap: 6px; flex-wrap: wrap; }

/* 通用 */
.tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #444;
  background: #1f1f1f;
  border: 1px solid #252525;
  border-radius: 4px;
  padding: 2px 7px;
}
</style>
