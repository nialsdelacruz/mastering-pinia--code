<script setup lang="ts">
import { computed, onUnmounted, provide, reactive, Ref, watch, defineModel, ref } from 'vue';
import { registerTabKey } from './injectionKey';
const tabList = reactive(new Map<number, string>())
const model = defineModel<number>()

const localCurrentTab = ref(0)

  const currentTab = computed<number>({
  get: () => model.value ?? localCurrentTab.value,
  set: (tabId: number) => {
    model.value = tabId
  }
})




let currentId = 0

provide(registerTabKey, (title: Ref<string>) => {
  const myId = currentId++
  tabList.set(myId, title.value)

  watch(title, () => {
    tabList.set(myId, title.value)
  })

  const isVisible = computed(() => currentTab.value === myId)

  onUnmounted(() => {
    tabList.delete(myId)
  })

  return { isVisible }
})
</script>

<template>
  <div class="space-x-1 space-y-1">
    <button v-for="[tabId, title] in tabList" :disabled="currentTab === tabId" @click="currentTab = tabId">{{ title }}</button>
  </div>

  <slot />
</template>
