import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDangoShop = defineStore('2.3.1 store-state', () => {
  const cartAmount = ref(0)

  return {cartAmount }
})
