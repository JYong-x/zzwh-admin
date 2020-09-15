import Modal from 'ant-design-vue/es/modal'
export default (Vue) => {
  function dialog (component, componentProps, modalProps) {
    const _vm = this
    modalProps = modalProps || {}
    if (!_vm || !_vm._isVue) {
      return
    }
    let dialogDiv = document.querySelector('body>div[type=dialog]')
    if (!dialogDiv) {
      dialogDiv = document.createElement('div')
      dialogDiv.setAttribute('type', 'dialog')
      document.body.appendChild(dialogDiv)
    }

    const handle = function (checkFunction, afterHandel, self) {
      if (checkFunction instanceof Function) {
        const res = checkFunction()
        if (res instanceof Promise) {
          res.then(c => {
            if (c) {
              afterHandel(c)
            } else {
              self.confirmLoading = false
            }
          })
        } else {
          res && afterHandel()
        }
      } else {
        // checkFunction && afterHandel()
        checkFunction || afterHandel()
      }
    }

    const dialogInstance = new Vue({
      data () {
        return {
          visible: true,
          confirmLoading: false
        }
      },
      router: _vm.$router,
      store: _vm.$store,
      mounted () {
        this.$on('close', (v) => {
          this.handleClose()
        })
      },
      methods: {
        handleClose () {
          handle(this.$refs._component.onCancel, () => {
            this.visible = false
            this.$refs._component.$emit('close')
            this.$refs._component.$emit('cancel')
            if (typeof modalProps.cancel === 'function') {
              modalProps.cancel()
            }
            dialogInstance.$destroy()
          })
        },
        handleOk () {
          this.confirmLoading = true
          handle(this.$refs._component.onOK || this.$refs._component.onOk, (data) => {
            this.confirmLoading = false
            this.visible = false
            this.$refs._component.$emit('close')
            this.$refs._component.$emit('ok')
            console.log(data)
            if (typeof modalProps.ok === 'function') {
              modalProps.ok(data)
            }
            dialogInstance.$destroy()
          }, this)
        }
      },
      render: function (h) {
        const that = this
        const modalModel = modalProps && modalProps.model
        if (modalModel) {
          delete modalProps.model
        }
        const ModalProps = Object.assign({}, modalModel && { model: modalModel } || {}, {
          attrs: Object.assign({}, {
            ...(modalProps.attrs || modalProps)
          }, {
            visible: this.visible,
            confirmLoading: this.confirmLoading
          }),
          on: Object.assign({}, {
            ...(modalProps.on || modalProps)
          }, {
            ok: () => {
              that.handleOk()
            },
            cancel: () => {
              that.handleClose()
            }
          })
        })

        const componentModel = componentProps && componentProps.model
        if (componentModel) {
          delete componentProps.model
        }
        const ComponentProps = Object.assign({}, componentModel && { model: componentModel } || {}, {
          ref: '_component',
          attrs: Object.assign({}, {
            ...((componentProps && componentProps.attrs) || componentProps)
          }),
          on: Object.assign({}, {
            ...((componentProps && componentProps.on) || componentProps)
          })
        })

        return h(Modal, ModalProps, [h(component, ComponentProps)])
      }
    }).$mount(dialogDiv)
  }

  Object.defineProperty(Vue.prototype, '$dialog', {
    get: () => {
      return function () {
        dialog.apply(this, arguments)
      }
    }
  })
}
