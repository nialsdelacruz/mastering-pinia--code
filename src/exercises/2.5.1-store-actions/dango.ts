import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDango = defineStore('2.5.1 store-actions', {
  state: () => ({
    amount: 20,
    eatenBalls: 0,
    isEating: false
  }),

  getters: {
    finishedSticks: state => Math.floor(state.eatenBalls / 3),
  },

  actions: {
    eatDango() {
      if(this.amount === 0)
        return 

      this.eatenBalls++
      if(this.eatenBalls % 3 === 0)
        this.amount--
    },
    async startEating() {
      this.isEating = true
      do {
          await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
          
          if(!this.isEating) 
            break
          
          this.eatDango()
      } while (this.amount > 0)
    },
    stopEating() {
      this.isEating = false
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDango, import.meta.hot))
}
