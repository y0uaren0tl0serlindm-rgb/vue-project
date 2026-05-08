<template>
  <div class="projects-page">
    <div class="topbar">
      <div class="topbar-left">
        <h2 class="page-title">// 项目</h2>
        <span class="sub">长期追踪 · 成长记录</span>
      </div>
    </div>

    <div class="cards">
      <div
        v-for="p in projects"
        :key="p.id"
        class="card"
        @click="$router.push('/projects/' + p.id)"
      >
        <div class="card-head">
          <span class="card-icon">{{ p.icon }}</span>
          <span class="card-status" :class="p.status">{{ statusLabel[p.status] }}</span>
        </div>
        <div class="card-name">{{ p.name }}</div>
        <div class="card-desc">{{ p.desc }}</div>
        <div class="card-meta">
          <span class="meta-item">{{ p.startDate }} 开始</span>
          <span class="meta-dot">·</span>
          <span class="meta-item">{{ p.entryCount }} 条记录</span>
        </div>
        <div class="card-tags">
          <span class="tag" v-for="t in p.tags" :key="t">{{ t }}</span>
        </div>
        <div class="card-footer">
          <span class="card-enter">进入项目 →</span>
        </div>
      </div>

      <!-- 占位卡片 -->
      <div class="card card-placeholder">
        <div class="placeholder-inner">
          <span class="placeholder-icon">+</span>
          <span class="placeholder-text">新建项目</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const statusLabel = { active: '进行中', done: '已完成', paused: '暂停' }

const projects = [
  {
    id: 'photography',
    icon: '📷',
    name: '摄影成长档案',
    status: 'active',
    desc: '记录拍摄日志、技术问题、物种积累、器材经验与摄影思考，长期追踪成长轨迹。',
    startDate: '2025',
    entryCount: 12,
    tags: ['Nikon Z7 II', '昆虫', '微距', '风景'],
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+SC:wght@300;400;500&display=swap');

.projects-page {
  min-height: 100vh;
  background: #111;
  padding: 28px 32px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #ccc;
}

.topbar {
  display: flex;
  align-items: center;
  margin-bottom: 28px;
}

.topbar-left { display: flex; align-items: baseline; gap: 14px; }

.page-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  color: #c678dd;
  font-weight: 600;
  letter-spacing: 1px;
}

.sub { font-size: 12px; color: #333; font-family: 'IBM Plex Mono', monospace; }

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

.card {
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 10px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: all 0.15s;
  border-left: 3px solid #c678dd;
}

.card:hover {
  background: #1e1e1e;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.card-head { display: flex; justify-content: space-between; align-items: center; }
.card-icon { font-size: 24px; }

.card-status {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid;
}

.card-status.active { color: #42b883; border-color: rgba(66,184,131,0.3); background: rgba(66,184,131,0.08); }
.card-status.done   { color: #555; border-color: #2a2a2a; }
.card-status.paused { color: #e5c07b; border-color: rgba(229,192,123,0.3); background: rgba(229,192,123,0.08); }

.card-name { font-size: 16px; color: #eee; font-weight: 500; }
.card-desc { font-size: 12px; color: #555; line-height: 1.7; flex: 1; }

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #444;
}

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
  padding-top: 10px;
  border-top: 1px solid #1f1f1f;
}

.card-enter {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #444;
  transition: color 0.15s;
}

.card:hover .card-enter { color: #c678dd; }

.card-placeholder {
  border-left-color: #222;
  border-style: dashed;
  cursor: default;
  background: transparent;
}

.card-placeholder:hover {
  transform: none;
  box-shadow: none;
  background: #141414;
}

.placeholder-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 0;
}

.placeholder-icon {
  font-size: 24px;
  color: #2a2a2a;
  font-family: 'IBM Plex Mono', monospace;
}

.placeholder-text {
  font-size: 12px;
  color: #2a2a2a;
  font-family: 'IBM Plex Mono', monospace;
}
</style>
