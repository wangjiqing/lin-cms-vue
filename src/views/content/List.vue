<script setup>
export default {
  name: 'List',
  data() {
    return {
      contentList: []
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="title">期刊内容列表</div>
    <div class="add-bottom">
      <el-button type="primary">新增内容</el-button>
    </div>
    <div class="table-container">
      <el-table :data="contentList"></el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
