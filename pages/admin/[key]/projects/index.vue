<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import ProjectsTable from "~/components/specific/projects/table/ProjectsTable.vue";
import ProjectDialog from "~/components/specific/projects/dialogs/ProjectDialog.vue";

definePageMeta({
  layout: "admin",
  displayName: "admin.projects.title",
});

const store = useProjectsStore();
store.loadProjects();
</script>

<template>
  <main
    data-page="admin.project-listing"
    class="grid gap-2"
  >
    <header class="flex items-center gap-2">
      <Input
        placeholder="search"
        disabled
      />

      <ProjectDialog with-slot>
        <Button>
          <Plus />
          {{ $t("btn.new") }}
        </Button>
      </ProjectDialog>
    </header>

    <ProjectsTable />
  </main>
</template>
