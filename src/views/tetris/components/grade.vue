<script setup lang="ts">
import { useGradeStore } from '@/store/grade'

const gradeStore = useGradeStore()

</script>

<template>
  <div class="grade-box">
    <span>{{ gradeStore.grade }}</span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/variables.scss';
.grade-box {
  width: 200px;
  height: 60px;
  background: $viewBg;
  border: 1px solid $border;
  line-height: 60px;
  text-align: center;
  font-size: 22px;
}
</style>