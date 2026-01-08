<script setup lang="ts">

import type { GithubRepo } from '../composables/useGithub'

const props = defineProps<{ repos: GithubRepo[] }>()
</script>

<template>
    
  <ul v-if="repos.length" class="divide-y divide-gray-500 ">
    <li
      v-for="repo in repos"
      :key="repo.id"
      class="p-2 hover:bg-gray-200 rounded transition"
    >
      <a
        :href="repo.html_url"
        target="_blank"
        class="text-blue-700 font-bold "
      >
        {{ repo.name }}
      </a>
      <p class="text-gray-700">{{ repo.description }}</p>
    </li>
  </ul>
</template>


