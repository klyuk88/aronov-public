<script setup>
const {locale} = useI18n()
const cookie = useCookie('agreeCookie')
const cookieHandler = () => {
  cookie.value = true
}

</script>

<template>
  <div class="fixed-bottom bg-white py-4" v-if="!cookie">
    <div class="container">
      <div
        class="
          d-flex
          flex-column
          row-gap-3
          flex-lg-row
          align-items-center
          justify-content-between
        "
      >
      
        <p class="cookies-text text-dark m-0 text-center text-lg-start"  v-if="locale === 'ru'">
          Продолжая просмотр сайта, я соглашаюсь с использованием файлов cookie
          в соответствии с <NuxtLink to="/privacy-policy" class="link-primary"><u>Политикой в отношении файлов cookie</u></NuxtLink>
        </p>
        <p class="cookies-text text-dark m-0 text-center text-lg-start"  v-else>
          By continuing to browse the site, I agree to the use of cookies in accordance with the <NuxtLink to="/privacy-policy" class="link-primary"><u>Cookie Policy</u></NuxtLink>
        </p>
        <button class="btn btn-primary rounded-0 text-white px-4"
        @click="cookieHandler()">
        {{  locale === 'ru' ? 'Принять' : 'Agree' }}
        </button>
      </div>
      
    </div>
  </div>
</template>

<style lang="scss">
.cookies-text {
  font-size: 14px;
}
</style>