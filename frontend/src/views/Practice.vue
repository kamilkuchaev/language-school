<template>
	<div>
		<AppLoader v-if="loading"/>
		<div v-else>
			<h2 class="h2 mb-3">{{`Время практиковаться со словарём ${dictionaryName}!`}}</h2>

			<button
				v-if="!isPractice"
				class="btn btn-outline-info mb-3"
				@click="onStartedPractice()"
			>Начать тренировку
			</button>

			<div v-if="isPractice || isFinished" class="border p-3 mb-3 pos-r">
				<div class="score">
					<p>{{currentTask.successCounter}} / 5</p>
				</div>

				<VTask
					v-if="isPractice"
					:isActiveAnswer="isActiveAnswer"
					@onAnswerClick="onAnswerClick"
					@onAnswerInput="onAnswerInput"
				/>

				<FinishedTasks v-else-if="isFinished"/>
			</div>

			<div
				v-if="isPractice"
				class="d-flex justify-content-center"
			>
				<button
					v-if="!hasCheckAnswer"
					class="btn btn-outline-info"
					:class="{'disabled': !isActiveAnswer}"
					@click="onCheckAnswer(currentTask)"
				>
					Проверить
				</button>
				<button
					v-else
					class="btn btn-outline-info"
					@click="onNextTask"
				>
					Продолжить
				</button>
				<button
					class="btn btn-outline-info ms-3"
					@click="onFinishedTask"
				>
					Закончить тренировку
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { collectQuestions } from '@/use/practice/useCollectAnswers'
import VTask from '@/components/practice/VTask'
import FinishedTasks from '@/components/practice/FinishedTasks'
import AppLoader from '@/components/AppLoader'
import { updateUserTask } from '../services/user.service'
// import { getDictionaryOne } from '../services/dictionary.service'

const testDictionary = {
  dictionary_name: 'тестовый словарь',
  author: 'author_name',
  dictionary_description: 'desc',
  created_at: '03-07-2022',
  words: [
    {
      id: 1,
      word: 'слово',
      translation: 'word'
      // successCounter: 0,
      // answers: ['word', 'words', 'would', 'write']
    },
    {
      id: 2,
      word: 'символ',
      translation: 'symbol'
      // successCounter: 0,
      // answers: ['word', 'words', 'symbol', 'write']
    },
    {
      id: 3,
      word: 'число',
      translation: 'number'
      // successCounter: 0,
      // answers: ['word', 'words', 'would', 'number']
    }
  ]
}

