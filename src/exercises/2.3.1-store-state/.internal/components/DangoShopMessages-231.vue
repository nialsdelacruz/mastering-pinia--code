<script lang="ts" setup>
import { useDangoShop } from '../../dango-shop'

const dangoShop = useDangoShop()
</script>

<template>
  <p v-if="dangoShop.cartAmount >= 100">That's all the dango I have 😱</p>
  <hr />
  <p v-if="dangoShop.cartAmount < 1">
    <i title="Welcome to the shop in Japanese" class="underline">irasshaimase</i>! How many dango do you want?
  </p>
  <p v-else>
    You are ordering {{ dangoShop.cartAmount }} dango{{ dangoShop.cartAmount > 1 ? 's' : '' }}. That would be a total of
    ¥{{ 350 * dangoShop.cartAmount }}.
    <template v-if="dangoShop.cartAmount >= 25 && dangoShop.cartAmount < 50">
      <br />
      Are you buying for everybody in line? 👀
    </template>
  </p>
</template>
