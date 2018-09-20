<template>
  <div class="ix-input-container">
    <span
      v-show="showLabel"
      class="ix-input__label">{{ label }}</span>
    <input
      class="ix-input__text"
      :class="{'ix-input__error': showErrorTips}"
      v-on="inputListeners"
      :autocomplete="autocomplete"
      :value="value"
      :placeholder="placeholder"
      :type="type">
    <span
      v-show="showErrorTips"
      class="ix-input__err-tips">{{ errTips }}</span>
    <span
      v-if="canDelete && value && value.length"
      @click="clearText"
      class="ix-quick-delete"/>
  </div>
</template>
<script>
import './ix-input.scss'
export default{
  data () {
    return {
      validateSuccess: false,
      errTips: '',
      isFocus: false,
      touched: false // 组件挂载后，没有被点击过
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {type: String, default: ''}, // 这里的value跟上面的model参数配合使用！！！
    triggerValidate: {type: Boolean, default: false}, // 外部触发非空提示
    type: {type: String, default: 'text'}, // 一般是text
    label: {type: String, default: '标题'}, // 左上角label
    emptyErrTips: {type: String, default: ''}, // 字段为空时错误提示
    placeholder: {type: String, default: ''},
    autocomplete: {type: String, default: 'off'},
    required: {type: Boolean, default: false}, // 是否必须， 提示字段为 emptyErrTips
    canDelete: {type: Boolean, default: true},
    rule: { // 校验提示语和规则
      type: Object,
      default () {
        return {
          errTips: '',
          validateFunc: () => {}
        }
      }
    }
  },
  computed: {
    showErrorTips () {
      if (!this.touched && this.triggerValidate) { // 外部触发错误校验
        this.validateSuccess = this.validate(this.value)
        return true
      } else {
        return this.touched && !this.isFocus && !this.validateSuccess
      }
    },
    showLabel () {
      return this.isFocus
    },
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          },
          focus: function (event) {
            vm.touched = true
            vm.isFocus = true
            vm.$emit('focus', event.target.value)
          },
          blur: function (event) {
            vm.isFocus = false
            vm.valueChange(event) // blur 和change 时候是否都需要这个呢 ？
            vm.$emit('blur', event.target.value)
          },
          change: function ($event) {
            vm.validateSuccess = vm.validate($event.target.value)
            vm.$emit('change', $event.target.value)
          }
        }
      )
    }
  },
  methods: {
    validate (value) {
      if (this.required && !value) {
        this.errTips = this.emptyErrTips
        return false
      }

      if (this.rule && this.rule.errTips) {
        this.errTips = this.rule.errTips
        const fun = this.rule.validateFunc
        if (fun(value)) {
          return false
        } else {
          return true
        }
      }
      return true
    },
    valueChange ($event) {
      this.validateSuccess = this.validate($event.target.value)
      this.$emit('change', $event.target.value)
    },
    clearText () {
      this.$emit('change', '')
    }
  }
}
</script>
