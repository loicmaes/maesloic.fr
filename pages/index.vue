<script setup lang="ts">
import { CalendarPlus } from "lucide-vue-next";
import FeatureGrid from "@/components/specific/features/FeatureGrid.vue";
import WebContent from "~/components/shared/layout/WebContent.vue";

const store = usePublicStore();
const { services, projects, testimonials } = storeToRefs(store);

store.loadServices();
</script>

<template>
  <main data-page="home">
    <section id="hero">
      <WebContent class="min-h-[80dvh] grid place-items-center">
        <div class="w-full md:w-2/3 text-center">
          <h1 class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-balance leading-none">
            {{ $t("home.hero.title") }}
          </h1>
          <p class="text-lg mt-6">
            {{ $t("home.hero.caption") }}
          </p>
        </div>
      </WebContent>
    </section>
    <section
      id="what-i-do"
      class="py-16"
    >
      <WebContent>
        <header class="max-w-[55ch]">
          <h2 class="text-3xl md:text-5xl font-bold text-balance">
            {{ $t("home.what-i-do.title") }}
          </h2>
        </header>

        <main>
          <FeatureGrid :features="services" />
        </main>
      </WebContent>
    </section>
    <section
      v-if="projects?.length"
      id="featured-projects"
      class="py-32 bg-accent text-accent-foreground"
    >
      <WebContent>
        <header class="max-w-[55ch]">
          <h2 class="text-3xl md:text-5xl font-bold text-balance">
            {{ $t("home.featured-projects.title") }}
          </h2>
        </header>
      </WebContent>
    </section>
    <section
      v-if="testimonials.length"
      class="py-16"
    >
      <WebContent>
        <header class="max-w-[55ch]">
          <h2 class="text-3xl md:text-5xl font-bold text-balance">
            {{ $t("home.testimonials.title") }}
          </h2>
        </header>
      </WebContent>
    </section>
    <section class="py-32 bg-accent text-accent-foreground">
      <WebContent class="md:grid-cols-2 lg:grid-cols-[55ch_auto]">
        <section>
          <header>
            <h2 class="text-3xl md:text-5xl font-bold text-balance">
              {{ $t("home.cta.title") }}
            </h2>
          </header>

          <div class="mt-6 flex flex-col gap-3">
            <p
              v-for="(line, index) in $tm('home.cta.caption')"
              :key="index"
              class="text-balance"
              :class="{
                'mt-3': index === $tm('home.cta.caption').length - 1,
              }"
            >
              <i18n-t :keypath="`home.cta.caption[${index}]`" />
            </p>
          </div>

          <Button class="mt-8">
            <CalendarPlus />
            {{ $t("home.cta.action") }}
          </Button>
        </section>
        <section class="grid place-items-center text-xs text-muted-foreground opacity-50">
          illustration
        </section>
      </WebContent>
    </section>
  </main>
</template>
