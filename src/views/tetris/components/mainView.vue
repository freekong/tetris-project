<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import emitter from '@/utils/bus'
import { useGradeStore } from '@/store/grade'
import { useTetrominoStore } from '@/store/tetrominoInfo'
import { coord, mapTetrominoI, mapTetrominoL, mapTetrominoJ, mapTetrominoO, mapTetrominoS, mapTetrominoZ, mapTetrominoT, moveable } from '@/utils/tetromino'

interface tetromino {
  coord: coord,
  type: String,
  direction: number
}

const width = ref<Number>(0)
const height = ref<Number>(0)
const teRow = ref<Number>(20)
const teCol = ref<Number>(10)
const tetris = ref(null)
const mapArray = ref<Array<Array<Number>>>([[]])
const currentTetromino = ref<tetromino>({
  coord: {
    row: 0,
    col: 0
  },         // 当前块的中心点位置
  type: '',   // 当前块的类型
  direction: 1 // 方向：顺时针1，2，3，4 对应 上，右，下，左
})
const beforeTetromino = ref<tetromino>({
  coord: {
    row: 0,
    col: 0
  },
  type: '',
  direction: 1
})
const dropEnd = ref<boolean>(true)
let changedMapArray = reactive<Array<coord>>([])
const gradeStore = useGradeStore()
const tetrominoStore = useTetrominoStore()
let runTimer: NodeJS.Timeout | null = null
const defaultRow: Array<Number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let tetrisCanvas: any;
let tetrisCanvasCtx: any;


const run = () => {
  gradeStore.increment()
  runTimer = setInterval(() => {
    dropTetromino()
  }, 1000)
}

const stop = () => {
  clearInterval(Number(runTimer))
  runTimer = null
}

const moveLeft = () => {
  if (!moveable('left', changedMapArray)) {
    console.log('[ 到左边界了，无法移动 ] >')
    return
  }
  dropEnd.value = false
  clearBefore()
  currentTetromino.value.coord.col --;
  const { coord, type, direction } = currentTetromino.value
  tetrominoMapArray(type, coord, direction, 1)
  drawTetris()
}

const moveRight = () => {
  if (!moveable('right', changedMapArray)) {
    console.log('[ 到右边界了，无法移动 ] >')
    return
  }
  dropEnd.value = false
  clearBefore()
  currentTetromino.value.coord.col ++;
  const { coord, type, direction } = currentTetromino.value
  tetrominoMapArray(type, coord, direction, 1)
  drawTetris()
}

const clockWise = () => {
  dropEnd.value = false
  clearBefore()
  if (currentTetromino.value.direction === 4) {
    currentTetromino.value.direction = 1
  } else {
    currentTetromino.value.direction ++
  }
  let { coord, type, direction } = currentTetromino.value
  tetrominoMapArray(type, coord, direction, 1)
  drawTetris()
}

const antiClockwise = () => {
  dropEnd.value = false
  clearBefore()
  if (currentTetromino.value.direction === 1) {
    currentTetromino.value.direction = 4
  } else {
    currentTetromino.value.direction --
  }
  let { coord, type, direction } = currentTetromino.value
  tetrominoMapArray(type, coord, direction, 1)
  drawTetris()
}

/**
 * @description: 创建一个随机的块
 * @return void
 */
const createTetromino = () => {
  dropEnd.value = false
  tetrominoStore.exchangeCurrent()
  const { type, direction } = tetrominoStore.tetrominoInfo.current
  currentTetromino.value.type = type
  currentTetromino.value.direction = direction
  currentTetromino.value.coord = {
    row: -3,
    col: 4
  }
  const { coord } = currentTetromino.value
  tetrominoStore.updateNext()
  emitter.emit('onUpdateNext')
  tetrominoMapArray(type, coord, direction, 1)
  drawTetris()

}

const dropTetromino = () => {
  if (dropEnd.value) {
    createTetromino()
  } else {
    clearBefore()
    currentTetromino.value.coord.row ++;
    const { coord, type, direction } = currentTetromino.value
    tetrominoMapArray(type, coord, direction, 1)
    drawTetris()
  }
}

/**
 * @description: 清除映射数组中上一次的块的信息
 * @return void 
 */
const clearBefore = () => {
  const { coord, type, direction } = beforeTetromino.value
  tetrominoMapArray(type, coord, direction, 0)
}

/**
 * @description: 将块映射到数组中
 * @param { string } type [块的类型]
 * @param { coord } currentTetrominoCoord [当前块的每个位置的行列数据]
 * @param { number } direction [方向：顺时针1，2，3，4 对应 上，右，下，左]
 * @param { number } lightState [当前块在映射数组中映射成 1 还是 0]
 * @return void
 */
