<script setup>
const {locale} = useI18n()
const runtimeConfig = useRuntimeConfig()
const {data: experticePage} = await useFetch(
  () => `/api/expertise-page?populate=*&locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api
  }
)
const {data: practicesPage} = await useFetch(
  () => `/api/practices-page?locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api
  }
)
const {data: legislativePage} = await useFetch(
  () => `/api/legislative-activity-page?locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api
  }
)
const {data: probonoPage} = await useFetch(
  () => `/api/pro-bono-page?locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api
  }
)


</script>
<template>
<Head v-if="experticePage.data.attributes.seo">
    <Title>{{ experticePage.data.attributes.seo.title }}</Title>
    <Meta
      name="description"
      :content="experticePage.data.attributes.seo.description"
      v-if="experticePage.data.attributes.seo.description"
    />
    <Meta
      name="keywords"
      :content="experticePage.data.attributes.seo.keywords"
      v-if="experticePage.data.attributes.seo.keywords"
    />
  </Head>
  <section class="expertise_index page-top page-bottom">
    <div class="container">
      <h1 class="page-title">{{experticePage.data.attributes.title}}</h1>
      <p class="expertise_index-subtitle">
        {{experticePage.data.attributes.content}}
      </p>
      <div class="expertise_index-row">
        <nuxt-link to="/practices">
          <div class="expertise_index-item">
            <h2 class="m-0">{{practicesPage.data.attributes.title}}</h2>
            <p class="mt-5">
              {{practicesPage.data.attributes.shortAbout}}
            </p>
            <div class="expertise_index-item-link_arrow">
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
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/legislative-activity">
          <div class="expertise_index-item">
            <h2 class="m-0">{{legislativePage.data.attributes.title}}</h2>
            <p class="mt-5">
              {{legislativePage.data.attributes.shortAbout}}
            </p>
            <div class="expertise_index-item-link_arrow">
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
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/pro-bono">
          <div class="expertise_index-item">
            <h2 class="m-0">{{probonoPage.data.attributes.title}}</h2>
            <p class="mt-5">
              {{probonoPage.data.attributes.shortAbout}}
            </p>
            <div class="expertise_index-item-link_arrow">
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
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.expertise_index-item:hover {
  .expertise_index-item-link_arrow {
    background-color: var(--accent-color);
    transition: background-color 0.3s ease;
  }
}
.expertise_index-item-link_arrow {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 65px;
  height: 65px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}
.expertise_index-item {
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  padding: 130px 65px 130px 65px;
  min-height: 530px;
  h2 {
    font-size: 22px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }
  @media screen and (max-width: 1100px) {
    padding: 90px 30px 150px 30px;
    min-height: auto;
  }
}

.expertise_index-row {
  width: 100%;
  margin-top: 84px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: 100%;
  }
}
.expertise_index-subtitle {
  margin-top: 60px;
}
</style>