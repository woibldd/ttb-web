<template>
  <div class="pieces">
    <i class="coin"/>
    <span class="amount">
      {{ $t('activity_piece_amount') }}:
      <span class="number">{{ amount|thousand }}</span>
      <v-popover
        class="popover pointer"
        :popover-inner-class="['popover-inner', 'my-piece-popover-cont']"
        trigger="hover"
        placement="bottom"
      >
        <icon
          name="question"
          style="color: #C7C7C7"/>
        <div
          class="popover-content"
          slot="popover">
          <p class="block">
            <span class="desc">{{ $t('activity_piece_invite_text') }}</span>
            <span class="value">{{ $t('activity_piece_obtain', {amount: data.invite_value || 0}) }}</span>
          </p>
          <p class="block">
            <span class="desc">{{ $t('activity_piece_buy_text') }}</span>
            <span class="value">{{ $t('activity_piece_obtain', {amount: data.balance_value || 0}) }}</span>
          </p>
        </div>
      </v-popover>
    </span>
    <v-btn
      class="exchange-button ml-24"
      @click="doExchange"
      :disabled="!canExchange"
      radius="14"
      border="0"
      height="28"
      :label="$t('activity_piece_btn')"/>

  </div>
</template>
<script>
import service from '@/modules/service'
import utils from '@/modules/utils'
import isEmtpy from 'lodash/isEmpty'
export default {
  data () {
    return {
      data: {
        invite_value: '23',
        balance_value: '2'
      }
    }
  },
  computed: {
    amount () {
      if (!isEmtpy(this.data)) {
        return this.$big(this.data.invite_value).plus(this.data.balance_value).toString()
      }
      return 0
    },
    canExchange () {
      return this.data.state && this.amount > 10
    }
  },
  methods: {
    async fetch () {
      let res = await service.getPieceCurrent()
      if (!res.code) {
        this.data = res.data || {}
      }
    },
    async doExchange () {
      let res = await service.doExchangePiece()
      if (!res.code) {
        utils.success(this.$t('activity_piece_exchange_successfully'))
      } else {
        utils.alert(res.message)
      }
      this.fetch()
      this.$emit('afterExchange')
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.pieces {
  position: absolute;
  right: 0;
  display: flex;
  .coin {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    background: url(~@/assets/bitcoin.png);
    background-position: center;
    background-size: cover;
  }
  .amount {
    font-size: 14px;
    line-height:24px;
    font-weight:400;
    color: #666;
  }
  .number {
    font-size: 20px;
    color: $primary;
  }
  .popover {
    display: inline-block;
  }
  .exchange-button {
    background: #FBA917;
    // width: 75px;
    padding: 0 10px;
    color: #ffffff;

    &:hover {
      background: #FBA917;
      opacity: .8;
    }
    &.disabled {
      background: #E6E6E6;
      color: #999999;
      &:hover {
        background: #E6E6E6;
        opacity: .8;
      }
    }
  }
}
</style>
<style lang="scss">
.my-piece-popover-cont {
  padding: 14px;
  .popover-content {
    .block {
      color: #666;
      font-size: 12px;
      .value {
        color: #FBA917;
      }
    }
  }
}
</style>
