<script setup lang="ts">
definePageMeta({
  layout: "legal",
});
</script>

<template>
  <main
    data-page="conditions-utilisation"
    class="grid gap-12"
  >
    <h1 class="text-6xl font-extrabold">
      {{ $t("terms.tou.title") }}
    </h1>

    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tou.object.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tou.object.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tou.access.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tou.access.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tou.intellectual-property.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tou.intellectual-property.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tou.responsability.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tou.responsability.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tou.updates.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tou.updates.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tou.applicable-law.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tou.applicable-law.data") }}
      </p>
    </section>
  </main>
</template>
