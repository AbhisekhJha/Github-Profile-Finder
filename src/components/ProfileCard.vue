<script setup lang="ts">

import type { GithubProfile } from '../composables/useGithub'

const props = defineProps<{ profile: GithubProfile | null }>()
</script>
<template>
  <div
    v-if="profile"
    class="bg-gray-200 shadow rounded p-4 flex gap-4 items-center mb-4"
  >
    <img
      :src="profile.avatar_url"
      alt="avatar"
      class="w-24 h-24 rounded-full"
    />
    <div>
      <h2 class="text-xl font-bold">
        {{ profile.name || profile.login }}     
      </h2>
      <p class="text-gray-600">{{ profile.bio }}</p>
      <p class="mt-2 text-sm font-bold">
        Followers: {{ profile.followers }} |
        Following: {{ profile.following }} |
        Repos: {{ profile.public_repos }}
      </p>
    </div>
  </div>
</template>


