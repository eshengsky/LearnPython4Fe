<template>
  <div 
    ref="triggerRef"
    class="tooltip-container" 
    @mouseenter="handleMouseEnter" 
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
  
  <Teleport to="body">
    <div 
      v-if="show" 
      ref="tooltipRef"
      class="tooltip-content"
      :class="`tooltip-${finalPlacement}`"
      :style="tooltipStyle"
    >
      {{ content }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

interface Props {
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 
             'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' |
             'left-start' | 'left-end' | 'right-start' | 'right-end'
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom'
})

const show = ref(false)
const triggerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const position = ref({ x: 0, y: 0 })
const finalPlacement = ref(props.placement)

const handleMouseEnter = async () => {
  show.value = true
  await nextTick()
  updatePosition()
}

const handleMouseLeave = () => {
  show.value = false
}

const updatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return
  
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  let { placement } = props
  let x = 0, y = 0
  
  // 计算基础位置
  const calculatePosition = (pos: string) => {
    switch (pos) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2
        y = triggerRect.top - 8
        break
      case 'top-start':
        x = triggerRect.left
        y = triggerRect.top - 8
        break
      case 'top-end':
        x = triggerRect.right
        y = triggerRect.top - 8
        break
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2
        y = triggerRect.bottom + 8
        break
      case 'bottom-start':
        x = triggerRect.left
        y = triggerRect.bottom + 8
        break
      case 'bottom-end':
        x = triggerRect.right
        y = triggerRect.bottom + 8
        break
      case 'left':
        x = triggerRect.left - 8
        y = triggerRect.top + triggerRect.height / 2
        break
      case 'left-start':
        x = triggerRect.left - 8
        y = triggerRect.top
        break
      case 'left-end':
        x = triggerRect.left - 8
        y = triggerRect.bottom
        break
      case 'right':
        x = triggerRect.right + 8
        y = triggerRect.top + triggerRect.height / 2
        break
      case 'right-start':
        x = triggerRect.right + 8
        y = triggerRect.top
        break
      case 'right-end':
        x = triggerRect.right + 8
        y = triggerRect.bottom
        break
    }
    return { x, y }
  }
  
  // 计算初始位置
  const initialPos = calculatePosition(placement)
  x = initialPos.x
  y = initialPos.y
  
  // 边界检测和自动调整
  const adjustedPosition = adjustForBoundaries(x, y, tooltipRect, placement)
  
  position.value = adjustedPosition.position
  finalPlacement.value = adjustedPosition.placement
}

const adjustForBoundaries = (x: number, y: number, tooltipRect: DOMRect, placement: NonNullable<Props['placement']>) => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const margin = 16 // 离边界的最小距离
  
  let adjustedX = x
  let adjustedY = y
  let adjustedPlacement: NonNullable<Props['placement']> = placement
  
  // 水平方向调整
  if (placement.includes('bottom') || placement.includes('top')) {
    if (placement.endsWith('-start')) {
      // start 对齐，检查右边界
      if (adjustedX + tooltipRect.width > viewportWidth - margin) {
        adjustedX = viewportWidth - tooltipRect.width - margin
      }
    } else if (placement.endsWith('-end')) {
      // end 对齐，检查左边界
      if (adjustedX - tooltipRect.width < margin) {
        adjustedX = margin + tooltipRect.width
      }
    } else {
      // center 对齐，检查两边
      if (adjustedX - tooltipRect.width / 2 < margin) {
        adjustedX = margin + tooltipRect.width / 2
      } else if (adjustedX + tooltipRect.width / 2 > viewportWidth - margin) {
        adjustedX = viewportWidth - margin - tooltipRect.width / 2
      }
    }
  }
  
  // 垂直方向调整
  if (placement.includes('left') || placement.includes('right')) {
    if (placement.endsWith('-start')) {
      // start 对齐，检查下边界
      if (adjustedY + tooltipRect.height > viewportHeight - margin) {
        adjustedY = viewportHeight - tooltipRect.height - margin
      }
    } else if (placement.endsWith('-end')) {
      // end 对齐，检查上边界
      if (adjustedY - tooltipRect.height < margin) {
        adjustedY = margin + tooltipRect.height
      }
    } else {
      // center 对齐，检查上下
      if (adjustedY - tooltipRect.height / 2 < margin) {
        adjustedY = margin + tooltipRect.height / 2
      } else if (adjustedY + tooltipRect.height / 2 > viewportHeight - margin) {
        adjustedY = viewportHeight - margin - tooltipRect.height / 2
      }
    }
  }
  
  // 顶部/底部tooltip的垂直边界检测
  if (placement.includes('top') && adjustedY - tooltipRect.height < margin) {
    // 上方空间不足，改为底部显示
    const triggerRect = triggerRef.value!.getBoundingClientRect()
    adjustedY = triggerRect.bottom + 8
    adjustedPlacement = placement.replace('top', 'bottom') as typeof placement
  } else if (placement.includes('bottom') && adjustedY + tooltipRect.height > viewportHeight - margin) {
    // 下方空间不足，改为顶部显示
    const triggerRect = triggerRef.value!.getBoundingClientRect()
    adjustedY = triggerRect.top - 8
    adjustedPlacement = placement.replace('bottom', 'top') as typeof placement
  }
  
  return {
    position: { x: adjustedX, y: adjustedY },
    placement: adjustedPlacement
  }
}

const tooltipStyle = computed(() => {
  const { x, y } = position.value
  
  return {
    position: 'fixed' as const,
    left: `${x}px`,
    top: `${y}px`
  } as const
})
</script>

<style scoped>
.tooltip-container {
  display: inline-block;
}

.tooltip-content {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.2;
  white-space: nowrap;
  z-index: 9999;
  pointer-events: none;
}

/* 基础位置变换 */
.tooltip-top {
  transform: translate(-50%, -100%);
}

.tooltip-bottom {
  transform: translate(-50%, 0%);
}

.tooltip-left {
  transform: translate(-100%, -50%);
}

.tooltip-right {
  transform: translate(0%, -50%);
}

/* start 对齐 (左对齐/上对齐) */
.tooltip-top-start {
  transform: translate(0%, -100%);
}

.tooltip-bottom-start {
  transform: translate(0%, 0%);
}

.tooltip-left-start {
  transform: translate(-100%, 0%);
}

.tooltip-right-start {
  transform: translate(0%, 0%);
}

/* end 对齐 (右对齐/下对齐) */
.tooltip-top-end {
  transform: translate(-100%, -100%);
}

.tooltip-bottom-end {
  transform: translate(-100%, 0%);
}

.tooltip-left-end {
  transform: translate(-100%, -100%);
}

.tooltip-right-end {
  transform: translate(0%, -100%);
}

/* 暗色主题适配 */
html.dark .tooltip-content {
  background: rgba(255, 255, 255, 0.7);
  color: #1f2937;
}

/* 移动端隐藏 tooltip */
@media (max-width: 768px) {
  .tooltip-content {
    display: none !important;
  }
}
</style> 