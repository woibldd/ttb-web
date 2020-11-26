<template>
  <div class="number-input-box pl-16 pr-16" flex> 
    <div flex-box="1" class="input">
      <!-- <div class="input-label"><label> {{label}}</label></div>  -->
      <input class="input" v-model="value" :placeholder="$big(0).toFixed(scale || 2)" type="text">
    </div>
    <div flex-box="0" class="flex-lr drop-down">
      <el-popover
        popper-class="custom-popover"
        placement="bottom-end"
        v-model="show">
        <ul>
          <li v-for="(item, index) in list" 
            @click="handleSelectChange(item)"
            :key="index">
            <label><icon :name="`coin-${item}`" class="pr-10"/>{{item}}</label> 
          </li> 
        </ul>
        <div slot="reference">
          <span v-if="selectValue">
            <icon :name="`coin-${selectValue}`"/> 
            <label class="pl-3 pr-10">{{selectValue}}</label>  
          </span>
          <icon name="arrow-down" class="arrow drop-down"/>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: ['BTC', 'USDT', 'ETH',
    ], 
    scale: 2,
    label: '',
    value: '',
    selectValue: null
  },
  data() {
    return { 
      show: false
    }
  },
  methods: {
    handleSelectChange(org) {
      this.selectValue=org
      this.$emit('selectChange', org)
      this.show = false
    }
  },
  created() {
    if (!this.selectValue && this.list.length > 0) {
      // this.selectValue = this.list[0]
      this.handleSelectChange(this.list[0])
    }
  }
}
</script>

<style lang="scss">
.number-input-box {
  position: relative;
  padding: 5px; 
  border: 1px solid #e9ebf2;
  border-radius: 4px;
  .input-label { 
    color:#9aa1b1;
  }
  .input {
    border: none;
    width: 100%;
    height: 40px;
  }
  .drop-down {
    line-height: 40px;
  }
  .arrow { 
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: rotate(180deg);
    }
  }
}
  .custom-popover {
    max-height: 240px;
    overflow-x: hidden;
    overflow-y: auto;
    
    ul {
      li {
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        &:hover {
          background-color: rgba($primary, 0.1)
        }
      }
    } 
  }
</style>

