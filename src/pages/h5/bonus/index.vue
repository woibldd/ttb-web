<template>
  <div class="receive-container"> 
    <div class="header">
      <div v-if="!isMobile" class="banner" 
        :style="{  backgroundImage: state.locale == 'zh-CN' ? `url(/static/receive/banner-zh-CN.png)` : `url(/static/receive/banner-en.png)`}">
        <div class="option">
          <el-button @click="show" class="button" type="primary">{{$t('gift.banner.btn_text')}}</el-button>
        </div>
      </div>
      <div v-else class="banner" 
        :style="{  backgroundImage: state.locale == 'zh-CN' ? `url(/static/receive/h5_banner-zh-CN.png)` : `url(/static/receive/h5_banner-en.png)`}">
        <div class="option">
          <el-button @click="show" class="button" type="primary">{{$t('gift.banner.btn_text')}}</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="card registration">
        <div class="left">
          <i :class="{en: state.locale != 'zh-CN'}">{{$t('gift.content.tips_1')}}</i>
          <p>
            <label>{{ gift_a.symbol + gift_a.amount }}</label>
          </p>
          <p>
            <span>{{ $t("gift.content.valuation", {value: valueA}) }}</span>
          </p>
        </div>
        <div class="right">
          <ul :class="{en: state.locale != 'zh-CN'}">
            <li>1.{{$t('gift.content.detail_a')}}</li>
            <li>2.{{$t('gift.content.detail_b')}}</li>
            <li>3.{{$t('gift.content.detail_c')}}</li>
            <li>4.{{$t('gift.content.detail_d')}}</li>
            <li>5.{{$t('gift.content.detail_e')}}</li>
          </ul>
        </div>
      </div>
      <div class="card deposit">
        <div class="left">
          <i :class="{en: state.locale != 'zh-CN'}">{{$t('gift.content.tips_2')}}</i>
          <p>
            <label>{{ gift_b.symbol + gift_b.amount }}</label>
          </p>
          <p>
            <span>{{ $t("gift.content.valuation", {value: valueB}) }}</span>
          </p>
        </div>
        <div class="right">
          <ul
            :class="{en: state.locale != 'zh-CN'}"
            >
            <li>1.{{$t('gift.content.detail_f')}}</li>
            <li>2.{{$t('gift.content.detail_g')}}</li>
            <li>3.{{$t('gift.content.detail_h')}}</li>
            <li>4.{{$t('gift.content.detail_i')}}</li>
            <li>5.{{$t('gift.content.detail_j')}}</li>
          </ul>
        </div>
      </div>
      <div class="option">
        <el-button  @click="show" class="button" type="primary">{{$t('gift.content.btn_text')}}</el-button>
      </div>
    </div> 

    <div class="footer">
      <article>
        <h3>{{$t('gift.footer.title')}}</h3>
        <p>{{$t('gift.footer.content')}}</p>
      </article>
    </div>
    <v-modal :open.sync="showModal">
      <div class="pop">
        <div class="title">{{ $t('gift.modal.title') }}</div>
        <p class="describe">{{ $t('gift.modal.describe') }}</p>
        <div class="qr-code">
          <div class="lt left">
            <img class="footer_ewm" src="../assets/ewm.png" />
            <p class="footer_ewm_ltxt">{{ $t('gift.modal.qr_a') }}</p>
          </div>
          <div class="lt right">
            <img class="footer_ewm" src="../assets/ewm.png" />
            <p class="footer_ewm_ltxt">{{ $t('gift.modal.qr_b') }}</p>
          </div>
        </div>
        <div class="contact">
          <div class="item">{{ $t('gift.modal.contact_a')}}</div>
          <div class="item">{{ $t('gift.modal.contact_b')}}</div>
          <div class="item">{{ $t('gift.modal.contact_c')}}</div>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
