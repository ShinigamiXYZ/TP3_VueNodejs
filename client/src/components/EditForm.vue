<template>
    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <form @submit.prevent="onSubmit" class="shadow-lg p-5 bg-white rounded">
            <h2 class="mb-4 text-center">Add Product</h2>
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
            <div class="form-group">
              <label for="product-quantity">Quantity</label>
              <input id="product-quantity" class="form-control" type="number" v-model="product.quantity" required>
            </div>
            <button class="w-100 btn btn-secondary btn-lg mt-3" type="button" @click="updateProduct">Update </button>
            <button class="w-100 btn btn-danger btn-lg mt-3" type="button" @click="deleteProduct">Delete </button>
          </form>
        </div>
      </div>
    </div>
  </template>

<script>
import ProductDataService from '@/services/ProdutDataService'

export default {
  props: ['remItem', 'updateInv'],
  data () {
    return {
      product: {},
      id: parseInt(this.$route.params.id)
    }
  },
  methods: {
    updateProduct () {
      ProductDataService.update(this.id, this.product)
        .then(response => {
          this.updateInv(this.productIndex, this.product)
        })
    },
    deleteProduct () {
      ProductDataService.delete(this.id)
        .then(response => {
          this.$router.push({ name: 'catalogue' })
        })
    }
  },
  mounted () {
    ProductDataService.get(this.id)
      .then(response => {
        this.product = response.data
      })
  }
}
</script>
