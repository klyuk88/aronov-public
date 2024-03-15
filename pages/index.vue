<script setup>
const { locale, locales } = useI18n();

import qs from "qs";
const config = useRuntimeConfig();

const query = qs.stringify({
  populate: ["planet", "ratings", "ratings.logo", "videoLogo", "logo", "seo", "planetMob", "team", "team.photo", "teamMobile", "teamMobile.photo"],
  locale: locale.value,
});

const { data: mainPage } = await useFetch(() => `/api/main-page?${query}`, {
  baseURL: config.api,
});

</script>
<template>
   <Head v-if="mainPage.data.attributes.seo">
      <Title>{{mainPage.data.attributes.seo.title}}</Title>
      <Meta name="description" :content="mainPage.data.attributes.seo.description" v-if="mainPage.data.attributes.seo.description" />
      <Meta name="keywords" :content="mainPage.data.attributes.seo.keywords" v-if="mainPage.data.attributes.seo.keywords"/>
    </Head>
  <div>
    <MainPageScreen :mainPage="mainPage" />
    <MainPageRatings :mainPage="mainPage" />
    <MainPageTeam :mainPage="mainPage"/>
    <MainPageMedia />
    <MainPageClients />
    <!-- <MainPageMap /> -->
  </div>
</template>