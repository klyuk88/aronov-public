<template>
  <section class="pt-120 pb-120">
    <div class="container">
      <div class="text-center">
        <h1 class="error-title">Спасибо!</h1>
        <p class="error-subtitle mt-4">
          Данные успешно отправлены. Мы свяжемся с Вами в ближайшее время.
        </p>
        <NuxtLink to="/">
          <FormButton class="error-btn mt-4 px-5">
          Перейти на главную
          </FormButton>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
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
</style>