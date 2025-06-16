<script setup lang="ts">
import type { IWysiwygContent } from "~/types/wysiwyg";
import { cn } from "~/lib/utils";
import WysiwygRender from "~/components/shared/wysiwyg/WysiwygRender.vue";

defineProps<{
  content: IWysiwygContent;
}>();
</script>

<template>
  <div
    :class="cn(
      'flex flex-col gap-10 w-full',
      content.options.fullWidth ? 'max-w-full' : 'mx-auto max-w-[65ch]',
    )"
  >
    <!-- todo: content -->
    <WysiwygRender
      v-for="(entity, index) in content.blocks"
      :key="index"
      :entity="entity"
    />
  </div>
</template>
