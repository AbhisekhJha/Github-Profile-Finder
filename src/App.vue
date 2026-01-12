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
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse">
          GitHub Profile Finder
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">Discover amazing developers and their work</p>
      </div>

      <SearchGithubUser :onSearch="handleSearch" />

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
      </div>
      <p v-if="error" class="text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-xl p-4 mt-4">{{ error }}</p>

      <ProfileCard :profile="profile" />
      <RepositoryList :repos="repos" />
    </div>
  </div>
</template>

