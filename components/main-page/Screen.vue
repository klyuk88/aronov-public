<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Scrollbar } from "swiper";
import qs from 'qs'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const props = defineProps(["mainPage"]);

const { locale } = useI18n();

const mainSlider = ref(null);

const onSwiper = (swiper) => {
  mainSlider.value = swiper;
};

const runtimeConfig = useRuntimeConfig();

const query = qs.stringify({
  populate: 'practice',
  locale: locale.value,
  sort: ['date:desc'],
  pagination: {
    pageSize: '5'
  }

})
const { error, data: newsData } = await useFetch(
  () => `/api/medias?${query}`,
  {
    baseURL: runtimeConfig.public.api,
  }
);
</script>
<template>
  <div>
    <section class="main">
      <div class="container">
        <div class="main-content align-items-center">
          <div class="row mt-60 mt-lg-30">
            <div
              class="col-lg-6 order-lg-1"
              v-if="props.mainPage.data.attributes.planet.data"
            >
              <!-- <client-only>
                <Vue3Lottie
                  animationLink="/data_planet_test.json"
                  :height="200"
                  :width="200"
                />
              </client-only> -->
              <video
                autoplay
                loop
                muted
                playsinline
                class="main-planet video d-none d-lg-block"
                :src="`${$config.public.api}${props.mainPage.data.attributes.planet.data.attributes.url}`"
              ></video>
              <video
                loop
                autoplay
                muted
                playsinline
                class="main-planet video d-block d-lg-none"
                :src="`${$config.public.api}${props.mainPage.data.attributes.planetMob?.data.attributes.url}`"
              ></video>
            </div>
            <div class="col-lg-6">
              <img
                :src="
                  $config.public.api +
                  props.mainPage.data.attributes.logo.data.attributes.url
                "
                alt=""
                class="d-lg-none mb-2 w-75 m-auto d-block"
              />
              <div
                class="video-logo-wrap video-logo m-auto d-none d-lg-block mb-3"
              >
                <client-only>
                  <Vue3Lottie
                    :loop="false"
                    :animationLink="locale === 'ru' ?  `/logo_rus.json` : `/logo_eng.json`"
                  />
                </client-only>
              </div>

              <!-- <video
                v-if="props.mainPage.data.attributes.videoLogo.data"
                autoplay
                muted
                playsinline
                :src="`${$config.public.api}${props.mainPage.data.attributes.videoLogo.data.attributes.url}`"
                class="video-logo m-auto d-none d-lg-block mb-3"
              ></video> -->
              <!-- <h1 class="screen-mob_title m-0" v-if="locale === 'en'">
                International law firm
              </h1> -->
              <Swiper
                :modules="[Scrollbar, Autoplay]"
                :scrollbar="{
                  draggable: true
                }"
                :speed="500"
                :autoplay="{
                  delay: 2500,
                  pauseOnMouseEnter: true,
                }"
                :slides-per-view="1"
                :space-between="15"
                @swiper="onSwiper"
                :direction="'vertical'"
                class="main-slider"
              >
                <SwiperSlide>
                  <div class="slider-item">
                    <div class="slider-item-content">
                      <div class="slider-item-header"></div>

                      <div class="slider-item-body">
                        <p class="slogan_slider_title">
                          {{ props.mainPage.data.attributes.sliderSlogan }}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <template v-if="newsData.data.length > 0">
                  <SwiperSlide
                    v-for="(item, index) in newsData.data"
                    :key="index"
                  >
                    <div class="slider-item">
                      <div class="slider-item-content">
                        <div
                          class="slider-item-header"
                          v-if="item.attributes.practice.data"
                        >
                          <p class="category">
                            {{ item.attributes.practice.data.attributes.title }}
                          </p>
                          <p class="date">{{ item.date }}</p>
                        </div>

                        <div class="slider-item-body">
                          <p class="news_body">
                            {{ item.attributes.shortAbout }}
                          </p>
                        </div>

                        <NuxtLink
                          :to="`/media/${item.attributes.slug}`"
                          class="slider-item-link"
                        >
                          {{ $t("Read more") }}
                          <img
                            src="@/assets/img/arrow-right.svg"
                            alt="arrow right"
                          />
                        </NuxtLink>
                      </div>
                    </div>
                  </SwiperSlide>
                </template>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
// .planet_gif {
//   max-width: 480px;
//   margin-left: auto;
//   display: block;
//   @media screen and (max-width: 1100px) {
//     width: 260px;
//     margin: 0 auto;
//   }

// }
.main-content {
  // display: grid;
  // grid-template-columns: 50% 50%;
  // padding-top: 60px;
  // @media screen and (max-width: 1100px) {
  //   grid-template-columns: 100%;
  // }
  // .col-2 {
  //   @media screen and (max-width: 1100px) {
  //     grid-row-start: 1;
  //   }
  // }

  .big-logo {
    width: 367px;
    height: auto;
    display: block;
    margin: 0 auto;
    margin-top: 80px;
    @media screen and (max-width: 1100px) {
      margin-top: 50px;
      margin-inline: auto;
      display: block;
      width: 290px;
    }
    @media screen and (max-width: 320px) {
      width: 100%;
    }
  }
  .main-slider {
    // margin-top: 97px;
    max-height: 280px;
    min-width: 570px;
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
  .slider-item {
    background: #212121;
    background: linear-gradient(
      70.01deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    // backdrop-filter: blur(50px);
    padding: 57px 63px;
    height: 100%;
    max-width: 540px;
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 300;
    }
    &-body {
      font-size: 18px;
      font-weight: 400;
      margin-top: 23px;
      .news_body {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    &-link {
      margin-top: 20px;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
  .main-planet.video {
    width: 100%;
    height: auto;
    margin-left: auto;
    display: block;
    mix-blend-mode: screen;
    @media screen and (max-width: 1100px) {
      margin: 0 auto;
    }
  }
}

.swiper.main-slider .swiper-scrollbar.swiper-scrollbar-vertical {
  border-radius: 0;
  background: rgba($color: #212121, $alpha: 0.2);
  height: 80%;
  top: 50%;
  transform: translateY(-50%);

  .swiper-scrollbar-drag {
    background: #fff;
    border-radius: 0;
  }
}

.screen-mob_title {
  display: none;
  font-size: 15px;
  font-weight: 300;
  opacity: 0.5;
  margin-top: 8px;
  text-align: center;
  @media screen and (max-width: 1100px) {
    display: block;
  }
}
.slogan_slider_title {
  text-align: center;
}

.video-logo {
  width: 376px;
  height: auto;
  // mix-blend-mode: screen;
  transform: translateX(-30px);
}
</style>