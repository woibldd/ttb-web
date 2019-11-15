<template>
  <div class="calculate-container">
    <div class="cal__title-row">
      <div
        class="title"
        v-for="title in titles"
        @click="selectTitle(title)"
        :class="[{'select': title.index === selectTitleIndex }]"
        :key="title.index">
        {{ $t(title.name) }}
      </div>
    </div>
    <!-- 盈亏计算 -->
    <div
      class="cal__content"
      v-if="selectTitleIndex === 1">
      <div class="left pr-24 pl-20">
        <!-- 方向 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('deal_th_side') }}</div>
          <div class="row__oprate">
            <el-radio-group v-model="earn.direction">
              <el-radio-button label="more">{{ $t('contract_action_button_up_r') }}</el-radio-button>
              <el-radio-button label="less">{{ $t('contract_action_button_down_r') }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 杠杆 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('lever') }}</div>
          <el-select
            class="row__oprate"
            v-model="earn.lever">
            <el-option
              v-for="(item, idx) in leverages"
              v-if="item !== '0'"
              :key="idx"
              :label="item + 'x'"
              :value="item"/>
          </el-select>
        </div>
        <!-- 仓位 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('contract_action_position') }}</div>
          <div class="row__oprate werehouse">
            <input
              v-model="earn.amount"
              required
              type="number">
            <span class="piece">{{ $t('contract_werehouse_piece') }}</span>
          </div>
        </div>
        <!-- 开仓价格 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('contract_open_werehouse_price') }}</div>
          <div class="row__oprate werehouse">
            <input
              v-model="earn.open_price"
              type="number">
            <span class="piece">{{ currency_name }}</span>
          </div>
        </div>
        <!-- 平仓价格 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('contract_exit_price') }}</div>
          <div class="row__oprate werehouse">
            <input
              v-model="earn.close_price"
              type="number">
            <span class="piece">{{ currency_name }}</span>
          </div>
        </div>

        <v-btn
          class="btn-start ml-17"
          @click="calcEarn"
          :label="$t('contract_start_cal')"/>
      </div>
      <div class="right">
        <div class="result mb-28">
          {{ $t('contract_cal_result') }}
        </div>
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_history_postion_header_promise') }}</span>
          <span>{{ earn.result.margin }} BTC</span>
        </div>
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_cal_open_lever') }}</span>
          <span>{{ earn.result.open_value }} BTC</span>
        </div>
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_cal_pull_lever') }}</span>
          <span>{{ earn.result.close_value }} BTC </span>
        </div>
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_cal_earn') }}</span>
          <span>{{ earn.result.realized }} BTC</span>
        </div>
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_cal_earn_percent') }}</span>
          <span>{{ earn.result.realized_roe }}%</span>
        </div>
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_cal_refund') }}</span>
          <span>{{ earn.result.roe }}%</span>
        </div>
      </div>
    </div>

    <!-- 强平价格 -->
    <div
      class="cal__content"
      v-if="selectTitleIndex === 2">
      <div class="left pr-24 pl-20">
        <!-- 方向 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('deal_th_side') }}</div>
          <div class="row__oprate">
            <el-radio-group v-model="force.direction">
              <el-radio-button label="more">{{ $t('contract_action_button_up_r') }}</el-radio-button>
              <el-radio-button label="less">{{ $t('contract_action_button_down_r') }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 保证金 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('contract_history_postion_header_promise') }}</div>
          <div class="row__oprate">
            <el-radio-group v-model="force.mode">
              <el-radio-button label="fixed">{{ $t('contract_cal_step') }}</el-radio-button>
              <el-radio-button label="cross">{{ $t('contract_cal_full') }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 杠杆 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('lever') }}</div>
          <el-select
            :disabled="force.mode=='cross'"
            class="row__oprate"
            v-model="force.lever">
            <el-option
              v-for="(item, idx) in leverages"
              v-if="item !== '0'"
              :key="idx"
              :label="item + 'x'"
              :value="item"/>
          </el-select>
        </div>
        <!-- 仓位 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('contract_action_position') }}</div>
          <div class="row__oprate werehouse">
            <input
              v-model="force.amount"
              type="number">
            <span class="piece">{{ $t('contract_werehouse_piece') }}</span>
          </div>
        </div>
        <!-- 开仓价格 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('contract_open_werehouse_price') }}</div>
          <div class="row__oprate werehouse">
            <input
              v-model="force.open_price"
              type="number">
            <span class="piece">{{ currency_name }}</span>
          </div>
        </div>
        <v-btn
          class="btn-start ml-17"
          @click="calcUnwindPrice"
          :label="$t('contract_start_cal')"/>
      </div>
      <div class="right">
        <div class="result mb-28">
          {{ $t('contract_cal_result') }}
        </div>
        <!-- <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_cal_current') }}</span>
          <span>{{ force.result.current }} {{ $t('contract_werehouse_piece') }}</span>
        </div> -->
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_cal_final_account') }}</span>
          <span>{{ force.result.new_amount }} {{ $t('contract_werehouse_piece') }}</span>
        </div>
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_force_equal_price') }}</span>
          <span>{{ force.result.force_price | fixed(2) }} {{ currency_name }}</span>
        </div>
      </div>
    </div>

    <!-- 目标价格(目标收益率) -->
    <div
      class="cal__content"
      v-if="selectTitleIndex === 3">
      <div class="left pr-24 pl-20">
        <!-- 方向 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('deal_th_side') }}</div>
          <div class="row__oprate">
            <el-radio-group v-model="aim.direction">
              <el-radio-button label="more">{{ $t('contract_action_button_up_r') }}</el-radio-button>
              <el-radio-button label="less">{{ $t('contract_action_button_down_r') }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 杠杆 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('lever') }}</div>
          <el-select
            class="row__oprate"
            v-model="aim.lever">
            <el-option
              v-for="(item, idx) in leverages"
              v-if="item !== '0'"
              :key="idx"
              :label="item + 'x'"
              :value="item"/>
          </el-select>
        </div>
        <!-- 开仓价格 -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('contract_open_werehouse_price') }}</div>
          <div class="row__oprate werehouse">
            <input
              v-model="aim.open_price"
              type="number">
            <span class="piece">{{ currency_name }}</span>
          </div>
        </div>
        <!-- 回报率% -->
        <div class="input-row mb-27">
          <div class="row__label mr-10">{{ $t('contract_cal_refund') }}</div>
          <div class="row__oprate werehouse">
            <input
              v-model="aim.roe"
              type="number">
            <span class="piece"/>
          </div>
        </div>
        <v-btn
          class="btn-start ml-17"
          @click="calcReward"
          :label="$t('contract_start_cal')"/>
      </div>
      <div class="right">
        <div class="result mb-28">
          {{ $t('contract_cal_result') }}
        </div>
        <!-- 开仓价格 -->
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_open_werehouse_price') }} </span>
          <span>{{ aim.open_price }} {{ currency_name }}</span>
        </div>
        <!-- 目标价格 -->
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_ca_aim') }}</span>
          <span>{{ aim.result.aim_price }} {{ currency_name }}</span>
        </div>
        <!-- 盈亏% -->
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_cal_earn_percent') }}</span>
          <span>{{ aim.result.realized_rate }} %</span>
        </div>
        <div class="flex-between mb-28">
          <span class="result_label">{{ $t('contract_cal_refund') }}</span>
          <span>{{ aim.roe }} %</span>
        </div>
      </div>
    </div>
    <div class="cal__footer">
      {{ $t('contract_footer_notify') }}
    </div>
  </div>
