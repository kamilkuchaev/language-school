<template>
  <AppHeader />
  <div class="container">
	  <router-view />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'
export default {
  components: { AppHeader }
}
</script>

<style lang="scss" scoped>

</style>
