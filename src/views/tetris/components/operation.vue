<script setup lang="ts">
import { ref } from 'vue'
import emitter from '@/utils/bus'


const moveLeft = () => {
  emitter.emit("onMoveLeft")
}

const moveRight = () => {
  emitter.emit("onMoveRight")
}

const clockwise = () => {
  emitter.emit("onClockwise")
}

const antiClockwise = () => {
  emitter.emit("onAntiClockwise")
}

const start = () => {
  emitter.emit("onStart")
}

const stop = () => {
  emitter.emit("onStop")
}

const reset = () => {
  emitter.emit("onReset")
}

</script>

<template>
  <div class="operation-box">
    <n-button type="primary" @click="moveLeft">
      左
    </n-button>
    <n-button type="primary" @click="moveRight">
      右
    </n-button>
    <n-button type="primary" @click="clockwise">
      顺时针转
    </n-button>
    <n-button type="primary" @click="antiClockwise">
      逆时针转
    </n-button>
    <n-button type="primary" @click="start">
      开始
    </n-button>
    <n-button type="primary" @click="stop">
      暂停
    </n-button>
    <n-button type="primary" @click="reset">
      重置
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
.operation-box {
  margin-top: 15px;
  width: 300px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .n-button {
    margin-bottom: 10px;
  }
}
</style>