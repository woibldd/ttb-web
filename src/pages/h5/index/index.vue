<template>
  <div class="h5-index-container">
    <div class="h5-page-header">
      <div class="header__left">
        <div class="title-pic"/>
        <div class="title--text">
          币币交易
        </div>
      </div>
      <div class="header__right">
        <span class="operate">登录</span>
        <span class="operate signup">注册</span>
        <span class="operate">三</span>
      </div>
    </div>
    <div class="h5-page__banner">
      <div class="banner-pic"/>
      <div class="banner-announce">
        <div class="intro">公告</div>
        <div class="news">"预挖矿"公告</div>
      </div>
    </div>
    <div 
class="mine-info-section"
         v-if="false">
      <mine-summary/>
    </div>
    <div class="h5-trading-summary">
      <div class="trading__title">
        {{ $t('exchange_area') }}
      </div>
      <pair-table/>
    </div>
  </div>
</template>
<script>
import './index.scss'
import MineSummary from '../mine-summary'
import PairTable from '@/components/Mobile/PairTable'

export default {
  data () {
    return {

    }
  },
  components: {
    MineSummary,
    PairTable
  }
}
</script>
