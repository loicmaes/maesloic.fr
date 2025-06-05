<script setup lang="ts">
const links: {
  label: string;
  path: string;
}[] = [
  {
    label: "portfolio",
    path: "/portfolio",
  },
  {
    label: "blog",
    path: "/blog",
  },
  {
    label: "services",
    path: "/services",
  },
];
</script>

<template>
  <header class="sticky top-0 bg-background h-16 flex items-center justify-center px-4">
    <div class="w-full max-w-7xl flex items-center justify-between gap-12">
      <NuxtLinkLocale
        to="/"
        class="text-lg font-bold"
      >
        {{ $t("name") }}.
      </NuxtLinkLocale>

      <nav class="flex items-center gap-1">
        <Button
          v-for="link in links"
          :key="link.label"
          variant="ghost"
          as-child
        >
          <NuxtLinkLocale
            :to="link.path"
            active-class="!bg-secondary !text-secodary-foreground"
          >
            {{ $t(`navigation.${link.label}`) }}
          </NuxtLinkLocale>
        </Button>
        <Button
          class="ml-7"
          as-child
        >
          <NuxtLinkLocale to="/contact">
            {{ $t("navigation.lets-meet") }}
          </NuxtLinkLocale>
        </Button>
      </nav>
    </div>
  </header>
</template>
