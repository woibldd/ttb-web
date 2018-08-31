<template>
  <div class="modal setting-modal">
    <div class="title">{{ $t('setting') }}</div>
    <setting-select style="margin-bottom: 20px"
      optionId="value"
      :label="$t('setting_fiat')"
      :value="{value: local.fiat}"
      :optionList="fiatOptionList"
      @change="selectFiat">
      <template slot="selected-option">
        {{ local.fiat === 'AUTO' ? $t('setting_auto') : local.fiat }}
        <span class="symbol">{{ local.fiat === 'AUTO' ? '' : state.fiatMoneySymbol }}</span>
      </template>
      <template slot="option" slot-scope="option">
        {{ option.value === 'AUTO' ? $t('setting_auto') : option.value }}
        <span class="symbol">{{ option.value === 'AUTO' ? '' : getFiatSymbol(option.value) }}</span>
      </template>
    </setting-select>
    <setting-select
      optionId="id"
      :label="$t('setting_updown_color')"
      :value="selectedUpdown"
      :optionList="updownList"
      @change="selectUpdown">
      <template slot="selected-option" slot-scope="value">
        <span class="ibt">{{ $t('setting_up') }}</span>
        <span class="ibt updown-span" :style="'color:' + value.up">↑</span>
        <span class="ibt">{{ $t('setting_down') }}</span>
        <span class="ibt updown-span" :style="'color:' + value.down">↓</span>
      </template>
      <template slot="option" slot-scope="option">
        <span class="ibt">{{ $t('setting_up') }}</span>
        <span class="ibt updown-span" :style="'color:' + option.up">↑</span>
        <span class="ibt">{{ $t('setting_down') }}</span>
        <span class="ibt updown-span" :style="'color:' + option.down">↓</span>
      </template>
    </setting-select>
  </div>
</template>

<script>
import _ from 'lodash'
import {state, local, actions} from '@/modules/store'
import theme from '@/modules/dynamic-theme'
import SettingSelect from '@/components/SettingSelect'
import utils from '@/modules/utils'

export default {
  name: 'settingModal',
  props: ['show'],
  components: {
    SettingSelect
  },
  data () {
    return {
      state,
      local,
      updownList: theme.getConfigs(),
      selectedFiat: null
    }
  },
  computed: {
    selectedUpdown () {
      return _.find(this.updownList, item => item.id === local.upDown)
    },
    fiatOptionList () {
      return [{
        value: 'AUTO'
      }].concat(_.map(this.state.fiatList, fiat => {
        return { value: fiat }
      }))
    }
  },
  watch: {
    show: {
      immediate: true,
      handler (show) {
        if (show && !this.state.fiatList.length) {
          this.fetchFiatList()
        }
        if (!show) {
          this.$eh.$emit('setting-select:close')
        }
      }
    }
  },
  methods: {
    fetchFiatList () {
      actions.fetchRate('USDT')
    },
    getFiatSymbol (fiat) {
      return utils.getFiatMoneySymbolByFiat(fiat)
    },
    selectFiat (item) {
      actions.setFiat(item.value)
    },
    selectUpdown (item) {
      this.local.upDown = item.id
      theme.set(item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-modal {
  color: #303030;
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  width: 500px;
  padding: 32px 80px 60px;
  .title {
    font-size: 24px;
    line-height: 33px;
    text-align: center;
    margin: 0 auto 30px;
  }
}
.label {
  font-size: 12px;
  line-height: 17px;
}
.updown-span {
  margin-top: -2px;
}
.symbol {
  margin-left: 10px;
  opacity: .4;
}
</style>
