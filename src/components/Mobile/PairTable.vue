<template>
  <div
    class="pairtable_box"
    v-if="sortedList && sortedList.length">
    <div
      class="trading_row"
      v-for="pair in sortedList"
      :key="pair.name"
      v-if="pair.tick">
      <div
        class="row"
        @click="toExchange(pair.name)">
        <div class="col updown">
          <span
            class="up pair"
          >{{ pair.product }}/{{ pair.currency }}</span>
          <span class="down">{{ $t('homechart_24h_v') }} {{ pretty(pair.tick.volume_24h) }}</span>
        </div>
        <div class="col col-right">
          <div class="updown">
            <span class="up current">{{ pair.tick.current | fixed(pair.price_scale) | thousand }}</span>
            <span class="down">≈ {{ state.fiatMoneySymbol }}
              <fiat-money
                :base="pair.currency"
                :value="pair.tick.current"/></span>
          </div>
          <div class="full ml-rem-40">
            <div
              class="wrap"
              :class="{'color-up': getDelta(pair.tick) > 0, 'color-down': getDelta(pair.tick) < 0}">
              <p v-if="pair.tick">{{ (getDelta(pair.tick) > 0) ? '+' : '' }}{{ getDelta(pair.tick) }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tickTableMixin from '@/mixins/tick-table'
import {state} from '@/modules/store'

export default {
  data () {
    return {}
  },
  mixins: [tickTableMixin],
  methods: {
    pretty (num) {
      num = this.$big(num || 0)
      if (num < 100) {
        return num.toFixed(2)
      }
      if (num < 1e6) {
        return num.toFixed(0)
      }
      if (num < 1e7) {
        return num.div(1e6).toFixed(1) + ' M'
      }
      if (num < 1e9) {
        return num.div(1e6).toFixed(0) + ' M'
      }
      if (num < 1e10) {
        return num.div(1e9).toFixed(1) + ' B'
      }
      return num.div(1e9).toFixed(0) + ' B'
    },
    toExchange (pair) {
      this.$router.push({
        name: 'trading',
        params: {
          pair: pair
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

div {
  display: flex;
}
.pairtable_box {
  border:1px solid rgba(67,87,149,1);
  box-shadow:0px rem(10) rem(20) 0px rgba(51,59,70,0.4);
  border-radius: rem(4);
  padding: rem(25) 0;
  flex-direction: column;
  .trading_row {
    flex: 1;
    padding: 0 rem(25);

    &:last-child {
      .row {
        border: none;
      }
    }
    .row {
      border-bottom: 1px solid #566573;
      padding: rem(20) 0;
      flex: 1;
      justify-content: space-between;
      font-weight: 400;

      .updown {
        flex-direction: column;
        .up {
          font-size: rem(28);
          &.pair {
            color: $primary;
          }
          &.current {
            color: #ffffff;
            text-align: right;
          }
        }
        .down {
          font-size: rem(20);
          color: #446683;
          line-height: 1;
          padding-top: rem(6);
        }
      }
      .full {
        width: rem(140);
        &.ml-rem-40 {
          margin-left: rem(40)
        }
        .wrap {
          flex: 1;
          text-align: center;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          border-radius: rem(4);
        }
        .color-up {
          background: #09C989;
          color: #ffffff !important;
        }
        .color-down {
          background: #F24E4D;
          color: #ffffff !important;
        }
      }
    }
  }
}
  // .ind_cen.trade {
  //   border: 1px solid #CBE6FD;
  //   ul {
  //     overflow: hidden;
  //     color: #CBE6FD;
  //     font-size: 16px;
  //     border-bottom: 1px dashed #464d55;
  //     line-height: 64px;
  //     &.tit {
  //       border-bottom: 1px solid #CBE6FD;
  //       height: 45px;
  //       line-height: 45px;
  //       font-size: 14px;
  //       li {
  //         border-bottom: none;
  //         &.tc {
  //           color: #CBE6FD;
  //         }
  //       }
  //     }
  //     li {
  //       float: left;
  //       height: 64px;
  //       text-align: center;
  //       span {
  //         color: #6C869C;
  //       }
  //       &.ta {
  //         width: 13%;
  //       }
  //       &.tb {
  //         width: 22%;
  //         text-align: left;
  //         text-indent: 35px;
  //       }
  //       &.tc {
  //         text-align: left;
  //         width: 14%;
  //       }
  //       &.td {
  //         width: 14%;
  //       }
  //       &.te {
  //         width: 14%;
  //       }
  //       &.tf {
  //         width: 16%;
  //       }
  //       &.tg {
  //         width: 7%;
  //         color: #5c89b0;
  //         cursor: pointer;

  //         &:hover {
  //           color: #c9a96e;
  //         }
  //       }
  //     }
  //     &:last-child {
  //       border-bottom: none;
  //     }
  //     &.tra_cen {
  //       li {
  //         &.color-down {
  //           color: #F24E4D;
  //         }
  //         &.color-up {
  //           color: #09C989;
  //         }
  //       }
  //     }
  //   }
  // }

</style>
