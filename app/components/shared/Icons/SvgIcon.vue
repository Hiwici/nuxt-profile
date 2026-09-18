<script setup lang="ts">
/** Props */
/** Props */
interface Props {
  name: string
  size?: number
  ariaLabel?: string | null
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 24,
  ariaLabel: null,
})

/** Ref Properties */
const refIcon = ref('')

/** onBeforeMount Hook */
onBeforeMount(() => {
  loadIcon(props.name)
})

/** Watchers */
watch(
  () => props.name,
  (newName) => {
    loadIcon(newName)
  },
  { immediate: false },
)

/**
 * Function to load the SVG icon dynamically
 *
 * @param iconName Name of the icon to load
 */
const loadIcon = async (iconName: string) => {
  try {
    // Dynamic import of SVG file
    const svgModule = await import(`~/assets/svgs/${iconName}.svg?raw`)
    refIcon.value = svgModule.default
  } catch (error) {
    console.warn(`Icon "${iconName}" not found`)
    refIcon.value = ''
  }
}
</script>

<template>
  <div
    v-if="refIcon"
    v-html="refIcon"
    class="inline-block"
    :style="{ width: size + 'px', height: size + 'px' }"
    :aria-label="ariaLabel || name + '-icon'"
  />
</template>
