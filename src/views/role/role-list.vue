<template>
  <page-view :title="false">
    <a-card title="角色列表">
      <template slot="extra">
        <a-button type="primary" icon="plus" @click="() => addRole()">添加角色</a-button>
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
import RoleForm from './RoleForm'
export default {
  name: 'RoleList',
  components: { PageView },
  data () {
    return {
      formItems: [
        {
          label: '角色名称',
          field: 'name',
          type: 'input',
          rules: { required: true, message: '请输入合同名称', trigger: 'change' }
        },
        {
          label: '',
          field: 'permissions',
          type: 'checkboxGroup'
        }
      ],
      formApi: { module: 'role', api: 'addData' },
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
              id: '11',
              permissionKey: 'dashboard',
              permissionName: '增加合同',
              desc: ''
            },
            {
              id: '111',
              permissionKey: 'dashboard',
              permissionName: '删除合同',
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
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$api.role.getList().then((res) => {
          console.log(res)
          this.roleList = res.data || []
        })
    },
    addRole () {
      this.$dialog(
        RoleForm,
        {
          formItems: this.formItems,
          form: {},
          formApi: this.formApi
        },
        {
          title: '添加角色',
          width: 700,
          centered: true,
          maskClosable: false,
          ok: this.getList
        }
      )
    },
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
