/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-03 20:48
 */
import StepTable from '../components/old/table' 
import SlideModel from '../components/old/StepModel'
import STepSelect from '../components/old/StepSelect'
import utils from '@/modules/utils'
import service from '@/modules/service'
import {state} from '@/modules/store'
export const tradeMixins = {
  components: {
    StepTable,
    SlideModel,
    STepSelect
  },
  data () {
    return {
      state,
      active: 0,
      side: 0,
      detail: {},
      currentType: {
        currency: ''
      },

      tableHeader: [],
      data: [],
      tradeData: [
        {
          create_time: '2019-12-1',
          state: 1
        },
        {
          create_time: '2019-12-1',
          state: 2
        }
      ],
      dialogVisible: false
    }
  },
  computed: {
    userInfo () {
      return state.userInfo || {}
    },
    id () {
      return this.userInfo.id
    },
    orderHeader () {
      return [
        { 
          prop: 'order_id',
          renderHeader: (h) => {
            return (
              <span>{this.$t('otc_trans_id')}</span>
            )
          }
        },
        {
          label: this.$t('order_th_type'),
          prop: 'type', 
          renderHeader: (h, params) => {
            return <span>{this.$t('order_th_type')}</span>
          },
          render: (h, params) => {
            const state = params.row.type
            const name = state === 0 ? this.$t('order_side_buy') : this.$t('order_side_sell')
            const color = state === 0 ? '#09C989' : '#F45151'
            return h('div', {
              style: {
                color: color
              }
            }, name)
          }
        },
        { 
          prop: 'state',
          renderHeader: (h) => {
            return (
              <span>{this.$t('order_th_status')}</span>
            )
          },
          render: (h, params) => {
            return h('div',  this.$t('my_otc.orders.mapStatus.'+params.row.order_status))
          }
        },
        {
          label: this.$t('currency'),
          prop: 'coin_symbol',
          width: 120, 
          renderHeader: (h, params) => {
            return  <span>{this.$t('otc_currency')}</span>
          }
        },
        { 
          prop: 'price',
          renderHeader: (h) => {
            return (
              <span>{this.$t('price')}</span>
            )
          },
          render: (h, params) => {
            // let spiltName = params.row.symbol.split('/')
            // let name = params.row.price + '   ' + spiltName[1]
            let name = params.row.price
            return h('div', name)
          }
        },
        { 
          prop: 'coin_amount',
          renderHeader: (h) => {
            return (
              <span>{this.$t('amount')}</span>
            )
          },
          // render: (h, params) => {
          //   let name = params.row.amount + '   ' + params.row.currency
          //   return h('div', name)
          // }
        },
        { 
          prop: 'total',
          renderHeader: (h) => {
            return (
              <span>{this.$t('order_value')}</span>
            )
          },
          render: (h, params) => { 
            let name = params.row.total+ '   ' + params.row.currency
            return h('div', name)
          }
        },
        { 
          prop: 'create_time',
          width: 180,
          renderHeader: (h) => {
            return (
              <span>{this.$t('otc_create_time')}</span>
            )
          },
          render: (h, params) => {
            return h('div', utils.dateFormatter(params.row.create_time, 'Y-M-D H:m:s'))
          }
        },
        // { 
        //   prop: 'trans_id',
        //   renderHeader: (h) => {
        //     return (
        //       <span>{this.$t('operation')}</span>
        //     )
        //   },
        //   render: this.tradeActions
        // }
      ]
    },
    tradeHeader () {
      return [
        { 
          prop: 'order_id',
          renderHeader: (h) => {
            return (
              <span>{this.$t('otc_active_id')}</span>
            )
          },
        },
        { 
          prop: 'type',
          renderHeader: (h) => {
            return (
              <span>{this.$t('order_th_type')}</span>
            )
          },
          render: (h, params) => {
            const state = params.row.type
            const name = state === 0 ? this.$t('order_side_buy') : this.$t('order_side_sell')
            const color = state === 0 ? '#09C989' : '#F45151'
            return h('div', {
              style: {
                color: color
              }
            }, name)
          }
        },
        { 
          prop: 'price',
          renderHeader: (h) => {
            return (
              <span>{this.$t('order_th_capedasda')}</span>
            )
          },
          render: (h, params) => {
            // let spiltName = params.row.symbol.split('/')
            // let name = params.row.price + '   ' + spiltName[1]
            let name = params.row.price
            return h('div', name)
          }
        },
        { 
          prop: 'side',
          width: 160,
          renderHeader: (h) => {
            return (
              <span>{this.$t('order_th_capeaxcvb')}</span>
            )
          },
          render: (h, params) => {
            let name = params.row.amount + '/' + params.row.executed + '  ' + params.row.currency
            return h('div', name)
          }
        },
        { 
          width: 160,
          prop: 'side',
          renderHeader: (h) => {
            return (
              <span>{this.$t('order_th_capehjiky')}</span>
            )
          },
          render: (h, params) => {
            // let spiltName = params.row.symbol.split('/')
            const retainTwo = str => this.$big(str).round(2, 0)
            // let name = `${retainTwo(params.row.total)}/${retainTwo(params.row.executed * params.row.price)}   ${spiltName[1]}`
            let name = `${retainTwo(params.row.total)}/${retainTwo(params.row.executed * params.row.price)}`
            return h('div', name)
          }
        },
        { 
          prop: 'state',
          renderHeader: (h) => {
            return (
              <span>{this.$t('state')}</span>
            )
          },
          render: (h, params) => {
            return h('div', this.orderState(params.row.state))
          }
        },
        { 
          prop: 'create_time',
          width: 180,
          renderHeader: (h) => {
            return (
              <span>{this.$t('order_th_capeqqewc')}</span>
            )
          },
          render: (h, params) => {
            return h('div', utils.dateFormatter(params.row.create_time, 'Y-M-D H:m:s'))
          }
        },
        { 
          prop: 'id',
          width: 140,
          renderHeader: (h) => {
            return (
              <span>{this.$t('active_relay_operator')}</span>
            )
          },
          render: this.tradeActions
        }
      ]
    }
  }, 
  methods: {
    exchangeState (code) { 
      switch (code) {
        case 1:
          return this.$t('otc_sideoc_6')
        case 2:
          return this.$t('otc_buy_step_4')
        case 3:
          return this.$t('done')
        case 4:
          return this.$t('otc_sidees2')
        case 5:
          return this.$t('otc_sidees3')
        case 6:
          return this.$t('otc_sidees4')
        case 7:
          return this.$t('otc_sideoc_7')
        default:
          return ''
      }
    },
    orderState (code) {
      switch (code) {
        case 1:
          return this.$t('contract_assigning_undeal')
        case 2:
          return this.$t('contract_assigning_deal_part')
        case 3:
          return this.$t('otc_sidees6')
        case 4:
          return this.$t('otc_sidees7')
        case 5:
          return this.$t('otc_sidees8')
        case 6:
          return this.$t('otc_sidees9')
        default:
          return ''
      }
    },
    tradeActions (h, params) {
      const state = params.row.side
      const color = state === 1 ? '#09C989' : '#F45151'
      let btns = []
      btns.push(
        h('span', {
          style: {
            marginRight: '5px',
            float: 'left',
            display: 'block',
            color: color,
            cursor: 'pointer'
          },
          on: {
            click: () => {
              if (this.active === 3) {
                this.dialogVisible = true
                this.detail = params.row
                this.side = 0
                this.bankData = []
              } else {
                let p = {
                  trans_id: params.row.trans_id,
                  user_id: this.id
                }
                service.getOtcOrderInfo(p).then(res => {
                  this.dialogVisible = true
                  this.detail = res.data
                  this.side = 0
                  this.bankData = []
                })
              }
            }
          }
        }, this.$t('otc_sidees10'))
      )
      if (this.active === 3) {
        if (params.row.state === 1 || params.row.state === 2) {
          btns.push(
            h('a', {
              style: {
                marginRight: '5px',
                width: '40px',
                height: '20px',
                background: 'rgba(201,169,108,1)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '12px',
                float: 'left',
                display: 'block',
                textAlign: 'center',
                lineHeight: '20px',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.$confirm(this.$t('otc_ziurec_18'), {
                    confirmButtonText: this.$t('otc_ziurec_20'),
                    cancelButtonText: this.$t('cancel'),
                    type: 'warning'
                  }).then(() => {
                    service.otcOrderRemove(
                      {
                        type: 1,
                        trans_id: params.row.active_id
                      }
                    ).then(res => {
                      if (!res.code) {
                        // this.$message.success('撤销成功')
                        this.$message({
                          type: 'success',
                          message: this.$t('otc_sidees11'),
                          duration: 1000
                        })
                        this.init(this.active)
                      } else {
                        // this.$message.error(`${res.message}`)
                        this.$message({
                          type: 'error',
                          message: `${res.message}`,
                          duration: 1000
                        })
                      }
                    })
                  }).catch(() => {
                  })
                }
              }
            }, this.$t('contract_assign_revert'))
          )
        }
      }
      return h('div', btns)
    },
    Order (state) {
        return state === 1 ? this.$t('otc_side_1') : this.$t('otc_side_2')

        
      }
  },
  created () {
    // 初始化第一条数据
    // this.data = mock.unDonefillsData.data.data
  }
}
