<script setup>
import { ref, reactive } from "vue";
const runtimeConfig = useRuntimeConfig();
const showMobMenu = useShowMobMenu();
const showPopup = useShowPopup();

const { locale } = useI18n();

const { data: contacts } = await useFetch(
  () => `/api/contacts-page?locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api,
  }
);

const { data: mainMenu } = await useFetch(
  () => `/api/menus/${locale.value === "ru" ? "1" : "2"}?populate=*&nested`,
  {
    baseURL: runtimeConfig.api,
  }
);

const { data: mainPage } = await useFetch(
  () => `/api/main-page?populate=logo&locale=${locale.value}`,
  {
    baseURL: runtimeConfig.api,
  }
);
</script>
<template>
  <header>
    <div class="container">
      <div class="header-content">
        <nuxt-link to="/" class="d-lg-none" v-if="$route.path !== '/' && $route.path !== '/en'">
          <img src="@/assets/img/logo.svg" alt="logo-mob" />
        </nuxt-link>
        <a
          v-if="$route.path === '/' || $route.path === '/en'"
          :href="`tel:${contacts.data.attributes.phone}`"
          class="text-primary d-lg-none"
          >{{ contacts.data.attributes.phone }}</a
        >
       


        <nav>
          <ul class="menu m-0">
            <li>
              <NuxtLink to="/" class="main_link">
                <span v-if="$route.path === '/' || $route.path === '/en'">{{
                  $t("Main")
                }}</span>
                <img
                  src="@/assets/img/logo.svg"
                  alt=""
                  class="logo header"
                  v-else
                />
              </NuxtLink>
            </li>

            <li
              v-for="(item, index) in mainMenu.data.attributes.items.data"
              :key="index"
              :class="{
                with_submenu_item:
                  item.attributes.children.data.length > 0 ? true : false,
              }"
            >
              <NuxtLink :to="item.attributes.url">{{
                item.attributes.title
              }}</NuxtLink>

              <div
                class="submenu_wrap"
                v-if="item.attributes.children.data.length > 0"
              >
                <div class="submenu">
                  <ul class="submenu-list list-unstyled">
                    <li
                      class=""
                      v-for="(subItem, index) in item.attributes.children.data"
                      :key="index"
                    >
                      <NuxtLink :to="`${subItem.attributes.url}`">{{
                        subItem.attributes.title
                      }}</NuxtLink>
                      <ul
                        class="deep-submenu list-unstyled mt-3"
                        v-if="subItem.attributes.children.data.length > 0"
                      >
                        <li
                          v-for="(deepSubmenuItem, index) in subItem.attributes
                            .children.data"
                          :key="index"
                          class=""
                        >
                          <NuxtLink :to="deepSubmenuItem.attributes.url">
                            {{ deepSubmenuItem.attributes.title }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <div class="header-info d-none d-lg-flex align-items-center gap-3">
          <a
            :href="`tel:${contacts.data.attributes.phone}`"
            class="text-primary"
            >{{ contacts.data.attributes.phone }}</a
          >
          <button
            class="btn btn-outline-light rounded-0 py-2 hover-accent"
            @click="showPopup = true"
          >
            {{ $t("Write to us") }}
          </button>
          <TheLangSwitcher />
        </div>

        <div class="header-mob_menu" @click="showMobMenu = !showMobMenu">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </header>
  <MobileMenu
    :menu="mainMenu"
    :contacts="{
      phone: contacts.data.attributes.phone,
      email: contacts.data.attributes.email,
    }"
    :logo="mainPage.data.attributes.logo.data.attributes.url"
  />
</template>

<style lang="scss">
header {
  .container {
    position: relative;
  }
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .menu {
    li {
      position: relative;
      .submenu_wrap {
        position: fixed;
        z-index: 99;
        transform: translateY(70px) translateX(-50%);
        padding-top: 50px;
        left: 50%;
        top: 0;
        width: 1110px;
        display: none;
        // top: -100%;
        // opacity: 0;
        // transition: opacity 0.3s ease;
      }
      .submenu {
        background: rgba($color: #212121, $alpha: 0.5);
        backdrop-filter: blur(10px);
        padding: 60px;
        // display: grid;
        // grid-template-columns: 50% 1fr 1fr;
        // gap: 30px;
        border: 1px solid rgba(255, 255, 255, 0.3);

        .submenu-practices {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 50px;
          row-gap: 10px;
          margin-top: 34px;
          list-style: none;
          li a {
            transition: color 0.3s ease;
            color: #fff;
            font-weight: 400;
          }
          li a:hover {
            transition: color 0.3s ease;
            color: var(--accent-color);
          }
        }
        .submenu-parent_link {
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          transition: color 0.2s ease;
        }
        .submenu-parent_link:hover {
          transition: color 0.2s ease;
          color: var(--accent-color);
        }
      }
    }
    .with_submenu_item:hover {
      .submenu_wrap {
        display: block;
        // top: 0;
        // opacity: 1;
        // transition: opacity 0.3s ease;
      }
    }
    .with_submenu_item:hover:after {
      content: "";
      width: 1px;
      height: 60px;
      background: rgba(255, 255, 255, 0.3);
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(50%) translateY(25px);
    }
  }
}

.header-content {
  display: flex;
  align-items: center;
  padding-top: 30px;
  @media screen and (max-width: 1100px) {
    padding-top: 30px;
  }
  .logo {
    width: 65px;
    height: auto;
  }
  nav {
    // margin-left: 70px;
    .menu {
      height: 60px;
      list-style: none;
      padding: 0;
      display: flex;
      align-items: center;
      gap: 35px;
      @media screen and (max-width: 1100px) {
        display: none;
      }
      a {
        color: #fff;
        text-decoration: none;
        transition: color 0.2s ease;
        position: relative;
      }
      a:hover {
        color: var(--accent-color);
        transition: color 0.2s ease;
      }
      .router-link-active {
        color: var(--accent-color);
      }
    }
  }

  // .lang-switcher-arrow:hover {
  //   path {
  //     transition: fill 0.2s ease;
  //     fill: var(--accent-color);
  //   }
  // }

  // .lang-switcher {
  //   cursor: pointer;
  //   margin-left: auto;
  //   position: relative;
  //   width: 20px;
  //   height: 20px;
  //   @media screen and (max-width: 1100px) {
  //     display: none;
  //   }
  // }
}

.header-mob_menu {
  display: none;
  margin-left: auto;
  width: 36px;
  position: relative;
  height: 15px;
  cursor: pointer;
  @media screen and (max-width: 1100px) {
    display: block;
  }
}

.header-mob_menu {
  div {
    height: 1px;
    background: rgba($color: #fff, $alpha: 0.5);
    position: absolute;
    left: 0;
  }
  div:first-child {
    width: 100%;
    top: 0;
  }
  div:last-child {
    width: 100%;
    bottom: 0;
  }
}

.main_link:hover {
  span {
    color: var(--accent-color);
    transition: color 0.3s ease;
  }
}
.main_link span {
  transition: color 0.3s ease;
}

// .offices-menu-list {
//   max-height: 200px;
// }

// .deep-submenu {
//   max-height: 200px;
// }

// .submenu-list {
//   // max-height: 250px;
// }

.submenu-list {
  display: grid;
  grid-template-columns: max-content max-content max-content;
  column-gap: 50px;
  row-gap: 20px;
  // display: flex;
  // flex-direction: column;
  // flex-wrap: wrap;
}

.deep-submenu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px;
  row-gap: 5px;
  // display: flex;
  // flex-direction: column;
  // flex-wrap: wrap;
  // max-height: 200px;
  li {
    a {
      font-size: 14px;
      font-weight: 300;
    }
  }
}
</style>