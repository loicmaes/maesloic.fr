<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";
import WebContent from "~/components/shared/WebContent.vue";

const { locale, defaultLocale } = useI18n();
const displayInfo = computed(() => locale.value !== defaultLocale);

const dates = computed(() => {
  const start = new Date(2025, 5, 6);
  const now = new Date();

  return start.getFullYear() === now.getFullYear() ? start.getFullYear().toString() : `${start.getFullYear()} - ${now.getFullYear()}`;
});
</script>

<template>
  <div data-layout="legal">
    <WebContent class="py-12 max-w-[60ch]">
      <Button
        size="sm"
        variant="ghost"
        class="w-min"
        @click="useRouter().back()"
      >
        <ArrowLeft />
        Retour
      </Button>

      <NuxtPage />

      <p
        v-if="displayInfo"
        class="leading-loose italic text-muted-foreground"
      >
        {{ $t("terms.legal-notice.info") }}
      </p>

      <footer class="text-sm text-center text-muted-foreground">
        <p>{{ $t("name") }} MAES &copy; {{ dates }}</p>
      </footer>
    </WebContent>
  </div>
</template>
