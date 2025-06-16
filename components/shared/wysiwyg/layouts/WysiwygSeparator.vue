<script setup lang="ts">
import type { IWysiwygSeparator } from "~/types/wysiwyg";

defineProps<{
  separator: IWysiwygSeparator;
}>();
</script>

<template>
  <Separator :orientation="separator.orientation" />
</template>
