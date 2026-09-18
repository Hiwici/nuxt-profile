<script setup lang="ts">
/** Components */
import SvgIcon from '~/components/shared/Icons/SvgIcon.vue'
import { XMarkIcon, ChevronRightIcon, PlusIcon } from '@heroicons/vue/24/outline'

/** Stores */
const tabStore = useTabStore()

/**
 * Handle tab removal.
 * @param key The key of the tab to remove.
 */
const handleTabRemove = (key: string) => {
  tabStore.removeActivatedTab(key)
}
</script>

<template>
  <div v-if="tabStore.getActivatedTabs.length" class="grid w-full">
    <div class="theme-bg scrollbar-hidden flex h-8 max-w-full overflow-hidden overflow-x-auto">
      <div
        v-for="tab in tabStore.getActivatedTabs"
        :key="'tab-' + tab.key"
        class="group/tab text-caption-2 relative grid cursor-pointer grid-cols-[16px_1fr_16px] items-center gap-x-1 border-r border-b border-r-gray-300 px-3 py-2 hover:bg-white dark:border-r-gray-600 dark:hover:bg-zinc-700"
        :class="{
          'border-t border-t-blue-500 border-b-gray-200 bg-white dark:border-b-gray-500 dark:bg-zinc-700':
            tabStore.getCurrent.key === tab.key,
          'border-b-gray-300 dark:border-b-gray-600': tabStore.getCurrent.key !== tab.key,
        }"
        @click="tabStore.setCurrentTab(tab.key)"
      >
        <SvgIcon :name="tab.icon" :size="16" />
        <div class="pl-1">{{ tab.label }}</div>
        <div
          class="z-20 grid h-full w-full cursor-pointer items-center justify-center rounded-sm group-hover/tab:visible hover:bg-gray-200 dark:hover:bg-zinc-600"
          :class="[tabStore.getCurrent.key === tab.key ? 'visible' : 'invisible']"
        >
          <XMarkIcon class="size-3" @click.stop="handleTabRemove(tab.key)" />
        </div>
      </div>
      <div class="theme-border flex h-full w-full border-b">
        <div class="text-caption-2 ml-auto flex items-center gap-x-2 px-2 py-1">
          <div
            v-if="tabStore.getCurrentModeIsVisible"
            class="relative inset-0 grid h-full min-w-20 cursor-pointer border border-dashed border-sky-300 bg-sky-50 px-2 hover:bg-sky-100 dark:border-sky-500 dark:bg-sky-950 dark:hover:bg-sky-800 [&_svg]:text-sky-400 dark:[&_svg]:text-sky-600"
            @click="tabStore.switchCurrentDisplayType"
          >
            <PlusIcon class="absolute top-[-4.5px] left-[-4.5px] size-2 stroke-2" />
            <PlusIcon class="absolute top-[-4.5px] right-[-4.5px] size-2 stroke-2" />
            <PlusIcon class="absolute bottom-[-4.5px] left-[-4.5px] size-2 stroke-2" />
            <PlusIcon class="absolute right-[-4.5px] bottom-[-4.5px] size-2 stroke-2" />
            <div class="m-auto text-sky-800 dark:text-sky-200">
              {{ tabStore.getCurrentModeLabel }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="tabStore.getCurrent.mode !== 'preview'"
      class="text-caption-2 flex h-6 w-full px-3 py-1"
      :class="{
        shadow: tabStore.getCurrent.scroll.y > 0,
      }"
    >
      <div
        v-for="(breadcrumb, index) in tabStore.getCurrent.breadcrumbs"
        :key="'breadcrumb-' + breadcrumb"
        class="flex items-center"
      >
        <SvgIcon
          v-if="index === tabStore.getCurrent.breadcrumbs.length - 1"
          class="mr-1"
          :name="tabStore.getCurrent.icon"
          :size="16"
        />
        <div>{{ breadcrumb }}</div>
        <ChevronRightIcon
          v-if="index < tabStore.getCurrent.breadcrumbs.length - 1"
          class="mx-1 size-3"
        />
      </div>
    </div>
  </div>
</template>
