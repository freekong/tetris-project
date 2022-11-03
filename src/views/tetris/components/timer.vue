<script setup lang="ts">
import { ref } from 'vue'


</script>

<template>
  <div class="timer-box">
    <span>00:00</span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/variables.scss';
.timer-box {
  width: 200px;
  height: 60px;
  background: $viewBg;
  border: 1px solid $border;
  line-height: 60px;
  text-align: center;
  font-size: 22px;
}
</style>