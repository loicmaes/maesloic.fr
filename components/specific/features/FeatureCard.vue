<script setup lang="ts">
import * as icons from "lucide-vue-next";
import type { IService } from "~/types/services";

const { locale } = useI18n();

const props = defineProps<{
  feature: IService;
}>();

const icon = computed(() => icons[props.feature.icon as keyof typeof icons]);
</script>

<template>
  <Card
    :id="feature.id"
    class="p-6"
  >
    <div class="flex">
      <component
        :is="icon"
        v-if="icon"
        class="size-6"
      />
      <CardHeader class="w-full">
        <CardTitle>{{ feature.title[locale] }}</CardTitle>
        <CardDescription>{{ feature.caption[locale] }}</CardDescription>
      </CardHeader>
    </div>
  </Card>
</template>
