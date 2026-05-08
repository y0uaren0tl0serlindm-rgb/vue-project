<template>
    <p>
        {{ item.name }} 请假 {{ item.days }}天，原因:{{ item.reason }}
        <button @click="emit('remove',item.id)">删除</button>
    </p>
</template>

<script setup>
const props = defineProps(['item'])
const emit = defineEmits(['remove'])
</script>