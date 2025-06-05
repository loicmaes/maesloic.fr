<script setup lang="ts">
definePageMeta({
  layout: "legal",
});
</script>

<template>
  <main
    data-page="conditions-vente"
    class="grid gap-12"
  >
    <h1 class="text-6xl font-extrabold">
      {{ $t("terms.tos.title") }}
    </h1>

    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tos.services.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tos.services.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tos.price.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tos.price.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tos.order-payment.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tos.order-payment.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tos.delays.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tos.delays.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tos.retractation.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tos.retractation.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tos.responsability.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tos.responsability.data") }}
      </p>
    </section>
    <section class="grid">
      <h2 class="text-lg font-bold mb-2">
        {{ $t("terms.tos.conflicts.title") }}
      </h2>
      <p class="leading-loose">
        {{ $t("terms.tos.conflicts.data") }}
      </p>
    </section>
  </main>
</template>
