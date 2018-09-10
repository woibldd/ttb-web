<template>
    <div class="ix-input-container">
        <span v-show="showLabel" class="ix-input__label">{{label}}</span>
        <input class="ix-input__text"
            :value="value"
            @change="$emit('change', $event.target.value)"
            @focus="inputFocus"
            @blur="inputBlur"
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
      isFocus: false,
      touched: false // 组件挂载后，被没有被点击过
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {type: String, default: ''}, // 这里的value跟上面的model参数配合使用！！！
    type: {type: String, default: 'text'},
    errTips: {type: String, default: '不能为空'},
    label: {type: String, default: '标题'},
    errorLocation: {type: String, default: 'below'},
    placeholder: {type: String, default: ''},
    required: {type: Boolean, default: true},
    rule: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    showErrorTips () {
      return this.touched && this.required && !this.isFocus && !this.value
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
    inputBlur () {
      this.isFocus = false
    }
  }
}
</script>
