<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
/** Components */
import DrawerSidebarItem from '../shared/DrawerSidebarItem.vue'
import SvgIcon from '../shared/Icons/SvgIcon.vue'

/** Stores */
const tabStore = useTabStore()

/** Models */
const model = defineModel()

/**
 * Handle sidebar item click.
 */
const handleSidebarItemClick = (key: string) => {
  tabStore.addActivatedTab(key)
  tabStore.setCurrentTab(key)
  model.value = false
}
</script>

<template>
  <transition name="sidebar-slide">
    <div
      v-if="model"
      class="theme-bg absolute inset-0 top-0 z-50 block overflow-hidden px-3 py-6 lg:hidden"
    >
      <div class="flex items-center justify-between px-3">
        <h1 class="font-black">Profile</h1>
        <div
          class="cursor-pointer rounded p-1 hover:bg-gray-200 dark:hover:bg-zinc-600"
          @click="model = false"
        >
          <XMarkIcon class="size-6" />
        </div>
      </div>
      <div class="h-[calc(100%-24px)] overflow-y-auto *:p-3">
        <h2 class="mt-4 font-bold">App</h2>
        <DrawerSidebarItem @click="handleSidebarItemClick('app')">
          <SvgIcon name="vue" :size="24" />
          <h3>App.vue</h3>
        </DrawerSidebarItem>
        <h2 class="mt-4 font-bold">App - Pages</h2>
        <DrawerSidebarItem @click="handleSidebarItemClick('information')">
          <SvgIcon name="vue" :size="24" />
          <h3>Information.vue</h3>
        </DrawerSidebarItem>
        <DrawerSidebarItem @click="handleSidebarItemClick('skills')">
          <SvgIcon name="vue" :size="24" />
          <h3>Skills.vue</h3>
        </DrawerSidebarItem>

        <h2 class="mt-4 font-bold">Config</h2>
        <DrawerSidebarItem @click="handleSidebarItemClick('env')">
          <SvgIcon name="config" :size="24" />
          <h3 class="text-gray-500">.env</h3>
        </DrawerSidebarItem>
        <DrawerSidebarItem @click="handleSidebarItemClick('gitignore')">
          <SvgIcon name="git" :size="24" />
          <h3>.gitignore</h3>
        </DrawerSidebarItem>
        <DrawerSidebarItem @click="handleSidebarItemClick('package')">
          <SvgIcon name="npm" :size="24" />
          <h3>package.json</h3>
        </DrawerSidebarItem>
        <DrawerSidebarItem @click="handleSidebarItemClick('readme')">
          <SvgIcon name="markdown" :size="24" />
          <h3>README.md</h3>
        </DrawerSidebarItem>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(-100%);
}
.sidebar-slide-enter-to,
.sidebar-slide-leave-from {
  transform: translateX(0);
}
</style>
