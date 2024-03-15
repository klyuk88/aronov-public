<script setup>
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute } from 'vue-router';
import { ref, computed, watch, reactive } from 'vue';
import { useMainStore } from '@/store';

const mainStore = useMainStore();

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const singleTeam = ref(null);
const { error, data: singleTeamData } = await useFetch(
  () => `/api/teams?filters[slug][$eq]=${route.params.slug}&populate=*&locale=${locale.value}`,
  {
    baseURL: runtimeConfig.public.api,
  }
);

if (!error.value) {
  mainStore.alternativeSlug =
    singleTeamData?.value?.data[0]?.attributes?.localizations?.data[0]?.attributes?.slug || '';

  singleTeam.value = singleTeamData.value.data[0].attributes;
  useSetRoutesMeta(singleTeam);
}

onBeforeRouteLeave(() => {
  mainStore.alternativeSlug = '';
});

const about = useReplaceUploads(singleTeam.value.about);

const mediaPageLimit = ref(3);
const { data: singleTeamMedia } = await useFetch(
  () =>
    `/api/medias?filters[team][slug][$eq]=${route.params.slug}&populate=*&locale=${locale.value}&pagination[start]=0&pagination[limit]=${mediaPageLimit.value}&sort[0]=date:desc`,
  {
    baseURL: runtimeConfig.public.api,
  }
);

const casesPageLimit = ref(4);
const { data: singleTeamCases } = await useFetch(
  () =>
    `/api/cases?filters[teams][slug][$eq]=${route.params.slug}&populate=*&locale=${locale.value}&pagination[start]=0&pagination[limit]=${casesPageLimit.value}&sort[0]=date:desc`,
  {
    baseURL: runtimeConfig.public.api,
  }
);

const videoModal = useShowVideoModal();
const showVideoModal = () => {
  videoModal.value = true;
};
</script>
<template>
  <Head v-if="singleTeam.seo">
    <Title>{{ singleTeam.seo.title }}</Title>
    <Meta name="description" :content="singleTeam.seo.description" v-if="singleTeam.seo.description" />
    <Meta name="keywords" :content="singleTeam.seo.keywords" v-if="singleTeam.seo.keywords" />
  </Head>
  <VideoModal v-if="videoModal" :iframe="singleTeam.youtubeVideo" />
  <section class="team_single page-top page-bottom">
    <div class="container">
      <div class="team_single-header">
        <div>
          <h1 class="team_single-name">{{ singleTeam.name }}</h1>
          <h2 class="team_single-post">{{ singleTeam.post }}</h2>

          <div class="team_single-mob_thumb">
            <img :src="$config.public.api + singleTeam.singlePagePhoto.data.attributes.url" alt="" class="avatar" />
            <img
              src="@/assets/img/btn-video.svg"
              alt="play-video"
              class="play_video_button"
              @click="showVideoModal()"
              v-if="singleTeam.youtubeVideo"
            />
          </div>

          <div class="team_single-header_item" v-if="singleTeam.practices.data">
            <h3 class="team_single-subtitle">{{ $t('Practice') }}</h3>
            <ul class="team_single-list">
              <li v-for="(item, index) in singleTeam.practices.data" :key="index">
                {{ item.attributes.title }}
              </li>
            </ul>
          </div>

          <div class="team_single-header_item" v-if="singleTeam.awards">
            <h3 class="team_single-subtitle">{{ $t('Awards') }}</h3>
            <div class="" v-html="singleTeam.awards"></div>
          </div>

          <div class="team_single-header_item contacts">
            <a
              :href="$config.public.api + singleTeam.vCard.data.attributes.url"
              class="team_single-header_link"
              download
              v-if="singleTeam.vCard.data"
              >v-сard</a
            >

            <a :href="`mailto:${singleTeam.email}`" class="team_single-header_link">{{ singleTeam.email }}</a>
          </div>

          <div class="team_single-header_item" v-if="singleTeam.quote">
            <p class="team_single-header_quote">
              {{ singleTeam.quote }}
            </p>
          </div>

          <div class="team_single-header_item" v-if="singleTeam.education">
            <h3 class="team_single-subtitle">{{ $t('Education') }}</h3>
            <div class="" v-html="singleTeam.education"></div>
          </div>
        </div>

        <div class="team_single-thumb_wrap">
          <div class="team_single-thumb">
            <img
              :src="$config.public.api + singleTeam.singlePagePhoto.data.attributes.url"
              alt="team-photo"
              class="cover-image"
            />

            <img
              src="@/assets/img/btn-video.svg"
              alt=""
              id="btn_video"
              @click="showVideoModal()"
              v-if="singleTeam.youtubeVideo"
            />
          </div>
        </div>
      </div>

      <div class="team_single-about text-lg-left" v-html="about" />

      <!-- КЕЙСЫ  -->
      <div class="team_single-cases" v-if="singleTeam.cases.data.length > 0">
        <h2 class="page-title">{{ $t('Cases title') }}</h2>
        <div class="row mt-5 justify-content-between gy-5">
          <!-- <pre>
            {{singleTeamCases}}
          </pre> -->
          <CaseItem v-for="(item, idx) in singleTeamCases.data" :key="item.id" :parent="'cases'" :item="item" />
        </div>
        <button
          class="btn btn-outline-light rounded-0 px-4 py-2 mx-auto d-block mt-5"
          @click="casesPageLimit += 4"
          v-if="singleTeamCases.meta.pagination.total - casesPageLimit >= 1"
        >
          Смотреть больше
        </button>
      </div>

      <!-- ПУБЛИКАЦИИ  -->
      <div class="team_single-media" v-if="singleTeamMedia.data.length > 0">
        <div class="team_single-media-header">
          <h2 class="page-title">{{ $t('Publications') }}</h2>
          <!-- <NuxtLink to="/media">
            {{ $t("See more") }}
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
          </NuxtLink> -->
        </div>

        <div class="team_single-media-row">
          <MediaItem v-for="(item, index) in singleTeamMedia.data" :key="index" :mediaItem="item" />
        </div>
        <button
          class="btn btn-outline-light rounded-0 px-4 py-2 mx-auto d-block mt-5"
          @click="mediaPageLimit += 3"
          v-if="singleTeamMedia.meta.pagination.total - mediaPageLimit >= 1"
        >
          Смотреть больше
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.team_single-thumb_wrap {
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.team_single .team_single-header_item.contacts {
  display: flex;
  align-items: center;
  gap: 60px;
  @media screen and (max-width: 1100px) {
    justify-content: space-between;
  }
}
.team_single-mob_thumb {
  display: none;
  width: 100%;
  margin-bottom: 60px;
  position: relative;
  padding-top: 100%;
  box-sizing: content-box;
  .avatar {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    object-fit: cover;
  }
  .play_video_button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 60px;
  }
  @media screen and (max-width: 1100px) {
    display: block;
  }
}
.team_single-media-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
}
.team_single-media-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: 100%;
  }
}
.team_single-media {
  margin-top: 120px;
}

