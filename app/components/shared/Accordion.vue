<script setup lang="ts">
/** Props */
interface Props {
  open?: boolean
  custom?: boolean
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  open: false,
  custom: false,
  title: '',
})

/** Shallow Ref Properties */
const templateRefAccordion = useTemplateRef<HTMLDivElement | null>('accordion')

/** Ref Properties */
const refAccordionOpen = ref(props.open)

/** Watchers */
watch(
  () => props.open,
  (newValue) => {
    refAccordionOpen.value = newValue
  },
)
watch(refAccordionOpen, (newValue) => {
  setMaxHeight()
})

const setMaxHeight = () => {
  const accordion = templateRefAccordion.value
  if (accordion) {
    const content = accordion.querySelector('.accordion') as HTMLElement
    if (content) {
      content.style.maxHeight = refAccordionOpen.value ? `${content.scrollHeight}px` : '0'
    }
  }
}

/** onMounted Hook */
onMounted(() => {
  setMaxHeight()
})
</script>

<template>
  <div ref="accordion" class="grid w-full" @click="refAccordionOpen = !refAccordionOpen">
    <slot name="title">
      <div>
        {{ title }}
      </div>
    </slot>

    <div class="accordion">
      <slot />
    </div>
  </div>
</template>
