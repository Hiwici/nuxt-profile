<script setup lang="ts">
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'

/** Props */
interface Props {
  code: string
  type: HighlightCodeType
}
const props = withDefaults(defineProps<Props>(), {
  //
})

/** Ref Properties */
const refCodeLines = ref<string[]>([])

/** onBeforeMount Hook */
onBeforeMount(() => {
  let splitCode = props.code.split('\n')
  if (!splitCode) return

  if (_isEmpty(splitCode[0])) {
    splitCode.shift() // Remove the first empty line if it exists
  }

  refCodeLines.value = _map(splitCode, (line) => {
    return highlightedCode(line, props.type)
  })
})
</script>

<template>
  <div class="line-numbers text-caption-1 relative">
    <pre class="flex">
      <code class="flex flex-col grow shrink-0">
        <template v-for="codeLine in refCodeLines" :key="codeLine">
          <div class="line flex min-h-5"><div v-html="codeLine" /></div>
        </template>
      </code>
    </pre>
  </div>
</template>
