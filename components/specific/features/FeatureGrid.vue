<script setup lang="ts">
import FeatureCard from "~/components/specific/features/FeatureCard.vue";
import type { IService } from "~/types/services";

defineProps<{
  features?: IService[];
}>();
</script>

<template>
  <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <FeatureCard
      v-for="feature in features"
      :key="feature.id"
      :feature="feature"
    />
  </div>
</template>