.team_single-header {
  display: grid;
  grid-template-columns: 1fr 50%;
  gap: 100px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: 100%;
  }
}

.team_single-thumb {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  #btn_video {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }
}

.team_single-name {
  font-size: 32px;
  font-weight: 500;
  text-transform: uppercase;
  @media screen and (max-width: 1100px) {
    font-size: 30px;
    font-weight: 500;
  }
}

.team_single-post {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 60px;
  color: var(--accent-color);
  @media screen and (max-width: 1100px) {
    font-size: 24px;
  }
}
.team_single-subtitle {
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  position: relative;
  padding-left: 10px;
}
.team_single-subtitle:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: var(--accent-color);
}
.team_single-header_item ul,
.team_single-list {
  margin-top: 15px;
  padding-left: 20px;
  li {
    font-size: 14px;
    font-weight: 400;
    line-height: 2;
    color: #fff !important;
    @media screen and (max-width: 1100px) {
      font-size: 13px;
    }
  }
}
.team_single-header_item * {
  color: #fff !important;
}

.team_single-header_item {
  margin-bottom: 30px;
}
.team_single-header_item:last-child {
  margin-bottom: 0;
}

.team_single-header_link {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
}

.team_single-header_quote {
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  opacity: 0.7;
  @media screen and (max-width: 1100px) {
    text-align: center;
    margin-top: 60px;
  }
}

.team_single-about {
  margin-top: 60px;
  * {
    color: #fff !important;
  }
}

.team_single-cases {
  margin-top: 120px;
}

.team_single-cases_row {
  margin-top: 60px;
  display: grid;
  grid-template-columns: 41% 41%;
  column-gap: 18%;
  row-gap: 60px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: 100%;
    column-gap: 0;
    row-gap: 30px;
  }
}

.team_single-cases_item {
  h3 {
    font-size: 20px;
    font-weight: 600;
    transition: color 0.2s ease;
    @media screen and (max-width: 1100px) {
      font-size: 14px;
    }
  }
  span {
    font-size: 15px;
    font-weight: 500;
    opacity: 0.5;
    margin-top: 15px;
    display: block;
    @media screen and (max-width: 1100px) {
      font-size: 14px;
    }
  }
  svg path {
    transition: fill 0.2s ease;
  }
}
.team_single-cases_item:hover {
  h3 {
    color: var(--accent-color);
    transition: color 0.2s ease;
  }
  svg path {
    fill: var(--accent-color);
    transition: fill 0.2s ease;
  }
}
</style>
