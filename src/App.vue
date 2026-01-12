<script setup lang="ts">
import { onMounted } from 'vue'
import { useGithub } from './composables/useGithub'
import SearchGithubUser from './components/SearchGithubUser.vue'
import ProfileCard from './components/ProfileCard.vue'
import RepositoryList from './components/RepositoryList.vue'

const { profile, repos, error, loading, fetchUser } = useGithub()

function handleSearch(username: string): void {
  const trimmed = username.trim()
  if (!trimmed) return
  
  const url = new URL(window.location.href)
  url.searchParams.set('user', trimmed)
  window.history.pushState({}, '', url)
  
  fetchUser(trimmed)
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const username = params.get('user')
  if (username && username.trim()) {
    fetchUser(username.trim())
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
     <h1 class="text-blue-500 text-3xl font-bold text-center mb-6">
      GitHub Profile Finder
    </h1>
    <SearchGithubUser :onSearch="handleSearch" />

    <p v-if="loading" class="text-gray-500 mt-2">Loading...</p>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
   

    <ProfileCard :profile="profile" />

    <RepositoryList :repos="repos" />
  </div>
</template>

