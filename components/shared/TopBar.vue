<script setup lang="ts">
import { CalendarPlus, Menu } from "lucide-vue-next";
import { useMediaQuery } from "@vueuse/core";
import WebContent from "@/components/shared/WebContent.vue";

const open = ref<boolean>(false);
const isDesktop = useMediaQuery("(min-width: 40rem)");

watch(isDesktop, val => open.value = val ? false : open.value);

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
  <header class="sticky top-0 bg-background h-16 flex items-center justify-center px-4 border-b">
    <WebContent class="flex items-center justify-between gap-12">
      <NuxtLinkLocale
        to="/"
        class="text-lg font-bold"
      >
        {{ $t("name") }}.
      </NuxtLinkLocale>

      <nav class="hidden sm:flex items-center gap-1">
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
            <CalendarPlus />
            {{ $t("navigation.lets-meet") }}
          </NuxtLinkLocale>
        </Button>
      </nav>
      <Sheet v-model:open="open">
        <SheetTrigger as-child>
          <Button
            size="icon"
            variant="ghost"
            class="sm:hidden"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {{ $t("name") }}.
            </SheetTitle>
          </SheetHeader>

          <div class="flex flex-col gap-1 flex-1 px-4 pb-6">
            <Button
              variant="ghost"
              class="justify-start"
              as-child
              @click="open = false"
            >
              <NuxtLinkLocale
                to="/"
                active-class="!bg-secondary !text-secodary-foreground"
              >
                {{ $t("navigation.home") }}
              </NuxtLinkLocale>
            </Button>
            <Button
              v-for="link in links"
              :key="link.label"
              variant="ghost"
              class="justify-start"
              as-child
              @click="open = false"
            >
              <NuxtLinkLocale
                :to="link.path"
                active-class="!bg-secondary !text-secodary-foreground"
              >
                {{ $t(`navigation.${link.label}`) }}
              </NuxtLinkLocale>
            </Button>
            <Button
              class="mt-auto justify-start"
              as-child
              @click="open = false"
            >
              <NuxtLinkLocale to="/contact">
                <CalendarPlus />
                {{ $t("navigation.lets-meet") }}
              </NuxtLinkLocale>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </WebContent>
  </header>
</template>
