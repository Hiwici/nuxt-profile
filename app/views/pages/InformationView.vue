<script setup lang="ts">
/** Components */
import ViewContainer from '~/components/shared/ViewContainer.vue'
import CodeContainer from '~/components/shared/Code/CodeContainer.vue'
import RadiantText from '~/components/shared/Text/RadiantText.vue'

/** Stores */
const tabStore = useTabStore()
const infoStore = useInfoStore()

/** Data */
const informationTemplateCode = `
<template>
  <div class="relative grid h-full items-center justify-center">
    <div class="flex h-3/4 w-70 flex-col rounded-xl p-4 shadow">
      <div class="mx-auto font-bold uppercase">
        ${infoStore.getTitle}
      </div>
      <RadiantText class="mx-auto mt-1">
        <span class="text-headline-1 font-bold text-gray-600/60">
          ${infoStore.getName}
        </span>
      </RadiantText>
      <div class="mx-auto mt-4 grid h-40 overflow-hidden rounded-md border-2 p-2 shadow-lg">
        <img src="assets/images/leohu.jpg" alt="Leo Hu" class="h-full w-full object-contain" />
      </div>
      <div class="text-caption-2 mt-6 border-l-2 border-gray-300 pl-2">
        ${infoStore.getIntroduction}
      </div>
    </div>
  </div>
</template>
`
</script>

<template>
  <ViewContainer>
    <template v-if="tabStore.getCurrent.mode == 'code'">
      <CodeContainer :code="informationTemplateCode" :type="'vue'" />
    </template>
    <template v-else>
      <div class="relative grid h-full items-center justify-center">
        <div
          class="flex h-min w-70 flex-col rounded-xl p-4 shadow shadow-gray-300 dark:border dark:border-gray-600 dark:shadow-gray-600"
        >
          <div class="mx-auto font-bold uppercase">{{ infoStore.getTitle }}</div>
          <RadiantText class="mx-auto mt-1">
            <span class="text-headline-1 font-bold text-gray-600/60 dark:text-gray-300/60">
              {{ infoStore.getName }}</span
            >
          </RadiantText>
          <div class="mx-auto mt-4 grid h-40 w-full overflow-hidden rounded-md border-2 shadow-lg">
            <img src="assets/images/leohu.jpg" alt="Leo Hu" class="h-40 w-full object-cover" />
          </div>
          <div class="text-caption-2 theme-border mt-6 border-l-3 pl-2">
            {{ infoStore.getIntroduction }}
          </div>
        </div>
      </div>
    </template>
  </ViewContainer>
</template>
