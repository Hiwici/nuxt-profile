# Hiwici Nuxt Profile

A personal profile website built with Nuxt.  

## What this repository does

This project delivers a frontend portfolio/profile experience with:

- A landing hero view with animated text and background effects
- A tab-driven interface to switch between multiple profile views
- Code/preview-style presentation for selected sections
- Theme support and responsive layout for desktop and mobile
- Static-site generation support for GitHub Pages deployment

## Tech stack

- Nuxt 4
- Vue 3 + Vue Router
- Tailwind CSS 4 (via Vite plugin)
- Pinia (state management)
- motion-v (animation)
- VueUse utilities

## Project structure

```text
app/
 | assets/          Global styles and visual assets
 | components/      Reusable UI building blocks (layout + shared)
 | layouts/         App shell (header, sidebar, footer, drawer)
 | pages/           Route pages (entry route at app/pages/index.vue)
 | stores/          Pinia stores (tabs, theme, profile info)
 | utils/           Utility functions and helpers
 | views/           Rendered content views shown in tab panels
public/          Static files (icons, images, robots.txt)
shared/          Shared resources and assets
```

## License

See the `LICENSE` file for details.
