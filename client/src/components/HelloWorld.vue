<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="product-name">Name</label>
        <input id="product-name" class="form-control" v-model="product.name" required>
      </div>

      <div class="form-group">
        <label for="product-price">Price</label>
        <input id="product-price" class="form-control" type="number" v-model="product.price" required>
      </div>

      <div class="form-group">
        <label for="product-description">Description</label>
        <textarea id="product-description" class="form-control" v-model="product.description" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label for="product-type">Type</label>
        <input id="product-type" class="form-control" v-model="product.type" required>
      </div>

      <button type="submit" class="btn btn-primary">Add Product</button>
    </form>
  </div>
</template>

<script>
import ProductDataService from '@/services/ProdutDataService'

export default {
  data () {
    return {
      product: {
        name: '',
        price: '',
        description: '',
        type: ''
      }
    }
  },
  methods: {
    onSubmit () {
      ProductDataService.create(this.product)
        .then(response => {
          console.log('Product added:', response.data)
          this.$router.push({ name: 'catalogue' }) // Navigate to the ProductList view after successful submission
        })
        .catch(error => {
          console.log('Error:', error)
        })
    }
  }
}
</script>
