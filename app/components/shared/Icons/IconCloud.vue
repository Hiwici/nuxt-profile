<script setup lang="ts">
/** Interfaces */
interface IconPosition {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}
interface TargetRotation {
  startX: number
  startY: number
  x: number
  y: number
  distance: number
  startTime: number
  duration: number
}

/** Props */
interface Props {
  icons: string[]
}
const props = withDefaults(defineProps<Props>(), {
  icons: () => [],
})

/** Emits */
const emit = defineEmits(['click'])

/** Template References */
const templateRefCanvas = useTemplateRef('canvasRef')

/** Shallow Ref Properties */
const shallowRefIconCanvas = shallowRef<HTMLCanvasElement[]>([])

/** Ref References */
const refAnimationFrame = ref(0)
const refIconLoaded = ref<boolean[]>([])
const refIconPositions = ref<IconPosition[]>([])
const refIsDragging = ref(false)
const refRotation = ref({ x: 0, y: 0 })
const refLastMousePos = ref({ x: 0, y: 0 })
const refMousePos = ref({ x: 0, y: 0 })
const refTargetRotation = ref<TargetRotation | null>(null)

/** onMounted Hook */
onMounted(() => {
  const canvas = templateRefCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const dx = refMousePos.value.x - centerX
    const dy = refMousePos.value.y - centerY
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
    const distance = Math.sqrt(dx * dx + dy * dy)

    const speed = 0.003 + (distance / maxDistance) * 0.01

    if (refTargetRotation.value) {
      const { startX, startY, x: tx, y: ty, startTime, duration } = refTargetRotation.value
      const elapsed = performance.now() - startTime
      const progress = Math.min(1, elapsed / duration)
      const eased = easeOutCubic(progress)

      refRotation.value.x = startX + (tx - startX) * eased
      refRotation.value.y = startY + (ty - startY) * eased

      if (progress >= 1) {
        refTargetRotation.value = null
      }
    } else if (!refIsDragging.value) {
      refRotation.value.x += (dy / canvas.height) * speed
      refRotation.value.y += (dx / canvas.width) * speed
    }

    refIconPositions.value.forEach((icon, index) => {
      const cosX = Math.cos(refRotation.value.x)
      const sinX = Math.sin(refRotation.value.x)
      const cosY = Math.cos(refRotation.value.y)
      const sinY = Math.sin(refRotation.value.y)

      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      const scale = (rotatedZ + 200) / 300
      const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200))

      ctx.save()
      ctx.translate(centerX + rotatedX, centerY + rotatedY)
      ctx.scale(scale, scale)
      ctx.globalAlpha = opacity

      if (shallowRefIconCanvas.value[index] && refIconLoaded.value[index]) {
        ctx.drawImage(shallowRefIconCanvas.value[index], -20, -20, 50, 50)
      }
      ctx.restore()
    })

    refAnimationFrame.value = requestAnimationFrame(animate)
  }

  refAnimationFrame.value = requestAnimationFrame(animate)
})

/** onBeforeUnmount Hook */
onBeforeUnmount(() => {
  if (refAnimationFrame.value) {
    cancelAnimationFrame(refAnimationFrame.value)
  }
})

watchEffect(() => {
  if (!props.icons) return
  refIconLoaded.value = new Array(props.icons.length).fill(false)

  const newImageCanvases = props.icons.map((name, idx) => {
    const offscreen = document.createElement('canvas')
    offscreen.width = 50
    offscreen.height = 50
    const offCtx = offscreen.getContext('2d')
    if (!offCtx) return offscreen

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/icons/' + name + '.png'
    img.onload = () => {
      offCtx.clearRect(0, 0, offscreen.width, offscreen.height)

      // circular clipping
      offCtx.beginPath()
      offCtx.arc(50, 50, 100, 0, Math.PI * 2)
      offCtx.closePath()
      offCtx.clip()

      // draw the image
      offCtx.drawImage(img, 0, 0, 50, 50)
      refIconLoaded.value[idx] = true
    }

    return offscreen
  })

  shallowRefIconCanvas.value = newImageCanvases
})

watchEffect(() => {
  const count = props.icons?.length || 0
  if (count === 0) {
    refIconPositions.value = []
    return
  }

  const newPositions = []
  const offset = 2 / count
  const increment = Math.PI * (3 - Math.sqrt(5)) // ~2.3999632

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2
    const r = Math.sqrt(1 - y * y)
    const phi = i * increment
    const x = Math.cos(phi) * r
    const z = Math.sin(phi) * r

    newPositions.push({
      x: x * 100,
      y: y * 100,
      z: z * 100,
      scale: 1,
      opacity: 1,
      id: i,
    })
  }
  refIconPositions.value = newPositions
})

const easeOutCubic = (time: number) => {
  return 1 - (1 - time) ** 3
}

const handleMouseDown = (event: MouseEvent) => {
  const canvas = templateRefCanvas.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  refIconPositions.value.forEach((icon) => {
    const cosX = Math.cos(refRotation.value.x)
    const sinX = Math.sin(refRotation.value.x)
    const cosY = Math.cos(refRotation.value.y)
    const sinY = Math.sin(refRotation.value.y)

    const rotatedX = icon.x * cosY - icon.z * sinY
    const rotatedZ = icon.x * sinY + icon.z * cosY
    const rotatedY = icon.y * cosX + rotatedZ * sinX

    const screenX = canvas.width / 2 + rotatedX
    const screenY = canvas.height / 2 + rotatedY

    const scale = (rotatedZ + 200) / 300
    const radius = 20 * scale
    const dx = x - screenX
    const dy = y - screenY

    if (dx * dx + dy * dy < radius * radius) {
      const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z))
      const targetY = Math.atan2(icon.x, icon.z)
      const currentX = refRotation.value.x
      const currentY = refRotation.value.y
      const distance = Math.sqrt((targetX - currentX) ** 2 + (targetY - currentY) ** 2)

      const duration = Math.min(2000, Math.max(800, distance * 1000))
      refTargetRotation.value = {
        x: targetX,
        y: targetY,
        startX: currentX,
        startY: currentY,
        distance,
        startTime: performance.now(),
        duration,
      }

      emit('click', props.icons[icon.id])
      return
    }
  })

  refIsDragging.value = true
  refLastMousePos.value.x = event.clientX
  refLastMousePos.value.y = event.clientY
}

const handleMouseUp = () => {
  refIsDragging.value = false
}

const handleMouseMove = (event: MouseEvent) => {
  const canvas = templateRefCanvas.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  refMousePos.value.x = event.clientX - rect.left
  refMousePos.value.y = event.clientY - rect.top

  if (refIsDragging.value) {
    const deltaX = event.clientX - refLastMousePos.value.x
    const deltaY = event.clientY - refLastMousePos.value.y

    refRotation.value.x += deltaY * 0.002
    refRotation.value.y += deltaX * 0.002

    refLastMousePos.value.x = event.clientX
    refLastMousePos.value.y = event.clientY
  }
}
</script>

<template>
  <canvas
    ref="canvasRef"
    :width="300"
    :height="300"
    class="rounded-lg"
    role="img"
    aria-label="Interactive 3D Image Cloud"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  />
</template>
