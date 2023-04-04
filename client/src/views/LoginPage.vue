<template>
    <div class="container mt-5">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h1 class="text-center">Login</h1>
                </div>
                <div class="card-body">
                  <form @submit.prevent="login">
                    <div class="form-group">
                      <label for="username">Username</label>
                      <input
                        id="username"
                        v-model="username"
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <button type="submit" class="btn btn-primary btn-block">Login</button>
                    </div>
                    <div v-if="error" class="alert alert-danger" role="alert">
                      {{ error }}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login () {
      if (this.username === 'test' && this.password === 'test') {
        localStorage.setItem('loggedIn', true)
        this.$router.push('/')
      } else {
        this.error = 'Invalid username or password'
      }
    }
  }
}
</script>
