<script setup>
const props = defineProps({
  required: {
    type: Boolean,
    default: true
  }
})
const { locale } = useI18n();
</script>
<template>
  <div>
    <label class="agree-form d-flex align-center">
      <input type="checkbox" checked :required="props.requared"/>
      <span class="check-outer flex-shrink-0">
        <span class="check-inner"></span>
      </span>
      <p class="m-0 ms-3" v-if="locale === 'ru'">
        Согласен(а) с
        <NuxtLink to="#">политикой обработки персональных данных</NuxtLink>
      </p>
      <p class="m-0 ms-3" v-if="locale === 'en'">
        Agree with
        <NuxtLink to="/privacy-policy"
          >Personal Data Processing Policy</NuxtLink
        >
      </p>
    </label>
  </div>
</template>

<style lang="scss">
.agree-form {
  position: relative;
  margin-top: 35px;
  cursor: pointer;
  a {
    color: var(--accent-color);
  }
  p {
    color: #212121;
    font-size: 13px;
    margin-left: 8px;
  }
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .check-outer {
    width: 16px;
    height: 16px;
    border: 0.5px solid rgba(33, 33, 33, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .check-inner {
    width: 8px;
    height: 8px;
    background: var(--accent-color);
    display: none;
  }
  input:checked + .check-outer .check-inner {
    display: block;
  }
}
</style>