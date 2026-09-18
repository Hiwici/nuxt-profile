<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <template v-if="error?.status == 404">
      <h1>Page Not Found</h1>
      <button
        class="mt-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        @click="handleError"
      >
        Go Home
      </button>
    </template>
    <template v-else>
      <h1>An unexpected error occurred</h1>
    </template>
  </div>
</template>
