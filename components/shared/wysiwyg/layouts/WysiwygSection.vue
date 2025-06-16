<script setup lang="ts">
import WysiwygRender from "~/components/shared/wysiwyg/WysiwygRender.vue";
import type { IWysiwygSection } from "~/types/wysiwyg";

defineProps<{
  section: IWysiwygSection;
}>();
</script>

<template>
  <section class="flex flex-col gap-4">
    <WysiwygRender
      v-for="(entity, index) in section.children"
      :key="index"
      :entity="entity"
    />
  </section>
</template>
