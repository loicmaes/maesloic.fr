<script setup lang="ts">
import type {
  IWysiwygButton,
  IWysiwygContentEntity,
  IWysiwygMedia,
  IWysiwygParagraph, IWysiwygQuote, IWysiwygSection,
  IWysiwygSeparator,
  IWysiwygTitle,
} from "~/types/wysiwyg";
import WysiwygParagraph from "~/components/shared/wysiwyg/blocks/WysiwygParagraph.vue";
import WysiwygHeading from "~/components/shared/wysiwyg/blocks/WysiwygHeading.vue";
import WysiwygMedia from "~/components/shared/wysiwyg/blocks/WysiwygMedia.vue";
import WysiwygSeparator from "~/components/shared/wysiwyg/layouts/WysiwygSeparator.vue";
import WysiwygQuote from "~/components/shared/wysiwyg/blocks/WysiwygQuote.vue";
import WysiwygSection from "~/components/shared/wysiwyg/layouts/WysiwygSection.vue";
import WysiwygButton from "~/components/shared/wysiwyg/blocks/WysiwygButton.vue";

defineProps<{
  entity: IWysiwygContentEntity;
}>();
</script>

<template>
  <!-- LAYOUT -->
  <WysiwygSection
    v-if="entity.type === 'section'"
    :section="entity as IWysiwygSection"
  />

  <!-- INDIVIDUAL BLOCKS -->
  <WysiwygHeading
    v-if="entity.type === 'title'"
    :title="entity as IWysiwygTitle"
  />
  <WysiwygParagraph
    v-if="entity.type === 'paragraph'"
    :paragraph="entity as IWysiwygParagraph"
  />
  <WysiwygMedia
    v-if="['image', 'video'].includes(entity.type)"
    :media="entity as IWysiwygMedia"
  />
  <WysiwygSeparator
    v-if="entity.type === 'separator'"
    :separator="entity as IWysiwygSeparator"
  />
  <WysiwygQuote
    v-if="entity.type === 'quote'"
    :quote="entity as IWysiwygQuote"
  />
  <WysiwygButton
    v-if="entity.type === 'button'"
    :button="entity as IWysiwygButton"
  />
</template>
