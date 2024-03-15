<script setup>
const runtimeConfig = useRuntimeConfig()
const {locale} = useI18n()
const {data: seoData} = await useFetch(() => `/api/seo-setting?locale=${locale.value}`, { baseURL: runtimeConfig.api })

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk}${seoData.value.data.attributes.partTitle}`
      : `${seoData.value.data.attributes.title}`;
  },
  meta: [
    {
      name: "description",
      content: `${seoData.value.data.attributes.description}`,
    },
  ],
});
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator :color="'#038DFF'" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
