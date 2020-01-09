<template>
  <el-select
    v-model="selectKey"
    size="mini"
    class="custom-select"
    @change="handleChange">
    <el-option
      v-for="(value,key) in mapLang"
      :key="key"
      :label="value"
      :value="key"
    />
  </el-select>
</template>
<script>
import { mapLang } from '../../const'
export default {
  data () {
    return {
      mapLang,
      selectKey: this.$i18n.locale
    }
  },
  methods: {
    handleChange (command) {
      this.$i18n.locale = this.selectKey
      localStorage.setItem('locale', this.selectKey)
    }
  }
}
</script>
<style lang="scss" scoped="this api replaced by slot-scope in 2.5.0+">
  // .custom-dropdown{
  //   .custom-dropdown-link{
  //     display: inline-block;
  //     width: 110px;
  //     height: 24px;
  //     margin-left: 20px;
  //     color: #fff;
  //     line-height: 24px;
  //     border-radius: 20px;
  //     border: 1px solid #fff;
  //     text-align: center;
  //     font-size: 12px;
  //     .el-icon--right{
  //       transition: all .2s
  //     }
  //     &:hover{
  //       cursor: default;
  //       .el-icon--right{
  //         transform: rotate(180deg)
  //       }
  //     }
  //   }

  // }
  .custom-select{
    border-radius: 4px;
    width: 110px;
    margin-left: 15px;
    border:1px solid #ccc
  }
</style>
