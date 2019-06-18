<template>
  <div class="service-fee-set-container">
    <div class="profile-container">
      <div class="title-box">{{ $t('set_service_fee') }}</div>
      <div class="set-content">
        <div class="row-switch">
          <div>
            <span>{{ open ? $t('user_close_sevice_fee') : $t('user_open_sevice_fee') }}</span>
            <el-switch
              class="ml-11"
              v-model="open"
              @change="setFee"
              active-color="#23C88B"/>
          </div>

          <div class="ml-20">
            {{ $t('order_ix_total_discount') }}: {{ totalDiscount }} IX
          </div>
        </div>
        <div class="rules">
          <div class="rules__title mb-13">
            <span class="dot mr-8"/>{{ $t('user_service_fee_rules') }}
          </div>
          <div class="rules__detail">
            <p class="mb-6">{{ $t('user_service_fee_rule_a') }}</p>
            <p class="mb-6">{{ $t('user_service_fee_rule_b') }}</p>
            <p class="mb-6">{{ $t('user_service_fee_rule_c') }}</p>
            <p class="mb-6">{{ $t('user_service_fee_rule_d') }}</p>
            <p class="mb-6">{{ $t('user_service_fee_rule_e') }}</p>
          </div>
        </div>
        <div class="to-history">
          <router-link :to="{name: 'MyOrderNew'}">{{ $t('user_service_fee_history') }} >></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
export default {
  data () {
    return {
      open: false,
      totalDiscount: 0
    }
  },
  methods: {
    async setFee () {
      const params = {
        mode: this.open ? 1 : 0
      }
      console.log(params)
      try {
        const res = await service.setFeeDiscount(params)
        if (res && !res.code) {
          utils.success(this.$t('settinged'))
        }
      } catch (e) {
        console.log(e, 'error')
      }
    },
    async getStatus () {
      const res = await service.getFeeDiscountStatus()
      if (res && !res.code) {
        this.open = Boolean(res.data)
      }
    },
    async getTotalDiscount () {
      const res = await service.getIxTotalDiscount()
      if (res && !res.code) {
        this.totalDiscount = res.data
      }
    }
  },
  created () {
    this.getStatus()
    this.getTotalDiscount()
  }
}
</script>
<style lang="scss">
.service-fee-set-container{
    .el-switch__label.is-active {
        color: $primary-hover;
    }
}
</style>
<style lang="scss" scoped>
.service-fee-set-container {
    padding-left: 60px;
    float: left;
    .profile-container {
      width: 960px;
      position: relative;

      .title-box {
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: 600;
        color: $text-strong;
        border-bottom: 1px solid #e6e6e6;
        span{
            color: #999;
            font-size: 14px;
            padding-left: 15px;
            font-weight: lighter;
        }
      }
    }
    .row-switch {
        margin: 36px 0;
    }
    .row-switch {
        font-size: 16px;
        color: #333333;
        display: flex;
        align-items: center;
    }
    .rules {
        font-size: 12px;
        color: #999999;
    }
    .rules__title {
        font-size: 14px;
        color: #666;
    }
    .dot{
        display: inline-block;
        width:4px;
        height:4px;
        background:#01CED1;
        border-radius:50%;
    }
    .to-history {
        font-size: 16px;
        color: $primary;
        text-align: right;
        width: 100%;
        margin-top: 100px;
        cursor: pointer;
    }
  }
</style>
