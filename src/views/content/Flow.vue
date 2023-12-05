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
            <el-button type="danger" @click="handleDelete(scope.row.id)" v-permission="'最新期刊列表内容删除'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="dialogTitle"
               :visible.sync="showDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @click="resetForm">
      <el-form ref="form" :model="temp" label-width="90px" :rules="rules">
        <el-form-item label="排序" prop="index">
          <el-input-number v-model="temp.index" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="期刊内容" prop="art">
          <el-cascader v-model="temp.art" :options="options"></el-cascader>
        </el-form-item>
        <el-form-item label="是否展示" prop="status">
          <el-switch v-model="temp.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="dialogTitle === '添加期刊' ? confirmAdd() : confirmEdit()">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="showDeleteDialog" width="400px">
      <span>确认删除期刊？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDeleteDialog = false">取 消</el-button>
        <el-button type="danger" @click="confirmDelete">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Flow from '@/models/flow'
import Content from '@/models/content'

export default {
  name: 'Flow',
  data() {
    return {
      tableData: [],
      type: {
        100: '电影',
        200: '音乐',
        300: '句子'
      },
      dialogTitle: '',
      showDialog: false,
      showDeleteDialog: false,
      id: null,
      temp: {
        art: [],
        index: 1,
        status: 1
      },
      rules: {
        art: [{ required: true, message: '期刊内容不能问空', trigger: 'blur' }]
      },
      options: []
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
      this.dialogTitle = '添加期刊'
      this.showDialog = true
      this.getContentOptions()
      this.resetForm()
    },
    async getContentOptions() {
      // 获取所有期刊内容
      const content = await Content.getContentList()
      // 格式化数据
      this.options = this._generateOptionsData(content)
    },
    _generateOptionsData(data) {
      // 删选出分类
      let types = []
      data.forEach(d => types.push(d.type))
      // 去重
      types = Array.from(new Set(types))
      // 构建一级分类选项
      const options = types.map(t => ({
        value: t,
        label: this.type[t],
        children: []
      }))
      // 向分类中填数据
      options.forEach((o, index) => {
        const children = []
        data.forEach(d => {
          if (d.type === o.value) {
            children.push({
              value: d.id,
              label: d.title,
              disabled: !d.status
            })
          }
        })
        options[index].children = children
      })
      return options
    },
    handleEdit(row) {
      this.id = row.id
      this.temp.index = row.index
      this.temp.art = [row.detail.type, row.detail.id]
      this.temp.status = row.status
      this.dialogTitle = '编辑期刊'
      this.showDialog = true
      this.getContentOptions()
    },
    handleDelete(id) {
      this.showDeleteDialog = true
      this.id = id
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    confirmAdd() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await Flow.addContentToFlow(this.temp.index, this.temp.art[0], this.temp.art[1], this.temp.status)
          this.$message.success(res.message)
          this.showDialog = false
          await this.getFlowList()
          this.resetForm()
        }
      })
    },
    confirmEdit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await Flow.editFlow(this.id, this.temp.index, this.temp.art[0], this.temp.art[1], this.temp.status)
          this.$message.success(res.message)
          this.showDialog = false
          await this.getFlowList()
          this.resetForm()
        }
      })
    },
    async confirmDelete() {
      const res = await Flow.delFlow(this.id)
      this.$message.success(res.message)
      this.showDeleteDialog = false
      this.getFlowList()
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
