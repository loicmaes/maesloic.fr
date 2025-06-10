<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

<template>
  <main data-page="admin.login">
    admin · login
    <Button as-child>
      <NuxtLinkLocale to="/admin/key/services">
        Go To Services
      </NuxtLinkLocale>
    </Button>
  </main>
</template>
