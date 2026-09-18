type Tab = {
  key: string
  label: string
  view: ViewKey
  extension: string
  breadcrumbs: string[]
  icon: string
  scroll: {
    x: number
    y: number
  }
  mode: 'code' | 'preview'
}

/**
 * A Pinia store for managing tab information.
 *
 * @store useTabStore
 */
export const useTabStore = defineStore('tab', {
  state: () => ({
    current: {} as Tab,
    activate: [] as Tab[],
  }),
  getters: {
    /**
     * Get the current tab key.
     */
    getCurrent: (state) => state.current,

    /**
     * Get the current display label.
     */
    getCurrentModeLabel: (state) => (state.current.mode === 'code' ? 'Code View' : 'Preview'),

    /**
     * Get the current mode visibility.
     */
    getCurrentModeIsVisible: (state) => ['vue'].includes(state.current.extension),

    /**
     * Get the list of activated tabs.
     */
    getActivatedTabs: (state) => state.activate,

    /**
     * Get the tab options.
     */
    getTabOptions: () => tabOptions,

    /**
     * Get a tab option by its key.
     */
    getTabOptionByKey: () => (key: string) => tabOptions.find((t) => t.key === key),
  },
  actions: {
    /**
     * Set the current tab key.
     *
     * @param key The key of the tab to set as current.
     */
    setCurrentTab(key: string) {
      this.current = tabOptions.find((t) => t.key === key) || ({} as Tab)
    },

    /**
     * Add a tab to the activated tabs list.
     *
     * @param tab The tab to add.
     */
    addActivatedTab(key: String) {
      const tab = tabOptions.find((t) => t.key === key)
      if (!tab) return

      // Check if the tab is already activated
      if (!this.activate.some((t) => t.key === key)) {
        this.activate.push(tab)
      }
    },

    /**
     * Remove a tab from the activated tabs list.
     *
     * @param key The key of the tab to remove.
     */
    removeActivatedTab(key: string) {
      this.activate = this.activate.filter((t) => t.key !== key)
      if (this.activate.length === 0) {
        // If no tabs are activated, reset current to an empty state
        this.current = {} as Tab
        return
      }

      if (this.current.key === key) {
        // If the removed tab was the current tab, reset current to the first activated tab
        this.current = this.activate[0] || ({} as Tab)
      }
    },

    /**
     * Switch the display type of the current tab.
     */
    switchCurrentDisplayType() {
      this.current.mode = this.current.mode === 'code' ? 'preview' : 'code'
    },
  },
})

const tabOptions: Tab[] = [
  {
    key: 'app',
    label: 'App.vue',
    view: 'AppView',
    extension: 'vue',
    breadcrumbs: ['app', 'App.vue'],
    icon: 'vue',
    scroll: {
      x: 0,
      y: 0,
    },
    mode: 'preview',
  },
  {
    key: 'information',
    label: 'Information.vue',
    view: 'InformationView',
    extension: 'vue',
    breadcrumbs: ['app', 'pages', 'Information.vue'],
    icon: 'vue',
    scroll: {
      x: 0,
      y: 0,
    },
    mode: 'preview',
  },
  {
    key: 'skills',
    label: 'Skills.vue',
    view: 'SkillsView',
    extension: 'vue',
    breadcrumbs: ['app', 'pages', 'Skills.vue'],
    icon: 'vue',
    scroll: {
      x: 0,
      y: 0,
    },
    mode: 'preview',
  },
  {
    key: 'env',
    label: '.env',
    view: 'EnvView',
    extension: 'env',
    breadcrumbs: ['.env'],
    icon: 'config',
    scroll: {
      x: 0,
      y: 0,
    },
    mode: 'code',
  },
  {
    key: 'gitignore',
    label: '.gitignore',
    view: 'GitignoreView',
    extension: 'gitignore',
    breadcrumbs: ['.gitignore'],
    icon: 'git',
    scroll: {
      x: 0,
      y: 0,
    },
    mode: 'code',
  },
  {
    key: 'package',
    label: 'package.json',
    view: 'PackageJsonView',
    extension: 'json',
    breadcrumbs: ['package.json'],
    icon: 'npm',
    scroll: {
      x: 0,
      y: 0,
    },
    mode: 'code',
  },
  {
    key: 'readme',
    label: 'README.md',
    view: 'ReadmeView',
    extension: 'md',
    breadcrumbs: ['README.md'],
    icon: 'markdown',
    scroll: {
      x: 0,
      y: 0,
    },
    mode: 'code',
  },
]
