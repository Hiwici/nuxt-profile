<script setup lang="ts">
/** Stores */
const themeStore = useThemeStore()

/** Ref Properties */
const refDrawerOpen = ref(false)

/** onBeforeMount Hook */
onBeforeMount(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div v-show="themeStore.loaded" class="grid h-full grid-rows-[auto_1fr_auto]">
    <LayoutHeader @bar-click="refDrawerOpen = !refDrawerOpen" />
    <div class="grid lg:grid-cols-[auto_1fr]">
      <LayoutSidebar />
      <div class="relative bg-white dark:bg-zinc-800">
        <LayoutTabbar />
        <slot></slot>
        <LayoutDrawerSidebar v-model="refDrawerOpen" />
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>
