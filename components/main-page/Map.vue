<template>
  <section class="map">
    <!-- style="aspect-ratio: 21/9" -->
    <iframe
      src="https://yandex.ru/map-widget/v1/?um=constructor%3Adf94430a42c04e735d5c937dfd71af9674cad3d5a0eabc81a4b89289c14460ba&amp;source=constructor"
      width="100%"
      height="450"
      style="filter: grayscale(100)"
      frameborder="0"
      class="map-frame"
      
    ></iframe>
    <div class="container">
      <div class="map-content">
        <div>
          <h2 class="section-title map-title">Контакты</h2>
        </div>
        <div>
          <form action="" class="map-form">
            <h3 class="map-form-title">Заказать обратный звонок</h3>
            <input type="text" id="" placeholder="Имя" />
            <input type="email" id="" placeholder="Email" />
            <input type="tel" id="" placeholder="Телефон" />
            <textarea placeholder="Сообщение"></textarea>
            <button class="btn map-form-btn">Отправить</button>
            <p class="map-form-small"
              >Нажимая на кнопку Вы соглашаетесь с
              <NuxtLink to="#"
                >политикой обработки персональных данных</NuxtLink
              ></p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.map {
  @media screen and (max-width: 1100px) {
    display: none;
  }
  margin-top: 180px;
  position: relative;
  &-frame {
    position: absolute;
    width: 100%;
    left: 0;
    top: 134px;
    z-index: 0;
    // mix-blend-mode: ;
  }
  &-title {
    position: relative;
    z-index: 1;
    margin-bottom: 135px;
    color: rgb(113, 113, 113)
  }
}
.map-content {
  display: grid;
  grid-template-columns: 1fr 41%;
  gap: 30px;
  width: 100%;
  align-items: end;
  padding-top: 60px;
}
.map-form {
  padding: 40px 50px;
  background: #fff;
  width: 100%;
  position: relative;
  z-index: 1;
  input, textarea {
    font-size: 16px;
    font-weight: 300;
    color: var(--dark-color);
    border: none;
    border-radius: 0;
    background: transparent;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(33, 33, 33, 0.5);
    width: 100%;
    margin-bottom: 35px;
  }
  input::placeholder, textarea::placeholder {
    font-size: 16px;
    font-weight: 300;
    color: var(--dark-color);
  }
  input:focus, textarea:focus {
    outline: none;
    border-color: var(--accent-color);
    color: var(--accent-color);
  }
  input:focus::placeholder, textarea:focus::placeholder {
    color: var(--accent-color);
  }
  textarea {
    padding-bottom: 0;
    margin-bottom: 0;
  }
  &-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--dark-color);
    text-align: center;
    margin-bottom: 60px;
    
  }
  &-btn {
    width: 100%;
    margin-top: 66px;
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
}
</style>