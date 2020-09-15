<template>
  <page-view :title="false">
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
        :columns="columns"
        :data="loadData"
        :row-key="(record) => record.id"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: selectionChange }"
      >
      </s-table>
    </a-card>
  </page-view>
</template>

<script>
import { trimData } from '@/utils/util'
import { PageView } from '@/layouts'
import STable from '@/components/Table'
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
        console.log(123123)
        const params = trimData(this.params)
        return this.$api.cost.getList(params, parameter).then((res) => {
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
  created () {},
  methods: {
    search (e) {
      this.params.name = e.target.value
      this.$refs.table.refresh()
    },
    selectionChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
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
