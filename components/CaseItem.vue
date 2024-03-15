<script setup>
const props = defineProps(['parent', 'item'])
</script>
<template>
  <div class="col-lg-5 pro-bono-item">
    <nuxt-link :to="`/${props.parent}/${item.attributes.slug}`">
      <h2 class="pro-bono-item-title">
        {{ item.attributes.title }}
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pro-bono-item-arrow"
        >
          <path
            d="M8.75 10L7.525 8.79167L10.6312 5.83333H0V4.16667H10.6312L7.525 1.20833L8.75 0L14 5L8.75 10Z"
            fill="white"
          />
        </svg>
      </h2>
      <span class="pro-bono-item-date mt-2">
        {{ new Date(item.attributes.date).toLocaleDateString("ru-RU") }}
      </span>
    </nuxt-link>
  </div>
</template>

<style lang="scss">
.pro-bono-item-title {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  transition: color 0.2s ease;
  @media (max-width: 1100px) {
    font-size: 16px;
    line-height: 1.5;
  }
}
.pro-bono-item-date {
  font-size: 15px;
  font-weight: 500;
  opacity: 0.5;
}
.pro-bono-item-arrow {
  path {
    transition: fill 0.2s ease;
  }
}
.pro-bono-item:hover {
  cursor: pointer;
  .pro-bono-item-title {
    color: var(--accent-color);
  }
  .pro-bono-item-arrow {
    path {
      fill: var(--accent-color);
      transition: fill 0.2s ease;
    }
  }
}
  
</style>