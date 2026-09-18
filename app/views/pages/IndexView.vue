<script setup lang="ts">
import { Motion } from 'motion-v'

/** Components */
import SvgText from '~/components/shared/Text/SvgText.vue'
import FlipWords from '~/components/shared/Text/FlipWords.vue'
import AuroraBackground from '~/components/shared/Background/AuroraBackground.vue'

/** Store */
const infoStore = useInfoStore()
</script>

<template>
  <div class="relative h-full">
    <div class="absolute inset-0 z-0 overflow-hidden">
      <AuroraBackground />
    </div>
    <div class="relative z-50 mx-4 grid grid-rows-2 lg:mx-6 lg:flex lg:flex-col">
      <SvgText :text="infoStore.getUpperCaseName" />
      <div class="grid py-2 lg:ml-4">
        <Motion
          as="div"
          :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
          :animate="{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }"
          :transition="{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }"
        >
          <div class="text-xl">
            <span>{{ infoStore.getDescribing.prefix }}</span>
            <FlipWords
              class="[&_.flip-word]:text-2xl"
              :words="infoStore.getDescribing.words"
              :duration="3000"
            />
          </div>
          <div class="text-xl">
            {{ infoStore.getDescribing.suffix }}
          </div>
        </Motion>
      </div>
    </div>
  </div>
</template>
