<template>
  <div id="app">
<<<<<<< HEAD
    <img src="./assets/logo.png">
=======
    <img src="./assets/logo-ucan.jpg">

    <app-menu>
      <template slot="nome-site">Ucan</template>
      <span slot="links">
        <a href="#">Login</a>
      </span>
    </app-menu>
>>>>>>> d2d2d3fc20e8cdffecf98bcd429f163e43bbf0c9
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
