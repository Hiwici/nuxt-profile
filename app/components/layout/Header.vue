<script setup lang="ts">
/** Components */
import { MagnifyingGlassIcon, Bars2Icon } from '@heroicons/vue/24/outline'
import ThemeToggle from '../shared/Toggle/ThemeToggle.vue'

/** Emits */
const emit = defineEmits(['barClick'])
</script>

<template>
  <div class="theme-bg theme-border grid h-8 grid-cols-[auto_1fr_auto] items-center border-b px-3">
    <div class="hidden flex-row gap-x-2 lg:flex">
      <div class="h-3 w-3 rounded-full bg-red-500" />
      <div class="h-3 w-3 rounded-full bg-yellow-500" />
      <div class="h-3 w-3 rounded-full bg-green-500" />
    </div>
    <div
      class="grid size-6 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-200 lg:hidden dark:hover:bg-zinc-600"
      @click="$emit('barClick')"
    >
      <Bars2Icon class="size-5 font-bold" />
    </div>
    <div class="grid h-8 justify-center p-1">
      <div
        class="text-caption-1 theme-border flex w-60 items-center justify-center gap-x-1 rounded-sm border bg-gray-100 lg:w-100 dark:bg-zinc-700"
      >
        <MagnifyingGlassIcon class="size-4 text-gray-500 dark:text-gray-400" />
        leohu
      </div>
    </div>
    <ThemeToggle class="ml-auto" />
  </div>
</template>
