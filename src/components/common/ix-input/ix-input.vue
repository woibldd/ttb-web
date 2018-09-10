<template>
    <div class="ix-input-container">
        <span v-show="showLabel" class="ix-input__label">{{label}}</span>
        <input class="ix-input__text" :class="{'ix-input__error': showErrorTips}"
            v-on:change="valueChange($event)"
            @focus="inputFocus"
            @blur="inputBlur($event)"
            :autocomplete="autocomplete"
            :value="value"
            :placeholder="placeholder"
            :type="type">
        <span v-if="showErrorTips" class="ix-input__err-tips">{{errTips}}</span>
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
    type: {type: String, default: 'text'}, // 一般是text
    label: {type: String, default: '标题'}, // 左上角label
    emptyErrTips: {type: String, default: ''}, // 字段为空时错误提示
    placeholder: {type: String, default: ''},
    autocomplete: {type: String, default: 'off'},
    required: {type: Boolean, default: false}, // 是否必须， 提示字段为 emptyErrTips
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
      return this.touched && !this.isFocus && !this.validateSuccess
    },
    showLabel () {
      return this.isFocus
    }
  },
  methods: {
    inputFocus () {
      this.touched = true
      this.isFocus = true
    },
    inputBlur ($event) {
      this.isFocus = false
      this.valueChange($event) // blur 和change 时候是否都需要这个呢 ？
    },
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
    }
  }
}
</script>
