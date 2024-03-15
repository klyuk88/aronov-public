<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import qs from "qs";

const props = defineProps(["mainPage"]);

const { locale } = useI18n();

const teamSlider = ref(null);
const mobTeamSlider = ref(null)

const onSwiper = (swiper) => {
  teamSlider.value = swiper;
};
const onSwiperMob = (swiper) => {
  mobTeamSlider.value = swiper;
};

const nextSlide = () => {
  teamSlider.value.slideNext();
  mobTeamSlider.value.slideNext()
};

const prevSlide = () => {
  teamSlider.value.slidePrev();
  mobTeamSlider.value.slidePrev()
};
</script>
<template>
  <section
    class="team section-top"
    v-if="props.mainPage.data.attributes.team.length > 0"
  >
    <div class="container">
      <h2 class="section-title">
        <nuxt-link to="/team">{{ $t("Team title") }}</nuxt-link>
      </h2>
    </div>
    <div class="team-content">
      <img
        src="@/assets/img/chevron-right.svg"
        alt=""
        class="team-slider-nav next"
        @click="nextSlide"
      />
      <img
        src="@/assets/img/chevron-left.svg"
        alt=""
        class="team-slider-nav prev"
        @click="prevSlide"
      />
      <client-only>

        <!-- десктоп слайдер  -->
        <Swiper
          :slides-per-view="10"
          :space-between="0"
          :allowTouchMove="false"
          :loop="true"
          @swiper="onSwiper"
          class="team-slider d-none d-lg-block"
        >
          <SwiperSlide
            class="d-none d-lg-block"
            v-for="(item, index) in props.mainPage.data.attributes.team"
            :key="index"
          >
            <nuxt-link
              :to="item.url ? `/team/${item.url}` : '#'"
              class="text-white"
            >
              <img
                :src="`${$config.public.api}${item.photo.data.attributes.url}`"
                alt=""
                class="team-slider-image"
              />
              <div class="team_slider-item_names">
                <h3 class="team_slider-item_names-name">
                  {{ item.name }}
                </h3>
                <p class="team_slider-item_names-post">
                  {{ item.post }}
                </p>
              </div>
            </nuxt-link>
          </SwiperSlide>
        </Swiper>
          <!-- десктоп слайдер конец  -->

          <!-- мобильный слайдер  -->
        <Swiper
          :slides-per-view="1"
          :space-between="0"
          @swiper="onSwiperMob"
          class="team-slider d-lg-none"
          :breakpoints="{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }"
        >
          <SwiperSlide
            class="d-lg-none mob-team-slider"
            v-for="(item, index) in props.mainPage.data.attributes.teamMobile"
            :key="index"
          >
            <!-- <div  
                class="position-absolute start-0 bottom-0 w-100 h-50 bg-light z-3"></div> -->
            <nuxt-link :to="item.url ? `/team/${item.url}` : '#'">
              <img
                :src="`${$config.public.api}${item.photo.data.attributes.url}`"
                alt=""
                class="team-slider-image"
              />
              <div class="team_slider-item_names">
                <h3 class="team_slider-item_names-name">
                  {{ item.name }}
                </h3>
                <p class="team_slider-item_names-post">
                  {{ item.post }}
                </p>
              </div>
            </nuxt-link>
          </SwiperSlide>
        </Swiper>
        <!-- мобильный слайдер конец  -->
      </client-only>
    </div>
  </section>

  <section
    class="slogan section-top"
    v-if="props.mainPage.data.attributes.slogan"
  >
    <h1 class="slogan-title">
      <img src="@/assets/img/slogan_icon.svg" alt="" class="mb-1 me-3" />
      <span>
        {{ props.mainPage.data.attributes.slogan }}
      </span>
      <img src="@/assets/img/slogan_icon.svg" alt="" class="mb-1 ms-3" />
    </h1>
  </section>
</template>
<style lang="scss">
.team {
  overflow: hidden;
  padding-bottom: 80px;
  @media screen and (max-width: 1100px) {
    padding-bottom: 0;
  }
}

.swiper.team-slider {
  overflow: visible;
  transform: translateX(70px);
  @media screen and (max-width: 1100px) {
    transform: translateX(0);
    overflow: hidden;
  }
  .swiper-slide {
    position: relative;
    height: 490px;
    z-index: 100;
    transition: transform 0.3s ease;
    z-index: 1;
    .team-slider-image {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      z-index: 1;
      object-fit: cover;
      transition: width 0.3s ease;
      transform: translateX(-50%);
      @media screen and (max-width: 1100px) {
        transform: translateX(0);
      }
    }
    // @media screen and (max-width: 768px) {
    //   height: 550px;

    // }
  }
}

.swiper.team-slider {
  .swiper-slide:hover {
    transform: scale(1.3);
    z-index: 2;
    @media screen and (max-width: 1100px) {
      transform: scale(1);
    }
    .team-slider-image {
      width: 340px;
      transition: width 0.3s ease;
      @media screen and (max-width: 1100px) {
        width: 100%;
      }
    }
    .team_slider-item_names {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }
}

.team-content {
  position: relative;
  .team-slider-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    cursor: pointer;
  }
  .team-slider-nav.next {
    right: 20px;
  }
  .team-slider-nav.prev {
    left: 20px;
  }
}

.slogan-title {
  font-size: 36px;
  font-weight: 300;
  text-align: center;
  // text-transform: uppercase;
  font-style: italic;
  // width: 60%;
  margin: 0 auto;
  @media screen and (max-width: 1100px) {
    font-size: 20px;
    width: 100%;
    // display: flex;
    // align-items: center;
    // flex-direction: column;
    // gap: 10px;
    img {
      width: 25px;
    }
  }
}

.team_slider-item_names {
  position: absolute;
  z-index: 2;
  transform: translateX(-50%);
  bottom: 30px;
  left: 0;
  min-width: 220px;
  opacity: 0;
  transition: opacity 0.2s ease;
  @media screen and (max-width: 1100px) {
    left: 20px;
    transform: translateX(0);
    opacity: 1;
  }
}

.team_slider-item_names-name {
  font-size: 20px;
  font-weight: 700;
}
.team_slider-item_names-post {
  font-size: 13px;
  font-weight: 300;
  margin-top: 10px;
}

.mob-team-slider:after {
  content: "";
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(33, 33, 33, 0) 49.98%,
    #212121 99.98%
  );
  position: absolute;
  z-index: 1;
}
</style>
