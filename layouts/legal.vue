<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";
import WebContent from "~/components/shared/WebContent.vue";

const { locale, defaultLocale } = useI18n();
const displayInfo = computed(() => locale.value !== defaultLocale);
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
    </WebContent>
  </div>
</template>
