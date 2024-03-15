<script setup>
import { ref, onMounted } from "vue";
const props = defineProps(["id"]);

const url = ref(null);
const showShare = ref(false);

const copyLink = (id) => {
  if(process.client) {
    navigator.clipboard.writeText(`${url.value}/${id}`);
  }
  
};

onMounted(() => {
  url.value = window.location.href;
});
</script>
<template>
  <div class="m-0 position-relative">
    <button
      class="share-btn-blog btn btn-primary rounded-0 text-white px-3 py-3 px-lg-4 py-lg-2"
      @click="showShare = !showShare"
    >
      <img src="@/assets/img/share-blog-mob.svg" alt="" class="d-lg-none">
      <span class="d-none d-lg-block">{{$t('Share btn text')}}</span> 
    </button>
    <div
      class="share-wrap position-absolute px-3 py-2"
      :class="{ active: showShare }"
    >
      <ul class="share-list d-flex gap-3 list-unstyled m-0">
        <li class="">
          <a
            :href="`https://t.me/share/url?url=${url}/${props.id}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/img/telegram.svg" alt="" />
          </a>
        </li>

        <li class="mt-0 rounded">
          <a
            :href="`https://api.whatsapp.com/send?text=${url}/${props.id}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/img/whatsapp.svg" alt="" />
          </a>
        </li>

        <li>
          <a
            :href="`https://vk.com/share.php?url=${url}/${props.id}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/img/vk_black_logo_icon_147058.svg" alt="" />
          </a>
        </li>

        <li>
          <a
            :href="`https://connect.ok.ru/offer?url=${url}/${props.id}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/img/odnoklassniki_icon_231925.svg" alt="" />
          </a>
        </li>

        <li class="mt-0 rounded">
          <a href="#" @click.prevent="copyLink(props.id)">
            <img src="@/assets/img/clipboard-fill.svg" alt="" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.share-wrap {
  background: rgba($color: #fff, $alpha: 1);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba($color: #000000, $alpha: 0.2);
  transition: transform 0.3s ease, opacity 0.1s ease;
  transform: translateY(-20px);
  opacity: 0;
  height: 0;
  width: 0;
  overflow: hidden;
  @media (max-width: 1100px) {
    left: -270%;
  }
}

.share-wrap.active {
  height: auto;
  width: auto;
  transition: transform 0.3s ease, opacity 0.1s ease;
  transform: translateY(10px);
  opacity: 1;
}
.share-list {
  svg {
    width: 20px;
    height: 20px;
    fill: #111;
  }
  img {
    width: 20px;
  }
 
}
</style>