<script setup lang="ts">
/** Components */
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

/** Props */
interface Props {
  collapse?: boolean
  disableHoverEffect?: boolean
  active?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  collapse: false,
  disableHoverEffect: false,
  active: false,
})

/** Models */
const open = defineModel({
  type: Boolean,
  default: false,
})

/**
 * Handle open/close state of the sidebar item
 */
const handleOpen = () => {
  if (!props.collapse) return

  open.value = !open.value
}
</script>

<template>
  <div
    class="grid cursor-pointer grid-cols-[14px_16px_1fr] items-center gap-x-2 py-0.5"
    :class="{
      'hover:bg-gray-100 dark:hover:bg-zinc-700': !props.disableHoverEffect && !props.active,
      'bg-gray-200/80 dark:bg-zinc-600': props.active,
    }"
    @click="handleOpen"
  >
    <template v-if="props.collapse">
      <ChevronRightIcon v-if="!open" class="size-3.5" />
      <ChevronDownIcon v-else class="size-3.5" />
    </template>
    <template v-else>
      <div class="size-3.5" />
    </template>
    <slot />
  </div>
</template>
