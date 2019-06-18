/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-03 20:48
 */
import StepTable from '../components/table'
import * as mock from '../mock/mock'
import SlideModel from '../components/StepModel'
import utils from '../../../modules/utils'
import service from '@/modules/service'
import {state} from '@/modules/store'
export const tradeMixins = {
  data () {
    return {
      active: 0,
      side: 0,
      detail: {},
      orderHeader: [
        {
          label: '订单号',
          prop: 'trans_id'
        },
        {
          label: '类型',
          prop: 'side',
          render: (h, params) => {
            const state = params.row.side
            const name = state === 1 ? '买入' : '卖出'
            const color = state === 1 ? '#09C989' : '#F45151'
            return h('div', {
              style: {
                color: color
              }
            }, name)
          }
        },
        {
          label: '状态',
          prop: 'state',
          render: (h, params) => {
            return h('div', this.state(params.row.state))
          }
        },
        {
          label: '币种',
          prop: 'symbol'
        },
        {
          label: '价格',
          prop: 'price',
          render: (h, params) => {
            let spiltName = params.row.symbol.split('/')
            let name = params.row.price + '   ' + spiltName[1]
            return h('div', name)
          }
        },
        {
          label: '数量',
          prop: 'amount',
          render: (h, params) => {
            let name = params.row.amount + '   ' + params.row.currency
            return h('div', name)
          }
        },
        {
          label: '金额',
          prop: 'total',
          render: (h, params) => {
            let spiltName = params.row.symbol.split('/')
            let name = params.row.total + '   ' + spiltName[1]
            return h('div', name)
          }
        },
        {
          label: '下单时间',
          prop: 'create_time',
          width: 180,
          render: (h, params) => {
            return h('div', utils.dateFormatter(params.row.create_time, 'Y-M-D H:m:s'))
          }
        },
        {
          label: '操作',
          prop: 'trans_id',
          render: this.tradeActions
        }
      ],
      tradeHeader: [
        {
          label: '委托单号',
          prop: 'active_id'
        },
        {
          label: '类型',
          prop: 'side',
          render: (h, params) => {
            const state = params.row.side
            const name = state === 1 ? '买入' : '卖出'
            const color = state === 1 ? '#09C989' : '#F45151'
            return h('div', {
              style: {
                color: color
              }
            }, name)
          }
        },
        {
          label: '委托单价',
          prop: 'price',
          render: (h, params) => {
            let spiltName = params.row.symbol.split('/')
            let name = params.row.price + '   ' + spiltName[1]
            return h('div', name)
          }
        },
        {
          label: '委托数量/成交数量',
          prop: 'side',
          width: 160,
          render: (h, params) => {
            let name = params.row.amount + '/' + params.row.executed + '  ' + params.row.currency
            return h('div', name)
          }
        },
        {
          label: '委托金额/成交金额',
          width: 160,
          prop: 'side',
          render: (h, params) => {
            let spiltName = params.row.symbol.split('/')
            let name = params.row.total + '/' + params.row.executed * params.row.price + '   ' + spiltName[1]
            return h('div', name)
          }
        },
        {
          label: '状态',
          prop: 'state',
          render: (h, params) => {
            return h('div', this.orderState(params.row.state))
          }
        },
        {
          label: '发布时间',
          prop: 'create_time',
          width: 180,
          render: (h, params) => {
            return h('div', utils.dateFormatter(params.row.create_time, 'Y-M-D H:m:s'))
          }
        },
        {
          label: '操作',
          prop: 'id',
          width: 140,
          render: this.tradeActions
        }
      ],
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
    }
  },
  components: {
    StepTable,
    SlideModel
  },
  filters: {
    side (state) {
      return state === 1 ? '买入' : '售出'
    },
    state (code) {
      switch (code) {
        case 1:
          return '待支付'
        case 2:
          return '等待放币'
        case 3:
          return '已完成'
        case 4:
          return '买家取消'
        case 5:
          return '卖家取消'
        case 6:
          return '买家超时取消'
        case 7:
          return '卖家超时放币'
        default:
          return ''
      }
    }
  },
  methods: {
    state (code) {
      switch (code) {
        case 1:
          return '待支付'
        case 2:
          return '等待放币'
        case 3:
          return '已完成'
        case 4:
          return '买家取消'
        case 5:
          return '卖家取消'
        case 6:
          return '买家超时取消'
        case 7:
          return '卖家超时放币'
        default:
          return ''
      }
    },
    orderState (code) {
      switch (code) {
        case 1:
          return '委托中未成交'
        case 2:
          return '委托中部分成交'
        case 3:
          return '成交完了'
        case 4:
          return '撤单全部'
        case 5:
          return '撤单部分成交'
        case 6:
          return '暂停'
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
              this.dialogVisible = true
              this.detail = params.row
              this.side = 0
            }
          }
        }, '详情')
      )
      if (this.active === 3) {
        if (params.row.state === 1 || params.row.state === 2) {
          btns.push(
            h('a', {
              style: {
                marginRight: '5px',
                width: '40px',
                height: '20px',
                background: '#01CED1',
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
                  service.otcOrderRemove(
                    {
                      type: 1,
                      trans_id: params.row.active_id
                    }
                  ).then(res => {
                    if (!res.code) {
                      this.$message.success('撤销成功')
                      this.init(this.active)
                    } else {
                      this.$message.error(`${res.message}`)
                    }
                  })
                }
              }
            }, '撤销')
          )
        }
      }
      return h('div', btns)
    }
  },
  created () {
    // 初始化第一条数据
    // this.data = mock.unDonefillsData.data.data
  }
}
