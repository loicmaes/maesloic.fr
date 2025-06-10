<script setup lang="ts">
definePageMeta({
  layout: "project",
});
</script>

<template>
  <main data-page="project-viewer">
    {{ useRoute().params.projectId }}
  </main>
</template>
