import http from '../http-common'

class ProductDataService {
  create (formData) {
    return http.post('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  getAll () {
    return http.get('/product')
  }

  get (id) {
    return http.get(`/product/${id}`)
  }

  delete (id) {
    return http.delete(`/product/${id}`)
  }

  update (id, data) {
    return http.put(`/product/${id}`, data)
  }
}

export default new ProductDataService()
