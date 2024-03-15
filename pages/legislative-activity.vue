<script setup>
const runtimeConfig = useRuntimeConfig()
const {locale} = useI18n()
const {data: pageData} = await useFetch(
  () => `/api/legislative-activity-page?populate=*&locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api
  }
)
</script>
<template>
<seo-head-meta :data="pageData.data.attributes"/>
  <section class="pt-120 pb-120">
    <div class="container">
      <h1 class="page-title">{{pageData.data.attributes.title}}</h1>
      <div class="mt-5 legacy-content text-white text-lg-left" v-html="pageData.data.attributes.content">
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  
</style>