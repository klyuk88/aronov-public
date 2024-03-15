<script setup>
import { ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

const clientsSlider = ref(null);
const onSwiper = (swiper) => {
  clientsSlider.value = swiper;
};
const nextSlide = () => {
  clientsSlider.value.slideNext();
};
const prevSlide = () => {
  clientsSlider.value.slidePrev();
};

const runtimeConfig = useRuntimeConfig()

const { locale } = useI18n()

const {data: clientsData} = await useFetch(
  () => '/api/clients?populate=*&locale=' + locale.value,
  {
    baseURL: runtimeConfig.public.api,
  }
)
</script>
<template>
  <section class="clients section-top" v-if="clientsData.data.length > 0">
    <div class="container">
      <h2 class="section-title">
        <nuxt-link to="/clients">
        {{$t('Clients')}}
        </nuxt-link>
        </h2>
      <div class="clients-content">
        <Swiper
          :slides-per-view="5"
          :space-between="60"
          @swiper="onSwiper"
          class="clients-slider"
          :breakpoints="{
            320: {
              slidesPerView: 1,
            },
            1100: {
              slidesPerView: 5,
            },
          }"
        >
          <SwiperSlide
            class="clients-slider-item"
            v-for="(item, index) in clientsData.data"
            :key="index"
            >
            <img
            :src="$config.public.api + item.attributes.logo.data.attributes.url"
            alt="client-logo"
          />
          </SwiperSlide>
        </Swiper>

        <img
          class="clients-slider-nav prev"
          src="@/assets/img/chevron-left.svg"
          alt=""
          @click="prevSlide"
        />
        <img
          class="clients-slider-nav next"
          src="@/assets/img/chevron-right.svg"
          alt=""
          @click="nextSlide"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.clients {
  padding-bottom: 180px;
  @media screen and (max-width: 1100px) {
    padding-bottom: 120px;
  }
}
.clients-content {
  margin-top: 60px;
  position: relative;
  .clients-slider {
    width: 90%;
    &-nav {
      position: absolute;
      top: 50%;
      z-index: 2;
      cursor: pointer;
    }
    &-nav.prev {
      left: 0;
    }
    &-nav.next {
      right: 0;
    }
    &-item {
      img {
        max-width: 143px;
        opacity: 0.5;
        transition: opacity 0.2s ease;
        margin-inline: auto;
        display: block;
      }
    }
    &-item {
      img:hover {
        max-width: 143px;
        opacity: 1;
        transition: opacity 0.2s ease;
      }
    }
  }
}
</style>