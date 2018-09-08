<template>
<div class="page-home">
    <div class="header">
      <v-nav2 isHome="true" :notice="notice" @hide="notice = null"></v-nav2>
    </div>
    <div class="ind_cen">
        <div class="ix_logo"></div>
        <b class="ind_txt">{{$t("slogan")}}</b>
        <p class="count_down">
            <count-down :terminal="date"></count-down>
        </p>
        <div class="ind_but">
            <a :href="'/docs/The+Declaration+of+IX'+pdfSubfix+'.pdf'" target="_blank" class="xy">{{$t("declaration")}}</a>
            <a :href="'/docs/IX_WhitePaper'+pdfSubfix+'.pdf'" target="_blank" class="wb">{{$t("whitepagger")}}</a>
        </div>
    </div>
</div>
</template>
<script>
import VNav2 from '@/components/VNav2.vue'
import CountDown from '@/components/CountDown.vue'
import service from '@/modules/service'
import {state} from '@/modules/store'

export default {
  data () {
    return {
      news: [],
      notice: null,
      date: new Date(2018, 8, 20)
    }
  },
  components: {
    VNav2,
    CountDown
  },
  computed: {
    pdfSubfix () {
      if (state.locale === 'zh-CN') {
        return '+zh-CN'
      }
      return ''
    }
  },
  methods: {
    async fetchData () {
      let result = await service.getTerminalDate()
      this.date = result || new Date(2018, 8, 20)
    }
  },
  created () {
    //   this.fetchData()
  }
}
</script>
<style scoped lang="scss">
    @import "../styles/vars";
    .page-home{background:url(../assets/index_bg.jpg) center center;background-size:120% 100%;width:100%;position:absolute;height:100%;}
    @import "../styles/mixins";
    .ind_cen{text-align:center;width:100%;height:auto;
        .ix_logo{width:100%;height:81px;background:url(../assets/ix_a.png) no-repeat center center;margin-top:5%}
        .ind_txt{height:24px;line-height:24px;font-size:22px;color:#fff;display:block;margin-top:2.5%;}
        .count_down{background:url(../assets/hx.png) no-repeat center center;margin:4% 0 3% 0;
            div.countdown{font-size:58px;}
        }
        .ind_but{width:auto;height:30px;line-height:30px;display:table;margin:0 auto;
            a{width:120px;height:30px;display:block;border-radius:4px;color:#fff;margin:0 20px;float:left;padding:0;
                &.xy{background-image:url(../assets/xy.png);}
                &.wb{border:1px solid #fff;}
            }
        }
    }
</style>
