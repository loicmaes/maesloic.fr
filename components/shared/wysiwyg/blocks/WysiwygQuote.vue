<script setup lang="ts">
import type { IWysiwygQuote } from "~/types/wysiwyg";

defineProps<{
  quote: IWysiwygQuote;
}>();
</script>

<template>
  <div class="flex flex-col gap-4 py-8 px-4">
    <blockquote>
      <p class="text-center text-2xl italic">
        “{{ quote.content }}”
      </p>
    </blockquote>

    <p
      v-if="quote.author"
      class="self-end text-sm text-muted-foreground"
    >
      — {{ quote.author }}.
    </p>
  </div>
</template>
