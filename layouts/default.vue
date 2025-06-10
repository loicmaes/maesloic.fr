<script setup lang="ts">
import TopBar from "~/components/shared/layout/TopBar.vue";
import BottomBar from "~/components/shared/layout/BottomBar.vue";
</script>

<template>
  <div data-layout="default">
    <TopBar />

    <div class="flex flex-col">
      <NuxtPage />

      <BottomBar />
    </div>
  </div>
</template>
