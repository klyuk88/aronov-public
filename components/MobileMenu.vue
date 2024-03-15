<script setup>
import { ref } from 'vue';
const props = defineProps(['menu', 'contacts', 'logo']);
const submenuShow = ref(false);
const showMobMenu = useShowMobMenu();

const showSubmenu = (event) => {
  const list = event.target.nextElementSibling;
  const arr = event.target;
  arr.classList.toggle('rotate');
  list.classList.toggle('show');
};
</script>
<template>
  <div class="mob_menu" :class="{ show: showMobMenu }">
    <div class="mob_menu-wrap">
      <div>
        <div class="mob_menu-header">
          <div class="mob_menu-lang_switch">
            <TheLangSwitcher />
          </div>

          <img src="@/assets/img/close_menu.svg" alt="" @click="showMobMenu = false" />
        </div>

        <ul class="mob_menu-items">
          <li>
            <nuxt-link to="/">{{ $t('Main') }}</nuxt-link>
          </li>

          <li
            v-for="(item, index) in props?.menu?.data?.attributes?.items?.data"
            :key="index"
            :class="{
              'mob_menu-items-item_with_submenu': item?.attributes?.children?.data?.length > 0 ? true : false,
            }"
          >
            <NuxtLink :to="item.attributes.url"> {{ item.attributes.title }} </NuxtLink>
            <img
              src="@/assets/img/chevron-r.svg"
              alt=""
              class="mob_menu-items-arrow"
              v-if="item?.attributes?.children?.data?.length > 0"
              @click="showSubmenu($event)"
            />
            <ul class="mob_menu-submenu_items" v-if="item?.attributes?.children?.data?.length > 0">
              <li v-for="(subItem, index) in item?.attributes?.children?.data" :key="index">
                <nuxt-link :to="subItem?.attributes?.url">{{ subItem?.attributes?.title }}</nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="mob_menu_footer">
        <img :src="$config.public.api + props?.logo" alt="" class="mob_menu-logo" />
        <div class="d-flex align-center justify-between mt-30">
          <a :href="`tel:${props?.contacts?.phone}`" class="fsz-10">{{ props?.contacts?.phone }}</a>
          <a :href="`mailto:${props?.contacts?.email}`" class="fsz-10">{{ props?.contacts?.email }} </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.mob_menu-lang_switch {
  .vs__dropdown-option,
  .vs__selected {
    font-size: 16px;
    font-weight: 500;
  }
}
.mob_menu-logo {
  max-width: 250px;
}
.mob_menu-items-item_with_submenu {
  position: relative;
  .mob_menu-items-arrow {
    position: absolute;
    right: 0;
    top: 0;
    transition: transform 0.3s ease-out;
  }
  .mob_menu-items-arrow.rotate {
    transform: rotate(90deg);
    transition: transform 0.3s ease-in;
  }
}
.mob_menu-submenu_items {
  padding-left: 20px;
  list-style: none;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.mob_menu-submenu_items.show {
  max-height: 500px;
  transition: max-height 0.5s ease-in;
}
.mob_menu {
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  z-index: 100;
  transform: translateX(-100%);
  top: 0;
  left: -100%;
  background-color: rgba($color: #383b3e, $alpha: 0.9);
  backdrop-filter: blur(6px);
  transition: transform 0.3s ease-out, left 0.1s ease-out 0.3s;
  padding: 60px;
  display: flex;
  justify-content: center;
  .mob_menu-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .mob_menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
  }
  // .mob_menu-lang_switch {
  //   display: flex;
  //   align-items: center;
  //   gap: 6px;
  //   span {
  //     font-size: 16px;
  //     font-weight: 600;
  //   }
  // }
  .mob_menu-items {
    list-style: none;
    padding: 0;
    li {
      a {
        font-size: 16px;
        font-weight: 600;
        transition: color 0.2s ease;
        margin-bottom: 30px;
        display: inline-block;
      }
      a:hover {
        transition: color 0.2s ease;
        color: var(--accent-color);
      }
    }
  }
  @media screen and (max-width: 320px) {
    padding: 25px;
  }
}
.mob_menu.show {
  left: 0;
  transform: translateX(0);
  transition: transform 0.3s ease-in;
}
</style>
