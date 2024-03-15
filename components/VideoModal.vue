<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['iframe'])
const video = ref(null)
const showModal = useShowVideoModal()

onMounted(() => {
})

</script>
<template>
  <div class="video_modal" @click.self="showModal = false">
     <div class="video_pleer" v-html="props.iframe">
     </div>
  </div>
</template>

<style lang="scss">
  .video_modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .video_pleer {
    width: 750px;
    max-width: 750px;
    height: 450px;
    iframe {
      width: 100%;
      height: 100%;
    }
    @media (max-width: 768px) {
      max-width: 95%;
      height: 200px;
    }
  }
</style>