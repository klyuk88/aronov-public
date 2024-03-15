<script setup>
import { ref } from "vue";

const emit = defineEmits(['scrollTop'])

const showWidgets = useShowWidgets()
const showPopup = useShowPopup()

</script>

<template>
  <div class="widgets" :class="{ active: showWidgets }">
    <div class="widget-item" @click="showPopup = true">
      <img src="@/assets/img/callback-icon.svg" alt=""/>
    </div>

    <div class="widget-item anchor" @click="$emit('scrollTop')">
      <img src="@/assets/img/chevron-down.svg" alt="" />
    </div>
  </div>
</template>

<style lang="scss">
.widgets {
  position: fixed;
  z-index: 99;
  bottom: 5vh;
  right: 5vw;
  display: flex;
  align-items: center;
  gap: 30px;
}
.widget-item {
  width: 65px;
  height: 65px;
  background: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.3s ease, transform 0.5s ease;
}
.widget-item.anchor {
  img {
    transform: rotate(-180deg);
  }
}

.widgets.active {
  .widget-item {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease, transform 0.5s ease;
  }
}
</style>