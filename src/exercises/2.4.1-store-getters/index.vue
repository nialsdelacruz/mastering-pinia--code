<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useDangoShop } from './dango-shop'

const { amount, discountedPrice, totalPrice, savedMoney, hasDiscount: hasPriceDiscount } = storeToRefs(useDangoShop())
</script>

<template>
  <h1>Dango Shop 🍡</h1>

  <button data-test="btn-add" class="mx-2" :disabled="amount >= 100" @click="amount++">
    More 🍡
  </button>
  <button data-test="btn-remove" :disabled="amount < 1" @click="amount--">Remove one 🍡</button>

  <DangoShopMessages241>
    <!-- You will only need to display new things here -->
    You are ordering {{ amount }} dango{{ amount > 1 ? 's' : '' }}. That would be a total of
    <span :class="{ 'line-through': hasPriceDiscount }">¥{{ totalPrice }}</span>
    <span v-if="hasPriceDiscount" class="font-bold">¥{{ discountedPrice }}</span>. You are saving ¥{{ savedMoney }} with our special offer.
  </DangoShopMessages241>

  <!-- You won't need to change any of the classes of these elements -->
  <section data-test="dangos" class="grid lg:grid-cols-5 grid-cols-3 pt-[100px] pl-[40px] pr-[200px]">
    <div v-for="i in amount" :key="i" class="w-1/3 h-[50px] rotate-[262deg] origin-center">
      <DangoStick241 />
    </div>
  </section>
</template>
