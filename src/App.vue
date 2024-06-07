<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped>
body {
  background: #f0f0f0;
}
</style>
