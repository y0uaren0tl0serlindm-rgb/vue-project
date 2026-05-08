import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Electronics from './views/Electronics.vue'
import ElectronicsDetail from './views/ElectronicsDetail.vue'
import Info from './views/Info.vue'
import Notes from './views/Notes.vue'
import Projects from './views/Projects.vue'
import Photography from './views/projects/Photography.vue'
import Weekly from './views/WeeklyReportGenerator.vue'
import fkapex from './views/fkApex.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/info', component: Info },
  { path: '/electronics', component: Electronics },
  { path: '/electronics/:id', component: ElectronicsDetail },
  { path: '/notes', component: Notes },
  { path: '/projects', component: Projects },
  { path: '/projects/photography', component: Photography },
  { path: '/weekly', component: Weekly },
  { path: '/fkApex', component: fkapex },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
