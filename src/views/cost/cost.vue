<template>
  <page-view :title="false">
    <div class="table-operator-wrap">
      <a-button type="primary" :disabled="!selectedRowKeys.length">批量提交</a-button>
    </div>
    <a-card :bordered="false">
      <template slot="title">
        <a-radio-group v-model="activeFilterRadio">
          <a-radio-button v-for="radio of filterRadios" :key="radio.value" :value="radio.value">
            {{ radio.name }}
          </a-radio-button>
        </a-radio-group>
      </template>
      <template slot="extra">
        <a-input-search></a-input-search>
      </template>
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :row-key="record => record.id"
        :row-selection="{selectedRowKeys: selectedRowKeys, onChange: selectionChange}">
        <div slot="action" slot-scope="text, record" class="table-action">
          <a @click="deleteData(record)">删除</a>
        </div>
      </s-table>
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import STable from '@/components/Table'
export default {
  name: 'Cost',
  components: {
    PageView,
    STable
  },
  data () {
    return {
      pagination: {
        page: 1,
        pageSize: 10
      },
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
      contractList: [],
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

      selectedRowKeys: [],
      loadData: params => {
        return this.$api.cost.getList(this.params, this.pagination).then(res => {
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
    this.loadData()
  },
  methods: {
    onSelectChange (pagination) {
      this.pagination.page = pagination.current
      this.pagination.pageSize = pagination.pageSize
    },
    selectionChange (selectedRowKeys) {
      console.log(selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

    deleteData (record) {
      this.$api.cost.deleteData(record.id).then(res => {
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
