<template>
  <div class="peaces">
    <i class="coin"/>
    <span class="amount">
      {{ $t('activity_peace_amount') }}:
      <span class="number">{{ amount|thousand }}</span>
      <v-popover
        class="popover pointer"
        :popover-inner-class="['popover-inner', 'my-peace-popover-cont']"
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
            <span class="desc">{{ $t('activity_peace_invite_text') }}</span>
            <span class="value">{{ $t('activity_peace_obtain', {amount: 2}) }}</span>
          </p>
          <p class="block">
            <span class="desc">{{ $t('activity_peace_buy_text') }}</span>
            <span class="value">{{ $t('activity_peace_obtain', {amount: 30}) }}</span>
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
      :label="$t('activity_peace_btn')"/>

  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  computed: {
    amount () {
      return this.data.amount || 20
    },
    canExchange () {
      return this.amount >= 10
    }
  },
  methods: {
    fetch () {

    },
    doExchange () {
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
.peaces {
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
.my-peace-popover-cont {
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
