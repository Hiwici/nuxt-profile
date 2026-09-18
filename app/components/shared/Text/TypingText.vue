<script setup lang="ts">
/** Props */
interface Props {
  text: string
  duration?: number
  delay?: number
  as?: string
}
const props = withDefaults(defineProps<Props>(), {
  duration: 60,
  delay: 0,
  as: 'span',
})

/** Refs */
const displayedText = ref<string>('')
const started = ref<boolean>(false)
const startTimeoutId = ref<number | null>(null)
const typingEffectId = ref<number | null>(null)

/** Watcher */
watch(
  () => props.delay,
  (newValue: number) => {
    if (newValue > 0) {
      setDelayTimeout(newValue)
    } else {
      started.value = true
    }
  },
)

const setDelayTimeout = (delay: number) => {
  startTimeoutId.value = setTimeout(() => {
    started.value = true
  }, delay)
}

/** Lifecycle onMounted Hooks */
onMounted(() => {
  setDelayTimeout(props.delay)

  watch(
    [() => props.text, () => props.duration, () => started.value],
    () => {
      if (!started.value) return

      let substringIndex = 0
      typingEffectId.value = setInterval(() => {
        if (substringIndex < props.text.length) {
          displayedText.value += props.text[substringIndex]
          substringIndex++
        } else {
          if (typingEffectId.value) {
            clearInterval(typingEffectId.value)
          }
        }
      }, props.duration)
    },
    { immediate: true },
  )
})

onBeforeUnmount(() => {
  if (startTimeoutId.value) {
    clearTimeout(startTimeoutId.value)
  }
  if (typingEffectId.value) {
    clearInterval(typingEffectId.value)
  }
})
</script>

<template>
  <Motion as="span" class="text-primary tracking-tight">
    {{ displayedText }}
  </Motion>
</template>
