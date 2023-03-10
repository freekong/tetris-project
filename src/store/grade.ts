import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGradeStore = defineStore('grade', () => {
  const grade = ref<number>(0)

  function increment() {
    grade.value = grade.value + 100
    console.log('[ 成绩+++ ] >', grade)

  }

  function reset() {
    grade.value = 0
  }

  return { grade, increment, reset }
})