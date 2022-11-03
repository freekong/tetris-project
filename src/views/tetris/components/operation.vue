<script setup lang="ts">
import { ref } from 'vue'


</script>

<template>
  <div class="operation-box">
    <n-button type="primary">
      左
    </n-button>
    <n-button type="primary">
      右
    </n-button>
    <n-button type="primary">
      顺时针转
    </n-button>
    <n-button type="primary">
      逆时针转
    </n-button>
    <n-button type="primary">
      开始
    </n-button>
    <n-button type="primary">
      暂停
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