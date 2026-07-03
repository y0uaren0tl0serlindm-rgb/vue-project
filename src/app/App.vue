<template>
  <AppNavbar @toggle-sidebar="toggleSidebar" />
  <AppSidebar v-model:open="sidebarOpen" />
  <RouterView />
</template>

<script setup>
import { ref } from 'vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const sidebarOpen = ref(false)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>
