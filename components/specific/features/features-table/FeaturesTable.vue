<script setup lang="ts">
import { columns } from "./features-table.columns";

const store = useServicesStore();
</script>

<template>
  <DataTable
    :columns="columns()"
    :data="store.sortedServices"
  />
</template>
