<script setup lang="ts">
/** Components */
import ViewContainer from '~/components/shared/ViewContainer.vue'
import CodeContainer from '~/components/shared/Code/CodeContainer.vue'

/** Data */
const packageJsonTemplateCode = `
{
  "name": "Leo Hu",
  "email": "hiileo@hiwici.io",
  "url": "https://github.com/Hiwici",
  "type": "Human",
  "gender": "Male",
  "scripts": {
    "code": "start coding",
    "coffee": "drink coffee",
    "music": "listen to music",
    "game": "play game",
    "anime": "watch anime"
  }
}
`
</script>

<template>
  <ViewContainer>
    <CodeContainer :code="packageJsonTemplateCode" type="json" />
  </ViewContainer>
</template>
