<script setup lang="ts">
/** Components */
import IconCloud from '~/components/shared/Icons/IconCloud.vue'
import MultiCodeContainer from '~/components/shared/Code/MultiCodeContainer.vue'
import ViewContainer from '~/components/shared/ViewContainer.vue'

/** Stores */
const tabStore = useTabStore()
const infoStore = useInfoStore()

/** Data */
const skillsTemplateCode = `
<template>
  <div class="relative flex h-full flex-col items-center justify-center">
    <IconCloud :icons="skillList" @click="(icon) => refIconSelected = icon" />
    <div v-if="refIconSelected">
      <h3 class="font-semibold">{{ refIconSelected }}</h3>
    </div>
  </div>
</template>
`

const skillsJavascriptCode =
  `
<script setup>
import { ref } from 'vue'

const skillList = [
  'AWS',
  'Docker',
  'Figma',
  'Flutter',
  'GitLab',
  'JavaScript',
  'Laravel',
  'n8n',
  'Next.js',
  'Nginx',
  'Nuxt.js',
  'PHP',
  'React',
  'TypeScript',
  'Vue.js',
]

const refIconSelected = ref(null)
</script` +
  `>
`

const skillsCode = [
  {
    content: skillsTemplateCode,
    type: 'vue',
  },
  {
    content: skillsJavascriptCode,
    type: 'javascript',
  },
]

/** Ref Properties */
const refIconSelected = ref<{
  key: string
  label: string
  level: string
}>()

/**
 * Handle icon cloud click event
 */
const handleIconCloudClick = (icon: string) => {
  refIconSelected.value = infoStore.findSkillByKey(icon)
}
</script>

<template>
  <ViewContainer>
    <template v-if="tabStore.getCurrent.mode == 'code'">
      <MultiCodeContainer :codes="skillsCode" />
    </template>
    <template v-else>
      <div class="relative flex h-full flex-col items-center justify-center">
        <IconCloud :icons="infoStore.getSkillList" @click="(icon) => handleIconCloudClick(icon)" />
        <div v-if="refIconSelected">
          <h3 class="font-semibold">{{ refIconSelected.label }}</h3>
        </div>
      </div>
    </template>
  </ViewContainer>
</template>
