<template>
  <page-view :title="false">
    <a-card title="角色列表">
      <template slot="extra">
        <a-button type="primary" icon="plus">添加角色</a-button>
      </template>
      <a-list class="role-list" item-layout="horizontal" :data-source="roleList">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions" @click="editRole(item)">编辑</a>
          <a slot="actions" @click="deleteRole(item)">删除</a>
          <a-list-item-meta>
            <span slot="title">{{ item.name }}</span>
          </a-list-item-meta>
          <div class="permission-wrap">
            <a-tag v-for="permission of item.permissions" :key="permission.id">{{ permission.permissionName }}</a-tag>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
export default {
  name: 'RoleList',
  components: { PageView },
  data () {
    return {
      roleList: [
        {
          id: '1',
          name: '管理员',
          permissions: [
            {
              id: '1',
              permissionKey: 'dashboard',
              permissionName: '总览',
              desc: ''
            },
            {
              id: '2',
              permissionKey: 'dashboard',
              permissionName: '合同管理',
              desc: ''
            },
            {
              id: '3',
              permissionKey: 'dashboard',
              permissionName: '角色',
              desc: ''
            }
          ]
        },
        {
          id: '2',
          name: '二级',
          permissions: [
            {
              id: '1',
              permissionKey: 'dashboard',
              permissionName: '总览',
              desc: ''
            },
            {
              id: '2',
              permissionKey: 'dashboard',
              permissionName: '合同管理',
              desc: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
    editRole () {},
    deleteRole () {}
  }
}
</script>

<style lang="less" scoped>
.role-list {
  .permission-wrap {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }
  /deep/ .ant-list-item-meta {
    flex: 0 0 120px;
  }
}
</style>
