<template>
  <el-form ref="form" class="custom-form" v-bind="$attrs">
    <slot name="title" />
    <el-form-item v-for="(field, index) in schema" :key="index" class="custom-form-item" v-bind="filterFormItemAttrs(field)">
      <!--  v-show="handleControl(field.controlBy) && !field.hidden" -->
      <!--
        @input="handleInput($event,field)"
        @change="handleChange($event,field,index)"
        @select="handleChange($event,field,index)" -->
      <component :is="field.fieldType?'el-'+field.fieldType:field" v-model="field[field.vModel]" :default-first-option="true" v-bind="filterComponentAttrsfield(field)" clearable v-on="resetEvent(field)">
        <span v-if="field.slotDefault && !field[field.vModel]" v-html="field.slotDefault" />
        <!-- <component :is="field.append" /> -->
        <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
        <svg-icon  slot="prefix" style="color:#01ced1" v-if="field.prefix" :icon-class="field.prefix" />
        <component :is="field.slot" v-if="field.slot" />
        <template v-if="field.fieldType === 'select'">
          <el-option
            v-for="(item,i) in field.options||[]"
            :key="i"
            :disabled="item.disabled"
            :label="handleLabel(item,field)"
            :value="handleValue(item,field,i)"
          />
        </template>
        <template v-if="field.fieldType === 'radio-group'">
          <el-radio
            v-for="(item,i) in field.options"
            :key="i"
            :disabled="item.disabled"
            :label="handleValue(item,field,i)"
          >{{ handleLabel(item,field,i) }}</el-radio>
        </template>
      </component>
      <el-button v-if="field.append" :type="field.append.type || 'pramiry'" :disabled="field.append.disabled" :style="field.append.style" class="custom-input-append" @click="e=>field.append.click && field.append.click(e,field.append)">{{ field.append.text }}</el-button>
    </el-form-item>

    <!-- <el-form-item v-if="submitBtn" class="btn-box">
      <el-button v-if="!editing" type="primary" @click="onSubmit">立即创建</el-button>
      <el-button v-else type="warning" plain @click="onSubmit">修改</el-button>
    </el-form-item> -->
  </el-form>
</template>

<script>
// import { isEmpty } from '../units'
const isEmpty = obj => JSON.stringify(obj) === '[]' || JSON.stringify(obj) === '{}' || !obj
// import ElDivider1 from '@/components/divider/main'
// demo:{ fieldType: 'input', placeholder: '场地类型', label: '场地类型', vModel: 'name', name: '', required: true },
export default {
  name: 'ComForm',
  components: {
    // ElDivider1
  },
  props: {
    schema: {
      type: Array,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    },
    submitBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showMessage: false
    }
  },
  watch: {},
  created() {
    this._initValues = this.schema.map(item => [item.hidden, item.default])
    this.schema.forEach(item => {
      this.$set(item, item.vModel, item.default)
      if (item.required) this.$set(item, 'error', '')
    })
    // console.log(this._initValues)
  },
  mounted() {

  },
  methods: {
    verifyAll() {
      const obj = {}
      console.log(this.$attrs);
      
      this.schema.forEach(item => {
        // if (typeof item[item.vModel] === "string")
        //   item[item.vModel] = item[item.vModel].tirm();
        if (item.required && isEmpty(item[item.vModel]) && item[item.vModel] !== 0) item.error = item.errorMassage || this.$attrs.errorMassage  || '此项必填'
        else if (item.validate && !item.validate(item)) item.error = item.errorMassage|| '不合规则'
        else item.error = ''
        obj[item.vModel] = item[item.vModel]
      })
      const dataIsOk = !this.schema.some(item => !!item.error)
      delete obj.undefined
      return dataIsOk && obj
    },
    initForm() {
      this.schema.splice(this._initValues.length, this.schema.length - this._initValues.length)
      this.schema.forEach((item, index) => {
        item[item.vModel] = this._initValues[index][1]
        item.hidden = this._initValues[index][0]
        item.error = ''
      })
    },
    handleInput(value, item) {
      if (item.required && !item[item.vModel]) item.error = item.errorMassage
      else item.error = ''
      item.onInput && item.onInput(value, item)
    },
    handleChange($event, field, index) {
      const found = Array.isArray(field.options) && field.options.find(item => item.name === $event)
      field.onChange && field.onChange(field, $event, found, index)
    },
    // handleLabel(item, field) {
    //   if (labelOrValue === 'index') return index
    //   return typeof item === 'object' ? (labelOrValue ? item[labelOrValue] : item.name) : item
    // },
    handleValue(item, field, index) {
      const { optValue, valueKey } = field
      if (optValue === 'index') return index
      else if (valueKey) return item
      else { return typeof item === 'object' ? (optValue ? item[optValue] : item.value) : item }
    },
    handleLabel(item, field, index) {
      const { optLabel } = field
      return typeof item === 'object' ? (optLabel ? item[optLabel] : item.label) : item
    },
    handleControl(controlBy) {
      if (!controlBy || isEmpty(controlBy)) return true
      const found = this.schema.find(item => item.vModel === controlBy.name)
      return found ? (controlBy.handle && controlBy.handle(found[found.vModel])) : true
    },

    filterFormItemAttrs(field) {
      const { label, required, error, formItemStyle } = field
      return { label, required, error, style: formItemStyle }
    },
    filterComponentAttrsfield(field) {
      return field.fieldType ? field : {}
    },
    resetEvent(field) {
      const res = {}
      if (field.on) Object.keys(field.on).forEach(key => (res[key] = (...arg) => field.on[key].apply(null, [{ elementArgs: arg, field, context: this }])))
      if (field.fieldType === 'input' && !(field.on || {}).input) {
        res.input = value => {
          if (field.required && !field[field.vModel]) field.error = field.errorMassage
          else field.error = ''
        }
      }
      return res
    }
  }
}
</script>
<style scoped lang="scss">
.custom-form{
  .custom-form-item{
    .custom-input-append{
      position: absolute;
      top: 0px;
      right: 0px;
      width: 112px;
      border: solid 1px #ddd;
      border-radius: 0 4px 4px 0;
    }
  }
}
// .com-form {
//   position: relative;
//   &.form-flex {
//     display: flex;
//     flex-wrap: wrap;
//     & > div {
//       width: 33%;
//     }
//   }
//   & > .btn-box {
//     width: 100% !important;
//     display: flex;
//     justify-content: flex-end;
//   }
//   /deep/ .el-transfer-panel {
//     width: 38%;
//   }
//   /deep/ .el-form-item__label {
//     white-space: nowrap;
//     text-overflow:ellipsis;
//     overflow: hidden;
//   }
// }
</style>
