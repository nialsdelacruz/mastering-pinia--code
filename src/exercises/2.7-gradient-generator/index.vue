<script lang="ts" setup>
  import { computed } from 'vue';
import { useGradientGenerator } from './gradient-generator';

  const gradient = useGradientGenerator()

  const historyColor = computed<string>({
    get() { 
      return [gradient.angle, ...gradient.colors].join(",")
    },
    set(newGradient: string) {
      gradient.saveColors()
      const [newAngle, ...newColors] = newGradient.split(",")
      gradient.colors = newColors
      gradient.angle = Number(newAngle)
    }
  })
</script>
  
<template>
  <h1 class="mb-5">Gradient Generator</h1>

  <div class="my-2 space-x-1">
    <button data-test="btn-reset" @click="gradient.$reset()">Reset</button>
    <button data-test="btn-randomize" @click="gradient.randomize()">Randomize</button>
    <button data-test="btn-clipboard" @click="gradient.copyToClipboard()">Copy to Clipboard</button>
  </div>

  <label>
    <select v-model="historyColor">
      <option v-for="{ colors, angle } in gradient.history" :value="[angle, ...colors].join(',')">
        {{ colors.join(', ') }} / {{ angle }}
      </option>
    </select>
  </label>

  <div class="rounded gradient-preview"></div>

  <div class="flex py-1 my-2">
    <label class="flex items-center">
      <span>Angle: </span>
      <input v-model.number="gradient.angle" data-test="angle-value-range" class="mx-3" type="range" step="1" min="0" max="360"/>
    </label>
    <input v-model.number="gradient.angle" data-test="angle-value-number" type="number" min="0" max="360" />
  </div>

  <div class="flex flex-wrap">
    <!-- Display a swatch of each color in the gradient -->
    <div v-for="(color, i) in gradient.colors" class="flex flex-col items-center group">
      <input v-model="gradient.colors[i]" class="w-12 h-10 p-1 m-1" type="color"/>

      <!-- Should remove color when this button is clicked -->
      <button class="invisible w-5 h-5 p-0 group-hover:visible" data-test="btn-remove-color" title="Remove this color" :disabled="gradient.colors.length <= 2" @click="gradient.removeColor(i)">
        -
      </button>
    </div>

    <button class="w-12 h-10 p-1 m-1" data-test="btn-add-color" title="Add Color" @click="gradient.addRandomColor()">+</button>
  </div>
</template>

<style scoped>
.gradient-preview {
  aspect-ratio: 2 / 1;
  background-image: v-bind('gradient.background');
  min-height: 75px;
}
</style>
