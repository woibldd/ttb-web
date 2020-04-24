<template>
  <el-select v-model="selectKey" :value-key="$attrs.label" v-bind="$attrs" class="custom-select" @change="handleChange">
    <el-option
      v-for="(item,index) in mapData"
      :key="index"
      :label="item[$attrs.label]"
      :value="item"
    />
    <!-- <div slot="prefix">
      <slot name="prefix" :value="seletData.subValue" />
    </div> -->
  </el-select>
</template>
<script>
// import { mapLang } from '@/const'
export default {
  model: {
    prop: 'selectValue',
    event: 'change'
  },
  props: {
    mapData: {
      type: [Object, Array],
      default: () => []
    },
    selectValue: {
      type: [Object, String],
      default: ''
    }
  },
  data() {
    return {
      // mapLang,
      selectKey: this.selectValue
    }
  },
  computed: {
    seletData() {
      return this.mapData.find(item => item.value === this.selectKey)
    }
  },
  watch: {
    selectValue(newValue) {
      this.selectKey = newValue
    }
  },
  methods: {
    handleChange(item) {
      this.$emit('change', item)

      // this.$i18n.locale = this.selectKey
    }
  }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
  .custom-select{
    // border-radius: 50%;
    width: 170px;
    margin-left: 15px;
    & /deep/ .el-input__inner{
      background: transparent;
      color: #fff;
      // height: 40px;
    }

  }
</style>
