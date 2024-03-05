<script>
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<template>
  <header>
    <NavigationBar></NavigationBar>
  </header>

  <RouterView />
</template>