<template>
  <div>
    <div class="header">
      <v-nav3
        is-home="true"
        v-if="!isMobile"
      />
      <mobile-nav v-if="isMobile"/>
    </div>
    <div class="c-box">
      <div class="box-title">
        <a href="">杠杆账户</a>
        杠杆管理
      </div>
      <div class="lever-left">
        <p class="lever-lt-tit">杠杆账户名称</p>
        <div class="lever-lc lc-ta">
          <p>币种</p>
          <i>风险率</i>
        </div>
        <div>
          <a
            href=""
            class="lever-lc lc-tb clk">
            <p>btc/usdt</p>
            <i>无风险</i>
          </a>
          <a
            href=""
            class="lever-lc lc-tb">
            <p>eth/USDT</p>
            <i>无风险</i>
          </a>
          <a
            href=""
            class="lever-lc lc-tb">
            <p>eth/USDT</p>
            <i>无风险</i>
          </a>
        </div>
      </div>
      <div class="lever-right">
        123
      </div>
    </div>
  </div>
</template>
<script>
import VNav3 from '@/components/VNav3'

export default {
  data () {

  },
  components: {
    VNav3
  },
  computed: {

  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  
  
  .header{
    background: #1A1A1A;
  }
  .c-box{
    width: 1200px;
    height: auto;
    margin: 0 auto;
    padding-top: 30px;
    .box-title{
      width: 100%;
      height: 80px;
      color: #333;
      font-size: 18px;
      line-height: 80px;
      font-weight: bold;
      margin-bottom: 60px;
      border-bottom: 1px solid #ccc;
      a{
        color: $primary-hover;
        position: relative;
        margin-right: 30px;
        &::after{
          content: ">";
          color: #333;
          position: absolute;
          right: -20px;
        }
      }
    }
    .lever-left{
      float: left;
      width: 247px;
      height: 485px;
      padding-top: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      .lever-lt-tit{
        color: #999;
        font-size: 14px;
        line-height: 34px;
        margin-bottom: 4px;
        padding-left: 17px;
      }
      .lever-lc{
        padding-left: 25px;
        padding-right: 30px;
        box-sizing: border-box;
        overflow: hidden;
        display: block;
        p{
          float: left;
        }
        i{
          float: right;
        }
      }
      .lc-ta{
        height: 44px;
        line-height: 44px;
        font-size: 16px;
      }
      a{
        &.lc-tb{
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #666;
        }
        &.clk,&:hover{
          color: $primary-hover;
          position: relative;
          background:#f3edd7;
          &::before{
            top: 0;
            left: 0;
            width: 4px;
            content: "";
            height: 40px;
            display: block;
            position: absolute;
            background: $primary;
          }
        }
      }
    }
    .lever-right{
      float: right;
      width: 905px;
    }
  }
</style>
