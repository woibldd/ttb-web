<template>
  <section class="kyc-relay-container">
    <div class="banner">
      <div class="text">
        <p
          class="title"
          v-html="$t('activity_kyc_banner_title')"/>
        <p class="desc">
          <em class="strong">1000</em> + <em class="strong">USDT</em> <span
            class="sub"
            v-t="'activity_kyc_banner_desc'"/>
        </p>
      </div>
    </div>
    <div class="body">
      <div class="container">
        <div class="kyc-reward-pool">
          <div
            class="title"
          >
            <i class="arrow left"/>
            <span v-t="'activity_kyc_reward_title'"/>
            <i class="arrow right"/>
          </div>
          <!-- 奖池金额 -->
          <div class="kyc-reward-amount">
            <div class="amount usdt">
              <div class="block mr-5">1</div>
              <div class="block mr-5">0</div>
              <div class="block mr-5">0</div>
              <div class="block mr-5">0</div>
              <div class="block mr-5">0</div>
              <div class="block mr-5">0</div>
              <div class="unit mr-5">USDT</div>
            </div>
            <div class="amount btc">
              <div
                class="mr-5"
                :class="{block: item !== '.', dot: item === '.'}"
                v-for="item in remainBtc">{{ item }}</div>
              <div class="unit">BTC</div>
            </div>
          </div>
          <!-- end 奖池金额 -->
          <!-- 奖池地址 -->
          <div class="kyc-reward-address">
            <div class="address usdt">
              <div class="desc">USDT{{ $t('activity_kyc_reward_address') }}</div>
              <div class="input_box mt-10">
                <p class="content">{{ usdtAddress }}</p>
                <a
                  class="copy_button"
                  @click.prevent="copy('usdtAddress')">{{ $t('copy') }}</a>
              </div>
            </div>
            <div class="address btc ml-16">
              <div class="desc">BTC{{ $t('activity_kyc_reward_address') }}</div>
              <div class="input_box mt-10">
                <p class="content">{{ btcAddress }}</p>
                <a
                  class="copy_button"
                  @click.prevent="copy('btcAddress')">{{ $t('copy') }}</a>
              </div>
            </div>
          </div>
          <!-- end 奖池地址 -->
          <!-- 邀请好友 -->
          <div
            class="kyc_reward_invite"
            v-if="!!state.userInfo">
            <div class="title">
              <i class="arrow left"/>
              <span v-t="'activity_kyc_my_title'"/>
              <i class="arrow right"/>
            </div>
            <div class="kyc_my_invite">
              <div class="invite_box link">
                <div class="box_title">{{ $t('profile_left_invite_link') }}</div>
                <div class="box_body">
                  <div class="input_box mt-18">
                    <p class="content">{{ inviteLink }}</p>
                    <a
                      class="copy_button"
                      @click.prevent="copy('inviteLink')">{{ $t('profile_left_copy_invite_link') }}</a>
                  </div>
                </div>
              </div>
              <div class="invite_box code ml-20">
                <div class="box_title">{{ $t('profile_left_invite_code') }}</div>
                <div class="box_body">
                  <div class="input_box mt-18">
                    <p class="content">{{ inviteCode }}</p>
                    <a
                      class="copy_button"
                      @click.prevent="copy('inviteCode')">{{ $t('profile_left_copy_invite_code') }}</a>
                  </div>
                </div>
              </div>
              <div class="invite_box qrcode ml-20">
                <div class="box_title">{{ $t('profile_left_invite_qrcode') }}</div>
                <div class="box_body">
                  <div
                    class="btn_select mt-18"
                    @click="showQrCode"
                    @mouseover="showQrCode(true)"
                    @mouseout="showQrCode(false)">{{ $t('profile_left_invite_qrcode') }}</div>
                  <div
                    class="qrcode"
                    v-show="showCode"
                  >
                    <canvas
                      class="qr-img"
                      ref="qr"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end邀请好友 -->
          <!-- kyc记录 -->
          <div class="kyc-reward-record">
            <div class="record_box record">
              <div class="box_title">{{ $t('activity_kyc_table_title') }}</div>
              <div class="box_body mt-20 pt-18 pb-18 pl-30 pr-30">
                <div class="tr mb-6">
                  <div
                    class="th"
                    v-t="'activity_kyc_table_col1'"/>
                  <div
                    class="th"
                    v-t="'activity_kyc_table_col2'"/>
                  <div
                    class="th"
                    v-t="'activity_kyc_table_col3'"/>
                </div>
                <div
                  class="tr mt-18"
                  v-for="item in recentList">
                  <div
                    class="td"
                    style="width: 120px;">{{ item.phone || item.email }}</div>
                  <div class="td">{{ item.hasInvitor ? $t('have') : $t('none') }}</div>
                  <div class="td">{{ item.pass_time | ts2date }}</div>
                </div>
              </div>
            </div>
            <div class="record_box rule ml-20">
              <div class="box_title">{{ $t('activity_kyc_table_rule') }}</div>
              <div
                class="box_body mt-20 pt-18 pb-18 pl-30 pr-30"
              >
                <div
                  class="rules"
                  v-html="$t('activity_kyc_table_rule_detail')"/>
              </div>
            </div>
          </div>
          <!-- end kyc记录 -->
          <div
            class="kyc_reward_invite"
            v-if="!state.userInfo"
          >
            <v-btn
              class="toInvite"
              @click="toLogin"
              radius="33"
              width="400"
              font-size="24"
              heigth="65"
              :label="$t('activity_kyc_invite_now')"/>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
