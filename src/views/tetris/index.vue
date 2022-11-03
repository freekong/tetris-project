<script setup lang="ts">
import mainView from "./components/mainView.vue";
import operation from "./components/operation.vue";
import next from "./components/next.vue";
import timer from "./components/timer.vue";
</script>

<template>
  <div class="tetris-box">
    <div class="main">
      <main-view />
      <operation />
    </div>
    <div class="aside">
      <next />
      <timer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tetris-box {
  display: flex;
  .main {
    margin-right: 10px;
  }
}
</style>