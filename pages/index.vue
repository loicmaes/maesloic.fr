<script setup lang="ts">
import { CalendarPlus } from "lucide-vue-next";
import FeatureGrid from "@/components/specific/features/FeatureGrid.vue";
import WebContent from "~/components/shared/WebContent.vue";

const projects = computed(() => []);
const testimonials = computed(() => []);
</script>

<template>
  <main data-page="home">
    <section id="hero">
      <WebContent class="min-h-[75dvh] grid place-items-center">
        <div class="w-full md:w-2/3 text-center">
          <span class="text-muted-foreground">{{ $t("name") }},</span>
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
        <header>
          <h2 class="text-3xl md:text-5xl font-bold">
            {{ $t("home.what-i-do.title") }}
          </h2>
        </header>

        <main>
          <FeatureGrid />
        </main>
      </WebContent>
    </section>
    <section
      v-if="projects?.length"
      id="featured-projects"
      class="py-32 bg-accent text-accent-foreground"
    >
      <WebContent>
        <header>
          <h2 class="text-3xl md:text-5xl font-bold">
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
        <header>
          <h2 class="text-3xl md:text-5xl font-bold">
            {{ $t("home.testimonials.title") }}
          </h2>
        </header>
      </WebContent>
    </section>
    <section class="py-32 bg-accent text-accent-foreground">
      <WebContent>
        <header>
          <h2 class="text-3xl md:text-5xl font-bold">
            {{ $t("home.cta.title") }}
          </h2>
          <div class="mt-6 flex max-w-[55ch] flex-col gap-3">
            <p>
              {{ $t("home.cta.caption.line-1") }}
            </p>
            <p>
              {{ $t("home.cta.caption.line-2") }}
            </p>
            <p class=" mt-3">
              {{ $t("home.cta.caption.line-end") }}
            </p>
          </div>

          <Button
            class="mt-8"
            as-child
          >
            <NuxtLinkLocale to="/contact">
              <CalendarPlus />
              {{ $t("home.cta.action") }}
            </NuxtLinkLocale>
          </Button>
        </header>
      </WebContent>
    </section>
  </main>
</template>
