<script setup lang="ts">
definePageMeta({
  layout: "empty",
});
</script>

<template>
  <main data-page="admin.build-project">
    build project {{ useRoute().params.projectId }}
  </main>
</template>
