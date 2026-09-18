<script setup lang="ts">
/** Components */
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

/** Stores */
const themeStore = useThemeStore()

/** Ref Properties */
const refDarkMode = ref(themeStore.isDarkMode)

/** Watchers */
watch(refDarkMode, (newValue, oldValue) => {
  themeStore.setTheme(newValue ? 'dark' : 'light')
})
</script>

<template>
  <label class="theme-toggle">
    <div class="moon">
      <MoonIcon class="animate-moon size-5 fill-sky-300 text-sky-300" />
    </div>
    <div class="sun">
      <SunIcon class="animate-sun size-5 fill-yellow-200 text-yellow-200" />
    </div>
    <input class="absolute h-0 w-0 opacity-0" type="checkbox" v-model="refDarkMode" />
    <div class="slider" />
  </label>
</template>
