<template>
  <a-form-model
    ref="form"
    :model="stateForm"
    :rules="rules"
    :label-col="{span: 3}"
    :wrapper-col="{span: 20}"
  >
    <a-form-model-item label="角色名称">
      <a-input v-model="stateForm.name" prop="name"></a-input>
    </a-form-model-item>
    <a-checkbox-group v-model="stateForm.permissions" :options="plainOptions"></a-checkbox-group>
  </a-form-model>
</template>

<script>
export default {
  name: 'RoleForm',
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入角色名称' }]
      },
      stateForm: {
        name: '',
        permissions: []
      },
      plainOptions: []
    }
  },
  created () {
    this.getPermissionList()
  },
  methods: {
    getPermissionList () {
      this.$api.permission.getList().then(res => {
        if (res && res.status === 'success') {
          const data = res.data
          data.forEach(item => {
            item.label = item.permissionName
            item.value = item.id
          })
          this.plainOptions = data
        }
      })
    },
    onOk () {
        return new Promise(resolve => {
          this.$refs.form.validate((valid, values) => {
          if (!valid) {
            resolve(false)
            return
          }
            this.$api.role.addData(this.stateForm).then(res => {
              if (res && res.status === 'success') {
                resolve(res.data)
              } else {
                resolve(false)
              }
            })
            .catch(() => {
              resolve(false)
            })
          })
        })
      },
      onCancel () {
        return new Promise(resolve => {
          resolve(true)
        })
      }
  }
}
</script>
