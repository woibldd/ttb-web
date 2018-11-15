<template>
  <div class="page page-fee">
    <div style="page-fee-wrap">
      <div
        class="title_box"
        v-t="'footer_fee'"/>
      <div class="profile-left-container">
        <div class="left-menu-container left-menu-nobottom">
          <ul class="left-menu-list">
            <li class="">
              <router-link
                class="menu-name"
                active-class="active"
                :to="{name: 'Fee'}">{{ $t('transaction_fees') }}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-center-right">
        <div class="profile-container">
          <div class="title-box rate-tit">{{ $t('transaction_fees') }}</div>
          <div class="rate-tab">
            <div class="rate-tab-tit">
              <p class="lt rate-t-a">{{ $t('transaction_pair') }}</p>
              <p class="lt rate-t-b">{{ $t('maker') }}</p>
              <p class="lt rate-t-c">{{ $t('taker') }}</p>
            </div>
            <ul class="rate-ul">
              <li
                v-for="pair in pairList"
                :key="pair.name">
                <p class="lt rate-t-a">{{ pair.name | pairfix }}</p>
                <p class="lt rate-t-b">0.2%</p>
                <p class="lt rate-t-c">0.2%</p>
              </li>
            </ul>
          </div>
          <div class="rate-tips">
            <p class="rate-tips-title">{{ $t('tips') }}</p>
            <p>1. {{ $t('rate_tips_a') }}</p>
            <p>2. {{ $t('rate_tips_b') }}</p>
            <p>3. {{ $t('rate_tips_c') }}</p>
            <p>4. {{ $t('rate_tips_d') }}</p>
            <p>5. {{ $t('rate_tips_e') }}</p>
            <!-- <p>6. {{ $t('rate_tips_f') }}</p>
            <p>7. {{ $t('rate_tips_g') }}</p> -->
          </div>
        </div>
      </div>
  </div></div>

</template>

<script>
import service from '@/modules/service'
import { pairfix } from '@/mixins/index'
export default {
  mixins: [pairfix],
  name: 'Fee',
  components: {
  },
  data () {
    return {
      pairList: []
    }
  },
  async created () {
    let res = await service.getPairList()
    if (!res.code) {
      this.pairList = res.data.items
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/vars";
  @import '../styles/mixins';

  .page-fee {
    background: #ffffff;
    margin: 0 auto;
    width: 1180px;
    padding-top: 60px;
    padding-bottom: 100px;

    .title_box {
      height: 50px;
      border-bottom: 1px solid #e6e6e6;
      margin-bottom: 50px;
      font-size: 18px;
    }
  }

  .mobile {
    .page-fee {
      width: 100%;
    }
  }
  .profile-left-container {
    float: left;
    .left-menu-nobottom {
      border-bottom: 0;
      margin-bottom: 0;
    }
    .left-menu-container {
      background: #fff;
      position: relative;
      padding-bottom: 20px;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      box-sizing: border-box;
      margin-bottom: 16px;
      width: 160px;

      .left-menu-title {
        width: 100%;
        font-size: 14px;
        margin-left: 12px;
        text-align: left;
        color: $text-weak;
        box-sizing: border-box;

        .menu-title {
          margin-left: 6px;
        }
      }

      .left-menu-list {
        width: 100%;
        margin-top: 20px;

        .menu-name {
          box-sizing: border-box;
          width: 100%;
          display: inline-block;
          padding-left: 34px;
          color: $text-strong;

          &.active, &:hover {
            color: $primary;
            background: $profile-menu-bg;
            box-shadow: inset 3px 0 0 0 $primary;
          }
        }
        li {
          width: 100%;
          text-align: left;
          line-height: 36px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          margin-bottom: 5px;
        }
      }
    }
  }

  .user-center-right {
    padding-left: 60px;
    float: left;
    .profile-container {
      width: 960px;
      position: relative;
      .rate-tit{
        font-size: 18px;
        color: #666;
        width: 100%;
      }
      .rate-tab{
        width: 100%;
        height: auto;
        margin-top: 22px;
        font-size: 14px;
        color: #333;
        .rate-tab-tit{
          width: 100%;
          height: 35px;
          font-size: 12px;
          line-height: 35px;
          border-bottom: 1px solid #ccc;
        }
        .rate-ul{
          li{
            border-bottom: 1px solid #ccc;
            height: 45px;
            line-height: 45px;
          }
        }
        .lt{
          float: left;
        }
        .rate-t-a{
          width: 33%;
        }
        .rate-t-b{
          width: 34%;
          text-align: center;
        }
        .rate-t-c{
          width: 33%;
          text-align: right;
        }
      }
      .rate-tips{
        width: 100%;
        color: #999;
        font-size: 14px;
        margin-top: 35px;
        margin-bottom: 100px;
        p{
          margin-bottom: 5px;
        }
        .rate-tips-title  {
          color: #666;
          margin-bottom: 0;
          line-height: 44px;
          padding-left: 15px;
          position: relative;
          &::before{
            content: "";
            width: 4px;
            height: 4px;
            position: absolute;
            border-radius: 4px;
            background: $primary-hover;
            left: 0;
            top: 50%;
            margin-top: -2px;
          }
        }
      }
    }
  }
</style>
