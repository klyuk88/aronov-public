<script setup>
import { ref } from "vue";
const props = defineProps(["pageTotal"]);
const emit = defineEmits(["changePage"]);
const currentPage = ref(1);

const navPage = (page) => {
  currentPage.value = page
  emit("changePage", page);
};

const nextPage = () => {
  if(currentPage.value < props.pageTotal) {
    emit("changePage", currentPage.value + 1);
    currentPage.value = currentPage.value + 1
  }
  
};
</script>

<template>
  <div class="page-pagination">
    <ul>
      <li v-for="(item, index) in props.pageTotal" :key="index">
        <a
          href="#"
          :class="{ active: currentPage === item ? true : false }"
          @click.prevent="navPage(item)"
          >{{ item }}</a
        >
      </li>

      <li><a href="#" @click.prevent="nextPage" v-if="currentPage < props.pageTotal">Далее</a></li>
    </ul>
  </div>
</template>

<style lang="scss">
.page-pagination {
  ul {
    list-style: none;
    padding: 0;
    display: inline-flex;
    gap: 30px;
    flex-wrap: wrap;
    li a {
      font-weight: 300;
      transition: all 0.1s ease;
      color: rgb(207, 207, 207);
    }
    li a:hover {
      transition: color 0.1s ease;
      color: var(--accent-color);
    }
    li a.active {
      opacity: 1;
      color: var(--accent-color);
    }
  }
}
</style>