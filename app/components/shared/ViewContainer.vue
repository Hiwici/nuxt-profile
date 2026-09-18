<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { useTemplateRef } from 'vue'

/** Stores */
const tabStore = useTabStore()

/** Template Refs */
const templateRefViewContainer = useTemplateRef('view-container')

/** VueUse */
const { y: scrollY } = useScroll(templateRefViewContainer)

/** Watchers */
watch(scrollY, (newValue, oldValue) => {
  tabStore.current.scroll.y = newValue
})
</script>

<template>
  <div
    ref="view-container"
    class="mx-4 h-full max-w-[calc(100vw-28px)] overflow-auto lg:max-w-[calc(100vw-272px)]"
    :class="{
      'max-h-[calc(100dvh-112px)]': tabStore.getCurrent.mode === 'code',
      'max-h-[calc(100dvh-88px)]': tabStore.getCurrent.mode === 'preview',
    }"
  >
    <slot />
  </div>
</template>
