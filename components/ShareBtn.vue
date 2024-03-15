<script setup>
import { ref, onMounted } from 'vue'
import VkontakteButton from "vue-share-buttons/src/components/VkontakteButton";
import OdnoklassnikiButton from "vue-share-buttons/src/components/OdnoklassnikiButton";
import TelegramButton from "vue-share-buttons/src/components/TelegramButton";
import WhatsAppButton from "vue-share-buttons/src/components/WhatsAppButton";

const showBtn = ref(false)
const shareBtnElem = ref(null)

onMounted(() => {
  if(process.client) {
  document.addEventListener('click', (e) => {
    if(e.target !== shareBtnElem.value) {
      showBtn.value = false
    } 
  })
}

})



</script>
<template>
    <button class="share-btn btn btn-primary rounded-0 text-white px-5 py-2" @click="showBtn = !showBtn" ref="shareBtnElem">
      {{$t('Share btn text')}}
      <!-- <img src="@/assets/img/share-symbol.svg" alt="" /> -->
    </button>

    <div class="share-popup flex-column align-center" :class="{'active': showBtn}">
      <client-only>
        <VkontakteButton btnText class="share-button--circle"/>
        <OdnoklassnikiButton btnText class="share-button--circle"/>
        <TelegramButton btnText class="share-button--circle"/>
        <WhatsAppButton btnText class="share-button--circle" />
      </client-only>
    </div>
</template>

<style lang="scss">
.share-btn {
  // width: 40px;
  // height: 40px;
  // border-radius: 50%;
  cursor: pointer;
  // img {
  //   width: 20px;
  // }
}
.share-popup {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%) translateX(200%);
  padding: 5px;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.share-popup.active {
  transform: translateY(-50%) translateX(0);
  opacity: 1;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>