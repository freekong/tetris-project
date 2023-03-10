import { randomDirection, randomType } from '@/utils/tool'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface tetrominoItem {
  type: string,
  direction: number
}

interface tetrominoType {
  next: tetrominoItem,
  current: tetrominoItem
}

export const useTetrominoStore = defineStore('tetromino', () => {
  let tetrominoInfo = reactive<tetrominoType>({
    next: {
      type: '',
      direction: 1
    },
    current: {
      type: '',
      direction: 1
    }
  })

  function updateNext() {
    tetrominoInfo.next = {
      type: randomType(),
      direction: randomDirection()
    }
  }

  function exchangeCurrent() {
    tetrominoInfo.current = {...tetrominoInfo.next}
  }

  return {
    tetrominoInfo,
    updateNext,
    exchangeCurrent
  }

})