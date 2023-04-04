<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 mb-3" v-for="product in products" :key="product.id">
        <div class="card">
          <img src="../assets/logo.png" class="card-img-top" alt="Product Image" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p>
              <strong>Price:</strong> {{ product.price }}<br />
              <strong>Type:</strong> {{ product.type }}<br />
              <strong>Quantity:</strong> {{ product.quantity }}
            </p>
          </div>
          <div class="card-footer">
            <button
              type="button"
              class="btn btn-danger"
              @click="removeQuantity(product)"
            >
              -
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addQuantity(product)"
            >
              +
            </button>
            <button type="button" class="btn btn-secondary" @click="navigateToEdit(product)">Edit</button>
          </div>
        </div>
      </div>
    </div>
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
    axios
      .get('http://localhost:8080/api/product')
      .then((response) => {
        this.products = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    addQuantity (product) {
      // Make an API call to update the quantity on the server
      axios
        .put(`http://localhost:8080/api/product/${product.id}/add`)
        .then((response) => {
          // Update the local product list based on the response
          const index = this.products.findIndex((p) => p.id === product.id)
          this.products[index].quantity = response.data.quantity
        })
        .catch((error) => {
          console.log(error)
        })
    },
    removeQuantity (product) {
      // Make an API call to update the quantity on the server
      axios
        .put(`http://localhost:8080/api/product/${product.id}/remove`)
        .then((response) => {
          // Update the local product list based on the response
          const index = this.products.findIndex((p) => p.id === product.id)
          this.products[index].quantity = response.data.quantity
        })
        .catch((error) => {
          console.log(error)
        })
    },
    navigateToEdit (product) {
      this.$router.push({ name: 'edit', params: { id: product.id } })
    }
  }
}
</script>