import copyToClipboard from 'copy-to-clipboard'
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'
import VBtn from '@/components/VBtn'
const qrcode = () => import(/* webpackChunkName: "Qrcode" */ 'qrcode')
export default {
  data () {
    return {
      state,
      usdtAddress: '1AUtL9w6TKKH29iPdAAoR7MouepUVnrFen',
      btcAddress: '38apB9w9AzLXs627YtqUSKRUPqHNKb8XEQ',
      showCode: false,
      recentList: [],
      timer: 0
    }
  },
  computed: {
    inviteLink () {
      return `${location.protocol}//${location.host}/user/register/?invitor=${this.inviteCode}`
    },
    inviteCode () {
      if (this.state.userInfo) { return this.state.userInfo.id }
      return ''
    },
    remainBtc () {
      return '1000.233'.toString().split('')
    }
  },
  methods: {
    copy (key) {
      copyToClipboard(this[key])
      utils.success(this.$i18n.t('copyed'))
    },
    toLogin () {
      actions.setLoginBack({
        fullPath: this.$route.fullPath
      })
      this.$router.push({
        name: 'login'
      })
    },
    async setQr (url) {
      const QRCode = await qrcode()
      QRCode.toCanvas(
        this.$refs.qr,
        url,
        {
          margin: 0,
          width: 140,
          height: 140,
          errorCorrectionLevel: 'H'
        },
        (err) => {
          if (err) {
            // @improve
            return utils.log('qrcode error')
          }
          this.qrReady = true
        }
      )
    },
    showQrCode (toggle) {
      if (typeof toggle === 'boolean') {
        this.showCode = toggle
      } else {
        this.showCode = !this.showCode
      }
    },
    async getRecentList () {
      let mockData = []
      let i = 10
      while (--i) {
        mockData.push({
          phone: i % 3 === 0 ? null : '139' + Math.floor(Math.random() * 10000) + '3332',
          email: 'axxx@' + Math.random() + '.com',
          hasInvitor: Math.floor(Math.random() * 10) % 2 === 0,
          pass_time: new Date().getTime()
        })
      }
      console.log(mockData)
      this.recentList = mockData
    }
  },
  created () {
    if (this.inviteLink) {
      this.setQr(this.inviteLink)
    }
    this.getRecentList()
    this.timer = setInterval(() => {
      this.getRecentList()
    }, 2e3)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  components: {
    VBtn
  }
}
</script>
<style lang="scss" scoped>
.kyc-relay-container {
  $kycPrimary: #CA9048;
  width: 100%;
  min-height: 500px;
  background: #1E1C1C;
  padding-bottom: 120px;

  .banner {
    $vw: 100vw;
    position: relative;
    width: 100%;
    height: 630px;
    height:  630 / 1920 * $vw;
    background-image: url(~@/assets/kyc-banner.png);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100%;
    text-align: center;
    font-weight: bold;
    color: #fff;

    .text {
      position: absolute;
      top: 220 / 1920 * $vw;
      left: 848 / 1920 * $vw;
      font-weight: 400;
      .strong {
        color: #CA9048 !important;
      }
      .title {
        font-size: 74 / 1920 * $vw;
      }
      .desc {
        font-size: 60 / 1920 * $vw;
        .sub {
          font-size: 36 / 1920 * $vw;
          color: #FFFFFF;
          font-weight: 200;
        }
      }
    }
  }
  .body {
    .container {
      .kyc-reward-pool, .kyc_reward_invite {
        margin-top: 100px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        .title {
          color: $kycPrimary;
          font-size: 30px;
          line-height: 24px;
          .arrow {
            width: 60px;
            height: 4px;
            display: inline-block;
            vertical-align: middle;

            &.left {
              background:linear-gradient(90deg,rgba(30,28,28,1),rgba(202,170,108,1));
            }

            &.right {
              background:linear-gradient(-90deg,rgba(30,28,28,1),rgba(202,170,108,1));
            }
          }
        }
        .kyc-reward-amount {
          margin-top: 80px;
          display: flex;
          width: 100%;
          justify-content: center;
          .amount {
            font-weight: 400;
            &.btc {
              margin-left: 80px;
            }
            .block {
              display: inline-block;
              width: 62px;
              height: 94px;
              font-size: 50px;
              background:linear-gradient(0deg,rgba(26,24,24,1),rgba(36,36,36,1),rgba(0,0,0,.23));
              border-radius:4px;
              color: #D2964A;
              text-align: center;
            }
            .dot {
              display: inline-block;
              color: #D2964A;
              font-size: 36px;
            }
            .unit {
              display: inline-block;
              color: #CAAA6C;
              font-size: 18px;
            }
          }
        }
        .kyc-reward-address {
          margin-top: 120px;
          color: #fff;
          display: flex;
          width: 100%;
          justify-content: center;

          .address {
            text-align: left;
            .desc {
              padding-left: 18px;
            }
            // width: 600px;
            .input_box {
              padding: 20px 18px;
              border-radius: 4px;
              background: #181616;
              display: inline-block;

              .content {
                display: inline-block;
                width: 430px;
                color: #999999;
              }
              .copy_button {
                display: inline-block;
                padding: 0 26px;
                border-left: 1px solid #29303A;
              }
            }
          }
        }
        .kyc-reward-record {
          display: flex;
          margin-top: 77px;
          font-size: 14px;
          .record_box {
            width: 550px;
            .box_title {
              font-size: 18px;
              color: #ffffff;
              font-weight:400;
              line-height: 18px;

              &::before {
                content: '';
                display: inline-block;
                width:2px;
                margin-right: 12px;
                height:17px;
                background:linear-gradient(0deg,rgba(30,28,28,1),rgba(202,170,108,1));
              }
            }
            .box_body {
              border:1px solid rgba(195,195,195,.4);
              // opacity:0.4;
              border-radius:4px;
              .tr {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .th {
                  color: #CBE6FD;
                  font-size: 16px;
                }
                .td {
                  color: #FFFFFF;
                  font-size: 12px;
                }
              }
            }

            &.rule {
              .rules {
                line-height: 24px;
                font-size: 14px;
                color: #A6BED3;
              }
            }
          }
        }
        .kyc_reward_invite {
          .kyc_my_invite {
            margin-top: 78px;
            display: flex;
            .invite_box {
              &.code {
                .content {
                  width: 80px;
                }
              }
              &.link {
                .content {
                  width: 375px;
                }
              }
              // width: 550px;
              .box_title {
                font-size: 18px;
                color: #ffffff;
                font-weight:400;
                line-height: 18px;

                &::before {
                  content: '';
                  display: inline-block;
                  width:2px;
                  margin-right: 12px;
                  height:17px;
                  background:linear-gradient(0deg,rgba(30,28,28,1),rgba(202,170,108,1));
                }
              }
              .box_body {
                .input_box {
                  padding: 20px 18px;
                  border-radius: 4px;
                  border: 1px solid rgba(195,195,195,0.4);
                  display: inline-block;

                  .content {
                    display: inline-block;
                    // max-width: 400px;
                    color: #999999;
                  }
                  .copy_button {
                    display: inline-block;
                    padding: 0 26px;
                    min-width: 70px;
                    border-left: 1px solid #29303A;
                  }
                }
                .btn_select {
                  background: #D2964A;
                  color: #fff;
                  width: 290px;
                  height: 60px;
                  font-size: 18px;
                  line-height: 60px;
                  display: inline-block;
                  text-align: center;
                  border-radius: 4px;
                  cursor: pointer;
                  user-select: none;
                }
                .qrcode {
                  width: 140px;
                  height: 140px;
                  margin-top: 10px;
                  border: 10px solid #D2964A;
                  border-radius: 4px;
                  padding: 12px;
                  position: absolute;
                  background: #fff;
                  margin-left: 60px;
                }
              }
            }
          }
          .toInvite {
            width: 400px;
            background: none;
            color: #CAAA6C;
            border: 1px solid #CAAA6C;
            margin: 0px auto;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.mobile {
  .kyc-relay-container {
    $vw: 1200px;
    .banner {
      height:  630 / 1920 * $vw;

      .text {
        top: 220 / 1920 * $vw;
        left: 848 / 1920 * $vw;
        .title {
            font-size: 74 / 1920 * $vw;
          }
        .desc {
          font-size: 60 / 1920 * $vw;
          .sub {
            font-size: 36 / 1920 * $vw;
          }
        }
      }
    }

  }
}
</style>
