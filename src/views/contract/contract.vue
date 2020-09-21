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
        <div slot="action" slot-scope="text, record" class="table-action">
          <a @click="deleteData(record)">删除</a>
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
          title: '名称',
          dataIndex: 'name',
          width: 100,
          fixed: 'left'
        },
        {
          title: '编号',
          dataIndex: 'id',
          width: 100
        },
        {
          title: '甲方代表单位',
          dataIndex: 'partACompany',
          width: 150
        },
        {
          title: '乙方代表单位',
          dataIndex: 'partBCompany',
          width: 150
        },
        {
          title: '丙方代表单位',
          dataIndex: 'partCCompany',
          width: 150
        },
        {
          title: '到期时间',
          dataIndex: 'endOn',
          customRender: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
          width: 100
        },
        {
          title: '创建人',
          dataIndex: 'createBy',
          width: 100
        },
        {
          title: '创建时间',
          dataIndex: 'createOn',
          customRender: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
          width: 100
        },
        {
          title: '生效时间',
          dataIndex: 'startOn',
          customRender: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 100,
          fixed: 'right'
        }
      ],
      formItems: [
        {
          label: '名称',
          field: 'name',
          type: 'input',
          rules: { required: true, message: '请输入合同名称', trigger: 'change' }
        },
        {
          label: '生效时间',
          field: 'startOn',
          type: 'date',
          rules: { required: true, message: '请输入生效时间', trigger: 'change' }
        },
        {
          label: '到期时间',
          field: 'endOn',
          type: 'date',
          rules: { required: true, message: '请输入到期时间', trigger: 'change' }
        },
        {
          label: '简介',
          field: 'desc',
          type: 'textarea'
        },
        {
          label: '图片',
          field: 'imgUrl',
          type: 'upload'
        },
        {
          label: '甲代表方单位',
          field: 'partACompany',
          type: 'input'
        },
        {
          label: '甲代表方姓名',
          field: 'partAName',
          type: 'input'
        },
        {
          label: '甲代表方身份证号',
          field: 'partAPhone',
          type: 'input'
        },
        {
          label: '乙代表方单位',
          field: 'partBCompany',
          type: 'input'
        },
        {
          label: '乙代表方姓名',
          field: 'partBName',
          type: 'input'
        },
        {
          label: '乙方代表方身份证号',
          field: 'partBPhone',
          type: 'input'
        },
        {
          label: '丙代表方单位',
          field: 'partCCompany',
          type: 'input'
        },
        {
          label: '丙代表方姓名',
          field: 'partCName',
          type: 'input'
        },
        {
          label: '丙方代表方身份证号',
          field: 'partCPhone',
          type: 'input'
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
    console.log(this.moment('2020-09-23T13:10:42.250Z').format('YYYY-MM-DD HH:mm:ss'))
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
          title: '添加合同',
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
