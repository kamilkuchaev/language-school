<template>
	<div v-if="true">
		<p>Выберите верный вариант</p>
		<p class="fs-2" :style="{color: 'green', fontWeight: 'bold'}">{{ task.word }}</p>

		<ul class="d-flex align-items-center ps-0">
			<li
				v-for="(answer, index) in task.answers" :key="index"
				class="btn btn-outline-info me-3"
				:class="[{'active': isActiveAnswer === answer}]"
				@click="$emit('onAnswerClick', answer)"
			>
				{{ answer }}
			</li>
		</ul>
	</div>

	<div v-if="false" class="mb-3">
		<p>Напишите перевод</p>
		<p class="fs-2" :style="{color: 'green', fontWeight: 'bold'}">{{ task.word }}</p>

<!--		<input-->
<!--			type="text"-->
<!--			class="form-control"-->
<!--			v-model="isActiveAnswer"-->
<!--			ref="refAnswerInput"-->
<!--		>-->
	</div>

	<div v-if="hasCheckAnswer">
		<p v-if="hasRightAnswer" style="color: green">Вы ответили правильно!</p>
		<p v-else style="color: red">Правильный ответ: {{ task.translation }}</p>
	</div>
</template>

<script>

// const type = 'answerInput'

export default {
  name: 'VTask',
  emits: ['onAnswerClick', 'onAnswerInput'],
  props: ['isActiveAnswer'],
  inject: ['task', 'hasRightAnswer', 'hasCheckAnswer'],

  data () {
	  return {
		  refAnswerInput: null
	  }
  },

  mounted () {
    // if (type === 'answerInput' && this.refAnswerInput) {
    //   this.focusOnInput()
    // }
  },

  methods: {
    focusOnInput () {
      this.refAnswerInput.focus()
    },
    onAnswerClick (value) {
      this.$emit('onAnswerClick', value)
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
