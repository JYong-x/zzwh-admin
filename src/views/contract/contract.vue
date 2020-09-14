<template>
  <page-view :title="false">
    <div class="table-operator-wrap">
      <a-button type="primary" @click="() => addItem()">添加</a-button>
      <a-button :disabled="!selectedRowKeys.length">批量提交</a-button>
    </div>
    <a-card :bordered="false">
      <template slot="title">
        <a-radio-group v-model="activeFilterRadio">
          <a-radio-button
            v-for="radio of filterRadios"
            :key="radio.value"
            :value="radio.value"
          >{{ radio.name }}</a-radio-button>
        </a-radio-group>
      </template>
      <template slot="extra">
        <a-input-search @pressEnter="search"></a-input-search>
      </template>
      <s-table
        ref="table"
        showPagination="auto"
        :columns="columns"
        :data="loadData"
        :row-key="record => record.id"
        :row-selection="{selectedRowKeys: selectedRowKeys, onChange: selectionChange}"
      >
        <div slot="action" slot-scope="text, record" class="table-action">
          <a @click="deleteData(record)">删除</a>
        </div>
      </s-table>
    </a-card>
  </page-view>
</template>

<script>
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
          dataIndex: 'name'
        },
        {
          title: '编号',
          dataIndex: 'id'
        },
        {
          title: '甲方代表单位',
          dataIndex: 'partACompany'
        },
        {
          title: '乙方代表单位',
          dataIndex: 'partBCompany'
        },
        {
          title: '丙方代表单位',
          dataIndex: 'partCCompany'
        },
        {
          title: '到期时间',
          dataIndex: 'endOn'
        },
        {
          title: '创建人',
          dataIndex: 'createBy'
        },
        {
          title: '创建时间',
          dataIndex: 'createOn'
        },
        {
          title: '生效时间',
          dataIndex: 'startOn'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
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
      loadData: parameter => {
        console.log(123123)
        const params = trimData(this.params)
        return this.$api.contract.getList(params, parameter).then(res => {
          console.log(res)
          return res
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
    search (e) {
      this.params.name = e.target.value
      this.$refs.table.refresh()
    },
    selectionChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    addItem () {
      this.$dialog(FormS,
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
          ok: this.loadData
        })
    },

    deleteData (record) {
      this.$api.contract.deleteData(record.id).then(res => {
        this.$refs.table.refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.table-operator-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}
</style>
