<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "legal",
});
useHead({
  title: t("terms.legal-notice.title"),
});
</script>

<template>
  <main
    data-page="legal-notice"
    class="grid gap-12"
  >
    <h1 class="text-6xl font-extrabold">
      {{ $t("terms.legal-notice.title") }}
    </h1>

    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.legal-notice.editor.title") }}
      </h2>
      <p
        v-for="(part, index) in $tm('terms.legal-notice.editor.data')"
        :key="index"
        class="leading-loose"
      >
        <i18n-t
          :keypath="`terms.legal-notice.editor.data[${index}]`"
          tag="span"
        >
          <template #phone>
            <Button
              variant="link"
              class="!p-0 h-auto text-md"
              as-child
            >
              <NuxtLink
                to="tel:+33388315386"
              >+33 (0)3 88 31 53 86</NuxtLink>
            </Button>
          </template>
          <template #email>
            <Button
              variant="link"
              class="!p-0 h-auto text-md"
              as-child
            >
              <NuxtLink
                to="mailto:contact@studio-klypi.com"
              >contact@studio-klypi.com</NuxtLink>
            </Button>
          </template>
        </i18n-t>
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.legal-notice.director.title") }}
      </h2>

      <p class="leading-loose">
        {{ $t("terms.legal-notice.director.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.legal-notice.host.title") }}
      </h2>

      <p
        v-for="(part, index) in $tm('terms.legal-notice.host.data')"
        :key="index"
        class="leading-loose"
      >
        <i18n-t :keypath="`terms.legal-notice.host.data[${index}]`">
          <template #link>
            <Button
              variant="link"
              class="!p-0 h-auto text-md"
              as-child
            >
              <NuxtLink
                to="https://www.ovh.com"
                external
              >www.ovh.com</NuxtLink>
            </Button>
          </template>
        </i18n-t>
      </p>
    </section>
    <section class="grid">
      <p class="leading-loose">
        <i18n-t keypath="terms.legal-notice.owning">
          <template #link>
            <Button
              variant="link"
              class="!p-0 h-auto text-md"
              as-child
            >
              <NuxtLinkLocale to="/">
                www.maesloic.fr
              </NuxtLinkLocale>
            </Button>
          </template>
        </i18n-t>
      </p>
    </section>
  </main>
</template>
