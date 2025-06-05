<script setup lang="ts">
definePageMeta({
  layout: "legal",
});
</script>

<template>
  <main
    data-page="privacy"
    class="grid gap-12"
  >
    <h1 class="text-6xl font-extrabold">
      {{ $t("terms.privacy.title") }}
    </h1>

    <section class="grid">
      <p
        v-for="(part, index) in $tm('terms.privacy.intro')"
        :key="index"
        class="leading-loose"
      >
        <i18n-t :keypath="`terms.privacy.intro[${index}]`" />
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.privacy.collected-data.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.privacy.collected-data.paragraph") }}
      </p>
      <ul class="ml-8 my-3 list-disc">
        <li
          v-for="(part, index) in $tm('terms.privacy.collected-data.list')"
          :key="index"
          class="leading-loose"
        >
          <i18n-t :keypath="`terms.privacy.collected-data.list[${index}]`" />
        </li>
      </ul>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.privacy.finality.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.privacy.finality.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.privacy.conservation.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.privacy.conservation.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.privacy.your-rights.title") }}
      </h2>
      <p
        v-for="(part, index) in $tm('terms.privacy.your-rights.data')"
        :key="index"
        class="leading-loose"
      >
        <i18n-t :keypath="`terms.privacy.your-rights.data[${index}]`">
          <template #email>
            <Button
              variant="link"
              class="!p-0 h-auto text-md"
              as-child
            >
              <NuxtLink
                to="mailto:contact@studio-klypi.com"
                external
              >
                contact@studio-klypi.com
              </NuxtLink>
            </Button>
          </template>
        </i18n-t>
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.privacy.cookies.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.privacy.cookies.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.privacy.security.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.privacy.security.data") }}
      </p>
    </section>
  </main>
</template>
