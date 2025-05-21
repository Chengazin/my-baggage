<template>
  <HeaderComponentVue />
  <router-view />
</template>

<script setup>
import HeaderComponentVue from './components/HeaderComponent.vue'

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input, select, button {
  font-family: inherit;

}

.results table th {
  background-color: #040505;
}
</style>