const tetrominoMapArray = (type: String, currentTetrominoCoord: coord, direction: number, lightState: number) => {
  
  const { row, col } = currentTetrominoCoord
  switch (type) {
    case 'I':
      changedMapArray = mapTetrominoI(row, col, direction)
      break;
    case 'L':
      changedMapArray = mapTetrominoL(row, col, direction)
      break;
    case 'J':
      changedMapArray = mapTetrominoJ(row, col, direction)
      break;
    case 'O':
      changedMapArray = mapTetrominoO(row, col, direction)
      break;
    case 'S':
      changedMapArray = mapTetrominoS(row, col, direction)
      break;
    case 'Z':
      changedMapArray = mapTetrominoZ(row, col, direction)
      break;
    case 'T':
      changedMapArray = mapTetrominoT(row, col, direction)
      break;
    default:
      break;
  }
  if (lightState === 1) {
    console.log('[ beforeTetromino ] >', beforeTetromino.value)
    beforeTetromino.value = {
      type,
      coord: { ...currentTetrominoCoord },
      direction
    }
  }
  judgeTetromino(changedMapArray, lightState)
  setMapArray(changedMapArray, lightState)
  
}

/**
 * @description: 判断下落的块的位置是否到底
 * @return void
 */
const judgeTetromino = (changedMapArray: Array<coord> = [], lightState: number) => {
  let flag: boolean = true
  if (lightState === 0) {
    return flag
  }
  for (let i = 0; i < changedMapArray.length; i++) {
    const el = changedMapArray[i];
    const { row, col } = el
    // 1、判断不能越界
    if (row < 0 || row >= 19) {
      flag = false
      if (row >= 19) {
        dropEnd.value = true
      }
      break
    }
    if (mapArray.value[row + 1][col] === 1) {
      // 2、判断是否接触到底部
      flag = false
      dropEnd.value = true
      break
    }
  }

}

const setMapArray = (changedMapArray: Array<coord> = [], lightState: number) => {
  for (let i = 0; i < changedMapArray.length; i++) {
    const el = changedMapArray[i];
    const { row, col } = el
    if (row >= 0 && row < 20) {
      mapArray.value[row][col] = lightState
    }
  }
  removeFullCol()
}

const removeFullCol = () => {
  for (let i = 0; i < mapArray.value.length; i++) {
    const rowItem = mapArray.value[i];
    if (rowItem.indexOf(0) === -1) {
      // 当前行已经填满
      // 将当前行移除同时在顶部新增一行
      mapArray.value.splice(i, 1)
      mapArray.value.unshift(defaultRow)
      gradeStore.increment()
    }
  }
}

/**
 * @description: 根据mapArray绘制画面，数组中对应的为 1 则渲染，为 0 则不渲染
 * @return void
 */
const drawTetris = () => {
  console.log('[ mapArray ] >', mapArray)
  clearCanvas()
  for (let i = 0; i < mapArray.value.length; i++) {
    const rowItem = mapArray.value[i];
    for (let j = 0; j < rowItem.length; j++) {
      const colItem = rowItem[j];
      if (colItem === 1) {
        tetrisCanvasCtx.fillStyle = 'rgba(0,160,233,0.3)'
        tetrisCanvasCtx.fillRect(j * 30, i * 30, 30, 30)
        tetrisCanvasCtx.strokeRect(j * 30, i * 30, 30, 30)
      }
    }
  }
}

/**
 * @description: 清除画布
 * @return void
 */
const clearCanvas = () => {
  tetrisCanvasCtx.clearRect(0, 0, width.value, height.value);
}

/**
 * @description: 重置
 * @return void
 */
const reset = () => {
  stop()
  clearCanvas()
  initMapArray()
  gradeStore.reset()
}

const initMapArray = () => {
  for (let i = 0; i < teRow.value; i++) {
    mapArray.value[i] = []
    for (let j = 0; j < teCol.value; j++) {
      mapArray.value[i][j] = 0
    }
  }
}

/**
 * @description: 注册事件
 * @return void
 */
const registerEvent = () => {
  // 左移事件
  emitter.off('onMoveLeft')
  emitter.on('onMoveLeft', () => {
    console.log('[ 左移======== ] >')
    moveLeft()
  })

  // 右移事件
  emitter.off('onMoveRight')
  emitter.on('onMoveRight', () => {
    console.log('[ 右移======== ] >')
    moveRight()
  })

  // 顺时针旋转
  emitter.off('onClockwise')
  emitter.on('onClockwise', () => {
    console.log('[ 顺时针旋转======== ] >')
    clockWise()
  })
  // 逆时针旋转
  emitter.off('onAntiClockwise')
  emitter.on('onAntiClockwise', () => {
    console.log('[ 逆时针旋转======== ] >')
    antiClockwise()
  })
  // 开始事件
  emitter.off('onStart')
  emitter.on('onStart', () => {
    console.log('[ 开始======== ] >')
    run()
  })
  // 暂停事件
  emitter.off('onStop')
  emitter.on('onStop', () => {
    console.log('[ 暂停======== ] >')
    stop()
  })
  // 重置事件
  emitter.off('onReset')
  emitter.on('onReset', () => {
    console.log('[ 重置======== ] >')
    reset()
  })
}

onMounted(() => {
  tetrisCanvas = tetris.value
  tetrisCanvasCtx = tetrisCanvas.getContext("2d")
  width.value = tetrisCanvas.width
  height.value = tetrisCanvas.height
  tetrominoStore.updateNext()
  emitter.emit('onUpdateNext')
  initMapArray()
  // 注册事件
  registerEvent()

})
</script>

<template>
  <div class="main-view">
    <canvas id="tetris" ref="tetris" width="300" height="600"></canvas>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/variables.scss';
.main-view {
  width: 300px;
  height: 600px;
  background: $viewBg;
  border: 1px solid $border;
}
</style>