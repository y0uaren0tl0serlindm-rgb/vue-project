<template>
  <div class="notes-page">

    <!-- 顶栏 -->
    <div class="topbar">
      <div class="topbar-left">
        <h2 class="page-title">// 笔记库</h2>
        <span class="note-count">{{ filtered.length }} 条</span>
      </div>
      <div class="topbar-right">
        <div class="search-box">
          <span>⌕</span>
          <input v-model="query" placeholder="搜索笔记..." />
        </div>
        <button class="add-btn" @click="openModal">
          <span class="add-icon">+</span> 新增笔记
        </button>
      </div>
    </div>

    <!-- 分类过滤 -->
    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat"
        class="cat-tab"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        <span>{{ categoryIcon[cat] }}</span> {{ cat }}
        <span class="cat-count">{{ countByCategory(cat) }}</span>
      </button>
    </div>

    <!-- 笔记卡片网格 -->
    <div class="notes-grid">
      <a
        v-for="note in filtered"
        :key="note.title"
        class="note-card"
        :href="'http://101.37.12.221:8080/' + note.file"
        target="_blank"
      >
        <div class="note-card-top">
          <span class="note-cat-badge" :style="{ color: categoryColor[note.category], borderColor: categoryColor[note.category] + '40' }">
            {{ note.category }}
          </span>
          <span class="note-arrow">↗</span>
        </div>
        <div class="note-title">{{ note.title }}</div>
        <div class="note-path">{{ note.file.split('/').slice(-2).join('/') }}</div>
      </a >

      <!-- 空状态 -->
      <div v-if="filtered.length === 0" class="empty">
        <p>没有找到相关笔记</p >
      </div>
    </div>

    <!-- 新增笔记弹窗 -->
    <Transition name="fade">
      <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
        <Transition name="pop">
          <div class="modal" v-if="modalOpen">
            <div class="modal-header">
              <span class="modal-title">// 新增笔记</span>
              <button class="modal-close" @click="closeModal">✕</button>
            </div>

            <div class="modal-body">
              <div class="field">
                <label>标题</label>
                <input v-model="form.title" placeholder="笔记标题" />
              </div>

              <div class="field">
                <label>分类</label>
                <div class="cat-selector">
                  <button
                    v-for="cat in ['学习', '工作', '设备', '其他']"
                    :key="cat"
                    class="cat-option"
                    :class="{ selected: form.category === cat }"
                    :style="form.category === cat ? { borderColor: categoryColor[cat], color: categoryColor[cat] } : {}"
                    @click="form.category = cat"
                  >
                    {{ categoryIcon[cat] }} {{ cat }}
                  </button>
                </div>
              </div>

              <div class="field">
                <label>文件路径</label>
                <input v-model="form.file" placeholder="/notes/..." />
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn-cancel" @click="closeModal">取消</button>
              <button class="btn-submit" @click="addNote">添加</button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { notes as initialNotes } from '@/features/notes/data/notes'

const allNotes = ref([...initialNotes])
const query = ref('')
const activeCategory = ref('全部')

const categories = ['全部', '学习', '工作', '设备', '其他']

const categoryColor = {
  '全部': '#42b883',
  '学习': '#42b883',
  '工作': '#61afef',
  '设备': '#e5c07b',
  '其他': '#c678dd',
}

const categoryIcon = {
  '全部': '◈',
  '学习': '📖',
  '工作': '🌐',
  '设备': '🖨️',
  '其他': '📌',
}

const filtered = computed(() => {
  return allNotes.value.filter(n => {
    const matchCat = activeCategory.value === '全部' || n.category === activeCategory.value
    const matchQuery = n.title.toLowerCase().includes(query.value.toLowerCase())
    return matchCat && matchQuery
  })
})

const countByCategory = (cat) => {
  if (cat === '全部') return allNotes.value.length
  return allNotes.value.filter(n => n.category === cat).length
}

// 弹窗
const modalOpen = ref(false)
const form = ref({ title: '', category: '学习', file: '' })

const openModal = () => { form.value = { title: '', category: '学习', file: '' }; modalOpen.value = true }
const closeModal = () => modalOpen.value = false

