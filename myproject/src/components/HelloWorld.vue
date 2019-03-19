<template>
  <div class="hello">
    <h1><slot name="msg-site"> {{ msg }} </slot></h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <router-link :to="{name: 'Login'}">Login</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Bem vindo ao UCAN'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
