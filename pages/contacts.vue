<script setup>
const runtimeConfig = useRuntimeConfig()
const {locale} = useI18n()
const {data: contactsPage} = await useFetch(
  () => `/api/contacts-page?populate=seo&locale=${locale.value}`,
  { baseURL: runtimeConfig.api }
)

</script>
<template>
<Head v-if="contactsPage.data.attributes.seo">
    <Title>{{ contactsPage.data.attributes.seo.title }}</Title>
    <Meta
      name="description"
      :content="contactsPage.data.attributes.seo.description"
      v-if="contactsPage.data.attributes.seo.description"
    />
    <Meta
      name="keywords"
      :content="contactsPage.data.attributes.seo.keywords"
      v-if="contactsPage.data.attributes.seo.keywords"
    />
  </Head>
  <section class="contacts pt-120 pb-120">
    <div class="container">
      <div class="row row-gap-4 row-gap-lg-0">
        <div class="col order-lg-2">
          <h2 class="d-lg-none page-title mb-5">{{contactsPage.data.attributes.title}}</h2>
          <img src="@/assets/img/map-contacts.svg" alt="" class="img-fluid">
        </div>
        <div class="col-lg-5">
          <h2 class="d-none d-lg-block page-title">{{contactsPage.data.attributes.title}}</h2>
          <div>
            <h2 class="contacts-list-title mt-5">{{$t('contacts.subtitle')}}</h2>
            <ul class="list-unstyled contacts-list mt-4">
              <li class="mb-2"><span>{{$t('PhoneFax')}}:</span> <a :href="`tel:${contactsPage.data.attributes.phone}`">
                {{contactsPage.data.attributes.phone}}
                </a></li>
              <li class="mb-2"><span>Email: </span> <a :href="`mailto:${contactsPage.data.attributes.email}`">{{contactsPage.data.attributes.email}}</a></li>


              <li class="mb-2"><span>{{$t('Adress')}}: </span>
              {{contactsPage.data.attributes.adress}}
              </li>

              <li class="mt-4" v-if="contactsPage.data.attributes.telegramChannel">
              <!-- <a target="_blank" :href="contactsPage.data.attributes.telegramChannel" class="text-white fw-semibold">
                <i class="bi bi-telegram text-white"></i>
                {{$t('Telegram channel')}}
              </a> -->
              <a target="_blank" :href="contactsPage.data.attributes.telegramChannel" class="">
              <button class="btn btn-primary rounded-0 px-4 py-2">
                <i class="bi bi-telegram"></i>
                {{$t('Telegram channel')}}
              </button>
             
               </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div class="row mt-100 align-items-center">
        <div class="col-lg-5">
          <h2 class="page-title">{{$t('contacts.questionTitle')}}</h2>
          <p class="contacts-subtitle mt-4">
            {{$t('contacts.questionText')}}
            <img src="@/assets/img/expertise-arrow.svg" alt="" class="contacts-title-arrow d-none d-lg-inline">
          </p>
        </div>

        <div class="col-lg-6 offset-lg-1">
          <client-only>
            <TheForm/>
          </client-only>
          
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.contacts-list {
  li {
    font-size: 18px;
    font-weight: 400;
    color: #b2b2b2;
    span {
      font-weight: 600;
      color: #fff;
    }
    a {
      color: #b2b2b2;
    }
  }
}

.contacts-list-title {
  font-size: 22px;
  font-weight: 700;
  position: relative;
  line-height: 1;
  padding-left: 25px;
}
.contacts-list-title:before {
  content: "";
  display: block;
  position: absolute;
  width: 6px;
  height: 100%;
  background: var(--accent-color);
  left: 0;
  top: 0;
}

.contacts-subtitle {
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  @media (max-width: 1100px) {
    font-size: 16px;
    font-weight: 400;
  }
}

.contacts-title-arrow {
  width: 22px;
}
  
</style>