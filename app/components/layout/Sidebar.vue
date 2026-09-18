<script setup lang="ts">
/** Components */
import SidebarItem from '../shared/SidebarItem.vue'
import SvgIcon from '../shared/Icons/SvgIcon.vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'

/** Stores */
const tabStore = useTabStore()

/** Ref Properties */
const refProfileOpen = ref(true)
const refAppOpen = ref(true)
const refAppPageOpen = ref(true)

/**
 * Handle sidebar item click.
 */
const handleSidebarItemClick = (key: string) => {
  tabStore.addActivatedTab(key)
  tabStore.setCurrentTab(key)
}

/**
 * Check if the current tab is inside the given sidebar keys.
 */
const isCurrentInsideSidebar = (keys: string[]) => {
  return keys.includes(tabStore.getCurrent.key)
}
</script>

<template>
  <div
    class="theme-bg theme-border hidden h-full w-60 flex-col overflow-y-auto border-r px-3 py-2 lg:flex"
  >
    <div class="text-caption-2 ml-5 flex h-4 items-center justify-between">
      <div>EXPLORER</div>
      <EllipsisHorizontalIcon class="size-4" />
    </div>

    <div class="group mt-4">
      <SidebarItem v-model="refProfileOpen" class="text-caption-2" collapse disable-hover-effect>
        <div>PROFILE</div>
      </SidebarItem>
      <template v-if="refProfileOpen">
        <div class="text-caption-1 relative">
          <SidebarItem v-model="refAppOpen" class="pl-3" collapse>
            <SvgIcon name="folder" :size="16" />
            <div>app</div>
          </SidebarItem>
          <div v-if="refAppOpen" class="relative">
            <div
              class="before:absolute before:left-4.5 before:z-50 before:h-full"
              :class="[
                isCurrentInsideSidebar(['app'])
                  ? 'before:border-l before:border-gray-400 dark:before:border-gray-500'
                  : 'before:border-gray-300 group-hover:before:border-l dark:before:border-gray-600',
              ]"
            />
            <SidebarItem v-model="refAppPageOpen" collapse class="pl-6">
              <SvgIcon name="folder" :size="16" />
              <div>pages</div>
            </SidebarItem>
            <div v-if="refAppPageOpen" class="relative *:pl-9">
              <div
                class="before:absolute before:left-7.5 before:z-50 before:h-full"
                :class="[
                  isCurrentInsideSidebar(['information', 'skills'])
                    ? 'before:border-l before:border-gray-400 dark:before:border-gray-500'
                    : 'before:border-gray-300 group-hover:before:border-l dark:before:border-gray-600',
                ]"
              />
              <SidebarItem
                @click="handleSidebarItemClick('information')"
                :active="tabStore.getCurrent.key == 'information'"
              >
                <SvgIcon name="vue" :size="16" />
                <div>{{ tabStore.getTabOptionByKey('information')?.label }}</div>
              </SidebarItem>
              <SidebarItem
                @click="handleSidebarItemClick('skills')"
                :active="tabStore.getCurrent.key == 'skills'"
              >
                <SvgIcon name="vue" :size="16" />
                <div>{{ tabStore.getTabOptionByKey('skills')?.label }}</div>
              </SidebarItem>
            </div>
            <SidebarItem
              @click="handleSidebarItemClick('app')"
              class="pl-6"
              :active="tabStore.getCurrent.key == 'app'"
            >
              <SvgIcon name="vue" :size="16" />
              <div>{{ tabStore.getTabOptionByKey('app')?.label }}</div>
            </SidebarItem>
          </div>
        </div>
        <!-- Root Items -->
        <div class="text-caption-1 *:pl-3">
          <SidebarItem
            class="text-gray-500"
            @click="handleSidebarItemClick('env')"
            :active="tabStore.getCurrent.key == 'env'"
          >
            <SvgIcon name="config" :size="16" />
            <div>{{ tabStore.getTabOptionByKey('env')?.label }}</div>
          </SidebarItem>
          <SidebarItem
            @click="handleSidebarItemClick('gitignore')"
            :active="tabStore.getCurrent.key == 'gitignore'"
          >
            <SvgIcon name="git" :size="16" />
            <div>{{ tabStore.getTabOptionByKey('gitignore')?.label }}</div>
          </SidebarItem>
          <SidebarItem
            @click="handleSidebarItemClick('package')"
            :active="tabStore.getCurrent.key == 'package'"
          >
            <SvgIcon name="npm" :size="16" />
            <div>{{ tabStore.getTabOptionByKey('package')?.label }}</div>
          </SidebarItem>
          <SidebarItem
            @click="handleSidebarItemClick('readme')"
            :active="tabStore.getCurrent.key == 'readme'"
          >
            <SvgIcon name="markdown" :size="16" />
            <div>{{ tabStore.getTabOptionByKey('readme')?.label }}</div>
          </SidebarItem>
        </div>
      </template>
    </div>
  </div>
</template>
