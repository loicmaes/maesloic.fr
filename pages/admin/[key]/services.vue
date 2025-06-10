<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const store = useServicesStore();
await store.loadServices();
</script>

<template>
  <main data-page="admin.services">
    Services
  </main>
</template>
