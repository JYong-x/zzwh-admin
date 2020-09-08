<template>
  <a-form-model
    ref="contractForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="name" label="名称" prop="name">
      <a-input v-model="form.name"></a-input>
    </a-form-model-item>
    <a-form-model-item ref="startOn" label="生效时间" prop="name">
      <a-input v-model="form.startOn"></a-input>
    </a-form-model-item>
    <a-form-model-item ref="endOn" label="到期时间" prop="name">
      <a-input v-model="form.endOn"></a-input>
    </a-form-model-item>
    <a-form-model-item ref="desc" label="简介" prop="name">
      <a-input v-model="form.desc"></a-input>
    </a-form-model-item>
    <a-form-model-item ref="img" label="图片" prop="name">
      <a-input v-model="form.name"></a-input>
    </a-form-model-item>
    <a-form-model-item ref="img" label="图片" prop="name">
      <a-input v-model="form.name"></a-input>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: 'ContractForm',
  props: {
    contract: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入合同名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onOk () {
      return new Promise(resolve => {
        this.$api.contract.addData(this.form).then(res => {
          console.log(res)
           resolve(true)
        })
        // setTimeout(() => {
        //   resolve(true)
        // }, 1000)
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

<style>
</style>
