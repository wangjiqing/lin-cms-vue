<template>
  <div class="container">
    <div class="title">最新期刊</div>
    <div class="add-button">
      <el-button type="primary" @click="handleAdd" v-permission="'新增最新期刊'">添加最新期刊</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border highlight-current-row :cell-style="{ 'text-align': 'center' }">
        <el-table-column label="序号" width="60" type="index" />
        <el-table-column label="内存标题" prop="detail.title" />
        <el-table-column label="内容类型" prop="type">
          <template v-slot="scope">
            {{ type[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column label="内容介绍" prop="detail.content" />
        <el-table-column label="排序" prop="index" />
        <el-table-column label="是否展示">
          <template v-slot="scope">
            <el-tag v-if="scope.row.status === 1">展示中</el-tag>
            <el-tag v-else type="info">未展示</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button @click="handleEdit(scope.row)" v-permission="'编辑最新期刊列表'">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)" v-permission="'删除最新期刊列表编辑'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Flow from '@/models/flow'

export default {
  name: 'Flow',
  data() {
    return {
      tableData: [],
      type: {
        100: '电影',
        200: '音乐',
        300: '句子'
      }
    }
  },
  created() {
    this.getFlowList()
  },
  methods: {
    async getFlowList() {
      this.tableData = await Flow.getFlowList()
    },
    handleAdd() {

    },
    handleEdit() {

    },
    handleDelete() {

    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .add-button {
    padding: 20px 40px;
  }

  .table-container {
    padding: 0 40px 20px 40px;
  }
}
</style>