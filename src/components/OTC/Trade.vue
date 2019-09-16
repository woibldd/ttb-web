<template>
  <div class="trade-container">
    <assets v-if="isLogin"/>
    <tabs/>
    <otc-table/>
  </div>
</template>
<script>
import assets from './assets/assets.vue'
import otcTable from './order/otc-table.vue'
import tabs from './tabs/tabs.vue'
import service from '@/modules/service.js'
import { state } from '@/modules/store'

export default {
  components: {
    assets,
    otcTable,
    tabs
  },
  data() {
    return {
      kycVue: 0
    }
  },
  computed: {
    isLogin() {
      return state.userInfo !== null
    }
  },
  methods: {
    // async getKyc() {
    //   let res = service.isQualified(params)
    //   if(res.code===0) {
    //   }
    // }
  }
}

</script>

<style lang='scss'>
input{border: 0px}
.trade-container {
  width: 926px;
  .iconfont {
    //display: none;
    font-size: 23px;
    vertical-align: 0;
    &.active {
      display: inline;
      &.wechat{
        color:#7dd43c !important;
      }
      &.alipay {
        color:#0096EF !important;
      }
      &.card {
        color: orange !important;
      }
    }
  }
}
</style>
