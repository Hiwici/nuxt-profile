<script setup lang="ts">
/** Components */
import ViewContainer from '~/components/shared/ViewContainer.vue'
import CodeContainer from '~/components/shared/Code/CodeContainer.vue'

/** Data */
const gitignoreTemplateCode = `
# Personal Information
Home Address
Date of Birth
Height and Weight
`
</script>

<template>
  <ViewContainer>
    <CodeContainer :code="gitignoreTemplateCode" type="markdown" />
  </ViewContainer>
</template>
