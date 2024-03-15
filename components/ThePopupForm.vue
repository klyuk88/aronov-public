<script setup>
const showPopup = useShowPopup();
</script>
<template>
  <div class="popup_wrap show" @click.self="showPopup = false">
    <div class="popup-content position-relative">
      <svg
        @click="showPopup = false"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        class="form_close_btn"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.39092e-05 1.36362L1.36368 0L15 13.6362L13.6364 14.9999L4.39092e-05 1.36362Z"
          fill="white"
          fill-opacity="0.5"
        />
        <path
          d="M13.6363 0.000145635L15 1.36377L1.36363 15L0 13.6364L13.6363 0.000145635Z"
          fill="white"
          fill-opacity="0.5"
        />
      </svg>
      <TheForm />
    </div>
  </div>
</template>
<style lang="scss">
.popup_wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba($color: #212121, $alpha: 0.5);
  backdrop-filter: blur(6px);
  align-items: center;
  justify-content: center;
  z-index: 99;
  display: none;
  .popup-content {
    width: 540px;
    max-width: 540px;
    @media (max-width: 576px) {
      width: 90%;
    }
  }
  .form_close_btn {
    position: absolute;
    right: -25px;
    top: -25px;
    cursor: pointer;
    @media (max-width: 576px) {
      right: 0;
    }
  }
}
.popup_wrap.show {
  display: flex;
}
</style>
