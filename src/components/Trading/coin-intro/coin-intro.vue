<template>
  <div
    class="coin-intro-container"
    v-if="coinInfo">
    <div class="coin-intro__header">
      {{ $t('coin_intro') }}
    </div>
    <div class="coin-intro__body">
      <div class="coin-name">
        <span class="c-a5 f18 mb-9">{{ coinInfo.name }}</span>
        <span>
          {{ coinInfo.full_name }}
        </span>
      </div>
      <div class="coin-introduction">
        <div class="top c-a5 f14 mb-12">{{ $t('introduction') }}</div>
        <p class="detail">{{ coinInfo.brief_info }}</p>
      </div>
      <div class="coin-issue-info">
        <div class="normal-info">
          <div class="left">
            <div class="issue-info-row">
              <span class="row__label">{{ $t('issue_time') }}</span>
              <span class="row__value">{{ coinInfo.issue_time }}</span>
            </div>
            <div class="issue-info-row">
              <span class="row__label">{{ $t('token_price') }}</span>
              <span class="row__value">{{ coinInfo.token_price }}</span>
            </div>
          </div>
          <div class="right">
            <div class="issue-info-row">
              <span class="row__label">{{ $t('issue_all') }}</span>
              <span class="row__value">{{ coinInfo.issue_all }}</span>
            </div>
            <div class="issue-info-row">
              <span class="row__label">{{ $t('issue_circulation') }}</span>
              <span class="row__value">{{ coinInfo.issue_circulation }}</span>
            </div>
          </div>
        </div>

        <div class="info-width-url">
          <div class="issue-info-row line-1">
            <span class="row__label">{{ $t('whitepagger') }}</span>
            <a
              target="_blank"
              :href="coinInfo.whitepagger"
              class="row__value c-primary">{{ coinInfo.whitepagger }}</a>
          </div>
          <div class="issue-info-row ine-1">
            <span class="row__label">{{ $t('office_website') }}</span>
            <a
              target="_blank"
              :href="coinInfo.office_website"
              class="row__value c-primary l">{{ coinInfo.office_website }}</a>
          </div>
          <div class="issue-info-row line-1">
            <span class="row__label">{{ $t('chain_info') }}</span>
            <a
              target="_blank"
              :href="coinInfo.chain_info"
              class="row__value c-primary">{{ coinInfo.chain_info }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import coinInfo from './coin-info.js'
import {state} from '@/modules/store'
import service from '@/modules/service'

export default {
  data () {
    return {
      state,
      coinInfo: {}
    }
  },
  methods: {
    switchContent (coinType) { 
      const {locale} = this.state
      // this.getCurrency(coinType)
      if (coinInfo[coinType]) {
        this.coinInfo = coinInfo[coinType][locale]
      } else {
        // this.coinInfo = null
        this.getCurrency(coinType)
      }
    },
    getCurrency(coinType) {
      this.coinInfo = null
      service.getCurrencyList({
        currency: coinType, 
        lang: state.locale
      }).then(res => {
        if(!res.code && !!res.data){
          let coin = {}
          coin.name=res.data.currency
          coin.full_name=res.data.full_name
          coin.brief_info=res.data.intro
          coin.issue_time=res.data.issue_time
          coin.issue_all=res.data.issue_amount
          coin.issue_circulation=res.data.circulate_amount
          coin.token_price=res.data.raise_price
          coin.whitepagger=res.data.white_paper
          coin.office_website=res.data.home_page
          coin.chain_info=res.data.block_query
          this.coinInfo = coin 
        } 
      })
    },
  },
  created () {
    const coinType = this.state.pro.product_name
    this.switchContent(coinType)
  },
  watch: {
    'state.pro.product_name' (val) {
      this.switchContent(val)
    },
    'state.locale' (val) {
      const coinType = this.state.pro.product_name
      this.coinInfo = coinInfo[coinType][val]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./coin-intro.scss";
</style>
