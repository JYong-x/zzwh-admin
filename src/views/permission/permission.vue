<template>
  <page-view :title="false">
    <div class="table-operator">
      <a-button type="primary" @click="() => addItem()">添加</a-button>
    </div>
    <a-card :bordered="false">
      <template slot="extra">
        <a-input-search @pressEnter="search"></a-input-search>
      </template>
      <a-table
        :loading="loading"
        ref="table"
        :columns="columns"
        :data-source="permissionList"
        :row-key="(record) => record.id"
      >
        <div slot="action" slot-scope="text, record" class="table-row-action">
          <template>
            <a-divider type="vertical" />
            <a @click="editData(record)">编辑</a>
          </template>
          <template>
            <a-divider type="vertical" />
            <a @click="deleteData(record)">删除</a>
          </template>
        </div>
      </a-table>
    </a-card>
  </page-view>
</template>

<script>
import moment from 'moment'
import { PageView } from '@/layouts'
import STable from '@/components/Table'
import FormS from '@/components/Form'
export default {
  name: 'Contract',
  components: {
    PageView,
    STable
  },
  data () {
    return {
      params: {},
      loading: false,
      columns: [
        {
          title: '权限名称',
          dataIndex: 'permissionName',
          ellipsis: true
        },
        {
          title: '权限值',
          dataIndex: 'permissionKey',
          ellipsis: true
        },
        {
          title: '模块',
          dataIndex: 'module',
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      formItems: [
        {
          label: '模块',
          field: 'module',
          type: 'input',
          rules: { required: true, message: '请输入模块', trigger: 'change' }
        },
        {
          label: '权限名称',
          field: 'permissionName',
          type: 'input',
          rules: { required: true, message: '请输入权限名称', trigger: 'change' }
        },
        {
          label: '权限值',
          field: 'permissionKey',
          type: 'input',
          rules: { required: true, message: '请输入权限值', trigger: 'change' }
        }
      ],
      formApi: { module: 'permission', api: 'addData' },
      searchValue: '',
      permissionList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    moment,
    getData () {
      this.loading = true
      this.$api.permission.getList().then((res) => {
          this.permissionList = res.data
          this.loading = false
      })
    },
    search (e) {
      this.params.name = e.target.value
      this.$refs.table.refresh(true)
    },

    addItem () {
      this.$dialog(
        FormS,
        {
          formItems: this.formItems,
          form: {},
          formApi: this.formApi
        },
        {
          title: '添加权限',
          width: 700,
          centered: true,
          maskClosable: false,
          ok: this.getData
        }
      )
    },

    editData (record) {
      this.$dialog(
        FormS,
        {
          formItems: this.formItems,
          form: record,
          formApi: this.formApi
        },
        {
          title: '编辑权限',
          width: 700,
          centered: true,
          maskClosable: false,
          ok: this.getData
        }
      )
    },

    deleteData (record) {
      this.$api.permission.deleteData(record.id).then((res) => {
        this.refreshData()
      })
    },
    refreshData () {
      this.$refs.table.refresh()
    }
  }
}
</script>

<style lang="less" scoped>
.table-operator {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}
</style>
