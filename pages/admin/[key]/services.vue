<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import FeaturesTable from "~/components/specific/features/features-table/FeaturesTable.vue";
import ServiceDialog from "~/components/specific/features/dialogs/ServiceDialog.vue";

definePageMeta({
  layout: "admin",
  displayName: "admin.services.title",
});

const store = useServicesStore();
await store.loadServices();
</script>

<template>
  <main
    data-page="admin.services"
    class="grid gap-2"
  >
    <header class="flex items-center gap-2">
      <Input
        placeholder="search"
        disabled
      />
      <ServiceDialog with-slot>
        <Button>
          <Plus />
          {{ $t("btn.new") }}
        </Button>
      </ServiceDialog>
    </header>

    <FeaturesTable />
  </main>
</template>
