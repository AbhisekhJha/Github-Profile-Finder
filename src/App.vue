<script setup lang="ts">
import { useGithub } from './composables/useGithub'
import SearchGithubUser from './components/SearchGithubUser.vue'
import ProfileCard from './components/ProfileCard.vue'

const { profile, loading, fetchUser } = useGithub()

function handleSearch(username: string): void {
  fetchUser(username)
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
     <h1 class="text-blue-500 text-3xl font-bold text-center mb-6">
      GitHub Profile Finder
    </h1>
    <SearchGithubUser :onSearch="handleSearch" />

    <p v-if="loading" class="text-gray-500 mt-2">Loading...</p>
   

    <ProfileCard :profile="profile" />
  </div>
</template>

