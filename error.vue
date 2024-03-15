<script setup>
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>
<template>
  <div>
    <div class="page-template">
      <TheHeader />
      
      <section class="pt-120 pb-120">
        <div class="container">
          <div class="text-center">
            <template v-if="props.error.statusCode == 404">
              <h1 class="error-title">Ошбика 404. Страница не найдена.</h1>
              <p class="error-subtitle mt-4">
                Неправильно набран адрес, или такой страницы на сайте больше не
                существует.
              </p>
            </template>
            <template v-else>
              <h1 class="error-title">Ошбика {{ props.error.statusCode }}</h1>
              <p class="error-subtitle mt-4">
                Приносим извинения, мы уже работаем над устранением данной
                ошибки.
              </p>
            </template>
            <FormButton
              class="error-btn mt-4"
              @click="handleError"
            >
              Перейти на главную
            </FormButton>
          </div>
        </div>
      </section>

      <TheFooter />

      <MobileMenu />
    </div>
  </div>
</template>

<style lang="scss">
.page-template {
  height: 100vh;
  overflow-y: scroll;
  background: radial-gradient(
    261.98% 122.1% at 50% 122.1%,
    #ebf6ff 0%,
    #7b7d7f 44.27%,
    #383b3e 100%
  );
}

.error-subtitle {
  font-size: 20px;
  @media (max-width: 1100px) {
    font-size: 16px;
  }
}

.error-title {
  font-size: 48px;
  font-weight: 400;
  @media (max-width: 1100px) {
    font-size: 26px;
    font-weight: 400;
  }
}

.error-btn {
  width: 25%;
  @media (max-width: 1100px) {
    width: 100%;
  }
}
</style>
