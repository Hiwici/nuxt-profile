/**
 * A Pinia store for managing the theme of the application.
 *
 * @store useThemeStore
 *
 * @remarks
 * This store manages the theme of the application. It provides getters for
 * retrieving the current theme and checking if it is dark. It also provides
 * actions for setting and toggling the theme.
 *
 * @state
 * @property {string} theme - The current theme of the application. Defaults to 'light'.
 *
 * @getters
 * @method getTheme - Returns the current theme.
 * @method isDark - Returns true if the current theme is 'dark', otherwise false.
 *
 * @actions
 * @method setTheme - Sets the theme of the application.
 * @param {string} theme - The theme to set. Can be either 'light' or 'dark'.
 *
 * @method toggleTheme - Toggles the theme of the application between 'light' and 'dark'.
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    // The default theme is 'light'
    theme: 'light',
    loaded: false,
  }),
  getters: {
    getTheme: (state) => state.theme,
    isDarkMode: (state) => state.theme === 'dark',
  },
  actions: {
    initTheme() {
      // const savedTheme = localStorage.getItem('hiwici-theme')
      const savedTheme = useCookie('hiwici-theme').value
      this.theme = savedTheme || this.detectSystemTheme()
      document.documentElement.setAttribute('data-theme', this.theme)
      this.loaded = true
    },

    detectSystemTheme() {
      const prefersDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    },

    /**
     * Sets the theme of the application.
     *
     * @param {string} theme - The theme to set.
     */
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      document.documentElement.setAttribute('data-theme', theme)
      // localStorage.setItem('hiwici-theme', theme)
      useCookie('hiwici-theme').value = theme
    },
  },
})
