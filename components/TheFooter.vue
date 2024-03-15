<script setup>
const config = useRuntimeConfig()
const {locale} = useI18n()
const {data: contacts} = await useFetch(
  () => `/api/contacts-page?populate=*&locale=${locale.value}`,
  {
    baseURL: config.api
  }
)
const {data: mainPage} = await useFetch(
  () => `/api/main-page?populate=logo&locale=${locale.value}`,
  {
    baseURL: config.api
  }
)


</script>
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
      
        <div>
          <img
          v-if="mainPage.data.attributes.logo.data"
            :src="$config.public.api + mainPage.data.attributes.logo.data.attributes.url"
            alt="logotype"
            class="footer-logo"
          />

          <div class="footer-info-block">
            <p class="footer-info">
             {{contacts.data.attributes.copyright}}
            </p>
            <div class="footer-info text-white" v-html="contacts.data.attributes.devData">
            </div>
          </div>
        </div>

        <div>
          <div class="footer-item">
            <h4 class="footer-item-title">{{$t('Adress')}}</h4>
            <p class="footer-item-content">
              {{contacts.data.attributes.adress}}
            </p>
          </div>

          <div class="footer-item">
            <h4 class="footer-item-title">{{$t('Contacts')}}</h4>
            <p class="footer-item-content">
              Email: <a :href="`mailto:${contacts.data.attributes.email}`">{{contacts.data.attributes.email}}</a>
            </p>
            <p class="footer-item-content">
              {{$t('PhoneFax')}}: <a :href="`tel:${contacts.data.attributes.phone}`">{{contacts.data.attributes.phone}}</a>
            </p>
          </div>

          <div class="footer-item">
             <p class="footer-info">
              {{contacts.data.attributes.copyright}}
            </p>
            <div class="footer-info text-white" v-html="contacts.data.attributes.devData"></div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer-info-block {
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.footer-content {
  display: grid;
  grid-template-columns: 50% 50%;
  width: 50%;
  gap: 75px;
  @media screen and (max-width: 1100px) {
    width: 100%;
    grid-template-columns: 100%;
    gap: 30px;
  }
}
.footer {
  padding-bottom: 90px;
  position: relative;
  .container {
    position: relative;
  }
  &-info {
    font-size: 12px;
    font-weight: 300;
    // color: #D1D1D1;
    margin-bottom: 35px;
    @media screen and (max-width: 1100px) {
      margin-bottom: 20px;
    }
  }
  &-info:last-child {
    margin-bottom: 0;
  }
  &-logo {
    width: 252px;
    height: auto;
    margin-bottom: 66px;
    @media screen and (max-width: 1100px) {
      margin-bottom: 0;
      display: block;
      margin-inline: auto;
    }
  }
}

.footer-item {
  margin-bottom: 56px;
  &-title {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 20px;
  
  }
  &-content {
    font-size: 14px;
    font-weight: 400;
    line-height: 170%;
    // color: #BEBDBB;
  }
  @media screen and (max-width: 1100px) {
    margin-bottom: 30px;
  }
}
.footer-item:last-child {
  margin-bottom: 0;
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
  }
}
</style>