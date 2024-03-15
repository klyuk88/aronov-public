<script setup>
import { reactive, ref } from "vue";
const popup = useShowPopup();
const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});
const sendForm = async () => {
  useSendForm(form);
  popup.value = false;
};
</script>

<template>
  <form
    class="map-form w-100 bg-white position-relative z-1"
    @submit.prevent="sendForm()"
  >
    <h3 class="map-form-title">{{ $t("popupTitle") }}</h3>
    <FormInput :placeHolder="$t('form.name')" v-model="form.name" />
    <FormInput
      :placeHolder="$t('form.email')"
      :type="'e-mail'"
      v-model="form.email"
    />
    <vue-tel-input
      v-model="form.phone"
      class="mask-phone--popup mb-5"
      :inputOptions="{ placeholder: 'Телефон' }"
    ></vue-tel-input>
    <!-- <FormInput :placeHolder="$t('form.phone')" :type="'Телефон'" v-model="form.phone"/> -->
    <FormTextArea :placeHolder="$t('form.message')" v-model="form.message" />
    <FormButton class="mt-4 w-100">{{ $t("Send") }}</FormButton>
    <FormAgree />
  </form>
</template>

<style lang="scss">
.map-form {
  padding: 65px;
  &-title {
    font-size: 24px;
    font-weight: 500;
    color: var(--dark-color);
    text-align: center;
    margin-bottom: 60px;
    @media screen and (max-width: 576px) {
      font-size: 20px;
      margin-bottom: 30px;
    }
  }
  &-small {
    display: inline-block;
    font-size: 11px;
    font-weight: 400;
    text-align: center;
    margin-top: 20px;
    color: var(--dark-color);
    a {
      color: var(--dark-color);
      text-decoration: underline;
      font-size: 11px;
    }
  }

  @media screen and (max-width: 576px) {
    width: 85%;
    padding: 30px;
  }
}

.vue-tel-input.mask-phone--popup {
  border: none;
  border-bottom: 1px solid rgba(33, 33, 33, 0.5);
  border-radius: 0;
  padding-bottom: 10px;
  .vti__input {
    background-color: transparent;
    border-radius: 0;
    color: var(--dark-color);
  }

  .vti__input::placeholder {
    font-size: 16px;
    font-weight: 300;
    color: var(--dark-color);
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

.vue-tel-input.mask-phone--popup:focus-within {
  box-shadow: none;
}
</style>