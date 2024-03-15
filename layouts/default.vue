<script setup>
import { ref } from 'vue'
const page = ref(null)
const showWidgets = useShowWidgets()
const showPopup = useShowPopup()
const langSwitcher = useLangSwitcher()

const scrollHandler = () => {
  if(page.value.scrollTop > page.value.clientHeight / 2) {
    showWidgets.value = true
  } else {
    showWidgets.value = false
  }
}

const pageScrollTop = () => {
  page.value.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
}
  </script>
<template>
  <div class="page-template" @scroll="scrollHandler" ref="page">
    <TheHeader />
    <slot/>
    <TheFooter />
    <TheWidget @scrollTop="pageScrollTop"/>
    <ThePopupForm v-if="showPopup"/>
    <!-- <MobileMenu/> -->
    <CookiesAgree/>
  </div>
</template>

<style lang="scss">
  .page-template {
    height: 100vh;
    overflow-y: scroll;
    background: radial-gradient(261.98% 122.1% at 50% 122.1%, #EBF6FF 0%, #7B7D7F 44.27%, #383B3E 100%);
  }
  
</style>