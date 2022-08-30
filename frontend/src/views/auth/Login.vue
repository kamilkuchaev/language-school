<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">

                <div class="alert alert-danger" role="alert" v-if="error !== null">
                    {{ error }}
                </div>

                <div class="card card-default">
                    <div class="card-header">Вход</div>
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="form-group row my-2">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" required autofocus autocomplete="off" v-model="formData.email">
                                </div>
                            </div>

                            <div class="form-group row my-2">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Пароль</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" required autocomplete="off" v-model="formData.password">
                                </div>
                            </div>

                            <div class="form-group row my-2 mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary" :disabled="loadingBtn">
                                      <span v-if="loadingBtn" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                      <span class="visually-hidden">Войти</span>
                                        Войти
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
	    formData: {
        email: 'admin@admin.com',
        password: 'password'
      },
      loadingBtn: false,
      error: null
    }
  },
  methods: {
    ...mapActions({
      onLogin: 'auth/onLogin'
    }),
    async handleSubmit () {
      this.loadingBtn = true
      try {
        await this.onLogin({ ...this.formData })
        await this.$router.push({ name: 'home' })
      } catch (e) {
        console.log(e)
      } finally {
        this.loadingBtn = false
      }
    }
  }
}
</script>

<style>

</style>
