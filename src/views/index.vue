<script setup lang="ts">
import { useExerciseLinks } from '../router'

const exercises = useExerciseLinks()
</script>

<template>
  <h2 class="mb-6">Exercises:</h2>

  <div
    v-if="false"
    class="rounded-md bg-red-200 dark:bg-red-800 border dark:border-red-50 border-red-950 py-2 px-6 mb-12"
  >
    <h3>😅 Oops!</h3>
    <img src="/oops.gif" alt="Oh, wow!" class="max-h-24" />
    <p class="m-0 text-lg">⚠️ It looks like you <i>cloned the repository directly</i>.</p>

    <p class="text-lg">You need to run this command instead:</p>

    <pre><code>npx zx@7.2 https://gist.githubusercontent.com/posva/d19708c1da18d41d66ac7cec1a1e5557/raw/bootstrap.mjs</code></pre>

    <p>Delete this project and try again with that command! 🙌</p>
  </div>

  <ul>
    <li v-for="link in exercises" :key="link.name" :class="link.status === 'pass' ? `task-pass` : ''">
      <RouterLink :to="link">{{ link.status === 'pass' ? '✅ ' : '' }}{{ link.path }}</RouterLink>
    </li>
  </ul>
</template>

<style scoped>
li.task-pass {
  opacity: 0.5;
  text-decoration: line-through;
}
</style>
