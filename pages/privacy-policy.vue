<script setup>
const config = useRuntimeConfig();
const {locale} = useI18n() 
const { data: policyPage } = await useFetch("/api/privacy-policy?locale=" + locale.value, {
  baseURL: config.public.api,
});

</script>

<template>
  <section class="pt-120 pb-120">
    <div class="container">
      <h1 class="page-title">{{policyPage.data.attributes.title}}</h1>
      <div class="mt-5 text-white text-lg-left" v-html="policyPage.data.attributes.content">
      </div>
    </div>
  </section>
</template>