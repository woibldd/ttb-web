<template>
  <div class="page-home">
    
    <div class="header">
      <v-nav2 :notice="notice" is-home="true" @hide="notice = null"/>
      <br >
      <router-link :to="{name:'Test2'}">go to test2</router-link>
      <br >
      <router-link :to="{name:'trading'}">go to trade</router-link>
      <br >
      <router-link :to="{name:'profile'}">go to profile</router-link>
      test1
      <p>
        <count-down :terminal="date"/>
      </p> 
    </div>
    <div class="body">
      <div style="width: 400px;" class="input">
        <label style="font-size: 22px; color: #fff;">二维码</label> 
        <el-input v-model="code"></el-input>
        <label class="mt-20" style="font-size: 22px; color: #fff;">token</label>
        <el-input v-model="token" ></el-input>

      </div>
      <div class="mt-20">
        <el-button @click="handleApplyScan">提交扫码结果</el-button>
        <el-button @click="handleApplyLogin">提交登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { state } from '@/modules/store'
import CountDown from '@/components/CountDown.vue'
import service from '@/modules/service'

export default {
  components: {
    CountDown
  },
  data() {
    return {
      state,
      news: [],
      notice: null,
      date: new Date(2018, 8, 20),
      code: '',
    }
  },
  computed: {
    token() {
      return (state.userInfo || {}).token
    }
  },
  methods: {
    handleApplyScan() {
      const params = {
        code: this.code,
        token: state.userInfo.token
      }
      service.setQrcodeRelation(params).then(res => {
        console.log(res)
      })
    },
    handleApplyLogin() { 
      const params = {
        code: this.code,
        token: state.userInfo.token
      }
      service.setQrcodeConfirm(params).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.page-home{
  background:#303E4B;
  height: 100vh;
  .header, .body {
    width: 1400px;
    margin: 0 auto;
  }
}
</style>
