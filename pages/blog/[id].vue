<script setup>
import qs from 'qs'
const config = useRuntimeConfig();
const route = useRoute();
const {locale} = useI18n()

const singleBlog = ref(null)
const query = qs.stringify({
  populate: ['team', 'team.singlePagePhoto', 'gallery'],
  locale: locale.value
})
const { data: blogPage } = await useFetch(
  () =>
    `/api/blogs/${route.params.id}?${query}`,
  {
    baseURL: config.api,
  }
);

// useSetRoutesMeta(singleBlog)

</script>
<template>
  <section class="pt-120 pb-120">
    <div class="container">
      <BlogItem :item="blogPage.data" :shareBtn="false" />
    </div>
  </section>
</template>