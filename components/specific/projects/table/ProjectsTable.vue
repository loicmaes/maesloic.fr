<script setup lang="ts">
import { columns } from "./columns";

const store = useProjectsStore();
</script>

<template>
  <DataTable
    :columns="columns()"
    :data="store.sortedProjects"
  />
</template>
