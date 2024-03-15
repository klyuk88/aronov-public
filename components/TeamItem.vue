<script setup>
const props = defineProps(['teamItem'])
</script>
<template>
  <NuxtLink :to="`/team/${props.teamItem.attributes.slug}`" class="text-white">
    <div class="team-page-item">
      <img :src="$config.public.api + props.teamItem.attributes.avatar.data.attributes.url" alt="" class="team_item-image" />
      <img
        v-if="props.teamItem.attributes.hoverImage"
        :src="$config.public.api + props.teamItem.attributes.hoverImage.data.attributes.url"
        alt=""
        class="team_item-hover_image"
      />
      <div class="team-page-item_names">
        <h3 class="team-page-item-title">{{props.teamItem.attributes.name}}</h3>
        <p class="team-page-item-post">{{props.teamItem.attributes.post}}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
.team-page-item {
  position: relative;
  width: 100%;
  height: 360px;
  padding: 35px 30px;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  &_names {
    position: relative;
    z-index: 1;
  }
  &-title {
    font-size: 20px;
    font-weight: 500;
  }
  &-post {
    font-size: 13px;
    font-weight: 300;
    margin-top: 16px;
  }
  @media screen and (max-width: 1100px) {
    height: 400px;
  }
  @media screen and (max-width: 567px) {
    height: 490px;
  }
}
.team-page-item:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(33, 33, 33, 0) 49.98%,
    #212121 99.98%
  );
}
.team_item-hover_image {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.team-page-item:hover {
  .team_item-hover_image {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
}
</style>