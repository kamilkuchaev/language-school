<template>
	<pre>isActiveAnswer {{ isActiveAnswer }}</pre>

	<li
		class="btn btn-outline-info me-3"
		:class="[{'active': isActiveAnswer === answer}]"
		@click="$emit('onAnswerClick', answer)"
	>
		{{ answer }}
	</li>
</template>

<script>

export default {
  props: ['answer'],
  emits: ['onAnswerClick'],
  inject: ['isActiveAnswer'],

  methods: {
    onAnswerClick (value) {
      console.log('onAnswerClick value', value)
      this.$emit('onAnswerClick', value)
    }
  }
}
</script>

<style lang="scss">
.btn-outline-info.active {
	color: white;
}
.btn-outline-info:hover {
	color: white;
}
</style>
