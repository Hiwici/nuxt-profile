<script setup lang="ts">
/** Views - pages */
import AppView from '~/views/pages/AppView.vue'
import IndexView from '~/views/pages/IndexView.vue'
import InformationView from '~/views/pages/InformationView.vue'
import SkillsView from '~/views/pages/SkillsView.vue'

/** Views - root */
import EnvView from '~/views/EnvView.vue'
import GitignoreView from '~/views/GitignoreView.vue'
import PackageJsonView from '~/views/PackageJsonView.vue'
import ReadmeView from '~/views/ReadmeView.vue'

/** Data */
const viewMap = {
  AppView: AppView,
  EnvView: EnvView,
  GitignoreView: GitignoreView,
  IndexView: IndexView,
  PackageJsonView: PackageJsonView,
  ReadmeView: ReadmeView,
  SkillsView: SkillsView,
  InformationView: InformationView,
}

/** Stores */
const tabStore = useTabStore()

/**
 * Get the view component based on the key.
 * @param key
 */
const getView = (key: ViewKey) => {
  return viewMap[key]
}
</script>

<template>
  <template v-if="!tabStore.getActivatedTabs.length">
    <IndexView />
  </template>
  <template v-else>
    <component
      v-for="tab in tabStore.getActivatedTabs"
      :key="tab.key"
      :is="getView(tab.view)"
      :class="[tabStore.current.key === tab.key ? 'block' : 'hidden']"
    />
  </template>
</template>
