<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { IWysiwygTitle } from "~/types/wysiwyg";
import { cn } from "~/lib/utils";

const props = defineProps<{
  title: IWysiwygTitle;
}>();

const computedStyle = computed((): HTMLAttributes["class"] => {
  switch (props.title.level) {
    case 1:
      return "text-5xl font-black";
    case 2:
      return "text-4xl font-extrabold";
    case 3:
      return "text-2xl font-extrabold";
    case 4:
      return "text-xl font-bold";
    case 5:
      return "text-lg font-bold";
    case 6:
      return "font-bold";
    default:
      return "";
  }
});
</script>

<template>
  <component
    :is="`h${title.level}`"
    :class="cn('text-balance', computedStyle)"
  >
    {{ title.content }}
  </component>
</template>
