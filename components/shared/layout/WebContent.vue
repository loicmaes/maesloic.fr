<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="cn(
      'p-4 w-full max-w-7xl mx-auto',
      'grid gap-8',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
