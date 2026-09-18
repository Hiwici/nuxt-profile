<script setup lang="ts">
/** Props */
interface Props {
  text?: string
}
const props = withDefaults(defineProps<Props>(), {
  text: '',
})
</script>

<template>
  <object class="h-full w-full">
    <svg viewBox="0 0 400 100">
      <text
        x="0%"
        y="50%"
        text-anchor="start"
        dominant-baseline="middle"
        :stroke-width="2"
        :style="{ opacity: 1 }"
        class="svg-text"
      >
        {{ props.text }}
      </text>
    </svg>
  </object>
</template>
