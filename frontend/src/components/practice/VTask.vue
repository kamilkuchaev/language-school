<template>
	<div v-if="false">
		<p>Выберите верный вариант</p>
		<p class="fs-2" :style="{color: 'green', fontWeight: 'bold'}">{{ task.word }}</p>

		<ul class="d-flex align-items-center ps-0">
			<AnswerItem
				v-for="(answer, index) in task.answers" :key="index"
				:answer="answer"
				@onAnswerClick="onAnswerClick"
			/>
		</ul>
	</div>

	<div v-if="true" class="mb-3">
		<p>Напишите перевод</p>
		<p class="fs-2" :style="{color: 'green', fontWeight: 'bold'}">{{ task.word }}</p>

		<input
			type="text"
			class="form-control"
			v-model="isActiveAnswer"
			ref="refAnswerInput"
		>
	</div>

	<div v-if="hasCheckAnswer">
		<p v-if="hasRightAnswer" style="color: green">Вы ответили правильно!</p>
		<p v-else style="color: red">Правильный ответ: {{ task.translation }}</p>
	</div>
</template>

<script>
import AnswerItem from './AnswerItem'
import {inject, ref, onMounted} from 'vue'

const type = 'answerInput'

export default {
	name: 'VTask',
	components: {AnswerItem},
	emits: ['onAnswerClick'],

	setup (_, {emit}) {
        const refAnswerInput = ref(null)
		const onAnswerClick = value => {
			emit('onAnswerClick', value)
		}

        function focusOnInput() {
            refAnswerInput.value.focus()
        }

        onMounted(() => {
            if (type === 'answerInput' && refAnswerInput.value) {
                focusOnInput()
            }
		})

		return {
            task: inject('task'),
            hasRightAnswer: inject('hasRightAnswer'),
            hasCheckAnswer: inject('hasCheckAnswer'),
            isActiveAnswer: inject('isActiveAnswer'),
            onAnswerClick,
            refAnswerInput
		}
	}
}

</script>

<style lang="scss" scoped>

</style>
