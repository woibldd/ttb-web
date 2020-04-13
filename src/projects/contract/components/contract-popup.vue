<template>
  <div class="contract-popup green" :style="{'right':am}">
    <h1><i></i>委托提交失败</h1>
    <span>下午6:12:40</span>
    <p>当前下单价格与盘口价格差异过大，无法提交委托。</p>
    <b @click="disappear"></b>
  </div>
</template>
<script>
// import {state} from '@/modules/store'
// import service from '@/modules/service'
// import throttle from 'lodash/throttle'
// import utils from '@/modules/utils'
// import isEmtpy from 'lodash/isEmpty'
export default {
  name: 'contractPopup',
  components: {
  },
  data () {
    return {
      am:0
    }
  },
  computed: {
  },
  created () {

  },
  methods: {
    disappear(){
      console.log(123213)
      this.am = '-340px'
    }
  }
}
</script>
<style lang="scss" scoped>

.contract-popup{
  position: fixed;
  bottom: 0;
  padding: 20px;
  width: 340px;
  min-height: 90px;
  -webkit-transition: all .3s;
  transition: all .3s;
  border-top: 4px solid #f00;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  &.red {
    background: #f6dddd;
    border-color: #f00;
    span{
      background:rgba(242,78,77,1);
    }
    h1,p{
      color:#F24E4D
    }
  }
  &.yellow {
    border-color: #22ced0;
    background:rgba(244,238,226,1);
    span{
      background:#22ced0;
    }
    h1,p{
      color:#22ced0
    }
  }
  &.green {
    border-color: #09C989;
    background:rgba(222,244,237,1);
    span{
      background:#09C989;
    }
    h1,p{
      color:#09C989
    }
  }
  h1{
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    margin-bottom: 20px;
  }
  span{
    font-size: 12px;
    position: absolute;
    right: 50px;
    top: 15px;
    display: block;
    text-align: center;
    width: 80px;
    height: 25px;
    color:#fff;
    line-height: 29px;
  }
  b{
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: #BEBEBE;
    display: block;
    border-radius: 50%;
    &:after{
      content: '';
      display: block;
      height: 3px;
      width: 10px;
      background-color: #ddd;
      transform: rotate(45deg);
      position: absolute;
      top: 9px;
      left: 5px;
      border: 10px;
    }
    &:before{
      content: '';
      display: block;
      height: 3px;
      width: 10px;
      background-color: #ddd;
      transform: rotate(135deg);
      position: absolute;
      top: 9px;
      left: 5px;
      border: 10px;
    }
  }
  p{
    font-size: 12px;
  }
}
</style>
