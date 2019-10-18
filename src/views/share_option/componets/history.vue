<template>
  <div class="history">
    <div v-if="!$store.state.userData" style="margin-top:50px;" flex="main:center"><el-button type="danger" @click="$router.push({path:'/user/login',query:{redirect:$route.path}})">登录</el-button> <el-button type="success">注册</el-button></div>
    <div v-else>
      <div v-if="data.length" style="min-height:100px;">
        <transition-group v-loading="!data.length" element-loading-background="rgba(0, 0, 0, 0.3)" appear name="list" tag="ul" class="content">
          <li v-for="(item) in data" :key="item.order_id">
            <div flex="main:justify cross:center">
              <div><span class="rise_or_fall">{{ item.symbol }} / {{ mapTabTimes[item.period] }}<svg-icon :icon-class="item.trade_type?'hong':'lv'" /> </span></div>
              <span v-if="item.sett_time" class="share-text-info">{{ item.create_time | parseTime }}</span>
            </div>
            <div flex="main:justify cross:center">
              <span class="share-text-info">投资 </span>
              <span class="share-text-info">收益 </span>
              <span class="share-text-info">价值 </span>
            </div>
            <div flex="main:justify cross:center">
              <span class="share-text-info">{{ item.amount }} {{ item.currency }}</span>
              <span :class="[`share-text-${+item.income>0? 'success':'danger'}`]">{{ item.income }} <i v-if="!item.income" class="el-icon-loading" /> {{ item.currency }}</span>
              <span class="share-text-info">{{ item.profile }} <i v-if="!item.profile" class="el-icon-loading" /> {{ item.currency }} </span>
            </div>
          </li>
        </transition-group>
      </div>
      <div v-else flex="dir:top cross:center" class="no-data">
        <svg-icon icon-class="404" style="font-size:50px" />
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapTabTimes } from '@/const'
export default {
  name: 'ShareHistory',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mapTabTimes
    }
  }
}
</script>
<style lang="scss" scoped>
.history{
  .content{
    &>li{
      line-height:1.8;
      padding: 10px 0;
      margin-bottom:10;
      border-bottom: 1px dashed #3B414F;
      font-size: 12px;
    }
  }
  .no-data{
    line-height: 50px;
    padding-top:50px;
    color: #999;
    border-top: 1px solid #2a3550
  }
}
.list-enter-active, .list-leave-active {
  transition: all 2s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}

</style>
