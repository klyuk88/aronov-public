<script setup>
const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const { data: careerPage } = await useFetch(
  () => `/api/career-page?populate=*&locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api,
  }
);
const phone = ref(null);
const files = ref([]);
const resume = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const sendForm = () => {
  useSendForm(resume, files);
};
</script>
<template>

  <Head v-if="careerPage.data.attributes.seo">
    <Title>{{ careerPage.data.attributes.seo.title }}</Title>
    <Meta
      name="description"
      :content="careerPage.data.attributes.seo.description"
      v-if="careerPage.data.attributes.seo.description"
    />
    <Meta
      name="keywords"
      :content="careerPage.data.attributes.seo.keywords"
      v-if="careerPage.data.attributes.seo.keywords"
    />
  </Head>
  <section class="pt-120 pb-120">
    <div class="container">
      <h2 class="page-title">{{ careerPage.data.attributes.title }}</h2>
      <p class="mt-5 text-justify text-lg-left">
        {{ careerPage.data.attributes.content }}
      </p>
      <div class="form-block mt-120">
        <h2 class="career-title text-center">{{ $t("Send Resume") }}</h2>
        <form class="mt-5 m-auto career-form" @submit.prevent="sendForm()">
          <FormInput
            :placeHolder="$t('form.name')"
            class="white"
            v-model="resume.name"
          />
          <FormInput
            :placeHolder="$t('form.email')"
            :type="'e-mail'"
            class="white"
            v-model="resume.email"
          />
          <client-only>
            <vue-tel-input
              v-model="resume.phone"
              class="mb-5 mask-phone--career"
              :inputOptions="{ placeholder: 'Телефон' }"
            ></vue-tel-input>
          </client-only>

          <!-- <FormInput
            :placeHolder="$t('form.phone')"
            :type="`tel`"
            class="white"
            v-model="resume.phone"
          /> -->
          <FormTextArea
            :placeHolder="$t('form.message')"
            class="white"
            v-model="resume.message"
          />
          <FormFileInput class="mt-4" v-model="files" :requared="false" />
          <FormButton class="mt-4 w-100">{{ $t("Send") }}</FormButton>
          <FormAgree class="text-white" />
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.career-title {
  font-size: 24px;
  font-weight: 500;
}
.form-block {
  border: 1px solid rgba($color: #fff, $alpha: 0.3);
  padding: 60px 20px 70px 20px;
  @media (max-width: 576px) {
    border: none;
    padding: 0;
  }
}
.career-form {
  max-width: 410px;
  width: 410px;
  @media (max-width: 576px) {
    width: 100%;
  }
}

.vue-tel-input.mask-phone--career {
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  padding-bottom: 10px;
  .vti__input {
    background-color: transparent;
    border-radius: 0;
    color: #fff;
  }

  .vti__input::placeholder {
    font-size: 16px;
    font-weight: 300;
    color: #fff;
    opacity: 0.5;
    font-family: "Inter";
  }

  .vti__input:focus {
    outline: none;
    border-color: var(--accent-color);
    // color: var(--accent-color);
  }

  .vti__dropdown:hover {
    background-color: transparent;
  }

  .vti__dropdown-list {
    background-color: #3f4345;
  }

  .vti__dropdown-item {
    font-weight: 300;
  }
    .vti__dropdown-item.highlighted {
    background: rgba($color: #fff, $alpha: 0.3);
  }
}

.vue-tel-input.mask-phone--career:focus-within {
  box-shadow: none;
}
</style>