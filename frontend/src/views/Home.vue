<template>
  <div class="home">
	  <h1>Главная</h1>
	  Здесь будет рассказано про сайт, предложено попробовать как он работает без регистрации и смс, а пока лучше посмотреть на<br>
	  <router-link :to="{name: 'practiceTest'}">Практика</router-link><br>
	  <router-link :to="{name: 'account'}">Аккаунт</router-link>

  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {}
}
</script>
