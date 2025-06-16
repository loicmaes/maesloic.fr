<script setup lang="ts">
import type { IProject } from "~/types/projects";
import Wysiwyg from "~/components/shared/wysiwyg/Wysiwyg.vue";

definePageMeta({
  layout: "empty",
});

const store = useProjectsStore();
const { selectedProject } = storeToRefs(store);
const project = computed(() => selectedProject.value as IProject);
</script>

<template>
  <main
    data-page="admin.build-project"
    class="p-8 grid gap-8"
  >
    <Wysiwyg :content="project.content" />
  </main>
</template>
