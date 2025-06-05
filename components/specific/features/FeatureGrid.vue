<script setup lang="ts">
import { Code, Globe, type LucideIcon, Rocket, Users } from "lucide-vue-next";
import FeatureCard from "~/components/specific/features/FeatureCard.vue";

withDefaults(defineProps<{
  features?: {
    icon?: LucideIcon;
    name: string;
  }[];
}>(), () => ({
  features: [
    {
      icon: Globe,
      name: "web-sites",
    },
    {
      icon: Rocket,
      name: "pwa",
    },
    {
      icon: Users,
      name: "user-based",
    },
    {
      icon: Code,
      name: "pretty-code",
    },
  ],
}));
</script>

<template>
  <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <FeatureCard
      v-for="feature in features"
      :key="feature.name"
      :feature="feature"
    />
  </div>
</template>
