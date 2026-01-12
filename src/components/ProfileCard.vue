<script setup lang="ts">

import type { GithubProfile } from '../composables/useGithub'

const props = defineProps<{ profile: GithubProfile | null }>()
</script>
<template>
  <div
    v-if="profile"
    class="relative overflow-hidden bg-white rounded-3xl shadow-2xl mb-8 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 group"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-50"></div>
    <div class="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
    <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-pink-400 to-purple-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
    
    <div class="relative p-6 sm:p-8">
      <div class="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div class="relative group/avatar">
          <img
            :src="profile.avatar_url"
            alt="avatar"
            class="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl group-hover/avatar:scale-110 transition-transform duration-300"
          />
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover/avatar:opacity-20 transition-opacity duration-300"></div>
        </div>
        
        <div class="flex-1 text-center sm:text-left">
          <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {{ profile.name || profile.login }}     
          </h2>
          <p class="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">{{ profile.bio || 'No bio available' }}</p>
          
          <div class="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
            <div class="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-colors">
              <span class="text-indigo-600 font-bold text-lg">{{ profile.followers }}</span>
              <span class="text-gray-600 text-sm">Followers</span>
            </div>
            <div class="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-xl border border-purple-100 hover:border-purple-300 transition-colors">
              <span class="text-purple-600 font-bold text-lg">{{ profile.following }}</span>
              <span class="text-gray-600 text-sm">Following</span>
            </div>
            <div class="flex items-center gap-2 bg-gradient-to-r from-pink-50 to-red-50 px-4 py-2 rounded-xl border border-pink-100 hover:border-pink-300 transition-colors">
              <span class="text-pink-600 font-bold text-lg">{{ profile.public_repos }}</span>
              <span class="text-gray-600 text-sm">Repos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


