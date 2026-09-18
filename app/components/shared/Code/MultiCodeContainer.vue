<script setup lang="ts">
import _isEmpty from 'lodash/isEmpty'
import _forEach from 'lodash/forEach'
import _map from 'lodash/map'

/** Props */
interface Props {
  codes: { content: string; type: HighlightCodeType }[]
}
const props = withDefaults(defineProps<Props>(), {
  //
})

/** Ref Properties */
const refCodeLines = ref<string[]>([])

/** onBeforeMount Hook */
onBeforeMount(() => {
  _forEach(props.codes, (code) => {
    let splitCode = code.content.split('\n')
    if (!splitCode) return

    if (_isEmpty(splitCode[0])) {
      splitCode.shift() // Remove the first empty line if it exists
    }

    const lines = _map(splitCode, (line) => {
      return highlightedCode(line, code.type)
    })

    refCodeLines.value.push(...lines)
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
