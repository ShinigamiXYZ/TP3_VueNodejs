<template>
  <nav>
    <router-link to="/">add Product</router-link>
    <router-link to="/catalogue">catalogue</router-link>
  </nav>
  <router-view/>
</template>

<script>
import ProductDataService from '@/services/ProdutDataService'

export default {
  name: 'MyComponent',
  mounted () {
    ProductDataService.getAll()
      .then(response => {
        this.inventory = response.data
        console.log(response.data)
      })
  },
  data () {
    return {
      inventory: []
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
