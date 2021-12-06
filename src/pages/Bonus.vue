<template>
  <div class="receive-container">
    <div class="header">
      <div class="banner" :style="{
          backgroundImage: state.locale == 'zh-CN' ? `url(/static/receive/banner-zh-CN.png)` : `url(/static/receive/banner-en.png)`}">
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
            <img class="footer_ewm" src="../assets/ixx_kefu_big.png" />
            <p class="footer_ewm_ltxt">{{ $t('gift.modal.qr_a') }}</p>
          </div>
          <div class="lt right">
            <img class="footer_ewm" src="../assets/kefu_telegran_ewm.jpg" />
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
      }
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
    }
  },
  async created() {
    let res = await service.getRates({ currency: "BTC" });
    if (!!res && !res.code) {
      this.rates = res.data.BTC;
    }
  }
};
</script>

<style lang="scss" scoped>
.receive-container{
  //  overflow: hidden;
  .header {
    height: 400px;
    .banner {
      position: relative;
      height: 400px;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      text-align: center;
      .option {
        position: absolute;
        top: 240px;
        width: 100%;
        text-align: center;
      }
    }
    .button {
      width: 300px;
    }
  }
  .content {
    .card {
      height: 340px;
      padding: 20px;
      width: 1088px;
      margin: 40px auto 0;
      &.registration {
        background-image: url(/static/receive/card-a.png);
      }
      &.deposit {
        background-image: url(/static/receive/card-b.png);
      }
      .left {
        width: 450px;
        float: left;
        color: #fff;
        p {
          text-align: center;
        }
        i {
          display: block;
          margin: 45px 0 10px 45px;
          width: 110px;
          height: 34px;
          line-height: 34px;
          font-weight: bold;
          background: rgba(13, 147, 130, 1);
          border-radius: 2px;
          text-align: center;
          &.en {
            width: 140px;
          }
        }
        label {
          font-size: 123px;
        }
        span {
          font-size: 18px;
        }
      }
      .right {
        width: 500px;
        float: left;
        margin: 35px 42px 35px 90px;
        ul {
          li {
            margin-bottom: 40px;
          }
          &.en {
            li {
              margin-bottom: 30px;
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
      margin: 60px 0 80px;
      text-align: center;
      .button {
        width: 300px;
      }
    }
  }
  .footer {
    height: 450px;
    background: url(/static/receive/footer.png) center center no-repeat;
    color: #fff;
    article {
      width: 1200px;
      margin: 0 auto;
      padding-top: 130px;
      h3 {
        text-align: center;
        font-size: 22px;
        margin-bottom: 60px;
      }
      p {
        line-height: 40px;
      }
    }
  }
  .pop {
    width: 520px;
    padding: 32px 57px;
    .title {
      text-align: center;
      font-size:18px;
      margin-bottom: 10px;
    }
    .contact, .describe {
      color: $primary;
      line-height: 2em;
      text-align: center;
    }

    .qr-code {
      height: 165px;
      margin-top: 20px;
      color: #aaa;
      .lt {
        width: 50%;
        float: left; 
        text-align: center;
      }
      img {
        height: 125px;
        width: 125px;
        border: 1px solid #ccc;
        margin-bottom: 5px;
      }
    }

    .contact {
      height: 41px;
      .item {
        float: left;
        width: 220px;
        text-align: center;
        white-space: nowrap;
      }
    }
  }
}
 
</style>
