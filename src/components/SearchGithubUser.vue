<template>
  <div class="flex gap-2 mb-4">
    <input
      v-model="username"
      @keyup.enter="searchUser"
      type="text"
      placeholder="Enter GitHub username"
      class="border p-2 rounded flex-1"
    />
    <button @click="searchUser" class="bg-blue-500 text-white px-4 py-2 rounded">
      Search
    </button>
  </div>
</template>
    
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ onSearch: (username: string) => void }>();
const username = ref('');

function searchUser(): void {
  if (username.value.trim()) {
    props.onSearch(username.value.trim());
  }
}
</script>


