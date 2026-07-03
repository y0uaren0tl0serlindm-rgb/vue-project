import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/features/home/pages/HomePage.vue'),
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/features/info/pages/InfoPage.vue'),
  },
  {
    path: '/electronics',
    name: 'electronics',
    component: () => import('@/features/electronics/pages/ElectronicsPage.vue'),
  },
  {
    path: '/electronics/:id',
    name: 'electronics-detail',
    component: () => import('@/features/electronics/pages/ElectronicsDetailPage.vue'),
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('@/features/notes/pages/NotesPage.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/features/projects/pages/ProjectsPage.vue'),
  },
  {
    path: '/projects/photography',
    name: 'project-photography',
    component: () => import('@/features/projects/photography/pages/PhotographyPage.vue'),
  },
  {
    path: '/weekly',
    name: 'weekly-report',
    component: () => import('@/features/weekly/pages/WeeklyReportPage.vue'),
  },
  {
    path: '/fkApex',
    name: 'wheel',
    component: () => import('@/features/wheel/pages/WheelPage.vue'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
