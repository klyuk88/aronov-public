<script setup>
const props = defineProps(["item", "shareBtn"]);
import { Navigation, Pagination } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const { locale } = useI18n();
const contentBlock = ref(null)
const showText = ref(false);

const showAllText = (index) => {
  showText.value = !showText.value;
};
const lightBoxView = ref(false);
const lightBoxIndex = ref(0);

const openLightBox = (index) => {
  lightBoxIndex.value = index;
  lightBoxView.value = true;
};


</script>
<template>
  <div class="blog-item bg-white mb-60 position-relative">
    <div
      class="blog-item-header d-flex align-items-center justify-content-between"
    >
      <div class="d-flex align-items-center align-items-lg-end gap-4">
        
        <div class="blog-item-header-image position-relative flex-shrink-0">
          <img
          v-if="props.item.attributes.team.data"
            :src="
              $config.public.api +
              props.item.attributes.team.data.attributes.singlePagePhoto.data.attributes.url
            "
            alt=""
            class="position-absolute w-100 h-100 object-fit-cover top-0"
          />
          <img v-else src="@/assets/img/logo_for_blog_item.png" alt="" class="position-absolute w-100 h-100 object-fit-cover top-0">
        </div>

        <div class="blog-item-header-name">
          <div>
            <h6 class="m-0">
              {{props.item.attributes.team.data ? props.item.attributes.team.data.attributes.name : 'Аронов и партнеры' }}
            </h6>
            <client-only>
              <p class="m-0">
                {{
                  new Date(props.item.attributes.date).toLocaleDateString(
                    locale === "ru" ? "ru-RU" : "en-US",
                    {
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                    }
                  )
                }}
              </p>
            </client-only>
          </div>

          <h3 class="m-0 d-none d-lg-block mt-3">
            {{ props.item.attributes.title }}
          </h3>
        </div>
      </div>
      <TheShareBtn
        :id="props.item.id"
        class="block-share-btn"
        :class="{ 'd-none': !props.shareBtn }"
      />
    </div>

    <div class="blog-item-content-block mt-4" ref="contentBlock">
      <h3 class="blog-item-mob-title d-lg-none">
        {{ props.item.attributes.title }}
      </h3>
      <div class="position-relative">
        <div
          class="blog-item-content text-lg-left"
          v-if="props.item.attributes.content"
          v-html="props.item.attributes.content"
          :class="{
            'showFull': showText,
          }"
        ></div>
        <span
        v-if="props.item.attributes.content.length > 500"
          class="
            more-btn-text
            text-primary
          "
          @click="showAllText()"
          >
          {{ !showText ? $t("Show more") : $t("Collapse blog btn") }}
           <i class="bi" :class="!showText ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
          </span>
      </div>
      <div class="mt-4" v-if="props.item.attributes.video" v-html="props.item.attributes.video"></div>

      <div
        class="d-block d-lg-none overflow-hidden mt-3"
        v-if="props.item.attributes.gallery.data"
      >
        <ClientOnly>
          <Swiper
            :modules="[Pagination]"
            :slides-per-view="1"
            :space-between="50"
            pagination
          >
            <SwiperSlide
              v-for="(sliderImage, index) in props.item.attributes.gallery.data"
              :key="index"
            >
              <img
                :src="$config.public.api + sliderImage.attributes.url"
                alt=""
                class="w-100"
              />
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>

      <div
        class="row mt-4 d-none d-lg-flex"
        v-if="props.item.attributes.gallery.data"
      >
        <div
          class="col-lg-4"
          v-for="(image, index) in props.item.attributes.gallery.data"
          :key="image.id"
        >
          <div class="position-relative pt-100-p">
            <img
              :src="$config.public.api + image.attributes.url"
              alt=""
              class="
                w-100
                h-100
                position-absolute
                top-0
                start-0
                object-fit-cover
              "
              @click="openLightBox(index)"
            />
          </div>
        </div>
      </div>

      <div class="blog-item-views-counter d-flex gap-2 align-items-center mt-4">
        <img src="@/assets/img/views-icon.svg" alt="view-icon" />
        <p class="m-0">
          <span>{{ props.item.attributes.views }}</span> {{ $t("Views") }}
        </p>
      </div>
    </div>
  </div>
  <LigthBox
    :gallery="props.item.attributes.gallery.data"
    :startIndex="lightBoxIndex"
    @close="lightBoxView = false"
    v-if="props.item.attributes.gallery.data && lightBoxView"
  />
</template>


<style lang="scss">
.block-share-btn {
  @media (max-width: 1100px) {
    position: absolute !important;
    right: 0;
    bottom: 0;
  }
}

.blog-item-header-image {
  width: 160px;
  height: 160px;
}

.blog-item {
  padding-bottom: 60px;
}
.blog-item-header {
  padding-right: 65px;
  gap: 30px;
  &-name {
    h6 {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.2;
      color: var(--dark-color);
    }
    p {
      font-size: 8px;
      font-weight: 500;
      color: rgba(33, 33, 33, 0.5);
      text-transform: uppercase;
    }
    h3 {
      font-size: 18px;
      font-weight: 500;
      color: var(--dark-color);
    }
  }
  // .share-btn-blog {
  //   background: var(--accent-color);
  //   border: none;
  //   padding: 6px 48px;
  //   color: #fff;
  // }
  @media (max-width: 1100px) {
    padding-right: 35px;
  }
}

.blog-item-content-block {
  padding: 0 65px;
  color: #404040 !important;
  @media (max-width: 1100px) {
    padding: 0 35px;
  }
}

.blog-item-views-counter {
  p {
    color: rgba(33, 33, 33, 0.5);
    font-size: 12px;
  }
}

.blog-item-mob-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--dark-color);
}

.blog-item-content p {
  margin: 0;
}
.blog-item-content {
  max-height: 145px;
  overflow: hidden;
}

.blog-item-content.showFull {
  max-height: 10000px;
  transition: max-height .5s ease;
}


</style>