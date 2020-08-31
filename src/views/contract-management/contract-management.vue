<template>
  <page-view :title="false">
    <div class="table-operator-wrap">
      <a-button type="primary" :disabled="!selectedRowKeys.length">批量提交</a-button>
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
        <a-input-search></a-input-search>
      </template>
      <a-table
        :columns="columns"
        :data-source="contractList"
        :row-key="record => record.id"
        :row-selection="{selectedRowKeys: selectedRowKeys, onChange: selectionChange}"
      ></a-table>
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
export default {
  name: 'Management',
  components: {
    PageView
  },
  data () {
    return {
      columns: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '编号',
          dataIndex: 'number'
        },
        {
          title: '日期',
          dataIndex: 'time'
        }
      ],
      contractList: [
        {
          id: '1',
          name: '关于并购阿里集团合同',
          number: '9527-9527',
          time: '2020-10-01'
        },
        {
          id: '2',
          name: '关于并购字节跳动合同',
          number: '9527-9527',
          time: '2020-10-01'
        }
      ],
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

      selectedRowKeys: []
    }
  },
  methods: {
    selectionChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
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
