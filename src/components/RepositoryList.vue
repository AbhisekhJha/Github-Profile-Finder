<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { GithubRepo } from '../composables/useGithub'

const props = defineProps<{ repos: GithubRepo[] }>()

const pageSize = 6
const currentPage = ref(1)

const totalPages = computed(() => {
  return props.repos.length ? Math.ceil(props.repos.length / pageSize) : 1
})

const paginatedRepos = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.repos.slice(start, start + pageSize)
})

watch(
  () => props.repos,
  () => {
    currentPage.value = 1
  }
)

function goToPage(page: number): void {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

function nextPage(): void {
  goToPage(currentPage.value + 1)
}

function prevPage(): void {
  goToPage(currentPage.value - 1)
}
</script>

<template>
  <section v-if="repos.length" class="mt-6">
    <h2 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
      Repositories
    </h2>
    
    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="repo in paginatedRepos"
        :key="repo.id"
        class="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-indigo-200"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative p-5">
          <a
            :href="repo.html_url"
            target="_blank"
            class="text-lg font-bold text-indigo-700 hover:text-purple-700 transition-colors duration-300 flex items-center gap-2 group/link"
          >
            <span class="group-hover/link:underline">{{ repo.name }}</span>
            <svg class="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          <p class="text-gray-600 text-sm mt-2 leading-relaxed" v-if="repo.description">
            {{ repo.description }}
          </p>
          <p class="text-gray-400 text-xs mt-2 italic" v-else>
            No description available
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="totalPages > 1"
      class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-lg p-5"
    >
      <button
        type="button"
        class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        ← Previous
      </button>

      <span class="text-gray-700 font-semibold">
        Page <span class="text-indigo-600">{{ currentPage }}</span> of <span class="text-purple-600">{{ totalPages }}</span>
      </span>

      <button
        type="button"
        class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next →
      </button>
    </div>
  </section>
</template>


