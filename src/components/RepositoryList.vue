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
  <section v-if="repos.length" class="mt-4">
    <ul class="divide-y divide-gray-200 rounded border border-gray-200 bg-white">
      <li
        v-for="repo in paginatedRepos"
        :key="repo.id"
        class="p-3 hover:bg-gray-50 transition"
      >
        <a
          :href="repo.html_url"
          target="_blank"
          class="text-blue-700 font-semibold"
        >
          {{ repo.name }}
        </a>
        <p class="text-gray-700 text-sm" v-if="repo.description">
          {{ repo.description }}
        </p>
      </li>
    </ul>

    <div
      v-if="totalPages > 1"
      class="mt-3 flex items-center justify-between text-sm text-gray-700"
    >
      <button
        type="button"
        class="px-3 py-1 rounded border border-gray-300 bg-white disabled:opacity-50"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>

      <span>
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
        type="button"
        class="px-3 py-1 rounded border border-gray-300 bg-white disabled:opacity-50"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </section>
</template>


