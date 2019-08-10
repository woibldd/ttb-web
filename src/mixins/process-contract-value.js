import utils from '@/modules/utils'

const processValue = {

  methods: {
    processValue (key, row) {
      let value = row[key] 
      let down = 0
      let pairlist = null

      // 格式化时间
      if (key === 'deal_create_time') {
        value = utils.dateFormatter(row.create_time/1000)
      }
      else if (key === 'create_time_stamp') { 
        value = utils.dateFormatter(row.create_time/1000)
      }

      if (key === 'uid') {
        // if(row.is_self === false){ 
        //   value = 'UID:'+ utils.publicDesensitization(value).toString()
        // }
        // else {
          value = `UID:${value}`
        // }
      }
      // if (key === 'number') {
      //   if (value < 4) {
      //     value =  `<span class="icon icon-${value}">${value}</span>`
      //   } 
      // }

      if (key === 'create_time' ||
      key === 'update_time' ||
      key === 'created_time') { 
        value = utils.dateFormatter(value)
      }
      // 撤销
      if (key === 'revert') {
        value = this.$t('contract_assign_revert')
      }
      // 格式化状态
      if (key === 'state' || key === 'status') {
        const context = {
          1: 'contract_assigning_undeal',
          2: 'contract_assigning_deal_part',
          3: 'contract_all_dealed',
          4: 'order_sts_canceled',
          5: 'order_sts_partial',
          6: 'order_sts_post_rm',
          7: 'order_sts_partial'
        }[value] || 'Unknown'
        value = this.$t(context)
        // switch (value) {
        //   case 1:
        //     value = this.$t('contract_assigning_undeal')
        //     break
        //   case 2:
        //     value = this.$t('contract_assigning_undeal')
        //     break
        //   case 3:
        //     value = this.$t('contract_all_dealed')
        //     break
        //   default:
        //     break
        // }
      }
      // 格式化方向
      if (key === 'side') {
        switch (value) {
          case 1:
            value = `<span class="font-color-buy"> ${this.$t('order_side_buy')}</span>`
            break
          case 2:
            value = `<span class="font-color-sell">${this.$t('order_side_sell')}</span>`
            break
          default:
            value = `<span>-</span>`
            break
        }
      }
      // 格式化合约
      if (key === 'symbol') {
        if (value && value.indexOf('FUTURE_') === -1) {
          value = 'FUTURE_' + value
        }
        // value = this.$t('contract_' + value)
        value = this.$t('FUTURE_&USD', {currency: value.replace('FUTURE_','').replace('USD','')} )
      }
      // 转换百分比
      if (key === 'realized') {
        
        if (row.symbol === 'BTCUSD') {
          value = this.$big(value || 0).round(4).toString()
        }
        else {
          console.log({pairlist})
          pairlist = this.state.ct.pairInfoList
          if (!!pairlist && !!pairlist['FUTURE_'+row.symbol]) {
            value = this.$big(value).round(pairlist['FUTURE_'+row.symbol].value_scale, down).toString()
          }
          else {
            value = "--" 
          }

        }
      }
      // 成交类型(type) 1限价 2市价 3止盈 4止损
      if (key === 'type') {
        value = this.$t('contract_deal_type_' + value)
      }

      // 成交类型(style)1成交单,2资金费率
      if (key === 'style') {
        switch (value) {
          case 1:
            value = this.$t('contract_history_deal_dan')
            break
          case 2:
            value = this.$t('fee_rate')
            break
          default:
            value = ''
            break
        }
      }
      if (key === 'origin') {
        switch(value) {
          case 1:
            value = this.$t('contract_history_deal_dan')//"成交单"
            break;
          case 2:
            value = this.$t('contract_stop_out_order')//"强平单"
            break;
          case 3:
            value = this.$t('contract_fee_rate') //"资金费率"
            break;
          case 4:
            value = this.$t('contract_adl_reduce')//"ADL减仓"
            break; 
          default:
            value = ""
            break;
        }
      }
      //委托价值
      if (key === 'contract_assign_value') { 
        if (row.symbol === 'FUTURE_BTCUSD') {
          value = this.$big(row.amount).div(row.price).abs().round(4, down).toString()
        }
        else { 
          pairlist = this.state.ct.pairInfoList
          if (!!pairlist && !!pairlist[row.symbol]) {
            value = this.$big(row.amount).times(row.price).times(pairlist[row.symbol].multiplier).round(8, down).toString()
          }
          else {
            value = "--"
          }
        } 
      }
      if (key === 'price' ||
        key === 'executed_price') {   
        pairlist = this.state.ct.pairInfoList
        console.log({pairlist})
        if (!!pairlist && !!pairlist[row.symbol]) {  
          let price_scales =  pairlist[row.symbol].price_scale || 4
          console.log(price_scales, { test: pairlist[row.symbol]})
          value = this.$big(row.price).round(price_scales, down).toFixed(price_scales).toString() 
        }
        else {
          value = this.$big(row.price).round(4, down).toString().toString() 
        }
      }

      if (key === 'fee_rate') {
        value = (value || 0) == 0 ? value : (this.$big(value).times(100).round(4) + '%')
      }

      // history-table > 已成交 > 成交数量
      if (key === 'contract_deal_amount') {
        if (row.amount_total) {
          value = this.$big(row.amount_total).minus(row.amount_last).toFixed(0)
        }
      }
      // history-table > 已成交 > 价值
      if (key === 'history_table_contract_value' && row.amount_total) { 
        pairlist = this.state.ct.pairInfoList
        if (!!pairlist && !!pairlist[row.symbol]) { 
          let pair =  pairlist[row.symbol]
          let value_scales =  pair.value_scale || 4 
          if (row.symbol === 'FUTURE_BTCUSD') {
            value = this.$big(row.amount_total).div(row.price).round(value_scales, down).toFixed(value_scales || 4).toString() 
          } else { 
            let mul = pair.multiplier
            value = this.$big(row.amount_total).times(row.price).times(mul).round(value_scales, down).toFixed(value_scales || 4).toString() 
          }
        }
        else {
          value = this.$big(row.amount_total).div(row.price).toFixed(4).toString() 
        }
      }

      // 处理委托id, 取id中哈希值的前5位
      if (key === 'symbol_id') {
        let symbolLen = row.symbol.length
        value = row.id.slice(symbolLen, symbolLen + 5)
      }

      if (key === '0') {
        value = '0';
      }
      if (key === 'trigger_price_compute') {
          value = row['trigger_price'] ;
      }
      if (key === 'amount_side'){
          let side =  row['side']
          switch (side) {
          case 1:
            value = `<span class="font-color-buy"> ${row['amount']}</span>`
            break
          case 2:
            value = `<span class="font-color-sell">-${row['amount']}</span>`
            break
          default:
            break
          }
      }
      if (key === 'amount'){
        let side =  row['side']
          switch (side) {
          case 1:
            value = `<span class="font-color-buy"> ${row['amount']}</span>`
            break
          case 2:
            value = `<span class="font-color-sell">-${row['amount']}</span>`
            break
          default:
            break
          }
      }


      return value
    }
  }
}

export default processValue
