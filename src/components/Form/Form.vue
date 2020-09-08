<template>
  <a-form-model
    ref="form"
    :model="stateForm"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <template v-for="item of formItems">
      <a-form-model-item
        :rules="item.rules"
        :prop="item.field"
        :label="item.label"
        :ref="item.field"
        :key="item.field"
      >
        <a-input v-model="stateForm[item.field]" v-if="item.type === 'input'"></a-input>
        <a-textarea v-else-if="item.type === 'textarea'" v-model="stateForm[item.field]"></a-textarea>
        <a-select v-else-if="item.type === 'select'">
          <a-select-option></a-select-option>
        </a-select>
      </a-form-model-item>
    </template>
  </a-form-model>
  <!-- <div>
    <div v-for="item of formItems" :key="item.field">{{item.field}}</div>
  </div>-->
</template>

<script>
export default {
  name: 'Form',
  props: {
    formItems: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => {}
    },
    formApi: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    labelCol: {
      type: Object,
      default: () => {
        return {
          span: 4
        }
      }
    },
    wrapperCol: {
      type: Object,
      default: () => {
        return {
          span: 14
        }
      }
    }
  },
  data () {
    return {
      stateForm: {}
    }
  },
  created () {
    console.log(23)
    console.log(this.formItems)
    this.formItems.forEach(item => {
      this.stateForm[item.field] = ''
    })
    this.stateForm = { ...this.stateForm }
  },
    methods: {
    onOk () {
      return new Promise(resolve => {
        console.log(this.formApi, this.$api[this.formApi.module])
        this.$api[this.formApi.module][this.formApi.api](this.stateForm).then(res => {
          console.log(res)
           resolve(true)
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

<style>
</style>
