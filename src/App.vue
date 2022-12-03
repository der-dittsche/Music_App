<template>
  <NavBar />
  <main class="main_content">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { onMounted } from 'vue';
import { useStoreUser } from '@/stores/storeUser';

const storeUser = useStoreUser();

onMounted(() => storeUser.initUser());
</script>

<style>
.main_content {
  margin: 1.5em;
}
</style>
