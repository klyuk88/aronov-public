<script setup>
import { reactive, ref } from "vue";
import qs from "qs";

const { locale } = useI18n();

const showFilters = ref(false);

const runTimeConfig = useRuntimeConfig();

const teamIndex = ref(null);
const officeIndex = ref(null);

const currentPage = ref(1);

const teamFilterParams = ref("");

const { data: teamPage } = await useFetch(
  () => `/api/team-page?populate=seo&locale=${locale.value}`,
  {
    baseURL: runTimeConfig.api,
  }
);

const {
  refresh,
  data: team,
  error: teamError,
} = await useFetch(
  () =>
    `/api/teams?pagination[pageSize]=36&pagination[page]=${currentPage.value}${teamFilterParams.value}&populate=*&sort[0]=publishedAt:asc&locale=${locale.value}`,
  {
    baseURL: runTimeConfig.public.api,
  }
);

const { data: practices, error: practicesError } = await useFetch(
  () => `/api/practices?populate=*&locale=${locale.value}`,
  {
    baseURL: runTimeConfig.public.api,
  }
);

const { data: offices, error: officesError } = await useFetch(
  () =>
    `/api/offices?fields[0]=slug&fields[1]=title&populate[0]=teams&locale=${locale.value}`,
  {
    baseURL: runTimeConfig.public.api,
  }
);

const filterTeam = async (filter, index, title) => {
  searchInput.value = null;
  if (title === "practice") {
    officeIndex.value = null;
    teamIndex.value = index;
    teamFilterParams.value = `&filters[practices][slug][$eq]=${filter}`;
  } else {
    teamIndex.value = null;
    officeIndex.value = index;
    teamFilterParams.value = `&filters[offices][slug][$eq]=${filter}`;
  }
};

const clearFilters = async () => {
  teamIndex.value = null;
  officeIndex.value = null;
  searchInput.value = null;

  currentPage.value = 1;
  teamFilterParams.value = "";
};

const navPage = (page) => {
  currentPage.value = page;
};

const searchInput = ref("");

const ucFirst = (word = "") => {
  return word[0].toUpperCase() + word.slice(1);
};

const lcFirst = (word = "") => {
  return word[0].toLowerCase() + word.slice(1);
};

const searchTeam = () => {
  currentPage.value = 1;
  teamIndex.value = null;
  officeIndex.value = null;

  if (searchInput.value !== "") {
    const query = qs.stringify({
      filters: {
        $or: [
          {
            name: {
              $contains: ucFirst(searchInput.value),
            },
          },
          {
            name: {
              $contains: lcFirst(searchInput.value),
            },
          },
          {
            practices: {
              title: {
                $contains: ucFirst(searchInput.value),
              },
            },
          },
          {
            practices: {
              title: {
                $contains: lcFirst(searchInput.value),
              },
            },
          },
        ],
      },
    });

    teamFilterParams.value = `&${query}`;
  } else {
    teamFilterParams.value = "";
  }
};
</script>

