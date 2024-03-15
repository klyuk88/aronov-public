<script setup>
const runtimeConfig = useRuntimeConfig()

const {locale} = useI18n()

const {data: practicesPage} = await useFetch(
  () => `/api/practices-page?populate=*&locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api
  }
)

const {error, data: practices} = await useFetch(
  () => `/api/practices?populate=icon&locale=${locale.value}`, {
    baseURL: runtimeConfig.api
  }
)

</script>
<template>
<Head v-if="practicesPage.data.attributes.seo">
    <Title>{{ practicesPage.data.attributes.seo.title }}</Title>
    <Meta
      name="description"
      :content="practicesPage.data.attributes.seo.description"
      v-if="practicesPage.data.attributes.seo.description"
    />
    <Meta
      name="keywords"
      :content="practicesPage.data.attributes.seo.keywords"
      v-if="practicesPage.data.attributes.seo.keywords"
    />
  </Head>
  <section class="expertise_page page-top page-bottom">
    <div class="container">
      <h1 class="page-title">{{practicesPage.data.attributes.title}}</h1>
      <div class="expertise-row" v-if="practices.data.length > 0">
        <NuxtLink :to="`/practices/${item.attributes.slug}`" v-for="(item, index) in practices.data" :key="index">
          <div class="expertise_item">
            <img
              :src="$config.public.api + item.attributes.icon.data.attributes.url"
              alt=""
              class="expertise_item-icon"
            />
            <div class="expertise_item-content">
              <h2 class="expertise_item-title">
                {{item.attributes.title}}
                <img
                  src="@/assets/img/expertise-arrow.svg"
                  alt=""
                  class="expertise_item-arrow"
                />
              </h2>
              <p class="expertise_item-about">
                {{item.attributes.shortAbout}}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <NoContent v-else />
    </div>
  </section>
</template>

<style lang="scss">
.expertise-links-item:hover {
  @media screen and (max-width: 1100px) {
    background-color: var(--accent-color);
    transition: background-color 0.3s ease;
  }
}

.expertise-links-item:last-child {
  margin-bottom: 0;
}
.expertise-links-item {
  margin-bottom: 60px;
  h4 {
    font-size: 32px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    gap: 60px;
    transition: color 0.2s ease;
    align-items: center;
    @media screen and (max-width: 1100px) {
      font-size: 13px;
      font-weight: 500;
      gap: 5px;
      line-height: 1;
    }
  }
  p {
    margin-top: 60px;
    font-size: 16px;
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
  svg {
    width: 30px;
    height: auto;
    path {
      transition: fill 0.2s ease;
    }
    @media screen and (max-width: 1100px) {
      width: 8px;
      height: auto;
    }
  }
  h4:hover {
    color: var(--accent-color);
    transition: color 0.2s ease;
    svg path {
      fill: var(--accent-color);
      transition: fill 0.2s ease;
    }
  }
  @media screen and (max-width: 1100px) {
    margin-bottom: 15px;
    height: 75px;
    background: linear-gradient(
      28.93deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.expertise-links {
  margin-top: 120px;
}
.expertise-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 60px;
  @media screen and (max-width: 1100px) {
    gap: 15px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 320px) {
    grid-template-columns: 100%;
  }
}
.expertise_item {
  padding: 30px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 345px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  &-icon {
    width: 50px;
    height: auto;
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
  &-title {
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    @media screen and (max-width: 1100px) {
      font-size: 12px;
      font-weight: 500;
    }
  }
  &-about {
    font-size: 13px;
    font-weight: 300;
    color: #fff;
    margin-top: 30px;
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
  &-arrow {
    @media screen and (max-width: 1100px) {
      width: 8px;
    }
  }
  @media screen and (max-width: 1100px) {
    padding: 25px;
    max-height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.expertise_item:hover {
  background-color: var(--accent-color);
  transition: background-color 0.3s ease;
}
</style>