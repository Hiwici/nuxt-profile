<script setup lang="ts">
/** Components */
import AnimatedBeam from '~/components/shared/Beams/AnimatedBeam.vue'
import MultiCodeContainer from '~/components/shared/Code/MultiCodeContainer.vue'
import ViewContainer from '~/components/shared/ViewContainer.vue'

/** Stores */
const tabStore = useTabStore()

/** Data */
const appTemplateCode = `
<template>
  <div class="grid h-full w-full items-center">
    <div
      ref="refContainer"
      class="bg-background relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border border-gray-300 p-10 shadow"
    >
      <div class="flex size-full max-w-3xl flex-row items-center justify-between gap-10">
        <div
          ref="refInfo"
          class="relative z-10 grid h-15 min-w-30 cursor-pointer items-center rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-center shadow-md hover:bg-gray-100"
        >
          Information
        </div>
        <div
          ref="refName"
          class="relative z-10 grid h-20 w-20 items-center rounded-full border-2 border-gray-300 bg-white px-4 py-2 shadow-md"
        >
          Profile
        </div>
        <div
          ref="refSkills"
          class="relative z-10 grid h-15 min-w-30 cursor-pointer items-center rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-center shadow-md hover:bg-gray-100"
        >
          Skills
        </div>
      </div>

      <AnimatedBeam :ref-container="refContainer" :ref-from="refName" :ref-to="refInfo" />
      <AnimatedBeam :ref-container="refContainer" :ref-from="refName" :ref-to="refSkills" />
    </div>
  </div>
</template>
`

const appJavascriptCode =
  `
<script setup>
import { ref } from 'vue'
import AnimatedBeam from '~/components/shared/Beams/AnimatedBeam.vue'

const refContainer = ref(null)
const refInfo = ref(null)
const refName = ref(null)
const refSkills = ref(null)
</script` +
  `>
`

const appCode = [
  {
    content: appTemplateCode,
    type: 'vue',
  },
  {
    content: appJavascriptCode,
    type: 'javascript',
  },
]

/** Ref Properties */
const refContainer = ref<HTMLElement | null>(null)
const refInfo = ref<HTMLElement | null>(null)
const refName = ref<HTMLElement | null>(null)
const refSkills = ref<HTMLElement | null>(null)

/**
 * Handle item click.
 */
const handleClick = (key: string) => {
  tabStore.addActivatedTab(key)
  tabStore.setCurrentTab(key)
}
</script>

<template>
  <ViewContainer>
    <template v-if="tabStore.getCurrent.mode == 'code'">
      <MultiCodeContainer :codes="appCode" />
    </template>
    <template v-else>
      <div class="grid h-full w-full items-center">
        <div
          ref="refContainer"
          class="bg-background theme-border relative flex h-125 w-full items-center justify-center overflow-hidden rounded-lg border p-10 shadow"
        >
          <div
            class="flex size-full max-w-3xl flex-col items-center justify-between gap-10 lg:flex-row"
          >
            <div
              ref="refInfo"
              class="theme-border theme-bg relative z-10 grid h-15 min-w-30 cursor-pointer items-center rounded-md border-2 px-4 py-2 text-center shadow-md hover:bg-gray-100 dark:hover:bg-zinc-700"
              @click="handleClick('information')"
            >
              Information
            </div>
            <div
              ref="refName"
              class="theme-border theme-bg relative z-10 grid h-20 w-20 items-center rounded-full border-2 px-4 py-2 shadow-md"
            >
              Profile
            </div>
            <div
              ref="refSkills"
              class="theme-border theme-bg relative z-10 grid h-15 min-w-30 cursor-pointer items-center rounded-md border-2 px-4 py-2 text-center shadow-md hover:bg-gray-100 dark:hover:bg-zinc-700"
              @click="handleClick('skills')"
            >
              Skills
            </div>
          </div>

          <template v-if="refContainer && refName && refInfo && refSkills">
            <AnimatedBeam :ref-container="refContainer" :ref-from="refName" :ref-to="refInfo" />
            <AnimatedBeam :ref-container="refContainer" :ref-from="refName" :ref-to="refSkills" />
          </template>
        </div>
      </div>
    </template>
  </ViewContainer>
</template>
