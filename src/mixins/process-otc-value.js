import utils from '@/modules/utils'

const processValue = {
  methods: {
    processValue (key, row) {
      let value = row[key]
      let down = 0
      if (key === 'create_time' ||
      key === 'register_time' ||
      key === 'update_time' ||
      key === 'created_time') {
        value = utils.dateFormatter(value, 'Y-M-D')
      }

      if (key === 'kyc_level'){
        value = 'kyc' + value
      }

      if (key === 'order_amount') {
        if(!row.amount || !row.freezed){
          value = '0'
        }
        else {
          return this.$big(row.amount).minus(row.freezed).toString()
        }
      }
      if (key === 'type') {
        value = this.$t(value)
      }

      if (key === 'thirty_day_orders_rate' ||
      key === 'orders_rate') {
        if(!value || value == ''){
          value = '0%'
        }
        else {
          value = this.$big(value).mul(100).toFixed(0) + '%'
        }
      }

      if (key === 'payment_type') {
        // console.log({key})
        switch (value) {
          case 1: 
            // return `银行卡(${row['card_number']})`
            return row['deposit_bank'] + ' ' + row['card_number'].substr(0, 4) + '****' + row['card_number'].substr(-4)
          case 2:
            // return `支付宝(${row['alipay_account']})`
            return '支付宝 ' + row['alipay_account'].substr(0, 3) + '****'
          case 3:
            // return `微信支付(${row['we_chat_account']})`
            return '微信支付 ' + row['we_chat_account'].substr(0, 3) + '****' 
          case 4: 
            return 'Paynow ' + row['card_number'].substr(0, 4) + '****' + row['card_number'].substr(-4)
          case 5:
            return 'Paylah ' + row['card_number'].substr(0, 4) + '****' + row['card_number'].substr(-4)
          default:
            return ''
        }
      }

      if (key === 'transaction_state') {
        value = row['state']
        switch (value) {
            case 1:
                return this.$t('otcState_1')
            case 2:
                return this.$t('otcState_2')
            case 3:
                return this.$t('otcState_3')
            case 4:
                return this.$t('otcState_4')
            case 5:
                return this.$t('otcState_5')
            case 6:
                return this.$t('otcState_6')
            case 7:
                return this.$t('otcState_7')
            default:
                return ""
        }
      }

      if (key === 'order_state') {
        value = row['state']
        switch (value) {
          case 1:
            return "委托中未成交"
          case 2:
            return "委托中部分成交"
          case 3:
            return "成交完了"
          case 4:
            return "撤单全部"
          case 5:
            return "撤单部分成交"
          case 6:
            return "暂停"
          default:
            return ""
        }
      }

      if (key === 'pay_time_avg' ||
        key === 'issue_time_avg') {
        let remain = Math.floor(value / 1000)
        let seconds = remain % 60
        let day = Math.floor(remain / (60 * 60 * 24))
        let hour = Math.floor((remain - day * 60 * 60 * 24) / (60 * 60))
        let minutes = Math.floor(
          (remain - day * 60 * 60 * 24 - hour * 60 * 60) / 60
        )

        let ss = seconds < 10 ? '0' + seconds : seconds
        let mm = minutes < 10 ? '0' + minutes : minutes
        let hh = hour < 10 ? '' + hour : hour
        let dd = day < 10 ? '' + day : day

        if (day > 0) {
          return  `${dd}d ${hh}h ${mm}' ${ss}"`
        }
        else if (hour > 0) {
          return  `${hh}h ${mm}' ${ss}"`
        }
        else {
          return `${mm}' ${ss}"`
        }
      }

      // 格式化方向
      if (key === 'side') {
        switch (value) {
          case 1:
            value = `<span style="color: #23C88B;"> ${this.$t('order_side_buy')}</span>`
            break
          case 2:
            value = `<span style="color: #F24E4D;">${this.$t('order_side_sell')}</span>`
            break
          default:
            value = `<span>-</span>`
            break
        }
      }
      return value
    }
  }
}

export default processValue
