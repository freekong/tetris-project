<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { generateRandom } from '@/utils/tool'
import { coord, mapTetrominoI, mapTetrominoL, mapTetrominoJ, mapTetrominoO, mapTetrominoS, mapTetrominoZ, mapTetrominoT } from '@/utils/tetromino'

interface tetromino {
  coord: coord,
  type: String
}

const width = ref<Number>(0)
const height = ref<Number>(0)
const teRow = ref<Number>(20)
const teCol = ref<Number>(10)
const tetris = ref(null)
const offsetTop = ref<number>(0)
const mapArray = ref<Array<Array<Number>>>([[]])
const currentTetromino = ref<tetromino>({
  coord: {
    row: 0,
    col: 0
  },
  type: ''
})
const beforeTetromino = ref<tetromino>({
  coord: {
    row: 0,
    col: 0
  },
  type: ''
})
const dropEnd = ref<boolean>(true)
const tetrominoArray: Array<String> = ['I', 'L', 'J', 'O', 'S', 'Z', 'T']
let runTimer = null
let tetrisCanvas: any;
let tetrisCanvasCtx: any;


const initMapArray = () => {
  for (let i = 0; i < teRow.value; i++) {
    mapArray.value[i] = []
    for (let j = 0; j < teCol.value; j++) {
      mapArray.value[i][j] = 0
    }
  }
}

const run = () => {
  runTimer = setInterval(() => {
    dropTetromino()
  }, 1000)
}

/**
 * @description: 创建一个随机的块
 * @return {*}
 */
const createTetromino = () => {
  const num: number = generateRandom()
  console.log('[ num ] >', num)
  dropEnd.value = false
  currentTetromino.value.type = tetrominoArray[num]
  currentTetromino.value.coord = {
    row: -3,
    col: 4
  }
  const { coord, type } = currentTetromino.value
  tetrominoMapArray(type, coord, 1, 1)
  drawTetris()

}

const dropTetromino = () => {
  if (dropEnd.value) {
    createTetromino()
  } else {
    clearBefore()
    currentTetromino.value.coord.row ++;
    const { coord, type } = currentTetromino.value
    tetrominoMapArray(type, coord, 1, 1)
    drawTetris()
  }
}

/**
 * @description: 清除映射数组中上一次的块的信息
 * @return {*}
 */
const clearBefore = () => {
  const { coord, type } = beforeTetromino.value
  tetrominoMapArray(type, coord, 1, 0)
}

/**
 * @description: 将块映射到数组中
 * @param {*} type [块的类型]
 * @param {*} row [行]
 * @param {*} col [列]
 * @param {*} direction [方向：顺时针1，2，3，4 对应 上，右，下，左]
 * @return {*}
 */
const tetrominoMapArray = (type: String, currentTetrominoCoord: coord, direction: number, lightState: number) => {
  
  let changedMapArray: Array<coord> = []
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
    // debugger
    console.log('[ beforeTetromino ] >', beforeTetromino.value)
    beforeTetromino.value = {
      type: JSON.parse(JSON.stringify(type)),
      coord: JSON.parse(JSON.stringify(currentTetrominoCoord))
    }
  }
  judgeTetromino(changedMapArray, lightState)
  setMapArray(changedMapArray, lightState)
  
}

/**
 * @description: 判断下落的快的位置是否合法
 * @return {*}
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
    console.log('[ el ] >', el)
    const { row, col } = el
    if (row >= 0 && row < 20) {
      mapArray.value[row][col] = lightState
    }
  }
}


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

const clearCanvas = () => {
  tetrisCanvasCtx.clearRect(0, 0, width.value, height.value);
}

onMounted(() => {
  tetrisCanvas = tetris.value
  tetrisCanvasCtx = tetrisCanvas.getContext("2d")
  width.value = tetrisCanvas.width
  height.value = tetrisCanvas.height
  initMapArray()
  // run()        

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