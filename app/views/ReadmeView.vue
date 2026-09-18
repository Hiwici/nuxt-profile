<script setup lang="ts">
/** Components */
import ViewContainer from '~/components/shared/ViewContainer.vue'
import CodeContainer from '~/components/shared/Code/CodeContainer.vue'

/** Data */
const readmeTemplateCode = `
# Leo Hu Profile

This project is a personal profile website for Leo Hu, showcasing his skills, projects, and contact information.
It is built using modern web technologies to ensure a responsive and user-friendly experience.

## Architecture
- Nuxt4
- TypeScript
- Pinia
- Tailwind CSS
- Lodash

## Description
The \`pages\` folder contains the main view components for the profile website. 
Each file represents a distinct page or route in the application:

### AppView.vue: 
The root view that serves as the main layout or entry point for the app's pages.

### InformationView.vue: 
Displays detailed personal or professional information about Leo Hu.

### SkillsView.vue: 
Showcases Leo Hu's technical and professional skills.
`
</script>

<template>
  <ViewContainer>
    <CodeContainer :code="readmeTemplateCode" type="markdown" />
  </ViewContainer>
</template>
