<script setup lang="ts">
import type { IWysiwygParagraph } from "~/types/wysiwyg";

defineProps<{
  paragraph: IWysiwygParagraph;
}>();
</script>

<template>
  <p class="leading-relaxed">
    {{ paragraph.content }}
  </p>
</template>
