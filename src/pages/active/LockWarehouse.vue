<template>
  <div class="page-home">
    <div class="header">
      <v-nav
        is-home="true"
      />
    </div>
    <div class="banner">
      <span class="title">IX {{ $t('mining') }}</span>
    </div>
    <div class="c-box">
      <div class="top-box">
        <div class="top-cen">
          <div
            class="m-middle"
            v-if="isLogin">
            <span class="top-s-tit">{{ $t('ystd_trad') }}</span>
            <p class="top-s-txt top-txt-blue">{{ myTotal.amount_yesterday | round(2) | thousand }}<em>IX</em></p>
            <span class="top-s-tit">{{ $t('td_trad_amount') }}</span>
            <p class="top-s-txt top-txt-blue">{{ myTotal.amount_today | round(2) | thousand }}<em>IX</em></p>
            <!-- <span class="top-s-tit">{{ $t('td_trad') }}</span>
            <p class="top-s-txt top-txt-yellow">1BTC≈￥49999.98189</p> -->
          </div>
          <div
            class="m-middle"
            v-else>
            <span class="top-tit">{{ $t('ystd_trad_total') }}</span>
            <p class="top-txt top-txt-blue">{{ basePower.amount_yesterday | round(2) | thousand }}<em>IX</em></p>
            <!-- <span class="top-s-tit">{{ $t('td_trad') }}</span>
            <p class="top-s-txt top-txt-yellow">1BTC≈￥49999.98189</p> -->
          </div>
        </div>
        <div class="top-cen">
          <div
            class="m-middle"
            v-if="isLogin">
            <span class="top-s-tit">{{ $t('hash_rate') }}</span>
            <p class="top-s-txt top-txt-blue mar-bot">{{ myPower.power | round(2) }}<em>IX/H</em></p>
            <span class="top-s-tit">{{ $t('hash_rate_remain') }}</span>
            <p class="top-s-txt top-txt-blue">{{ (myRemainTotal >= 0 ? myRemainTotal : 0) | round(2) }}<em>IX</em></p>
          </div>
          <div
            class="m-middle"
            v-else>
            <span class="top-tit">{{ $t('current_base_power') }}</span>
            <p class="top-txt top-txt-blue">{{ basePower.power | round(2) }}<em>IX/H</em></p>
          </div>
        </div>
        <div class="top-cen">
          <div
            class="m-middle"
            v-if="isLogin">
            <span class="top-tit">{{ $t('current_base_power') }}</span>
            <p class="top-txt top-txt-blue">{{ basePower.power | round(2) }}<em>IX/H</em></p>
          </div>
          <div
            class="m-middle"
            v-else>
            <span class="top-tit">{{ $t('today_trad_total') }}</span>
            <p class="top-txt top-txt-blue">{{ basePower.amount_today | round(2) | thousand }}<em>IX</em></p>
          </div>
        </div>
        <div class="top-cen">
          <div
            class="m-middle"
            v-if="isLogin">
            <span class="top-tit">{{ $t('cum_trad_amount') }}</span>
            <p class="top-txt top-txt-blue">{{ myTotal.total | round(2) | thousand }}<em>IX</em></p>
          </div>
          <div
            class="m-middle"
            v-else>
            <span class="top-tit">{{ $t('totally_mine_total') }}</span>
            <p class="top-txt top-txt-blue">{{ basePower.total | round(2) | thousand }}<em>IX</em></p>
          </div>
        </div>
      </div>
    </div>
    <div class="c-box operating">
      <div class="oper-cen">
        <div class="oper-cen-tit col-yel">{{ $t('improve_hash_rate') }}</div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>{{ $t('available_balance') }}</span>
          </p>
          <p class="balance">{{ balance.available | round(4) }} IX</p>
        </div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>{{ $t('lock_amount') }}</span>
          </p>
          <input
            type="number"
            min="20000"
            :max="maxLock"
            step="20000"
            v-model="lock_amount"
            @input="lockAmountChanged"
            @blur="blur('lock')"
            :placeholder="$t('integer_ultiple')"
            class="balance">
          <a
            @click="setMax('lock')"
            class="num-max">{{ $t('maximum') }}</a>
        </div>
        <div class="current-lock-ix">
          {{ $t('current_lock_ix') }} {{ balance.locked }}IX
        </div>
        <v-btn
          class="oper-but"
          height="70"
          fontsize="16"
          :loading="lock_loading"
          @click="doLock"
          :disabled="lock_disable && isLogin"
          :label="isLogin ? $t('locked') : $t('lock_login')"
        />
      </div>
      <div class="oper-cen">
        <div class="oper-cen-tit">{{ $t('unlock') }}</div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>{{ $t('unlock_available') }}</span>
          </p>
          <p class="balance">{{ balance.locked }} IX</p>
        </div>
        <div class="oper-con">
          <p class="oper-con-l">
            <span>{{ $t('unlocked_amount') }}</span>
          </p>
          <input
            type="number"
            min="20000"
            :max="maxUnLock"
            step="20000"
            v-model="unlock_amount"
            @input="unlockAmountChanged"
            @blur="blur('unlock')"
            :placeholder="$t('integer_ultiple')"
            class="balance">
          <a
            @click="setMax('unlock')"
            class="num-max">{{ $t('maximum') }}</a>
        </div>
        <v-btn
          class="oper-but"
          height="70"
          fontsize="16"
          :loading="unlock_loading"
          @click="doUnLock"
          :disabled="unlock_disable && isLogin"
          :label="isLogin ? $t('unlock') : $t('unlock_login')"
        />
      </div>
      <div class="oper-cen">
        <div class="oper-cen-tit">{{ $t('unlocking') }}</div>
        <div class="oper-wait">
          <p class="num">{{ balance.unlocking }} IX</p>
          <span class="tips">*{{ $t('unlocked') }}</span>
        </div>
      </div>
    </div>
    <div
      class="c-box record"
      v-if="list.length">
      <div class="rec record-l">
        <div class="rec-tit">
          {{ $t('mining_records') }}
          <router-link
            v-if="isLogin"
            class="more"
            :to="{name: 'history'}">{{ $t('more') }}</router-link>
        </div>
        <div class="rec-t">
          <p class="re-a">{{ $t('time') }}</p>
          <p class="re-b">{{ $t('transaction_fee') }}</p>
          <p class="re-c">{{ $t('hash_rate_hour') }}</p>
          <p class="re-d">{{ $t('mining_output') }}</p>
          <p class="re-e">{{ $t('status') }}</p>
        </div>
        <div class="scroll-con">
          <ul>
            <li
              v-for="item in list"
              :key="item.mine_time">
              <p class="re-a">{{ item.mine_time | ts2date }}</p>
              <p class="re-b">{{ item.fee | round(4) | thousand }}</p>
              <p class="re-c">{{ item.power | thousand }}</p>
              <p class="re-d">{{ item.amount | round(4) | thousand }}</p>
              <p
                class="re-e"
                :class="{'c-yellow': item.state === 1, 'c-blue': item.state === 0}">{{ item.state === 1 ? $t('has_send') : $t('has_no_send') }}
                <span v-if="item.state === 0">
                  <em>{{ item.release_time | ts2date }} {{ $t('has_done') }} <i/> </em>
              </span></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="c-box condition">
      <p class="cdt-title">{{ $t('requirements') }}</p>
      <ul>
        <li><i>1.</i>{{ $t('req_a') }}</li>
        <li><i>2.</i>{{ $t('req_b', {power: basePower.power}) }}</li>
        <li><i>3.</i>{{ $t('req_c') }} <br >
          {{ $t('req_c_a') }} <br>
          {{ $t('req_c_b') }} <br>
          {{ $t('req_c_c') }} <br>
        </li>
        <li><i>4.</i>{{ $t('req_d') }}</li>
        <li><i>5.</i>{{ $t('req_e') }}</li>
        <li><i>6.</i>{{ $t('req_f') }}</li>
        <li>{{ $t('req_g') }}</li>
      </ul>
    </div>
  </div>

