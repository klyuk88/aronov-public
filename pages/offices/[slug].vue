<script setup>
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute } from 'vue-router';
import { ref, computed, watch, reactive } from 'vue';
import { useMainStore } from '@/store';
import qs from 'qs'

const mainStore = useMainStore();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const {locale} = useI18n()
const singleOfficeData = ref(null)

if(route.params.slug === 'russia' || route.params.slug === 'russia-eng') {
  await navigateTo('/contacts')
}


const query = qs.stringify({
  filters: {
    slug: {
      $eq: route.params.slug
    }
  },
  populate: ['Cover', 'representative', 'representative.photo', 'localizations', 'seo'],
  locale: locale.value
})

const { data: singleOffice, error } = await useFetch(
  `/api/offices?${query}`,
  {
    baseURL: runtimeConfig.public.api,
  }
);

if (!error.value) {
  mainStore.alternativeSlug =
    singleOffice?.value?.data[0]?.attributes?.localizations?.data[0]
      ?.attributes?.slug || "";
  singleOfficeData.value = singleOffice.value.data[0].attributes;
  useSetRoutesMeta(singleOfficeData);
}

onBeforeRouteLeave(() => {
  mainStore.alternativeSlug = '';
});

const content = useReplaceUploads(
  singleOffice.value.data[0].attributes.content
);
</script>
<template>
<seo-head-meta :data="singleOfficeData"/>
  <section class="single_office section-top">
    <div class="container">
      <h1 class="page-title single_office-title">
        {{ singleOfficeData.title }}
      </h1>
    </div>
    <img
      v-if="singleOfficeData.Cover.data"
      :src="
        $config.public.api +
        singleOfficeData.Cover.data.attributes.url
      "
      alt="office-cover"
      class="single_offce-cover"
    />

    <div class="container single_office-content text-lg-left" v-html="content"/>

    <div class="container single_office-contact-container section-top">
      <div class="single_office-contact">
        <h2 class="section-title">{{$t('Contacts')}}</h2>
        <div class="single_office-contacts">
          <div class="single_office-contact_item"
          v-for="(item, index) in singleOfficeData.representative" :key="item.id"
          >
            <img v-if="item.photo.data" :src="$config.public.api + item.photo.data.attributes.url" alt="" />
            <div class="single_office-contact_item-data">
              <div>
                <p v-if="item.name">{{item.name}}</p>
                <p v-if="item.post">{{item.post}}</p>
              </div>
              <div class="mt-2">
                <p v-if="item.email">Email: {{item.email}}</p>
                <p v-if="item.phone">{{$t('PhoneFax')}}: {{item.phone}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.single_office {
  margin-bottom: 150px;
  @media screen and (max-width: 1100px) {
    padding-top: 60px;
  }
}
.single_office-content {
  margin-top: 60px;
}
.single_offce-cover {
  width: 100%;
  height: auto;
  @media screen and (max-width: 1100px) {
    margin-top: 60px;
  }
}
.single_office-content {
  ul {
    li {
      margin-bottom: 15px;
    }
  }
  * {
    color: #fff !important;
  }
  color: #fff;
  h2 {
    font-size: 28px;
    font-weight: 500;
    position: relative;
    @media screen and (max-width: 1100px) {
      font-size: 18px;
    }
  }
  h3 {
    font-weight: 500;
  }
  h2:before {
    content: "";
    position: absolute;
    width: 6px;
    left: -15px;
    height: 100%;
    display: block;
    background: var(--accent-color);
  }
  p,
  li {
    @media screen and (max-width: 1100px) {
      font-size: 14px;
    }
  }
}

.mt-2 {
  margin-top: 15px;
}

.single_office-contacts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media (max-width: 1100px) {
    grid-template-columns: 100%;
  }
}

.single_office-contact_item {
  display: flex;
  align-items: center;
  gap: 30px;
  img {
    width: 160px;
    height: auto;
  }
  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.single_office-contact-container.section-top {
  @media (max-width: 1100px) {
    padding-top: 60px;
  }
}
</style>