<script setup lang="ts">
/** Components */
import ViewContainer from '~/components/shared/ViewContainer.vue'
import CodeContainer from '~/components/shared/Code/CodeContainer.vue'

/** Stores */
const infoStore = useInfoStore()

/** Data */
const envTemplateCode = `
# Environment Variables
NAME=Leo Hu
AGE=${infoStore.getAge}
`
</script>

<template>
  <ViewContainer>
    <CodeContainer :code="envTemplateCode" type="env" />
  </ViewContainer>
</template>
