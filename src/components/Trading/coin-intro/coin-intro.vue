<template>
  <div class="coin-intro-container">
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
          <div class="issue-info-row">
            <span class="row__label">{{ $t('whitepagger') }}</span>
            <a
              target="_blank"
              :href="coinInfo.whitepagger"
              class="row__value c-primary">{{ coinInfo.whitepagger }}</a>
          </div>
          <div class="issue-info-row">
            <span class="row__label">{{ $t('office_website') }}</span>
            <a
              target="_blank"
              :href="coinInfo.office_website"
              class="row__value c-primary">{{ coinInfo.office_website }}</a>
          </div>
          <div class="issue-info-row">
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
import './coin-intro.scss'
import coinInfo from './coin-info.js'
import {state, actions} from '@/modules/store'

export default {
  data () {
    return {
      state,
      coinInfo: {}
    }
  },
  async created () {
    console.log(this.state, 'local')
    await actions.updateSession()
    const {locale} = this.state
    const coinType = this.state.pro.product_name
    this.coinInfo = coinInfo[coinType][locale]
  },
  watch: {
    'state.locale' (val) {
      const coinType = this.state.pro.product_name
      this.coinInfo = coinInfo[coinType][val]
    }
  }
}
</script>
