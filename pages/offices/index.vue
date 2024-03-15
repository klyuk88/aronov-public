<script setup>
import { ref, onMounted } from "vue";
import qs from 'qs'
const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();


const { data: pageData } = await useFetch(
  () => `/api/offices-page?populate=*&locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api,
  }
);

const { data: mainPage } = await useFetch(
  () => `/api/main-page?populate=videoLogo&locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api,
  }
);
const queryOffices = qs.stringify({
  sort: ['publishedAt:desc'],
  locale: locale.value
})
const { data: offices } = await useFetch(
  () => `/api/offices?${queryOffices}`,
  {
    baseURL: runtimeConfig.api,
  }
);

const navToOffice = async (country) => {
  await navigateTo(`/offices/${country}${locale.value === "en" ? "-en" : ""}`);
};
</script>
<template>
  <seo-head-meta :data="pageData.data.attributes" />
  <section class="offices">
    <div class="container">
      <div class="offices-map">
        <h1 class="page-title offices-title">
          {{ pageData.data.attributes.title }}
        </h1>
        <div class="offices-video-logo offices-logo">
          <client-only>
            <Vue3Lottie
            loop="false"
              :animationLink="
                locale === 'ru' ? `/logo_rus.json` : `/logo_eng.json`
              "
            />
          </client-only>
        </div>
        <!-- <video
        v-if="mainPage.data.attributes.videoLogo.data"
              autoplay
              muted
              playsinline
               :src="`${$config.public.api}${mainPage.data.attributes.videoLogo.data.attributes.url}`"
               class="offices-video-logo offices-logo"
              ></video> -->
        <!-- <img src="~/assets/img/logo-ru.svg" alt="" class="offices-logo" /> -->

        <img src="@/assets/img/mobile-map.svg" alt="" id="mobile_map" />
        <TheMap @navCountry="navToOffice" />
      </div>

      <div class="offices-footer">
        <!-- <h2 class="offices-subtitle">
          {{ $t("Offices title") }}
        </h2> -->
        <ul class="offices-list">
          <li v-for="(item, index) in offices.data" :key="index">
            <nuxt-link :to="`/offices/${item.attributes.slug}`">{{
              item.attributes.title
            }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.offices-title {
  position: relative;
  transform: translateY(30px);
  @media screen and (max-width: 1100px) {
    transform: translateY(0);
  }
}
.offices-footer {
  position: relative;
  transform: translateY(-80px);
  @media screen and (max-width: 1100px) {
    transform: translateY(0);
  }
}
.offices-map {
  position: relative;
}
.offices-logo {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.offices-subtitle {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 30px;
  @media screen and (max-width: 1100px) {
    font-size: 24px;
    font-weight: 600;
  }
}
.offices-list {
  display: flex;
  padding: 0;
  list-style: none;
  justify-content: space-between;
  padding-top: 30px;
  border-top: 1px solid #fff;
  li {
    position: relative;
    a {
      color: #fff;
      transition: color 0.3s ease;
    }
    a:hover {
      color: var(--accent-color);
      transition: color 0.3s ease;
    }
  }
  li:before {
    content: "";
    position: absolute;
    top: 0;
    background: #fff;
    width: 1px;
    height: 19px;
    left: 50%;
    transform: translate(-50%, -160%);
    @media screen and (max-width: 1100px) {
      width: 19px;
      height: 1px;
      left: 0;
      transform: translate(-185%, -50%);
      top: 50%;
    }
  }
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    border: none;
    border-left: 1px solid #fff;
    justify-content: flex-start;
    padding: 20px 0 20px 36px;
    gap: 22px;
  }
}
.offices {
  padding-top: 115px;
  padding-bottom: 90px;
  @media screen and (max-width: 1100px) {
    padding-top: 60px;
  }
}

#mobile_map {
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
    width: 100%;
    margin: 60px 0;
  }
}
.offices-video-logo {
  width: 367px;
  height: auto;
  // mix-blend-mode: screen;
}
</style>