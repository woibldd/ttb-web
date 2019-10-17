<template>
  <div class="broker">
    <div class="broker-banner">
      <div class="broker-text wow pulse" data-wow-iteration="infinite" data-wow-duration="2000ms">
        <template v-if="lang === 'zh-CN'">
          <img src="../../assets/images/text.png" alt="" style="zoom: 1;display: block;margin: 0 auto;">
        </template>
        <template v-else>
          <img src="../../assets/images/text1.jpg" alt="" style="zoom: 1;display: block;margin: 0 auto;">
        </template>
      </div>
      <div class="broker-btn wow fadeInUp">
        <a class="join" href="javascript:;" @click="joinHandle">
            {{ $t('join') }}
          </a>
        <a class="login" href="https://freebarley.com/#/login?redirect=%2Fdashboard" target="_blank">
          {{ $t('login') }} >
        </a>
      </div>
      <div class="broker-text-tip">
        <div class="left-point wow bounceInLeft"></div>
        <div class="ct-text wow slideInUp">
          <p>
            {{ $t('bannerText') }}
          </p>
          <p>
            {{ $t('bannerText2') }}
          </p>
        </div>
        <div class="right-point wow bounceInRight"></div>
      </div>
    </div>
    <div class="broker-apply">
      <div class="apply-container">
        <div class="apply-text text-vk">
          <div class="l-line wow slideInLeft" data-wow-duration="500ms"></div>
          <span class="wow slideInDown">{{ $t('demand') }}</span>
          <div class="r-line wow slideInRight" data-wow-duration="500ms"></div>
        </div>
        <div class="apply-list wow fadeInUp" v-for="item in 5" :key="item"  :data-wow-delay="(100 + item * 100) + 'ms'">
          <div class="list-img"></div>
          <div class="list-text">
            {{ $t(`demand_${item}`) }}
          </div>
        </div>
      </div>
    </div>
    <div class="broker-equity">
      <div class="equity-title text-vk">
        <div class="l-line wow slideInLeft" data-wow-duration="500ms"></div>
        <span class="wow slideInDown">{{ $t('equity') }}</span>
        <div class="r-line wow slideInRight" data-wow-duration="500ms"></div>
      </div>
      <div class="equity-table wow slideInUp">
        <div class="equity-table-title">
          {{ $t('equity_content') }}
        </div>
        <div class="equity-table-list" v-for="item in 5" :key="item">
          <div class="count">
            {{ $t('equity_text')  }} {{ item }}
          </div>
          <div class="text">
            {{ $t(`equity_${ item }_text`) }}
          </div>
        </div>
      </div>
    </div>
    <div class="broker-way">
      <div class="broker-way-title text-vk text-vk1">
        <div class="l-line wow slideInLeft" data-wow-duration="500ms"></div>
        <span class="wow slideInDown">{{ $t('way') }}</span>
        <div class="r-line wow slideInRight" data-wow-duration="500ms"></div>
      </div>
      <div class="con">
        <div class="broker-way-text wow slideInLeft" data-wow-duration="500ms">
          <div class="broker-way-text-list">
            <div class="lt">{{ $t('application_email') }}</div>
            <div class="rt">service@ixx.com</div>
          </div>
          <div class="broker-way-text-list">
            <div class="lt">{{ $t('application_theme') }}</div>
            <div class="rt">{{ $t('tip_add') }}</div>
          </div>
          <div class="broker-way-text-list">
            <div class="lt">{{ $t('content') }}</div>
            <div class="rt">
              <dl>
                <dd>{{ $t('tip_email') }}</dd>
                <dd>{{ $t('tip_phone') }}</dd>
                <dd>{{ $t('tip_content') }}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="broker-way-img wow slideInRight" data-wow-duration="500ms"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import 'animate.css'
  import { WOW } from 'wowjs'
  import {state} from '@/modules/store'
  export default {
    mounted() {
      this.$nextTick(() => {
        var wow = new WOW({
          live: false
        })
        wow.init()
      })
    },
    computed: {
      lang() {
        return state.locale
      }
    },
    methods: {
      joinHandle() {
        this.$router.push('/planSubmit')
      }
    },
    created () {
      console.log(this.lang)
    }
  }
</script>
<style lang="scss">
</style>
