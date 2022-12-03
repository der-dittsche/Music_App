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
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth();

onMounted(() => storeAuth.initUser());
</script>

<style>
.main_content {
  margin: 1.5em;
}
</style>
