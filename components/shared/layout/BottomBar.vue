<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import WebContent from "./WebContent.vue";
import { cn } from "@/lib/utils";

interface TermsLink {
  to: string;
  translationPath: string;
}

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { dates, same } = useCopyrightDates();
const [start, current] = dates;

const terms: TermsLink[] = [
  {
    to: "/terms/legal-notice",
    translationPath: "legal-notice",
  },
  {
    to: "/terms/terms-of-use",
    translationPath: "terms-of-use",
  },
  {
    to: "/terms/terms-of-sale",
    translationPath: "terms-of-sale",
  },
  {
    to: "/terms/privacy",
    translationPath: "privacy",
  },
];
</script>

<template>
  <footer class="flex justify-center">
    <WebContent :class="cn('flex items-center justify-center', props.class)">
      <p class="text-sm text-muted-foreground self-center">
        {{ $t("footer.rights", same ? 1 : 2, { named: { name: $t("name"), start, end: current } }) }}
      </p>

      <Separator orientation="vertical" />

      <div class="flex items-center gap-4">
        <Button
          v-for="term in terms"
          :key="term.translationPath"
          variant="link"
          class="h-auto px-0 py-1 !text-muted-foreground"
          as-child
        >
          <NuxtLinkLocale :to="term.to">
            {{ $t(`footer.${term.translationPath}`) }}
          </NuxtLinkLocale>
        </Button>
      </div>
    </WebContent>
  </footer>
</template>
