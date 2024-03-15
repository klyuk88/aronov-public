export const useSetRoutesMeta = (data) => {
  const route = useRoute()
  if (data.value.locale === "ru") {
  return route.meta.nuxtI18n = {
      ru: {
        slug: data.value.slug,
      },
      en: {
        slug: data.value.localizations.data[0]?.attributes.slug ?? '',
      },
    };
  } else if (data.value.locale === "en") {
   return route.meta.nuxtI18n = {
      en: {
        slug: data.value.slug,
      },
      ru: {
        slug: data.value.localizations.data[0]?.attributes.slug ?? '',
      },
    };
  }

}