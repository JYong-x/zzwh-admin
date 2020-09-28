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
        <a-date-picker v-else-if="item.type === 'date'" :value="date(stateForm[item.field])" @change="dateChange($event, item.field)"></a-date-picker>
        <a-select v-else-if="item.type === 'select'">
          <a-select-option></a-select-option>
        </a-select>
        <a-upload
          v-else-if="item.type === 'upload'"
          name="file"
          action="/api/upload"
          list-type="picture"
          :headers="headers"
          @change="fileChange($event, item.field)"
        >
          <a-button>
            <a-icon type="upload" />上传
          </a-button>
        </a-upload>
      </a-form-model-item>
    </template>
  </a-form-model>
  <!-- <div>
    <div v-for="item of formItems" :key="item.field">{{item.field}}</div>
  </div>-->
</template>

<script>
import moment from 'moment'
import { ACCESS_TOKEN } from '@/store/mutation-types'

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
          span: 5
        }
      }
    },
    wrapperCol: {
      type: Object,
      default: () => {
        return {
          span: 18
        }
      }
    }
  },
  data () {
    return {
      stateForm: {},
      headers: {
        AccessToken: this.$ls.get(ACCESS_TOKEN)
      }
    }
  },
  computed: {
    date () {
      return function (val) {
        if (val) {
          return moment(val)
        } else {
          return undefined
        }
      }
    }
  },
  created () {
    this.formItems.forEach(item => {
      this.stateForm[item.field] = ''
    })
    Object.assign(this.stateForm, this.form)
    this.stateForm = { ...this.stateForm }
  },
    methods: {
      moment,
      fileChange (data, field) {
        const { response } = data.file
        if (response && response.data) {
          const { AccessURL } = response.data
          this.stateForm[field] = AccessURL
        }
      },
      dateChange (dateObj, field) {
        this.stateForm[field] = dateObj
        this.stateForm = { ...this.stateForm }
      },
      onOk () {
        return new Promise(resolve => {
          this.$refs.form.validate((valid, values) => {
          if (!valid) {
            resolve(false)
            return
          }
            this.$api[this.formApi.module][this.formApi.api](this.stateForm).then(res => {
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

<style>
</style>
