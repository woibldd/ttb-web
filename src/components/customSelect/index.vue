<template>
  <!-- <el-dropdown class="custom-dropdown" @command="handleCommand">
    <span class="el-dropdown-link custom-dropdown-link">
      {{ mapLang[selectKey] }}<i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(value,key) in mapLang" :key="key" :style="{backgroundColor:selectKey === key && '#000'||'none'}" :command="key">{{ value }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> -->
  <el-select v-model="selectKey" v-bind="$attrs" class="custom-select" @change="handleChange">
    <el-option
      v-for="(item,index) in mapData"
      :key="index"
      :label="item.value"
      :value="item.value"
    />
    <!-- <div slot="prefix" class="markness">
      <slot name="prefix"></slot>
      <div class="sub-value">aaa</div>
    </div> -->
    <div slot="prefix">
      <slot name="prefix" :value="seletData.subValue"></slot>
    </div>
  </el-select>
</template>
<script>
// import { mapLang } from '@/const'
export default {
  props:{
    mapData:{
      type:[Object,Array],
      default:()=>[]
    },
    default:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      // mapLang,
      selectKey: this.default
    }
  },
  computed: {
    seletData(){
      return this.mapData.find(item=>item.value === this.selectKey)
    }
  },
  methods: {
    handleChange(command) {
      this.$i18n.locale = this.selectKey
    }
  }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
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
    border-radius: 50%;
    width: 170px;
    margin-left: 15px;
    & /deep/ .el-input__inner{
      background: transparent;
      color: #fff;
      // height: 40px;
    }
    
  }
</style>
