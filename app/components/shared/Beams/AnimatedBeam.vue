<script setup lang="ts">
/** Types */
type AnimatedBeamProps = {
  // class?: string
  refContainer: HTMLElement
  refFrom: HTMLElement
  refTo: HTMLElement
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

/** Props */
const props = withDefaults(defineProps<AnimatedBeamProps>(), {
  curvature: 0,
  reverse: false,
  duration: Math.random() * 1 + 4,
  delay: 0,
  pathColor: 'gray',
  pathWidth: 2,
  pathOpacity: 0.2,
  gradientStartColor: '#FFAA40',
  gradientStopColor: '#9C40FF',
  startXOffset: 0,
  startYOffset: 0,
  endXOffset: 0,
  endYOffset: 0,
})

/** Data */
const id = 'beam-' + Math.random().toString(36).substring(2, 10)
let resizeObserver: ResizeObserver | undefined = undefined

/** Ref Properties */
const refIsVertical = ref(false)
const refIsRightToLeft = ref(false)
const refIsBottomToTop = ref(false)
const refPathD = ref('')
const refSvgDimensions = ref<{ width: number; height: number }>({
  width: 0,
  height: 0,
})
const unwatch = ref(false)

/** Computed Properties */
const computedX1 = computed(() => {
  const direction = props.reverse ? !refIsRightToLeft.value : refIsRightToLeft.value
  return direction ? '90%; -10%;' : '10%; 110%;'
})
const computedX2 = computed(() => {
  const direction = props.reverse ? !refIsRightToLeft.value : refIsRightToLeft.value
  return direction ? '100%; 0%;' : '0%; 100%;'
})
const computedY1 = computed(() => {
  const direction = props.reverse ? !refIsBottomToTop.value : refIsBottomToTop.value
  return direction ? '90%; -10%;' : '10%; 110%;'
})
const computedY2 = computed(() => {
  const direction = props.reverse ? !refIsBottomToTop.value : refIsBottomToTop.value
  return direction ? '100%; 0%;' : '0%; 100%;'
})

const stopEffect = watchEffect(effect)

/** Watchers */
watch(unwatch, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    stopEffect()
  }
})

/**
 * Effect to observe changes in the container and update the path accordingly.
 */
function effect() {
  if (resizeObserver == undefined && props.refContainer != null) {
    resizeObserver = new ResizeObserver(() => {
      updatePath()
    })
    resizeObserver.observe(props.refContainer)
    unwatch.value = true
  }
}

/**
 * Updates the SVG path data based on the positions of the reference elements.
 */
function updatePath() {
  if (props.refContainer && props.refFrom && props.refTo) {
    const containerRect = props.refContainer.getBoundingClientRect()
    const rectA = props.refFrom.getBoundingClientRect()
    const rectB = props.refTo.getBoundingClientRect()

    const svgWidth = containerRect.width
    const svgHeight = containerRect.height
    refSvgDimensions.value = { width: svgWidth, height: svgHeight }

    const startX = rectA.left - containerRect.left + rectA.width / 2 + (props.startXOffset ?? 0)
    const startY = rectA.top - containerRect.top + rectA.height / 2 + (props.startYOffset ?? 0)
    const endX = rectB.left - containerRect.left + rectB.width / 2 + (props.endXOffset ?? 0)
    const endY = rectB.top - containerRect.top + rectB.height / 2 + (props.endYOffset ?? 0)

    // Check if the light beam is in a vertical direction (the distance in the y-direction is greater than the distance in the x-direction).
    refIsVertical.value = Math.abs(endY - startY) > Math.abs(endX - startX)

    // Determine the animation direction based on the position relationship between the starting point and the endpoint
    refIsRightToLeft.value = endX < startX
    refIsBottomToTop.value = endY < startY

    const controlY = startY - (props.curvature ?? 0)
    const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
    refPathD.value = d
  }
}

/** onBeforeUnmount Hook */
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <svg
    fill="none"
    :width="refSvgDimensions.width"
    :height="refSvgDimensions.height"
    xmlns="http://www.w3.org/2000/svg"
    class="pointer-events-none absolute top-0 left-0 transform-gpu stroke-2"
    :viewBox="`0 0 ${refSvgDimensions.width} ${refSvgDimensions.height}`"
  >
    <path
      :d="refPathD"
      :stroke="pathColor"
      :stroke-width="pathWidth"
      :stroke-opacity="pathOpacity"
      stroke-linecap="round"
    />
    <path
      :d="refPathD"
      :stroke-width="pathWidth"
      :stroke="`url(#${id})`"
      stroke-opacity="1"
      stroke-linecap="round"
    />
    <defs>
      <linearGradient :id="id" gradientUnits="userSpaceOnUse" x1="0%" x2="0%" y1="0%" y2="0%">
        <stop :stop-color="gradientStartColor" stop-opacity="0" />
        <stop :stop-color="gradientStartColor" />
        <stop offset="32.5%" :stop-color="gradientStopColor" />
        <stop offset="100%" :stop-color="gradientStopColor" stop-opacity="0" />
        <animate
          v-if="!refIsVertical"
          attributeName="x1"
          :values="computedX1"
          :dur="`${duration}s`"
          keyTimes="0; 1"
          keySplines="0.16 1 0.3 1"
          calcMode="spline"
          repeatCount="indefinite"
        />
        <animate
          v-if="!refIsVertical"
          attributeName="x2"
          :values="computedX2"
          :dur="`${duration}s`"
          keyTimes="0; 1"
          keySplines="0.16 1 0.3 1"
          calcMode="spline"
          repeatCount="indefinite"
        />
        <animate
          v-if="refIsVertical"
          attributeName="y1"
          :values="computedY1"
          :dur="`${duration}s`"
          keyTimes="0; 1"
          keySplines="0.16 1 0.3 1"
          calcMode="spline"
          repeatCount="indefinite"
        />
        <animate
          v-if="refIsVertical"
          attributeName="y2"
          :values="computedY2"
          :dur="`${duration}s`"
          keyTimes="0; 1"
          keySplines="0.16 1 0.3 1"
          calcMode="spline"
          repeatCount="indefinite"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
