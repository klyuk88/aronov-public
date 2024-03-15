<script setup>
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
const config = useRuntimeConfig();

const { locale } = useI18n();

const lightBox = ref(false);

const { data: clients } = await useFetch(
  `/api/clients?populate=*&locale=${locale.value}`,
  {
    baseURL: config.api,
  }
);
const { data: reviews } = await useFetch(
  `/api/reviews?populate=*&locale=${locale.value}`,
  {
    baseURL: config.api,
  }
);
const { data: thanks } = await useFetch(
  `/api/thanks?populate=*&locale=${locale.value}`,
  {
    baseURL: config.api,
  }
);
const { data: clientsPage } = await useFetch(
  `/api/clients-page?populate=*&locale=${locale.value}`,
  {
    baseURL: config.api,
  }
);
const gallery = ref([]);

const openLightBox = (url) => {
  lightBox.value = true;
  gallery.value = [
    {
      attributes: {
        url: url,
      },
    },
  ];
};
</script>
<template>
  <Head v-if="clientsPage.data.attributes.seo">
    <Title>{{ clientsPage.data.attributes.seo.title }}</Title>
    <Meta
      name="description"
      :content="clientsPage.data.attributes.seo.description"
      v-if="clientsPage.data.attributes.seo.description"
    />
    <Meta
      name="keywords"
      :content="clientsPage.data.attributes.seo.keywords"
      v-if="clientsPage.data.attributes.seo.keywords"
    />
  </Head>
  <section class="pt-120 pb-120">
    <div class="container">
      <h1 class="page-title">{{ clientsPage.data.attributes.title }}</h1>
      <p class="mt-5" v-if="clientsPage.data.attributes.about">
        {{ clientsPage.data.attributes.about }}
      </p>
      <div class="mt-120 px-5 position-relative d-none d-lg-block"
      v-if="clients.data.length > 0"
      >
        <Swiper
          :modules="[Navigation]"
          :navigation="{
            nextEl: '.clients-slider-nav.next',
            prevEl: '.clients-slider-nav.prev',
          }"
          :slides-per-view="5"
          :space-between="30"
        >
          <SwiperSlide v-for="(item, index) in clients.data" :key="index">
            <img
            v-if="item.attributes.logo.data"
              :src="
                $config.public.api + item.attributes.logo.data.attributes.url
              "
              alt=""
              class="clients-slider-logo m-auto d-block mb-4"
            />
          </SwiperSlide>
        </Swiper>
        <img
          src="@/assets/img/clients-left-arrow.svg"
          alt=""
          class="clients-slider-nav prev position-absolute start-0 top-50"
        />
        <img
          src="@/assets/img/clients-right-arrow.svg"
          alt=""
          class="clients-slider-nav next position-absolute end-0 top-50"
        />
      </div>
              <div class="clients-big-slider overflow-hidden position-relative mt-5">
          <Swiper
            :modules="[Navigation]"
            :slides-per-view="1"
            :space-between="15"
            :navigation="{
              nextEl: '.big-client-slider-nav.next',
              prevEl: '.big-client-slider-nav.prev',
            }"
          >
            <SwiperSlide v-for="(item, index) in reviews.data" :key="index">
              <div
                class="clients-big-item d-flex justify-content-lg-between align-items-center gap-3 gap-lg-5"
              >
                <img
                v-if="item.attributes.review.data"
                  :src="
                    $config.public.api +
                    item.attributes.review.data.attributes.url
                  "
                  alt=""
                  class="flex-shrink-0 review-image"
                  @click="
                    openLightBox(item.attributes.review.data.attributes.url)
                  "
                />

                <div>
                  <div
                    class="d-flex flex-column-reverse flex-lg-row align-items-start justify-content-between"
                  >
                    <div class="client-big-slider-names mt-3 mt-lg-0">
                      <p class="m-0">{{ item.attributes.name }}</p>
                      <p class="m-0">{{ item.attributes.post }}</p>
                      <p class="m-0">{{ item.attributes.company }}</p>
                    </div>
                    <img
                    v-if="item.attributes.logo.data"
                      :src="
                        $config.public.api +
                        item.attributes.logo.data.attributes.url
                      "
                      alt=""
                      class="big-clients-slider-logo"
                    />
                  </div>
                  <!-- header -->
                  <div class="mt-5 d-none d-lg-block">
                    <p>
                      {{ item.attributes.content }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="d-lg-none mt-4">
                <p>
                  {{ item.attributes.content }}
                </p>
              </div>
            </SwiperSlide>
          </Swiper>

          <div
            class="d-flex big-client-slider-nav-wrap mt-4 mt-lg-0 bottom-0 end-0 justify-between"
          >
            <span
              class="big-client-slider-nav prev d-flex align-items-center justify-content-center border border-white"
              style="--bs-border-opacity: 0.5"
            >
              <img src="@/assets/img/about_arr_left.svg" alt="" />
            </span>
            <span
              class="big-client-slider-nav next d-flex align-items-center justify-content-center border border-white"
              style="--bs-border-opacity: 0.5"
            >
              <img src="@/assets/img/about_arr_right.svg" alt="" />
            </span>
          </div>
        </div>

      <!-- благодарности  -->
      <div class="mt-120" v-if="thanks.data.length > 0">
        <h3 class="fs-2 text-uppercase">{{ $t("Thanks") }}</h3>
        <div
          class="clients-big-slider thanks-slider overflow-hidden position-relative mt-5"
        >
          <Swiper
            :modules="[Navigation]"
            :slides-per-view="1"
            :space-between="15"
            :navigation="{
              nextEl: '.thanks-slider .next',
              prevEl: '.thanks-slider .prev',
            }"
          >
            <SwiperSlide v-for="(item, index) in thanks.data" :key="index">
              <div
                class="clients-big-item d-flex justify-content-lg-between align-items-center gap-3 gap-lg-5"
              >
                <img
                  v-if="item.attributes.review.data"
                  :src="
                    $config.public.api +
                    item.attributes.review.data.attributes.url
                  "
                  alt=""
                  class="flex-shrink-0 review-image"
                  @click="
                    openLightBox(item.attributes.review.data.attributes.url)
                  "
                />

                <div>
                  <div
                    class="d-flex flex-column-reverse flex-lg-row align-items-start justify-content-between"
                  >
                    <div class="client-big-slider-names mt-3 mt-lg-0">
                      <p class="m-0">{{ item.attributes.name }}</p>
                      <p class="m-0">{{ item.attributes.post }}</p>
                      <p class="m-0">{{ item.attributes.company }}</p>
                    </div>
                    <img
                    v-if="item.attributes.logo.data"
                      :src="
                        $config.public.api +
                        item.attributes.logo.data.attributes.url
                      "
                      alt=""
                      class="big-clients-slider-logo"
                    />
                  </div>
                  <!-- header -->
                  <div class="mt-5 d-none d-lg-block">
                    <p>
                      {{ item.attributes.content }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="d-lg-none mt-4">
                <p>
                  {{ item.attributes.content }}
                </p>
              </div>
            </SwiperSlide>
          </Swiper>

          <div
            class="d-flex big-client-slider-nav-wrap mt-4 mt-lg-0 bottom-0 end-0 justify-between"
          >
            <span
              class="thanks-slider-nav prev d-flex align-items-center justify-content-center border border-white"
              style="--bs-border-opacity: 0.5"
            >
              <img src="@/assets/img/about_arr_left.svg" alt="" />
            </span>
            <span
              class="thanks-slider-nav next d-flex align-items-center justify-content-center border border-white"
              style="--bs-border-opacity: 0.5"
            >
              <img src="@/assets/img/about_arr_right.svg" alt="" />
            </span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- assets/img/about_arr_left.svg -->
  <LigthBox :gallery="gallery" v-if="lightBox" @close="lightBox = false" />
</template>
<style lang="scss" scoped>
.clients-slider-logo {
  width: 150px;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.clients-slider-logo:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.clients-slider-nav {
  transform: translateY(-50%);
  width: 12px;
  cursor: pointer;
}

.clients-big-slider {
  padding: 130px;
  border: 1px solid rgba($color: #fff, $alpha: 0.3);
  @media (max-width: 1100px) {
    padding: 0;
    border: none;
  }
}

.big-clients-slider-logo {
  width: 134px;
}

.review-image {
  width: 220px;
  @media (max-width: 1100px) {
    width: 130px;
  }
}

.big-client-slider-nav, .thanks-slider-nav {
  width: 65px;
  height: 65px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  @media (max-width: 1100px) {
    width: 45%;
  }
}
.big-client-slider-nav:hover, .thanks-slider-nav:hover {
  background-color: var(--accent-color);
  transition: background-color 0.3s ease;
}
.client-big-slider-names {
  @media (max-width: 1100px) {
    font-size: 11px;
  }
}

.big-client-slider-nav-wrap {
  position: absolute;
  @media (max-width: 1100px) {
    position: relative;
  }
}
</style>