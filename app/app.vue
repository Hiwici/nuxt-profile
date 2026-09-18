<script setup lang="ts">
if (import.meta.server) {
  const baseUrl = useRuntimeConfig().public.baseUrl

  useSeoMeta({
    robots: 'index, follow',
    title: 'Leo Hu',
    description: 'Leo Hu is a developer with a passion for building amazing web applications.',
    ogTitle: 'Leo Hu',
    ogDescription: 'Leo Hu is a developer with a passion for building amazing web applications.',
    ogImage: `${baseUrl}/images/hiwici.png`,
    twitterCard: 'summary_large_image',
  })
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
