<template>
    <div>
      <h1>Login</h1>
      <input v-model='username' placeholder='Username' />
      <input v-model='password' placeholder='Password' type='password' />
      <button @click='login'>Login</button>
      <p v-if='error'>{{ error }}</p>
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