</template>
<script>
import './calculate.scss'
import {state} from '@/modules/store'
import utils from '@/modules/utils'
import calculator from '@/projects/contract/calculator'
// import stateHolding from '../stateHoldingComputedMixins'

export default {
  // mixins: [stateHolding],
  data () {
    return {
      state,
      titles: [
        {index: 1, name: 'contract_cal_earns'},
        {index: 2, name: 'contract_force_equal_price'},
        {index: 3, name: 'contract_aim_earn_rate'}
      ],
      selectTitleIndex: 1,
      allLevers: [
        1, 5, 10, 25, 50, 100
      ],

      earn: {
        direction: 'more',
        lever: '1',
        amount: '',
        open_price: '',
        close_price: '',
        result: {
          margin: 0,
          open_value: 0,
          close_value: 0,
          realized: 0, // 盈亏
          realized_roe: 0,
          roe: 0
        }

      }, // 盈亏价格
      force: { // 强平价格
        direction: 'more',
        mode: 'fixed',
        lever: '1',
        amount: '',
        open_price: '',
        result: {
          current: 0,
          new_amount: 0,
          force_price: 0
        }
      },
      aim: {
        direction: 'more',
        lever: '1',
        open_price: '',
        roe: 100,
        result: {
          // open_price: 0,
          aim_price: 0,
          realized_rate: 0
          // roe_percent: 0
        }
      } // 目标收益率
    }
  },
  computed: {
    product_name () {
      if (this.state.ct) {
        return this.state.ct.product_name
      }
      return ''
    },
    currency_name () {
      if (this.state.ct) {
        return this.state.ct.currency_name
      }
      return ''
    },
    holding () {
      if (this.state.ct.holding) {
        // console.log('99999999999999999999999999')
        return this.state.ct.holding
      }
    },
    pairInfo () {
      if (this.state.ct.pairInfo) {
        return this.state.ct.pairInfo
      }
      return {}
    },
    leverages () {
      if (this.pairInfo && this.pairInfo.leverages) {
        return this.state.ct.pairInfo.leverages.split(',')
      } else {
        return [1, 5, 10, 25, 50, 100]
      }
    }
  },
  methods: {
    selectTitle (t) {
      this.selectTitleIndex = t.index
    },
    calcEarn () {
      this.earn.symbol = this.pairInfo
      let result = calculator.getStorageInfo(this.earn)
      for (let key in result) {
        result[key] = result[key].round(4).toString()
      }
      this.earn.result = result
    },
    calcUnwindPrice () {
      // let result = calculator.getLiqPriceInfo(this.force, this.holding, this.pairInfo)
      let {available_balance} = this.holding
      let result = calculator.getLiqPriceInfo(this.force, {holding: 0, available_balance}, this.pairInfo)
      this.force.result = result
    },
    calcReward () {
      let result = calculator.getTargetRewardRate(this.aim)
      for (let key in result) {
        result[key] = result[key].round(4).toString()
      }
      this.aim.result = result
    }
  },
  watch: {
    'force.mode' (value) {
      if (value == 'cross') {
        this.force.lever = this.pairInfo.max_leverage
      }
    }
  },
  created () {
    console.log('calculate craeted')
  }
}
</script>
