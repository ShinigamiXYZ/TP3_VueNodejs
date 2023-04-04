<template>
  <div>
    <nav class='navbar navbar-expand-lg navbar-dark bg-custom'>
      <div class='container d-flex justify-content-center'>
          <ul class='navbar-nav'>
            <li class='nav-item'>
              <router-link to='/' class='nav-link'>Add Product</router-link>
            </li>
            <li class='nav-item'>
              <router-link to='/catalogue' class='nav-link'>Catalogue</router-link>
            </li>
            <li class='nav-item' v-if='loggedIn'>
            <a class='nav-link' @click='logout'>Logout</a>
          </li>
          </ul>
        </div>
      </nav>
  </div>
    <router-view />
</template>

<style scoped>
.bg-custom {
  background-color: #172636;
  background-image: linear-gradient(45deg, #172636 60%, #00ccff 100%);
}
</style>

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
      inventory: [],
      loggedIn: !!localStorage.getItem('loggedIn')
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('loggedIn')
      this.loggedIn = false
      this.$router.push('/login')
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
