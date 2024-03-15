<script setup>
// const props = defineProps({
//   text: {
//     type: String,
//     default: 'Отправить'
//   }
// })
</script>
<template>
  <button class="btn btn-primary rounded-0 text-white py-3 py-lg-4" type="submit">
    <slot></slot>
  </button>
</template>