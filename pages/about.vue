<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import qs from "qs";
import "swiper/css";
import "swiper/css/navigation";

const { locale } = useI18n();

const config = useRuntimeConfig();
const { error, data: awardsCategories } = await useFetch(
  () => `/api/awards-categories?populate=*&locale=${locale.value}`,
  {
    baseURL: config.public.api,
  }
);

const { data: aboutPage } = await useFetch(
  () => `/api/about-page?populate=seo&locale=${locale.value}`,
  {
    baseURL: config.public.api,
  }
);

awardsCategories.value.data.forEach((category) => {
  category.attributes.awards.data.sort(function (a, b) {
    if (a.attributes.year < b.attributes.year) {
      return 1;
    }
    if (a.attributes.year > b.attributes.year) {
      return -1;
    }
  });
});
</script>
<template>
  <Head v-if="aboutPage.data.attributes.seo">
    <Title>{{ aboutPage.data.attributes.seo.title }}</Title>
    <Meta
      name="description"
      :content="aboutPage.data.attributes.seo.description"
      v-if="aboutPage.data.attributes.seo.description"
    />
    <Meta
      name="keywords"
      :content="aboutPage.data.attributes.seo.keywords"
      v-if="aboutPage.data.attributes.seo.keywords"
    />
  </Head>
  <section class="about_page page-top page-bottom">
    <div class="container">
      <div class="about_page-header">
        <h1 class="page-title">{{ aboutPage.data.attributes.title }}</h1>
      </div>
      <div
        class="about_page-content mt-5 text-white text-justify text-lg-left"
        v-html="aboutPage.data.attributes.content"
      ></div>

      <div class="about_page-nominations pt-120">
        <div
          class="about_page-nominations-title"
          v-html="aboutPage.data.attributes.slogan"
        ></div>
        <div
          class="about_page-nominations-item"
          v-for="(item, index) in awardsCategories.data"
          :key="item.id"
        >
          <h3>{{ item.attributes.title }}</h3>
          <client-only>
            <Swiper
              :slides-per-view="1"
              :space-between="30"
              :navigation="{
                nextEl: `.about_page-item_nav-item.next.col-${index}`,
                prevEl: `.about_page-item_nav-item.prev.col-${index}`,
              }"
              :modules="[Navigation]"
            >
              <SwiperSlide
                v-for="(award, idx) in item.attributes.awards.data"
                :key="award.id"
              >
                <div class="about_page-nominations-item-slider">
                  <h4>{{ award.attributes.title }}</h4>
                  <div v-html="award.attributes.list" />
                </div>
              </SwiperSlide>
            </Swiper>
          </client-only>

          <div class="about_page-item_nav">
            <div :class="`about_page-item_nav-item prev col-${index}`">
              <img src="@/assets/img/about_arr_left.svg" alt="" />
            </div>
            <div :class="`about_page-item_nav-item next col-${index}`">
              <img src="@/assets/img/about_arr_right.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.about_page-nominations-subitem {
  margin-top: 44px;
}
.about_page-nominations-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 65px;

  h2 {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.5;
    span {
      color: var(--accent-color);
    }
    @media screen and (max-width: 1100px) {
      font-size: 14px;
      font-weight: 700;
    }
  }
  @media screen and (max-width: 1100px) {
    padding: 34px 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}
.about_page-nominations-item {
  overflow: hidden;
  border: 1px solid rgba($color: #038dff, $alpha: 0.5);
  padding: 65px;
  position: relative;
  padding-bottom: 100px;
  h3 {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.5;
    position: relative;
    margin-left: 15px;
    line-height: 1;
  }
  h3:before {
    content: "";
    position: absolute;
    width: 6px;
    left: -15px;
    height: 100%;
    display: block;
    background: var(--accent-color);
  }
  h4 {
    font-size: 14px;
    font-weight: 300;
    margin-top: 10px;
  }
  ul {
    padding-left: 20px;
    margin-top: 30px;
  }
  ul li {
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 10px;
    line-height: 1.5;
  }
  ul li:last-child {
    margin-bottom: 0;
  }
  @media screen and (max-width: 1100px) {
    border: none;
    padding: 0;
    padding-bottom: 50px;
  }
}
.about_page-nominations {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: 100%;
    gap: 60px;
  }
}
.about_page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  img {
    width: 445px;
    @media screen and (max-width: 1100px) {
      width: 290px;
    }
  }
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    gap: 60px;
  }
}

.about_page-item_nav {
  display: flex;
  position: absolute;
  right: -1px;
  bottom: -1px;
  .about_page-item_nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 65px;
    border: 1px solid rgba(3, 141, 255, 0.5);
    background: transparent;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .about_page-item_nav-item:hover {
    background-color: var(--accent-color);
    transition: background-color 0.3s ease;
  }
  @media (max-width: 996px) {
    right: 1px;
    bottom: 1px;
  }
}
</style>