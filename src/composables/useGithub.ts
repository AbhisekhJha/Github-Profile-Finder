import { ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';

export interface GithubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  repos_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

export function useGithub() {
  const profile: Ref<GithubProfile | null> = ref(null);
  const repos: Ref<GithubRepo[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string> = ref('');

  async function fetchUser(username: string) {
    loading.value = true;
    error.value = '';
    profile.value = null;
    repos.value = [];

    try {
      const response = await axios.get<GithubProfile>(`https://api.github.com/users/${username}`);
      profile.value = response.data;

      const repoResponse = await axios.get<GithubRepo[]>(`https://api.github.com/users/${username}/repos?per_page=100`);
      repos.value = repoResponse.data;
    } catch {
      error.value = 'User not found';
    } finally {
      loading.value = false;
    }
  }

  return { profile, repos, loading, error, fetchUser };
}
