import { isArray, isString } from '@/utils/checkType'

const randArray = array => {
  const randNum = Math.random() * array.length | 0
  return array[randNum]
}

const typeTask = successCounter => {
  switch (successCounter) {
    case 1:
      return 'translation'
    case 2:
      return 'input'
    case 4:
      return 'translation'
    default:
      return 'original'
  }
}

function getAllAnswers (dictionaries, type = 'translation') {
  if (!isArray(dictionaries)) {
    throw new Error('dictionaries are not on Array')
  }

  if (type === 'original') {
    type = 'word'
  }

  return dictionaries.map(item => item[type])
}

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]]
  }

  return array
}

function setAnswers (words, basic, count = 5) {
  if (!isArray(words)) {
    throw new Error('dictionaries are not on Array')
  }
  if (!isString(basic)) {
    throw new Error('basic is not on String')
  }
  if (!Number.isInteger(count) && count === 0) {
    throw new Error('count is not correct')
  }
  if (count >= words.length) {
    count = words.length
  }

  const array = []
  array.push(basic)

  while (array.length < count) {
    const word = randArray(words)
    if (!array.includes(word)) {
      array.push(word)
    }
  }

  return shuffle(array)
}

function typeAnswers (currentTask) {
  const type = typeTask(currentTask.successCounter)

  currentTask = {
    ...currentTask,
    type
  }

  if (type === 'translation') {
    const tempWord = currentTask.word
    return {
      ...currentTask,
      word: currentTask.translation,
      translation: tempWord,
      type
    }
  }

  return currentTask
}

export function collectQuestions (tasks, currentTask) {
  if (!isArray(tasks)) {
    throw new Error('dictionaries are not on Array')
  }

  let allAnswers
  currentTask = typeAnswers(currentTask)

  if (currentTask.type === 'translation') {
    allAnswers = getAllAnswers(tasks, 'original')
  } else {
    allAnswers = getAllAnswers(tasks)
  }

  const answers = setAnswers(allAnswers, currentTask.translation, 5)

  return {
    ...currentTask,
    answers
  }
}