<template>
  <Head v-if="teamPage.data.attributes.seo">
    <Title>{{ teamPage.data.attributes.seo.title }}</Title>
    <Meta
      name="description"
      :content="teamPage.data.attributes.seo.description"
      v-if="teamPage.data.attributes.seo.description"
    />
    <Meta
      name="keywords"
      :content="teamPage.data.attributes.seo.keywords"
      v-if="teamPage.data.attributes.seo.keywords"
    />
  </Head>
  <div>
    <section class="team-page page-top">
      <div class="container">
        <h1 class="page-title">{{ teamPage.data.attributes.title }}</h1>

        <div class="team-search">
          <input
            type="text"
            :placeholder="$t('Search placeholder')"
            v-model="searchInput"
            @keypress.enter="searchTeam"
          />
          <img
            src="@/assets/img/close-filters.svg"
            alt=""
            class="clearSerch"
            v-if="searchInput"
            @click="clearFilters"
          />
          <img
            src="@/assets/img/search-icon.svg"
            alt=""
            class="team-search-icon"
            @click="searchTeam"
          />
        </div>

        <MobileFilters @clickFilter="showFilters = true" />

        <div class="team-page-content">
          <div class="sidebar mob_filters" :class="{ active: showFilters }">
            <img
              src="~/assets/img/close-filters.svg"
              alt=""
              class="close_filters_btn"
              @click="showFilters = false"
            />
            <div class="sidebar-filter">
              <h2 class="sidebar-filter-title">
                {{ $t("Practice filter title") }}
              </h2>
              <ul class="sidebar-filter-list">
                <li v-for="(item, index) in practices.data" :key="item.id">
                  <a
                    href="#"
                    v-if="item.attributes.teams.data.length > 0"
                    @click.prevent="
                      filterTeam(item.attributes.slug, index, 'practice')
                    "
                    :class="{ active: teamIndex === index ? true : false }"
                  >
                    {{ item.attributes.title }}
                  </a>
                </li>
              </ul>
            </div>

            <div class="sidebar-filter">
              <h2 class="sidebar-filter-title">
                {{ $t("Offices filter title") }}
              </h2>
              <ul class="sidebar-filter-list">
                <li v-for="(item, index) in offices.data" :key="index">
                  <a
                    href="#"
                    v-if="item.attributes.teams.data.length > 0"
                    :class="{ active: officeIndex === index ? true : false }"
                    @click.prevent="
                      filterTeam(item.attributes.slug, index, 'office')
                    "
                    >{{ item.attributes.title }}</a
                  >
                </li>
              </ul>
            </div>

            <div class="sidebar-filter">
              <button
                class="clear_filters_btn"
                @click="clearFilters()"
                v-if="teamFilterParams"
              >
                {{ $t("Clear filters") }}
                <img src="@/assets/img/clearFilters.svg" alt="clear-icon" />
              </button>
            </div>
          </div>

          <h2 v-if="team.data.length === 0">
            {{ $t("No search result") }}
          </h2>
          <div class="team-page-items">
            <TeamItem
              v-for="(item, index) in team.data"
              :key="index"
              :teamItem="item"
            />
          </div>
        </div>
        <PagePagination
          class="team-pagination"
          :pageTotal="team.meta.pagination.pageCount"
          @changePage="navPage"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.team-page {
  padding-bottom: 120px;
}
.team-search {
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 27px;
  &-icon {
    cursor: pointer;
  }
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    font-weight: 300;
    background: transparent;
    padding-bottom: 10px;
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    font-weight: 300;
  }
  input:focus {
    border-color: var(--accent-color);
    outline: none;
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.team-page-content {
  margin-top: 60px;
  display: grid;
  grid-template-columns: 25% 1fr;
  gap: 30px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: 100%;
  }
}
.sidebar {
  &-filter {
    margin-bottom: 60px;
    &-title {
      font-size: 16px;
      font-weight: 600;
    }
    &-list {
      list-style: none;
      padding: 0;
      margin-top: 30px;
      li {
        margin-bottom: 15px;
        a {
          font-size: 14px;
          font-weight: 400;
          transition: color 0.2s ease;
        }
        a.active {
          color: var(--accent-color);
        }
        a:hover {
          color: var(--accent-color);
          transition: color 0.2s ease;
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
  &-filter:last-child {
    margin-bottom: 0;
  }
}
.team-page-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: 100%;
  }
}
.team-pagination {
  margin-top: 60px;
  text-align: right;
}

.sidebar-filter-title.active {
  color: var(--accent-color);
}

.clearSerch {
  opacity: 0.5;
  cursor: pointer;
}
.clear_filters_btn {
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: #fff;
  padding: 10px 33px;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

// .clear_filters_btn:disabled,
// .clear_filters_btn[disabled]{
//   opacity: 0.5;
// }

.clear_filters_btn:hover {
  background: var(--accent-color);
  transition: all 0.3s ease;
  border: 1px solid var(--accent-color);
}
</style>