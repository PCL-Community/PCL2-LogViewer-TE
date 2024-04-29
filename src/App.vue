<script setup>
import PageHeader from "./components/PageHeader.vue";
import PageMain from "./components/PageMain.vue";
</script>

<template>
    <PageHeader data-tauri-drag-region />
    <PageMain class="main" />
</template>

<style scoped lang="less">
.main {
    height: calc(100vh - 40px);
}
</style>