export default {
  name: 'Practice',

  data () {
    return {
      loading: true,
      dictionaryId: null,
      dictionaryName: '',
      currentDictionary: {},
      isPracticeTest: false,
      tasks: [],
      unlearnedWords: [],
      learnedWords: [],
      wordsInStudies: [],
      repeatsCount: 5,

      numberSuccessAnswer: 3,

      count: 0,
      successCount: 0,
      maxCount: 10,
      finishResults: null,

      isFinished: false,
      isPractice: false,

      // ToDo temp
      currentTask: testDictionary.words[0],
      isActiveAnswer: null,
      hasCheckAnswer: false,
      hasRightAnswer: false
    }
  },

  async created () {
	  this.loading = true
	  this.dictionaryId = +this.$route.params.dictionaryId
  },
  async mounted () {
	  if (!this.dictionaryId) {
		  this.isPracticeTest = true
	  }

	 /* if (!this.isPracticeTest) {
		  try {
			  const { data } = await getDictionaryOne(this.dictionaryId)
			  this.currentDictionary = data
		  } catch (e) {
			  console.error(e)
		  } finally {
			  this.loading = false
		  }
	  } else {
		  this.currentDictionary = testDictionary
		  this.loading = false
	  } */

	  this.currentDictionary = testDictionary
	  this.loading = false

	  // const { data } = await getDictionaryOne(props.dictionaryId.value)

	  this.dictionaryName = this.currentDictionary.dictionary_name

	  this.tasks = [...this.currentDictionary.words].map(task => {
		  if (!task.successCounter) {
			  return {
				  ...task,
				  successCounter: 0
			  }
		  }
		  return task
	  })
  },

  computed: {

  },

  methods: {
	  fillStudiedWord (array) {
		  console.log('array', array)

		  this.unlearnedWords = [...array].filter(item => item.successCounter < this.numberSuccessAnswer)

		  if (this.repeatsCount > this.unlearnedWords.length) {
        	this.repeatsCount = this.unlearnedWords.length
		  }

		  for (let i = 0; i < this.repeatsCount; i++) {
        	this.wordsInStudies.push(this.unlearnedWords[i])
		  }
	  },

	  onNextTask () {
		  console.log('this.count', this.count)
		  console.log('this.maxCount', this.maxCount)
		  console.log('this.wordsInStudies', this.wordsInStudies)

		  if (this.count === this.maxCount || this.wordsInStudies.length === 0) {
			  return this.onFinishedTask()
		  }

		  this.resetValues()
		  this.currentTask = this.wordsInStudies.shift()
		  this.currentTask = collectQuestions(this.tasks, this.currentTask)

		  console.log('this.currentTask', this.currentTask)
		  return this.currentTask
	  },

	  async onStartedPractice () {
		  this.count = 0
		  this.isPractice = true
		  this.wordsInStudies.length = 0
		  await this.fillStudiedWord(this.tasks)
		  await this.onNextTask()
	  },

	  onFinishedTask () {
		  const words = {
			  ...this.learnedWords,
			  ...this.unlearnedWords
		  }

		  this.finishResults = words
		  this.isPractice = false
		  this.isFinished = true

		  if (!this.isPracticeTest) {
			  const userId = 3

			  console.log('id', this.dictionaryId)

			  const postData = {
				  [this.dictionaryId]: {
					  ...this.currentDictionary,
					  words
				  }
			  }
			  console.log('postData', postData)

			  try {
				  updateUserTask(userId, this.dictionaryId, postData)
			  } catch (e) {
				  console.log('error', e)
			  }
		  }
	  },

	  onAnswerClick (word) {
		  console.log('word', word)
		  this.isActiveAnswer = word
	  },

	  onAnswerInput (word) {
		  this.isActiveAnswer = word
	  },

	  onCheckAnswer (task) {
		  const answer = this.isActiveAnswer.toLowerCase().trim()
		  const translation = this.currentTask.translation.toLowerCase().trim()

		  console.log('onCheckAnswer', task)

		  if (answer === translation) {
			  task.successCounter++
			  this.successCount++
			  this.hasRightAnswer = true
		  } else {
			  task.successCounter = 0
			  this.hasRightAnswer = false
		  }

		  if (task.successCounter < this.numberSuccessAnswer) {
			  this.wordsInStudies.push(task)
		  } else {
			  this.learnedWords.push(task)
			  this.unlearnedWords = this.unlearnedWords.filter(t => t.id !== task.id)
		  }
		  this.hasCheckAnswer = true
		  this.count++
	  },

	  resetValues () {
		  this.hasRightAnswer = false
		  this.hasCheckAnswer = false
		  this.isActiveAnswer = null
		  this.currentTask = null
	  }
  },

  provide () {
    return {
      task: this.currentTask,
      isActiveAnswer: this.isActiveAnswer,
      hasRightAnswer: this.hasRightAnswer,
      hasCheckAnswer: this.hasCheckAnswer,
      count: this.count,
      successCount: this.successCount,
      finishResults: this.finishResults
    }
  },

  // onFinishedTask,
  // onAnswerClick,
  // onAnswerInput,
  // onCheckAnswer

  components: {
    FinishedTasks,
    VTask,
    AppLoader
  }
}
</script>

<style lang="scss">
.btn-outline-info.disabled, .btn-outline-info:disabled {
  color: gray;
  border-color: gray;
}

.pos-r {
  position: relative;
}
.score {
  position: absolute;
  right: 20px;
}
</style>
