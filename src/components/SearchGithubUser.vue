<template>
  <div class="flex flex-col sm:flex-row gap-3 mb-6">
    <input
      v-model="username"
      @keyup.enter="searchUser"
      type="text"
      placeholder="Enter GitHub username..."
      class="flex-1 px-5 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-800 placeholder-gray-400"
    />
    <button 
      @click="searchUser" 
      class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
    >
      Search
    </button>
  </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{ onSearch: (username: string) => void }>();
const username = ref('');

function searchUser(): void {
  if (username.value.trim()) {
    props.onSearch(username.value.trim());
  }
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const user = params.get('user')
  if (user && user.trim()) {
    username.value = user.trim()
  }
})
</script>


