<script setup>
import { reactive, ref } from "vue";
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
import { useMainStore } from "@/store";
import qs from "qs";

const mainStore = useMainStore();
const { locale } = useI18n();

const props = defineProps({
  categoryAPI: String,
  parentCategory: String,
  categoryTitle: String,
});
//test
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const singleMedia = ref(null);

const query = qs.stringify({
  filters: {
    slug: {
      $eq: route.params.slug,
    },
  },
  populate: ["team", "team.singlePagePhoto", "localizations", "cover", "seo"],
  locale: locale.value,
});

const { error, data: singleMediaData } = await useFetch(
  () => `/api/${props.categoryAPI}?${query}`,
  {
    baseURL: runtimeConfig.public.api,
  }
);

if (!error.value) {
  mainStore.alternativeSlug =
    singleMediaData?.value?.data[0]?.attributes?.localizations?.data[0]
      ?.attributes?.slug || "";
  singleMedia.value = singleMediaData.value.data[0].attributes;
  useSetRoutesMeta(singleMedia);
}

onBeforeRouteLeave(() => {
  mainStore.alternativeSlug = '';
});

const date = new Date(singleMedia.value.date);

const pubDate = date.toLocaleString(locale.value === "ru" ? "ru-RU" : "en-US", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const content = useReplaceUploads(singleMedia.value.content);

const { error: allMediaError, data: allMedia } = await useFetch(
  () =>
    `/api/${props.categoryAPI}?locale=${locale.value}&sort[0]=date:desc&pagination[pageSize]=10000`,
  {
    baseURL: runtimeConfig.public.api,
  }
);

const currentIndex = allMedia.value.data.findIndex((element) => {
  return element.id == singleMediaData.value.data[0].id;
});

const nextElem = () => {
  usePageSingleNavNext(currentIndex, allMedia, props.parentCategory);
};

const prevElem = () => {
  usePageSingleNavPrev(currentIndex, allMedia, props.parentCategory);
};
</script>
<template>
  <Head v-if="singleMedia.seo">
    <Title>{{ singleMedia.seo.title }}</Title>
    <Meta
      name="description"
      :content="singleMedia.seo.description"
      v-if="singleMedia.seo.description"
    />
    <Meta
      name="keywords"
      :content="singleMedia.seo.keywords"
      v-if="singleMedia.seo.keywords"
    />
  </Head>
  <section class="single_page page-top">
    <div class="container">
      <div class="single_page-raw">
        <div class="single_page-sidebar">
          <div class="single_page-nav">
            <h1 class="page-title">{{ props.categoryTitle }}</h1>

            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="single_page-nav_icon"
              @click="navigateTo(`/${props.parentCategory}`)"
            >
              <path
                d="M0.5 0.5H5.5V5.42589H0.5V0.5ZM10.5 0.5H15.5V5.42589H10.5V0.5ZM20.5 0.5H25.5V5.42589H20.5V0.5ZM0.5 10.6334H5.5V15.5593H0.5V10.6334ZM0.5 20.5741H5.5V25.5H0.5V20.5741ZM10.5 20.5741H15.5V25.5H10.5V20.5741ZM20.5 20.5741H25.5V25.5H20.5V20.5741ZM10.5 10.6334H15.5V15.5593H10.5V10.6334ZM20.5 10.6334H25.5V15.5593H20.5V10.6334Z"
                stroke="white"
              />
            </svg>
          </div>

          <div class="single_page-pag">
            <button
              class="single_page-pag-item prev"
              @click="nextElem()"
              :disabled="currentIndex < allMedia.data.length - 1 ? false : true"

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
              <span>{{ $t("Preview") }}</span>
            </button>
            <button
              class="single_page-pag-item next"
              @click="prevElem()"
              :disabled="currentIndex > 0 ? false : true"

            >
              <span>{{ $t("Next") }}</span>
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
        <div>
          <img
            v-if="singleMedia.cover.data"
            :src="$config.public.api + singleMedia.cover.data.attributes.url"
            alt="image"
            class="single_page-cover"
          />
          <client-only
            ><span class="single_page-date">{{ pubDate }}</span></client-only
          >
          <h1 class="single_media-title">
            {{ singleMedia.title }}
          </h1>

          <div
            class="single_page-content text-lg-left"
            v-html="singleMedia.content"
          ></div>

          <div
            class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between mt-5"
          >
            <div
              class="single_page-author mb-4 mb-lg-0 d-flex align-items-center"
              v-if="singleMedia.team.data"
            >
              <div class="author_photo flex-shrink-0">
                <img
                  :src="
                    $config.public.api +
                    singleMedia.team.data.attributes.singlePagePhoto.data
                      .attributes.url
                  "
                  alt="author-photo"
                />
              </div>
              <p class="author_name">
                {{ singleMedia.team.data.attributes.post }}
                {{ $t("Article author company") }}<br />
                {{ singleMedia.team.data.attributes.name }}
              </p>
            </div>

            <ShareBtn />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.single_page {
  padding-bottom: 120px;
}
.single_page-raw {
  display: grid;
  grid-template-columns: 25% 1fr;
  gap: 30px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: 100%;
  }
}
.single_page-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.single_page-pag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 64px;
  &-item {
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0.5;
    transition: opacity 0.3s ease span {
      font-size: 14px;
      font-weight: 300;
    }
  }
  &-item:hover {
    transition: opacity 0.3s ease;
    opacity: 1;
  }
}
.single_page-nav_icon {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.single_page-nav_icon:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.single_page-cover {
  width: 100%;
  height: auto;
  margin-bottom: 60px;
}

.single_page-date {
  color: var(--accent-color);
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 30px;
  display: block;
}

.single_page-content {
  img {
    max-width: 100% !important;
  }
  * {
    color: #fff !important;
  }
  a {
    text-decoration: underline;
  }
}

.single_page-author {
  display: flex;
  align-items: center;
  gap: 60px;
  // margin-top: 60px;
  .author_photo {
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    width: 120px;
    height: 120px;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    @media screen and (max-width: 1100px) {
      width: 80px;
      height: 80px;
    }
  }
  .author_name {
    font-size: 16px;
    font-weight: 300;
  }
  @media screen and (max-width: 1100px) {
    gap: 15px;
  }
}
.single_media-title {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 30px;
  @media screen and (max-width: 1100px) {
    font-size: 24px;
    font-weight: 600;
  }
}
.single_page-pag-item {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 300;
}
.single_page-pag-item:disabled {
  opacity: 0.2;
  cursor: auto;
}
</style>