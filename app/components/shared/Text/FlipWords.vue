<script setup lang="ts">
import _findIndex from 'lodash/findIndex'
import _forEach from 'lodash/forEach'

/** Interfaces */
interface FlipWord {
  key: string
  label: string
  color: string
}

/** Types */
interface Props {
  words: FlipWord[]
  duration?: number
}
const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
})

/** Emit */
defineEmits(['animationStart', 'animationComplete'])

/** Refs */
const word = ref<FlipWord>(props.words[0] || ({} as FlipWord))
const visible = ref<boolean>(true)
const timeout = ref<number | null>(null)

/** Lifecycle onMounted Hooks */
onMounted(() => {
  startTimeout()
})

/** Lifecycle onBeforeUnmount Hooks */
onBeforeUnmount(() => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
})

/** Watchers */
watch(visible, (newValue) => {
  if (newValue) {
    startTimeout()
  }
})

/** Computed */
const splitWords = computed(() => {
  return word.value.label.split(' ').map((val) => ({
    word: val,
    color: word.value.color,
    letters: val.split(''),
  }))

  // let words = []

  // _forEach(word.value, (item) => {
  //   const letters = item.label.split('').map((letter) => ({
  //     letter,
  //     key: `${item.key}-${letter}`,
  //   }))
  //   words.push({
  //     key: item.key,
  //     label: item.label,
  //     letters,
  //   })
  // })
})

const startAnimation = () => {
  visible.value = false

  setTimeout(() => {
    // const currentIndex = props.words.indexOf(word.value)
    const currentIndex = _findIndex(props.words, (item) => item.key === word.value.key)
    const nextWord = props.words[currentIndex + 1] || props.words[0]
    if (!nextWord) {
      return
    }
    word.value = nextWord
    visible.value = true
  }, 600)
}

const startTimeout = () => {
  timeout.value = setTimeout(() => {
    startAnimation()
  }, props.duration)
}
</script>

<template>
  <div class="relative inline-block px-2">
    <Transition
      enter-active-class="transition animate-flip-enter-word"
      leave-active-class="transition animate-flip-leave-word"
    >
      <div
        v-if="visible"
        class="flip-word relative z-10 inline-block text-left text-neutral-900 dark:text-neutral-100"
      >
        <template v-for="(word, index) in splitWords" :key="'flipword-' + word + '-' + index">
          <div
            class="animate-flip-fade-in-word inline-block whitespace-nowrap opacity-0 transition"
            :style="{
              animationDelay: `${index * 0.3}s`,
            }"
          >
            <div
              v-for="(letter, letterIndex) in word.letters"
              :key="word.word + letterIndex"
              class="animate-flip-fade-in-letter inline-block opacity-0 transition"
              :class="word.color"
              :style="{
                animationDelay: `${index * 0.3 + letterIndex * 0.05}s`,
              }"
            >
              {{ letter }}
            </div>
            <div class="inline-block">&nbsp;</div>
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>
