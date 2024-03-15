<script setup>
const props = defineProps(['data'])
</script>
<template>
  <Head v-if="props.data.seo">
    <Title>{{ props.data.seo.title }}</Title>
    <Meta
      name="description"
      :content="props.data.seo.description"
      v-if="props.data.seo.description"
    />
    <Meta
      name="keywords"
      :content="props.data.seo.keywords"
      v-if="props.data.seo.keywords"
    />
  </Head>
</template>