</template>
<script>
import VNav from '@/components/VNav3'
import VBtn from '@/components/VBtn'
import {state, actions} from '@/modules/store'
import service from '@/modules/service'
import utils from '@/modules/utils'

const MIN_AMOUNT_UNIT = 20000
export default {
  data () {
    return {
      state,
      lock_loading: false,
      unlock_loading: false,
      lock_disable: true,
      unlock_disable: true,
      unlock_amount: '',
      lock_amount: '',
      // 我的余额
      balance: {
        available: 0,
        unlocking: 0,
        locked: 0
      },
      // 我的算力
      myPower: {

      },
      // 我的统计
      myTotal: {

      },
      // 挖矿记录
      list: [],
      basePower: {
        power: 100
      }

    }
  },
  computed: {
    isLogin () {
      return this.state.userInfo
    },
    maxLock () {
      if (this.balance.available) {
        return this.$big(this.balance.available).div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
      }
      return 0
    },
    maxUnLock () {
      if (this.balance.locked) {
        return this.$big(this.balance.locked).div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
      }
      return 0
    },
    myRemainTotal () {
      return (this.myPower.power || 0) - (this.myPower.amount || 0)
    }
  },
  components: {
    VNav,
    VBtn
  },
  methods: {
    async doLock () {
      if (!this.isLogin) {
        actions.setLoginBack({
          fullPath: this.$route.fullPath
        })
        this.$router.push({
          name: 'login'
        })
        return
      }
      let amount = this.lock_amount
      this.lock_loading = true
      let res = await service.balanceLock({
        amount
      })
      this.lock_loading = false
      if (!res.code) {
        // todo
        this.lock_amount = ''
        utils.success(this.$t('lock_success') + amount + ' IX')
        this.reset('lock')
        this.fetch()
      } else {
        utils.alert(res.message)
      }
    },
    reset (type) {
      this.blur(type)
    },
    async doUnLock () {
      if (!this.isLogin) {
        actions.setLoginBack({
          fullPath: this.$route.fullPath
        })
        this.$router.push({
          name: 'login'
        })
        return
      }
      let amount = this.unlock_amount
      this.unlock_loading = true
      let res = await service.balanceUnLock({
        amount
      })
      this.unlock_loading = false
      if (!res.code) {
        // todo
        this.unlock_amount = ''
        utils.success(this.$t('unlock_success') + amount + ' IX')
        this.reset('unlock')
        this.fetch()
      } else {
        utils.alert(res.message)
      }
    },
    async fetch () {
      if (this.isLogin) {
        Promise.all([service.getMyPower(),
          service.getIxBalance(),
          service.getLockMineHistory(),
          service.getMyLockTotal()]).then(resp => {
          let myPowerRes = resp[0]
          if (!myPowerRes.code) {
            this.myPower = myPowerRes.data
          }
          let balanceRes = resp[1]
          if (!balanceRes.code) {
            this.balance = balanceRes.data
          }
          let listRes = resp[2]
          if (!listRes.code) {
            this.list = listRes.data
          }
          let myTotalRes = resp[3]
          if (!myTotalRes.code) {
            this.myTotal = myTotalRes.data
          }
        })
      } else {

      }
      let basePowerRes = await service.getLockMineTotal()
      if (!basePowerRes.code) {
        this.basePower = basePowerRes.data
      }
    },
    blur (type) {
      let amount = 0
      if (type === 'lock') {
        if (this.lock_amount === '') {
          this.lock_disable = true
          return
        }
        amount = this.$big(this.lock_amount)
        if (amount.mod(MIN_AMOUNT_UNIT) !== 0) {
          this.lock_amount = amount.div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
          if (!parseInt(this.lock_amount)) {
            this.lock_disable = true
          }
        }
      } else {
        if (this.unlock_amount === '') {
          this.unlock_disable = true
          return
        }
        amount = this.$big(this.unlock_amount)
        if (amount.mod(MIN_AMOUNT_UNIT) !== 0) {
          this.unlock_amount = amount.div(MIN_AMOUNT_UNIT).round(0, this.C.ROUND_DOWN).times(MIN_AMOUNT_UNIT).toString()
          if (!parseInt(this.unlock_amount)) {
            this.unlock_disable = true
          }
        }
      }
    },
    setMax (type) {
      if (type === 'lock') {
        this.lock_amount = this.maxLock
        this.lockAmountChanged()
        this.blur(type)
      } else {
        this.unlock_amount = this.maxUnLock
        this.unlockAmountChanged()
        this.blur(type)
      }
    },
    unlockAmountChanged () {
      if (parseInt(this.unlock_amount)) {
        if (this.$big(this.unlock_amount).gt(this.maxUnLock)) {
          this.unlock_amount = this.maxUnLock
        }
        if (!this.unlock_amount) {
          this.unlock_disable = true
        } else {
          this.unlock_disable = false
        }
      } else {
        this.unlock_disable = true
      }
    },
    lockAmountChanged () {
      if (parseInt(this.lock_amount)) {
        if (this.$big(this.lock_amount).gt(this.maxLock)) {
          this.lock_amount = this.maxLock
        }
        if (!this.lock_amount) {
          this.lock_disable = true
        } else {
          this.lock_disable = false
        }
      } else {
        this.lock_disable = true
      }
    }
  },
  async created () {
    await actions.updateSession()
    await this.fetch()
  }

}
</script>
<style lang="scss" scoped>
  @import "~@/styles/vars";
  @import "~@/styles/mixins";
  .page-home{
    background: #262D36;
  }
  .header{
    background: #1A1A1A;
  }
  .current-lock-ix {
      color: #446683
  }
  .banner{
    height: 500px;
    width: 100%;
    background-image: url(/static/active/LockWarehouse/banner.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    .title {
      font-size: 40px;
      color: #fff;
      width: 100%;
      padding-top: 350px;
      display: block;
      font-weight: bold;
      text-align: center;
    }
  }
  .c-box{
    width: 1200px;
    height: auto;
    position: relative;
    margin: 0 auto;
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      clear: both;
    }
  }
  .top-box{
    overflow: hidden;
    margin-top: -65px;
    margin-bottom: 53px;
    .top-cen{
      float: left;
      width: 290px;
      height: 177px;
      display: table;
      word-wrap:break-word;
      word-break: break-all;
      padding-left: 30px;
      padding-right: 30px;
      border-radius: 8px;
      margin-right: 13px;
      background: #2D3540;
      box-sizing: border-box;
      box-shadow:0px 0px 21px 0px rgba(32,36,39,0.3);
      .m-middle{
        display: table-cell;
        vertical-align: middle;
      }
      &:last-child{
        float: right;
        margin: 0;
      }
      .top-tit{
        font-size: 18px;
        height: 48px;
        line-height: 48px;
        display: block;
        color: #fff;
      }
      .top-txt{
        font-size: 28px;
        line-height: 60px;
        em {
          color: #6C869C;
          font-size: 18px;
          padding-left: 15px;
        }
      }
      .mar-bot{
        margin-bottom: 18px;
      }
      .top-s-tit{
        font-size: 18px;
        line-height: 24px;
        display: block;
        color: #fff;
      }
      .top-s-txt{
        font-size: 16px;
        line-height: 32px;
        em{
          color: #6C869C;
          font-size: 18px;
          padding-left: 15px;
        }
      }
      .top-txt-blue{
        color: #CBE6FD;
      }
      .top-txt-yellow{
        color: #CAAA6C;
      }
    }
  }
  .operating{
    background: #2D3540;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0 30px;
    margin-bottom: 14px;
    .oper-cen{
      float: left;
      width: 338px;
      padding-top: 20px;
      padding-bottom: 50px;
      margin-right: 63px;
      &:last-child{
        float: right;
        margin: 0;
      }
      .oper-cen-tit{
        font-size: 20px;
        text-indent: 15px;
        line-height: 66px;
        color: #fff;
      }
      .col-yel{
        color: #C2A378;
      }
      .oper-con{
        width: 100%;
        height: 58px;
        font-size: 14px;
        position: relative;
        margin-bottom: 12px;
        background: #24292F;
        .oper-con-l{
          width: 93px;
          height: 58px;
          display: table;
          padding-left: 15px;
          box-sizing: border-box;
          color: #A6BED3;
          float: left;
          span{
            display: table-cell;
            vertical-align: middle;
          }
        }
        .balance{
          float: left;
          width: 235px;
          line-height: 58px;
          color: #fff;
          padding: 0;
          margin: 0;
          border: 0;
          outline: none;
          background: none;
          &::placeholder{
            color: #446683;
          }
        }
        .num-max{
          position: absolute;
          text-align: center;
          line-height: 58px;
          color: #A6BED3;
          padding: 0 10px;
          display: block;
          height: 58px;
          right: 0;
          top: 0;
          &::before{
            background: #343E4C;
            position: absolute;
            margin-top: -11px;
            display: block;
            height: 22px;
            content: "";
            width: 1px;
            top: 50%;
            left: 0;
          }
        }
      }
      .oper-but{
        width: 100%;
        height: 68px;
        border: none;
        color: #fff;
        cursor: pointer;
        margin-top: 23px;
        border-radius: 4px;
        background: #CAAA6C;

        &.disabled {
          background: #353F4D;
          cursor: default;
          color: #A6BED3;

        }

        &:hover {
          opacity: 0.8;
        }
      }
      .oper-wait{
        height: 231px;
        background: #24292F;
        border-radius: 8px;
        position: relative;
        .num{
          text-align: center;
          line-height: 231px;
          color: #A6BED3;
          font-size: 30px;
        }
        .tips{
          font-size: 14px;
          color: #446683;
          position: absolute;
          display: block;
          bottom: 15px;
          text-indent: 20px;
        }
      }
    }
  }
  .record{
    font-size: 14px;
    margin-bottom: 37px;
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      clear: both;
    }
    .record-l{
      float: left;
    }
    .rec{
      padding: 18px 15px 0 15px;
      box-sizing: border-box;
      background: #2D3540;
      border-radius: 8px;
      text-align: center;
      height: 477px;
      width: 100%;
      .rec-tit{
        height: auto;
        color: #fff;
        font-size: 24px;
        line-height: 45px;
        position: relative;

        .more {
          position: absolute;
          color: #fff;
          font-size: 14px;
          right: 50px;
          &::after{
            content: ">";
            position: absolute;
            right: -15px;
          }
        }
      }
      .scroll-con{
        height: 330px;
        ul{
          li{
            height: 33px;
            line-height: 33px;
            color: #fff;
            .c-yellow{
              color: #C2A378;
            }
            .c-blue{
              color: #446683;
              position: relative;
              span{
                background: #3D4959;
                border-radius: 10px;
                position: absolute;
                margin-top: -10px;
                display: block;
                height: 20px;
                width: 20px;
                right: 40px;
                top: 50%;
                &::before{
                  line-height: 20px;
                  color: #5F7EA7;
                  font-size: 13px;
                  cursor: pointer;
                  display: block;
                  content: "?";
                  height: 20px;
                  width: 20px;
                }
                em{
                  width: 160px;
                  height: 43px;
                  line-height: 43px;
                  display: none;
                  position: absolute;
                  text-align: center;
                  color: #fff;
                  font-size: 12px;
                  background: #3D4959;
                  border-radius: 4px;
                  left: 10px;
                  top: -58px;
                  &::before{
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: -10px;
                    border-top: 12px solid #3D4959;
                    border-right: 14px solid transparent;
                  }
                }
                &:hover{
                  em{
                    display: block;
                  }
                }
              }
            }
          }
        }
        .no-record{
          font-size: 18px;
          line-height: 330px;
          color: #A6BED3;
        }
      }
    }
    .rec-t{
      height: 60px;
      line-height: 60px;
      overflow: hidden;
      font-size: 18px;
      color: #A6BED3;
    }
    .re-a{
      width: 20%;
      float: left;
    }
    .re-b{
      width: 25%;
      float: left;
    }
    .re-c{
      width: 25%;
      float: left;
    }
    .re-d{
      width: 15%;
      float: left;
    }
    .re-e{
      width: 15%;
      float: left;
    }
  }
  .condition{
    color: #CBE6FD;
    font-size: 14px;
    line-height: 20px;
    padding-bottom: 130px;
    .cdt-title{
      font-size: 20px;
      line-height: 38px;
      margin-bottom: 17px;
    }
    ul{
      li{
        padding-left: 25px;
        position: relative;
        margin-bottom: 5px;
        i{
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
  .lang-en {
    .top-s-tit{
      font-size: 13px !important;
      line-height: 24px !important;
      word-break: break-word;
    }
    .top-tit{
      font-size: 13px !important;
      line-height: 24px !important;
      word-break: break-word;
    }
    .condition{
      font-size: 14px !important;
    }
  }
  input{
    outline: medium;
    background: none;
    border: none;
    font-size: 18px;
    color: #ffffff;
    appearance: none;
    -moz-appearance:textfield;

    &::placeholder {
      // color: #446683;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
  }
</style>
