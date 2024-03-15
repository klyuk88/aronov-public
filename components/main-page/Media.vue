<script setup>
import qs from "qs";
const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const query = qs.stringify({
  pagination: {
    pageSize: 3,
  },
  sort: ["date:desc"],
  locale: locale.value,
  populate: "*",
});
const { data: mediaItems } = await useFetch(
  () => `/api/medias?${query}`,
  {
    baseURL: runtimeConfig.public.api,
  }
);
</script>
<template>
  <section class="media section-top" v-if="mediaItems.data.length > 0">
    <div class="container">
      <h2 class="section-title">
        <nuxt-link to="/media">{{ $t("Media") }}</nuxt-link>
      </h2>
      <div class="media-content">
        <MediaItem
          v-for="(item, index) in mediaItems.data"
          :key="item.id"
          :mediaItem="item"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.media-content {
  display: grid;
  width: 100%;
  gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (max-width: 1100px) {
    grid-template-columns: 100%;
  }
}
</style>