const addNote = () => {
  if (!form.value.title.trim()) return
  allNotes.value.push({ ...form.value })
  closeModal()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+SC:wght@300;400;500&display=swap');

.notes-page {
  min-height: 100vh;
  background: #111;
  padding: 28px 32px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #ccc;
}

/* 顶栏 */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.topbar-left { display: flex; align-items: baseline; gap: 12px; }

.page-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  color: #42b883;
  font-weight: 600;
  letter-spacing: 1px;
}

.note-count {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #444;
}

.topbar-right { display: flex; align-items: center; gap: 12px; }

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  padding: 0 12px;
  transition: border-color 0.15s;
}

.search-box:focus-within { border-color: #42b883; }
.search-box span { color: #444; font-size: 16px; }

.search-box input {
  background: none;
  border: none;
  outline: none;
  color: #ccc;
  font-size: 13px;
  padding: 8px 0;
  width: 200px;
  font-family: 'Noto Sans SC', sans-serif;
}

.search-box input::placeholder { color: #333; }

.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(66,184,131,0.1);
  border: 1px solid rgba(66,184,131,0.3);
  color: #42b883;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.15s;
}

.add-btn:hover { background: rgba(66,184,131,0.2); border-color: #42b883; }
.add-icon { font-size: 18px; line-height: 1; }

/* 分类标签 */
.category-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.cat-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid #222;
  color: #555;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.15s;
}

.cat-tab:hover { border-color: #333; color: #aaa; }

.cat-tab.active {
  border-color: #42b883;
  color: #42b883;
  background: rgba(66,184,131,0.08);
}

.cat-count {
  background: #222;
  border-radius: 10px;
  padding: 1px 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #444;
}

.cat-tab.active .cat-count { background: rgba(66,184,131,0.15); color: #42b883; }

/* 卡片网格 */
.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.note-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 16px;
  text-decoration: none;
  transition: all 0.15s;
  cursor: pointer;
}

.note-card:hover {
  border-color: #333;
  background: #1e1e1e;
  transform: translateY(-1px);
}

.note-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.note-cat-badge {
  font-size: 10px;
  font-family: 'IBM Plex Mono', monospace;
  border: 1px solid;
  border-radius: 4px;
  padding: 2px 7px;
}

.note-arrow {
  color: #333;
  font-size: 14px;
  transition: color 0.15s;
}

.note-card:hover .note-arrow { color: #42b883; }

.note-title {
  font-size: 14px;
  color: #ddd;
  font-weight: 500;
  line-height: 1.4;
}

.note-path {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty {
  grid-column: span 4;
  text-align: center;
  padding: 60px;
  color: #333;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(3px);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  width: 420px;
  font-family: 'Noto Sans SC', sans-serif;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #222;
}

.modal-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: #42b883;
  letter-spacing: 1px;
}

.modal-close {
  background: none;
  border: none;
  color: #444;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 4px;
  transition: all 0.15s;
}

.modal-close:hover { color: #fff; background: #2a2a2a; }

.modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field { display: flex; flex-direction: column; gap: 8px; }

.field label {
  font-size: 11px;
  color: #555;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.5px;
}

.field input {
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  color: #ccc;
  font-size: 13px;
  padding: 9px 12px;
  outline: none;
  font-family: 'Noto Sans SC', sans-serif;
  transition: border-color 0.15s;
}

.field input:focus { border-color: #42b883; }
.field input::placeholder { color: #333; }

.cat-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-option {
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  color: #555;
  padding: 7px 14px;
  font-size: 12px;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.15s;
}

.cat-option:hover { border-color: #444; color: #aaa; }
.cat-option.selected { background: rgba(66,184,131,0.05); }

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid #222;
}

.btn-cancel {
  background: none;
  border: 1px solid #2a2a2a;
  color: #555;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 13px;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.15s;
}

.btn-cancel:hover { border-color: #444; color: #aaa; }

.btn-submit {
  background: rgba(66,184,131,0.1);
  border: 1px solid rgba(66,184,131,0.3);
  color: #42b883;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 13px;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  transition: all 0.15s;
}

.btn-submit:hover { background: rgba(66,184,131,0.2); border-color: #42b883; }

/* 动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.pop-enter-active { transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.pop-leave-active { transition: all 0.15s ease; }
.pop-enter-from { opacity: 0; transform: scale(0.9); }
.pop-leave-to { opacity: 0; transform: scale(0.95); }
</style>
