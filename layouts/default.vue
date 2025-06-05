<script setup lang="ts">
import TopBar from "~/components/shared/TopBar.vue";
</script>

<template>
  <div data-layout="default">
    <TopBar />

    <div class="flex justify-center px-4">
      <div class="w-full max-w-7xl">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
