<script setup>
const config = useRuntimeConfig();
const {locale} = useI18n()
const { data: casesPage } = await useFetch(() => "/api/cases-page?populate=*&locale=" + locale.value, {
  baseURL: config.public.api,
});

const currentPage = ref(1);



const { data: cases } = await useFetch(() => `/api/cases?pagination[pageSize]=6&pagination[page]=${currentPage.value}&sort[0]=date:desc&locale=${locale.value}`, {
  baseURL: config.public.api,
});


const navPage = (page) => {
  currentPage.value = page;
};

</script>
<template>
<Head v-if="casesPage.data.attributes.seo">
    <Title>{{ casesPage.data.attributes.seo.title }}</Title>
    <Meta
      name="description"
      :content="casesPage.data.attributes.seo.description"
      v-if="casesPage.data.attributes.seo.description"
    />
    <Meta
      name="keywords"
      :content="casesPage.data.attributes.seo.keywords"
      v-if="casesPage.data.attributes.seo.keywords"
    />
  </Head>
  <section class="pro-bono pt-120 pb-120">
    <div class="container">
      
      <h1 class="page-title">
        {{casesPage.data.attributes.title}}
      </h1>
      <div
        class="mt-5 text-white"
        v-if="casesPage.data.attributes.content"
        v-html="casesPage.data.attributes.content"
      ></div>

      <div class="row mt-5 justify-content-between pro-bono-items gy-5" v-if="cases.data.length > 0">
        <div
          class="col-lg-5 pro-bono-item"
          v-for="(item, index) in cases.data"
          :key="item.id"
        >
          <nuxt-link :to="`/cases/${item.attributes.slug}`">
            <h2 class="pro-bono-item-title">
              {{ item.attributes.title }}
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="pro-bono-item-arrow"
              >
                <path
                  d="M8.75 10L7.525 8.79167L10.6312 5.83333H0V4.16667H10.6312L7.525 1.20833L8.75 0L14 5L8.75 10Z"
                  fill="white"
                />
              </svg>
            </h2>
            <span class="pro-bono-item-date mt-2">
              {{ new Date(item.attributes.date).toLocaleDateString("ru-RU") }}
            </span>
          </nuxt-link>
        </div>
        <PagePagination
        :pageTotal="cases.meta.pagination.pageCount"
        @changePage="navPage"
        class="media_page-pagination d-flex justify-content-end"
        />
      </div>
      <NoContent v-else></NoContent>
    </div>
  </section>
</template>

<style lang="scss">
.pro-bono-item-title {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  transition: color 0.2s ease;
  @media (max-width: 1100px) {
    font-size: 16px;
    line-height: 1.5;
  }
}
.pro-bono-item-date {
  font-size: 15px;
  font-weight: 500;
  opacity: 0.5;
}
.pro-bono-item-arrow {
  path {
    transition: fill 0.2s ease;
  }
}
.pro-bono-item:hover {
  cursor: pointer;
  .pro-bono-item-title {
    color: var(--accent-color);
  }
  .pro-bono-item-arrow {
    path {
      fill: var(--accent-color);
      transition: fill 0.2s ease;
    }
  }
}
</style>