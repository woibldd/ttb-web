<template>
  <div class="broker-h5">
    <div class="broker-h5-banner">
      <div class="broker-earth">
        <div class="broker-text-bg wow pulse" data-wow-iteration="infinite" data-wow-duration="2000ms"></div>
        <div class="broker-btn wow fadeInUp">
        <template v-if="uid !== '--'">
          <a class="join" :href="next" target="_blank">
            {{ $t('join') }}
          </a>
        </template>
        <template v-else>
          <a class="join" href="/user/login/email">
            {{ $t('join') }}
          </a>
        </template>
          <a class="login" href="https://freebarley.com/#/login?redirect=%2Fdashboard" target="_blank">
            {{ $t('login') }} >
          </a>
        </div>
      </div>
      <div class="broker-text wow slideInUp">
        <h1>
          {{ $t('bannerText') }}
        </h1>
        <h1>
          {{ $t('bannerText2') }}
        </h1>
      </div>
    </div>
    <div class="broker-h5-apply">
      <div class="apply-container">
        <div class="apply-text text-vk" style="width: 300px;">
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
    <div class="broker-h5-equity">
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
    <div class="broker-h5-way">
      <div class="broker-way-title text-vk text-vk1" style="width: 300px">
        <div class="l-line wow slideInLeft" data-wow-duration="500ms"></div>
        <span class="wow slideInDown">{{ $t('way') }}</span>
        <div class="r-line wow slideInRight" data-wow-duration="500ms"></div>
      </div>
      <div class="con">
        <div class="broker-way-text wow slideinleft" data-wow-duration="500ms">
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
              <dl style="color: #B5B5B5">
                <dd>{{ $t('tip_email') }}</dd>
                <dd>{{ $t('tip_phone') }}</dd>
                <dd>{{ $t('tip_content') }}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="broker-way-img wow slideinright" data-wow-duration="500ms">
          <img src="../../../assets/img/agent/message.png" alt="">
        </div>
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
      },
      next() {
        return '/planSubmit?lang=' + this.lang
      },
      uid () {
        if (state.userInfo) {
          return state.userInfo.id
        }
        return '--'
      }
    },
    methods: {
      joinHandle() {
        this.$router.push('/submit')
      }
    }
  }
</script>
