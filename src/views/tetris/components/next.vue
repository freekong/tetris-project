<script setup lang="ts">
import { useTetrominoStore } from '@/store/tetrominoInfo'
import { ref, onMounted, reactive } from 'vue'
import { coord, mapTetrominoI, mapTetrominoL, mapTetrominoJ, mapTetrominoO, mapTetrominoS, mapTetrominoZ, mapTetrominoT, moveable } from '@/utils/tetromino'
import emitter from '@/utils/bus';

const mapArray = reactive<Array<Array<Number>>>([[]])
let changedMapArray = reactive<Array<coord>>([])
const canvasWidth = ref<Number | null>(0)
const canvasHeight = ref<Number>(0)

const tetrominoStore = useTetrominoStore()
const next = ref(null)
const row: number = 5
const col: number = 5
let nextCanvas: any = null
let nextCanvasCtx: any = null


const tetrominoMapArray = () => {
  const { type, direction } = tetrominoStore.tetrominoInfo.next
  const col = 2
  const row = 2
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
  initMapArray()
  setMapArray(changedMapArray)
  drawTetris()
}

const setMapArray = (changedMapArray: Array<coord> = []) => {
  for (let i = 0; i < changedMapArray.length; i++) {
    const el = changedMapArray[i];
    const { row, col } = el
    mapArray[row][col] = 1
  }
}

const clearCanvas = () => {
  nextCanvasCtx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
}

const drawTetris = () => {
  clearCanvas()
  for (let i = 0; i < mapArray.length; i++) {
    const rowItem = mapArray[i];
    for (let j = 0; j < rowItem.length; j++) {
      const colItem = rowItem[j];
      if (colItem === 1) {
        nextCanvasCtx.fillStyle = 'rgba(0,160,233,0.3)'
        nextCanvasCtx.fillRect(j * 30, i * 30, 30, 30)
        nextCanvasCtx.strokeRect(j * 30, i * 30, 30, 30)
      }
    }
  }
}

const initMapArray = () => {
  for (let i = 0; i < row; i++) {
    mapArray[i] = []
    for (let j = 0; j < col; j++) {
      mapArray[i][j] = 0
    }
  }
}

onMounted(() => {
  nextCanvas = next.value
  nextCanvasCtx = nextCanvas.getContext("2d")
  canvasWidth.value = nextCanvas.width
  canvasHeight.value = nextCanvas.height
  initMapArray()

  // 更新next
  tetrominoMapArray()
  emitter.off('onUpdateNext')
  emitter.on('onUpdateNext', () => {
    console.log('[ 更新next======== ] >')
    tetrominoMapArray()
  })
})

</script>

<template>
  <div class="next-box">
    <canvas ref="next" width="200" height="200"></canvas>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/variables.scss';
.next-box {
  width: 200px;
  height: 200px;
  background: $viewBg;
  border: 1px solid $border;
  margin-bottom: 20px;
}
</style>