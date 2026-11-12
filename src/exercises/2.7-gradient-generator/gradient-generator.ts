import { useClipboard } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, onBeforeMount, ref } from 'vue'

const DEFAULT_COLORS = ["#00c9ff", "#92fe9d"]
const DEFAULT_ANGLE = 90

export const useGradientGenerator = defineStore('gradient-generator', () => {
  const colors = ref<string[]>(DEFAULT_COLORS)
  const angle = ref(DEFAULT_ANGLE)
  const history = ref<Array<{ colors: string[]; angle: number}>>([])

  const background = computed<string>(() => {
    return `linear-gradient(${angle.value}deg, ${colors.value.join(",")})`
  })

  function saveColors () {
    const currentColors = colors.value.join(",")
    if(!history.value.some(({ colors }) => colors.join(",") === currentColors))
      history.value.push({
        colors: colors.value.slice(),
        angle: angle.value
      })
  }

  function addRandomColor() {
    colors.value.push(randomColor())
  }

  function randomize(steps = 2) {
    const newColors: string[] = []
    for(let i = 0; i < steps; i++) {
      newColors.push(randomColor())
    }
    colors.value = newColors
    angle.value = Math.floor(Math.random() * 360)
    saveColors()
  }

  function removeColor(index: number) {
    if(colors.value.length <= 2 || index >= colors.value.length) {
      return
    }

    colors.value.splice(index, 1)

  }

  const { copy } = useClipboard()

  function copyToClipboard() {
    copy(`background-image: ${background.value};`)
  }

  function resetHistory() {
    history.value.push({colors: colors.value, angle: angle.value})
  }

  function $reset() {
    saveColors()
    history.value = []
    colors.value = DEFAULT_COLORS
    angle.value = DEFAULT_ANGLE
    resetHistory()
  }

  onBeforeMount(() => {
    console.log("**_MOUNT")
    resetHistory()
  })

  return { colors, background, addRandomColor, removeColor, copyToClipboard, $reset, randomize, angle, saveColors, history }
})

/**
 * Utility function for generating a random color
 */
function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    // the input also does lowercase so this is more consistent
    .toLowerCase()
    .padStart(6, '0')}`
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGradientGenerator, import.meta.hot))
}
