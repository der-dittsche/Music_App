<template>
  <NavBar />
  <main class="main_content">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<style>
.main_content {
  margin: 1.5em;
}
</style>
