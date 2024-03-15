<script setup>
import { ref, reactive } from "vue";
// import Swiper core and required modules
const showFilters = ref(false);

const config = useRuntimeConfig();

const currentPage = ref(1);

const {locale} = useI18n()

const { data: blogPage } = await useFetch(
  () => `/api/blog-page?populate=*&locale=${locale.value}`,
  {
    baseURL: config.api,
  }
);

// const {data: ip} = await useFetch('https://api.ipify.org')
const filter = ref("");
const filterTeam = ref("");
const { data: blogItems, error } = await useFetch(
  () =>
    `/api/blogs?pagination[pageSize]=10&pagination[page]=${currentPage.value}&populate[0]=team&populate[1]=team.singlePagePhoto&populate[2]=gallery${filter.value}${filterTeam.value}&sort[0]=date:desc&locale=${locale.value}`,
  {
    baseURL: config.api,
  }
);

const navPage = (page) => {
  currentPage.value = page;
};

const { data: blogCategories } = await useFetch(
  () => `/api/blog-categories?populate=*&locale=${locale.value}`,
  {
    baseURL: config.api,
  }
);

const { data: blogTeams } = await useFetch(() => `/api/teams?populate=*&locale=${locale.value}`, {
  baseURL: config.api,
});

const currentIndex = ref(null);
const teamCurrentIndex = ref(null);

const filterBlog = (id, index) => {
  currentIndex.value = index;
  currentPage.value = 1;
  filter.value = `&filters[blogCategories][id][$eq]=${id}`;
};

const teamFilter = (id, index) => {
  teamCurrentIndex.value = index
  filterTeam.value = `&filters[team][id][$eq]=${id}`
}

const clearFilter = () => {
  currentIndex.value = null;
  teamCurrentIndex.value = null

  filterTeam.value = ''
  filter.value = "";

  currentPage.value = 1;
};
</script>

<template>
<seo-head-meta :data="blogPage.data.attributes"/>
  <section class="blog_page page-top page-bottom">
    <div class="container">
      <h2 class="page-title">{{blogPage.data.attributes.title}}</h2>
      <div class="row mt-60">
        <div class="col-lg-9">
          <div class="blog">
            <img
              src="@/assets/img/filter-icon.svg"
              alt=""
              class="d-block d-lg-none mb-5"
              @click="showFilters = true"
            />
           
            <BlogItem
             v-for="(item, index) in blogItems.data"
            :key="item.id"
            :item="item"
            :shareBtn="true"
            />

          </div>
          <PagePagination
            :pageTotal="blogItems.meta.pagination.pageCount"
            @changePage="navPage"
            class="d-flex justify-content-end"
          />
          <h2 v-if="blogItems.data.length === 0" class="page-title">
            {{$t('No publications')}}
          </h2>
        </div>

        <div class="col-lg-3 mob_filters" :class="{ active: showFilters }">
          <img
            src="~/assets/img/close-filters.svg"
            alt=""
            class="close_filters_btn"
            @click="showFilters = false"
          />

          <ul class="blog-filters list-unstyled">
            <li
              :class="{ active: currentIndex === null }"
              @click="clearFilter()"
            >
              Все
            </li>
            <template
              v-for="(item, index) in blogCategories.data"
              :key="item.id"
            >
              <li
                v-if="item.attributes.blogs.data.length > 0"
                @click="filterBlog(item.id, index)"
                :class="{ active: index === currentIndex }"
              >
                {{ item.attributes.title }}
              </li>
            </template>
          </ul>
         
          <ul class="mt-5 blog-team-filter list-unstyle">
            <template v-for="(item, index) in blogTeams.data" :key="item.id">
              <li
                v-if="item.attributes.blogs.data.length > 0"
                :class="{ active: teamCurrentIndex === index }"
                @click="teamFilter(item.id, index)"
                class="
                  d-flex
                  align-items-center
                  blog-team-filter-item
                  gap-4
                "
              >
                <img
                  :src="
                    $config.public.api +
                    item.attributes.singlePagePhoto.data.attributes.url
                  "
                  alt=""
                  class="blog-team-filter-item-photo object-fit-cover"
                />
                <p>{{ item.attributes.name }}</p>
              </li>
            </template>
          </ul>

          <button
            v-if="filterTeam || filter"
            class="mt-5 btn btn-outline-light rounded-0 w-100"
            @click="clearFilter()"
          >
            {{$t('Clear filter')}}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">

.blog-filters {
  li {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  li:hover {
    color: var(--accent-color);
    transition: color 0.3s ease;
  }
  li.active {
    color: var(--accent-color);
  }
}
.blog-team-filter-item {
  margin-bottom: 30px;
  cursor: pointer;
  &-photo {
    width: 65px;
    height: 65px;
    transition: border 0.2s ease;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }
}

.blog-team-filter-item {
  img {
    transition: outline 0.2s ease;
    outline: 1px solid var(--accent-color);
  }
}
.blog-team-filter-item.active {
  img {
    outline: 1px solid var(--accent-color);
  }
  p {
    color: var(--accent-color);
  }
}
.blog-team-filter-item:hover {
  img {
    transition: outline 0.2s ease;
    outline: 1px solid var(--accent-color);
  }
}

.blog-item-content {
  @media (max-width: 1100px) {
    font-size: 14px;
    overflow: hidden;
  }
}

.blog-item-content.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.more-btn-text {
  font-size: 14px;
  cursor: pointer;
}

.mob-share-btn {
  width: 65px;
  height: 65px;
}


</style>