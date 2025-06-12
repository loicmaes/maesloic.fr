<script setup lang="ts">
import type { IProject } from "~/types/projects";

const { locale } = useI18n();

definePageMeta({
  layout: "empty",
});

const store = useProjectsStore();
const { selectedProject } = storeToRefs(store);
const project = computed(() => selectedProject.value as IProject);
</script>

<template>
  <main data-page="admin.build-project">
    {{ project.title[locale] }}
  </main>
</template>
