<template>
    <div class="container">
      <table class="table table-striped table-bordered">
        <thead>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Type</th>
            <th>action</th>
        </thead>
        <tr v-for="product in products" :key="product._id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.type }}</td>
          <td><button>edit</button></td>
        </tr>
      </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      products: []
    }
  },
  mounted () {
    axios.get('http://localhost:8080/api/product')
      .then(response => {
        this.products = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
