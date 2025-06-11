<script setup lang="ts">
import * as icons from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
  name: string;
  class?: HTMLAttributes["class"];
}>();

const icon = computed(() => icons[props.name as keyof typeof icons]);
</script>

<template>
  <component
    :is="icon"
    v-if="icon"
    :class="cn('size-4', props.class)"
  />
</template>
