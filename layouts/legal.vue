<script setup lang="ts">
import { Home } from "lucide-vue-next";
import WebContent from "~/components/shared/layout/WebContent.vue";
import BottomBar from "~/components/shared/layout/BottomBar.vue";

const { locale, defaultLocale } = useI18n();
const displayInfo = computed(() => locale.value !== defaultLocale);
</script>

<template>
  <div data-layout="legal">
    <WebContent class="py-12 max-w-[60ch]">
      <Button
        size="icon"
        variant="ghost"
        as-child
      >
        <NuxtLinkLocale to="/">
          <Home />
          <span class="sr-only">{{ $t("terms.btn.back-to-home") }}</span>
        </NuxtLinkLocale>
      </Button>

      <NuxtPage />

      <p
        v-if="displayInfo"
        class="leading-loose italic text-muted-foreground"
      >
        {{ $t("terms.legal-notice.info") }}
      </p>
    </WebContent>

    <BottomBar class="max-w-[60ch]" />
  </div>
</template>
