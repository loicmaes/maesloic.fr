<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next";

defineProps<{
  feature: {
    icon?: LucideIcon;
    name: string;
  };
}>();
</script>

<template>
  <Card
    :id="feature.name"
    class="p-6"
  >
    <div class="flex">
      <component
        :is="feature.icon"
        v-if="feature.icon"
        class="size-6"
      />
      <CardHeader class="w-full">
        <CardTitle>{{ $t(`home.what-i-do.features.${feature.name}.title`) }}</CardTitle>
        <CardDescription>{{ $t(`home.what-i-do.features.${feature.name}.caption`) }}</CardDescription>
      </CardHeader>
    </div>
  </Card>
</template>