import service from "@/modules/service";
import { state } from "@/modules/store";
export default {
  data() {
    return {
      state,
      showModal: false,
      rates: [],
      gift_a: {
        amount: 10,
        symbol: "$",
        unit: "USD"
      },
      gift_b: {
        amount: 50,
        symbol: "$",
        unit: "USD"
      },
      fontSize: "16px"
    };
  },
  methods: {
    show() {
      if (!this.isLogin) {
        this.$router.replace({
          name: "login"
        })
      } else {
        this.showModal = true;
      }
    }
  },
  computed: { 
    isLogin () {
      return this.state.userInfo !== null
    },
    valueA() {
      if (this.rates)
        return this.$big(this.gift_a.amount).div(this.rates.USD || 1).round(8, 0).toFixed(8)
      return ''
    },
    valueB() {
      if (this.rates)
        return this.$big(this.gift_b.amount).div(this.rates.USD  || 1).round(8, 0).toFixed(8)
      return ''
    },
    isMobile() {
      return utils.isMobile()
    } 
  },
  async created() {
    let res = await service.getRates({ currency: "BTC" });
    if (!!res && !res.code) {
      this.rates = res.data.BTC;
    }
  }, 
  mounted() {
    this.fontSize = document.documentElement.style.fontSize;
    document.documentElement.style.fontSize = "13.3333vw"; 
  },
  destroyed() {
    document.documentElement.style.fontSize = this.fontSize;
  }
};
</script> 

<style lang="scss">
.receive-container{
  .header {
    height: 4rem;
    .banner {
      position: relative;
      height: 3.41rem;;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      text-align: center;
      .option {
        position: absolute;
        top: 2rem;
        width: 100%;
        text-align: center;
      }
    }
    .button {
      width: 5rem;
    }
  }
  .content {
    .card {
      height: 2.27rem;
      padding: .2rem;
      width: 7.07rem;
      margin: .4rem auto 0;
      border: 1px solid red;
      &.registration {
        background: url(/static/receive/h5_card_a@2x.png) center center/contain no-repeat ;
      }
      &.deposit {
        background: url(/static/receive/h5_card_b@2x.png) center center/contain no-repeat ;
      }
      .left {
        width: 2.78rem;
        float: left;
        color: #fff;
        p {
          text-align: center;
        }
        i {
          display: block;
          margin: .3rem 0 .1rem .2rem;
          width: .7rem;
          height: .23rem;
          line-height: .23rem;
          font-weight: bold;
          background: rgba(13, 147, 130, 1);
          border-radius: 2px;
          text-align: center;
          &.en {
            width: 1.4rem;
          }
        }
        label {
          font-size: .8rem;
        }
        span {
          font-size: .15rem;
        }
      }
      .right {
        width: 3.67rem;
        float: left;
        margin: .12rem .3rem;
        ul {
          li { 
            margin-bottom: .4rem; 
          }
          &.en {
            li {
              margin-bottom: 0;
            }
          }

        }
      }
      &:after {
        display: block;
        content: "";
        clear: both;
      }
    }
    .option {
      margin: .6rem 0 .8rem;
      text-align: center;
      .button {
        width: 5rem;
      }
    }
  }
  .footer {
    height: 3rem;
    background: url(/static/receive/h5_footer@2x.png) center center no-repeat;
    color: #fff;
    article {
      width: 6.39rem;
      margin: 0 auto;
      padding-top: 0.3rem;
      h3 {
        text-align: center;
        font-size: .22rem;
        margin-bottom: .3rem;
      }
      p {
        line-height: .4rem;
      }
    }
  }
  .pop {
    width: 4.4rem;
    padding: .32rem .57rem;
    .title {
      text-align: center;
      font-size: .18rem;
      margin-bottom: .1rem;
    }
    .contact, .describe {
      color: $primary;
      line-height: 2em; 
      text-align: center;
    }

    .qr-code {
      height: 1.65rem;
      margin-top: .2rem;
      color: #aaa;
      .lt {
        width: 1.3rem;
        float: left;
        &.left {
          margin-left: .65rem;
        }
        &.right {
          margin-left: .45rem;
        }
      }
      img {
        height: 1.25rem;
        width: 1.25rem;
        border: 1px solid #ccc;
        margin-bottom: .05rem;
      }
    }

    .contact {
      height: .41rem;
      .item {
        float: left;
        width: 2.2rem;
        text-align: center;
        white-space: nowrap;
      }
    }
  }
}
 
</style>