<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  total: number;
  completed:number;
}>();
const totaltime = computed(() => {
    const MIN = Math.floor(props.total / 60)
    const SEC = props.total % 60;
    return `${MIN}:${SEC < 10 ? '0'+SEC : SEC}`
})

const width = computed(() => {
    return props.completed / props.total * 100
})
</script>
<template>
    <div class="progress-wrapper">
        <span class="progress-container">
            <span class="progress-fill" :style="{ width: width + '%' }"></span>
        </span>
        <span>{{ totaltime }}</span>
    </div>
</template>
<style scoped>
.progress-wrapper {
    display: flex;
    gap:.5rem;
}
.progress-container {
    background-color: var(--inactive-color);
    flex-grow: 1;
    border-radius: 100vw;
    overflow: hidden;
}
.progress-fill {
    background-color: var(--progress-blue);
    display: inline-block;
    height: 100%;
    border-radius: 100vw;
}
</style>