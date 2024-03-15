<script setup>
const props = defineProps(["gallery",'startIndex']);
import { Navigation, Pagination } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const emits = defineEmits(['close'])
const closeBox = () => {
  emits('close')
}

</script>
<template>
  <div class="lightBoxWrap"
  @click.self="closeBox()"
  >
    <div class="lightBox position-relative">
      <img src="@/assets/img/close_menu.svg" alt="" class="close-lightbox" @click="closeBox()">
      <Swiper
        :modules="[Pagination, Navigation]"
        navigation
        :initialSlide="props.startIndex"
        :slides-per-view="1"
        :space-between="50"
        pagination
      >
        <SwiperSlide v-for="(item, index) in props.gallery" :key="index">
          <div
          class="m-0 position-relative pt-100-p"
          >
            <img
            :src="$config.public.api + item.attributes.url"
            alt=""
            class="w-100 h-100 position-absolute start-0 top-0 object-fit-contain"
          />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style lang="scss">
.lightBoxWrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.8);
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.lightBox {
  width: 700px;
  z-index: 100;
  position: relative;
  @media (max-width: 768px) {
    width: 90%;
  }
}

.close-lightbox {
  position: absolute;
  top: -20px;
  right: -20px;
  z-index: 99;
  opacity: 0.5;
  cursor: pointer;
  @media (max-width: 768px) {
    right: 0;
  }
}
  
</style>