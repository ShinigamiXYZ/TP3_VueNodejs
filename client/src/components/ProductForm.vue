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
            <label for="product-photo">Photo</label>
            <input id="product-photo" class="form-control" type="file" @change="onFileSelected">
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
            <input id="product-quantity" class="form-control"  type="number" v-model="product.quantity" required>
          </div>
          <button type="submit" class="btn btn-primary w-100 mt-3">Add Product</button>
        </form>
      </div>
    </div>
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
      },
      selectedFile: null
    }
  },
  methods: {
    onFileSelected (event) {
      console.log('test')
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile.name)
    },
    onSubmit () {
      console.log(this.selectedFile)
      const formData = new FormData()
      formData.append('name', this.product.name)
      formData.append('price', this.product.price)
      formData.append('description', this.product.description)
      formData.append('type', this.product.type)
      formData.append('quantity', this.product.quantity)
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile)
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
        if (pair[0] === 'photo') {
          console.log(pair[1].name)
        }
      }
      ProductDataService.create(formData)
        .then(response => {
          this.$router.push({ name: 'catalogue' })
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
