<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/store';

const mainStore = useMainStore();
const route = useRoute();

const { locale, locales } = useI18n();
const langSwitcher = useLangSwitcher();
const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
const currentLocale = computed(() => {
  return locales.value.filter((i) => i.code == locale.value);
});
const langSwitcherElem = ref(null);

const config = useRuntimeConfig();

const clickHandler = (code) => {
  if (code === config.public.defaultLang) {
    return;
  }

  const hostname = code === 'ru' ? config.public.ruSiteUrl : config.public.enSiteUrl;

  const { pathname = '' } = window.location;

  let redirectUrl = '';

  if (mainStore.alternativeSlug) {
    const path = pathname.split('/')[1];

    redirectUrl = `${hostname}/${path}/${mainStore.alternativeSlug}`;
  } else {
    redirectUrl = `${hostname}${pathname}`;
  }

  window.location.replace(redirectUrl);
};
</script>
<template>
  <div class="position-relative lang-changer">
    <div class="d-flex align-items-center gap-2 cursor-pointer" @click="langSwitcher = !langSwitcher">
      <span ref="langSwitcherElem">{{ currentLocale[0].name }}</span>
      <img src="@/assets/img/chevron-r.svg" alt="" class="lang-arr" :class="{ active: langSwitcher }" />
    </div>

    <ul class="list-unstyled langs-list position-absolute" :class="{ active: langSwitcher }">
      <li class="m-0" v-for="item in availableLocales" :key="item.code" @click="langSwitcher = false">
        <nuxt-link class="langs-list__link" @click.prevent="clickHandler(item.code)">{{ item.name }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.lang-change-wrap {
  cursor: pointer;
}
.langs-list {
  top: 0;
  left: 0;
  opacity: 0;
  height: 0;
  width: 0;
  margin-top: 25px;
  transform: translateY(-10px);
  transition: transform 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
  a:hover {
    color: var(--accent-color);
    transition: color 0.3s ease;
  }
  a {
    transition: color 0.3s ease;
  }

  &__link {
    cursor: pointer;
  }
}

.langs-list.active {
  transform: translateY(0);
  opacity: 1;
  height: auto;
  width: auto;
  overflow: auto;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.lang-arr {
  transition: transform 0.3s ease;
}

.lang-arr.active {
  transform: rotate(90deg);
  transition: transform 0.3s ease;
}
</style>
