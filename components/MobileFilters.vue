<script setup>
const emits = defineEmits(['clickFilter'])
</script>
<template>
  <div class="mobile_filters">
    <img src="@/assets/img/filter-icon.svg" alt="" @click="$emit('clickFilter')"/>
    <img src="@/assets/img/search-icon.svg" alt="" />
  </div>
</template>
<style lang="scss">
.mobile_filters {
  display: none;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  margin-bottom: 60px;
  @media screen and (max-width: 1100px) {
    display: flex;
  }
}
</style>