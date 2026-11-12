import { defineStore } from 'pinia'

export const useDangoShop = defineStore('2.4.1 store-getters', {
  state: () => ({ amount: 0 }),
  getters: {
    totalPrice(): number { return  this.amount * DANGO_PRICE },
    discountedPrice(): number {
      if(this.amount < 3) return this.totalPrice
      if(this.amount >= 3 && this.amount < 5) return Math.ceil(this.totalPrice * 0.9)
      if(this.amount >= 5 && this.amount < 10) return Math.ceil(this.totalPrice * 0.85)
      return Math.ceil(this.totalPrice * 0.8)
    },
    savedMoney(): number {
      return this.totalPrice - this.discountedPrice
    },
    hasDiscount(): boolean {
      return this.savedMoney > 0
    }
  }
})

// Do not change this value, you will need it
const DANGO_PRICE = 350
