<template>
  <page-view :title="false">
    <div class="table-operator">
      <a-button type="primary" @click="() => addItem()">添加</a-button>
      <a-button :disabled="!selectedRowKeys.length">批量提交</a-button>
    </div>
    <a-card :bordered="false">
      <template slot="title">
        <a-radio-group v-model="activeFilterRadio">
          <a-radio-button v-for="radio of filterRadios" :key="radio.value" :value="radio.value">{{
            radio.name
          }}</a-radio-button>
        </a-radio-group>
      </template>
      <template slot="extra">
        <a-input-search @pressEnter="search"></a-input-search>
      </template>
      <s-table
        ref="table"
        showPagination="auto"
        :scroll="{x: 1500}"
        :columns="columns"
        :data="loadData"
        :row-key="(record) => record.id"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: selectionChange }"
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
      </s-table>
    </a-card>
  </page-view>
</template>

<script>
import moment from 'moment'
import { trimData } from '@/utils/util'
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
          title: '姓名',
          dataIndex: 'name',
          width: 100,
          fixed: 'left',
          ellipsis: true
        },
        {
          title: '编号',
          dataIndex: 'id',
          width: 100,
          ellipsis: true
        },
        {
          title: '部门',
          dataIndex: 'depart',
          width: 150,
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 120,
          fixed: 'right'
        }
      ],
      formItems: [
        {
          label: '姓名',
          field: 'name',
          type: 'input',
          rules: { required: true, message: '请输入姓名', trigger: 'change' }
        }
      ],
      formApi: { module: 'contract', api: 'addData' },
      activeFilterRadio: '全部',
      filterRadios: [
        {
          value: '全部',
          name: '全部'
        },
        {
          value: '待办',
          name: '待办'
        }
      ],
      searchValue: '',

      selectedRowKeys: [],
      loadData: (parameter) => {
        console.log(parameter)
        const params = trimData(this.params)
        return this.$api.contract.getList(params, parameter).then((res) => {
          console.log(res)
          return res.data
        })
      },
      options: {
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  created () {
  },
  methods: {
    moment,
    search (e) {
      this.params.name = e.target.value
      this.$refs.table.refresh(true)
    },
    selectionChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
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
          title: '添加用户',
          width: 700,
          centered: true,
          maskClosable: false,
          ok: this.refreshData
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
          title: '编辑用户',
          width: 700,
          centered: true,
          maskClosable: false,
          ok: this.refreshData
        }
      )
    },

    deleteData (record) {
      this.$api.contract.deleteData(record.id).then((res) => {
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
