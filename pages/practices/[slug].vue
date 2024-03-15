<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute } from 'vue-router';
import { ref, computed, watch, reactive } from 'vue';
import { useMainStore } from '@/store';
import "swiper/css/pagination";
import "swiper/css";
const { locale } = useI18n();
import qs from "qs";


const mainStore = useMainStore();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const singlePractice = ref(null);

const query = qs.stringify({
  filters: {
    slug: {
      $eq: route.params.slug,
    },
  },
  populate: [
    "teams",
    "teams.avatar",
    "teams.hoverImage",
    "cases",
    "medias",
    "medias.thumbnail",
    "medias.practice",
    "localizations",
    "seo",
  ],
  locale: locale.value,
});

const { error, data: practice } = await useFetch(
  () => `/api/practices?${query}`,
  { baseURL: runtimeConfig.api }
);

if (!error.value) {
  mainStore.alternativeSlug =
    practice?.value?.data[0]?.attributes?.localizations?.data[0]
      ?.attributes?.slug || "";
  singlePractice.value = practice.value.data[0].attributes;
  useSetRoutesMeta(singlePractice);
}

onBeforeRouteLeave(() => {
  mainStore.alternativeSlug = '';
});

const content = useReplaceUploads(singlePractice.value.content);
const { error: allPracticesError, data: allPractices } = await useFetch(
  () => `/api/practices?locale=${locale.value}`,
  {
    baseURL: runtimeConfig.public.api,
  }
);

const currentIndex = allPractices.value.data.findIndex((element) => {
  return element.id === practice.value.data[0].id;
});

const prevElem = () => {
  usePageSingleNavPrev(currentIndex, allPractices, "practices");
};
const nextElem = () => {
  usePageSingleNavNext(currentIndex, allPractices, "practices");
};
</script>

<template>
  <seo-head-meta :data="singlePractice" />
  <section class="practice_single page-top page-bottom">
    <div class="container">
      <div class="practice_single-header">
        <h1 class="page-title">{{ singlePractice.title }}</h1>
        <div class="practice_single-nav">
          <button
            class="practice_single-nav-item"
            @click="prevElem()"
            :disabled="currentIndex > 0 ? false : true"
          >
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 6.5091e-07L6.475 1.20833L3.36875 4.16667L14 4.16667L14 5.83333L3.36875 5.83333L6.475 8.79167L5.25 10L-5.13696e-07 5L5.25 6.5091e-07Z"
                fill="white"
              />
            </svg>
            {{ $t("Preview") }}
          </button>
          <NuxtLink to="/practices" class="practice_single-nav-home_btn">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 0.5H5.5V5.42589H0.5V0.5ZM10.5 0.5H15.5V5.42589H10.5V0.5ZM20.5 0.5H25.5V5.42589H20.5V0.5ZM0.5 10.6334H5.5V15.5593H0.5V10.6334ZM0.5 20.5741H5.5V25.5H0.5V20.5741ZM10.5 20.5741H15.5V25.5H10.5V20.5741ZM20.5 20.5741H25.5V25.5H20.5V20.5741ZM10.5 10.6334H15.5V15.5593H10.5V10.6334ZM20.5 10.6334H25.5V15.5593H20.5V10.6334Z"
                stroke="white"
              />
            </svg>
          </NuxtLink>
          <button
            class="practice_single-nav-item"
            @click="nextElem()"
            :disabled="
              currentIndex < allPractices.data.length - 1 ? false : true
            "
          >
            {{ $t("Next") }}
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75 10L7.525 8.79167L10.6312 5.83333H0V4.16667H10.6312L7.525 1.20833L8.75 0L14 5L8.75 10Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="practice_single-content mt-60 text-lg-left" v-html="content"></div>

      <div
        class="practice_single-content mt-120"
        v-if="singlePractice.services"
      >
        <h2 class="mb-60 page-subtitle with-decor ps-3">
          {{ $t("Services") }}
        </h2>
        <div v-html="singlePractice.services" class="text-lg-left"></div>
      </div>

      <div class="mt-120" v-if="singlePractice.teams.data.length > 0">
        <h2 class="page-title">{{ $t("Team") }}</h2>
        <div class="practice_single-team mt-60">
          <client-only>
            <Swiper
              :modules="[Navigation, Pagination]"
              :slides-per-view="4"
              :space-between="30"
              navigation
              :pagination="{ clickable: true }"
              :breakpoints="{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1110: {
                  slidesPerView: 4,
                },
              }"
            >
              <SwiperSlide
                v-for="(item, index) in singlePractice.teams.data"
                :key="index"
              >
                <TeamItem :teamItem="item" />
              </SwiperSlide>
            </Swiper>
          </client-only>
        </div>
      </div>

      <div class="mt-120" v-if="singlePractice.cases.data.length > 0">
        <h2 class="page-title">{{ $t("Cases") }}</h2>
        <div class="row justify-content-between pro-bono-items row-gap-5 mt-60">
          <CaseItem
            v-for="(item, index) in singlePractice.cases.data"
            :key="index"
            :item="item"
            :parent="'cases'"
          />
          <!-- <div class="cases-slider">
            <client-only>
              <Swiper
                :modules="[Navigation, Pagination]"
                :slides-per-view="3"
                :space-between="30"
                navigation
                :pagination="{ clickable: true }"
                :breakpoints="{
                  320: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1110: {
                    slidesPerView: 2,
                  },
                }"
              >
                <SwiperSlide
                  v-for="(item, index) in singlePractice.cases.data"
                  :key="index"
                >
                  <CaseItem :item="item" :parent="'cases'" />
                </SwiperSlide>
              </Swiper>
            </client-only>
          </div> -->
        </div>
      </div>

      <div class="mt-120" v-if="singlePractice.medias.data.length > 0">
        <h2 class="page-title">{{ $t("Articles") }}</h2>

        <div class="mt-60">
          <client-only>
            <Swiper
              :modules="[Navigation, Pagination]"
              :slides-per-view="3"
              :space-between="30"
              navigation
              :pagination="{ clickable: true }"
              :breakpoints="{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1110: {
                  slidesPerView: 3,
                },
              }"
            >
              <SwiperSlide
                v-for="(item, index) in singlePractice.medias.data"
                :key="index"
              >
                <MediaItem :mediaItem="item" />
              </SwiperSlide>
            </Swiper>
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.practice_single {
  overflow: hidden;
  .swiper-button-next,
  .swiper-button-prev {
    color: #fff;
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 25px;
  }
  .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: #fff;
  }
}
.practice_single-content {
  // max-width: 730px;
  color: #fff;
  * {
    color: #fff !important;
  }
  h2 {
    color: #fff;
    // font-size: 32px;
    // font-weight: 500;
    // text-transform: uppercase;
  }
  ul {
    padding-left: 20px;
    li {
      margin-bottom: 15px;
    }
  }
}
.practice_single-nav-home_btn {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}
.practice_single-nav-home_btn:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}
.practice_single-nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  opacity: 0.5;
  font-size: 14px;
  font-weight: 300;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}
.practice_single-nav-item:hover {
  opacity: 1;
  transition: all 0.3s ease;
}
.practice_single-nav {
  display: flex;
  align-items: center;
  gap: 47px;
}
.practice_single-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 55px;
  }
}

.practice_single-nav-item:disabled {
  opacity: 0.2;
  cursor: auto;
}
</style>