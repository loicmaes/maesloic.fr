<script setup lang="ts">
import TopBar from "~/components/shared/layout/TopBar.vue";
</script>

<template>
  <div data-layout="default">
    <TopBar />

    <div class="flex flex-col">
      <NuxtPage />
    </div>
  </div>
</template>
