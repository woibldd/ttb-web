import _ from 'lodash'
import utils from '@/modules/utils'

const coins = ['USDT', 'BTC', 'ETH', 'EOS', 'IOST', 'ADA', 'DTA']
// const coins = ['USDT', 'BTC', 'ETH', 'EOS', 'IOST', 'ADA', 'AE', 'BCH', 'BNB', 'ETC', 'KCS', 'LTC', 'NEO', 'OMG', 'SC', 'STORJ']
const rand = n => Math.floor(Math.random() * Math.pow(10, n))

const balanceItem = (currency) => {
  let test = { 'currency_name': 'USDT', 'unavailable': '0', 'ordering': '0', 'locking': '0', 'available': '439.3373024886', 'withdrawable_amount': '439.3373024886', 'withdrawing': '0', 'scale': 6, 'priced': true, 'quota_btc': '100', 'full_name': 'Tether(OMNI)', 'confirming': '0', 'quota': '643017.999321', 'equality': '0.068324' }
  // if (currency === 'BTC') {
  // test.available = 0
  // }
  return test
}

export const filter = {
  'pair/list': 0,
  'currency/rate': 0,
  'user/my_invite': 0,
  'balance/query': 0,
  'order/active': 0,
  'favorite/list': 0,
  'account/candy/list': 0,
  'account/currency/list': 0,
  'mine/exchange/ix/me/history': 1,
  'account/balance/ix': 1,
  'mine/exchange/ix/me': 1,
  '/market/ix': 1,
  '/bonus/total': 1,
  'mine/exchange/ix/me/total': 1,
  'account/balance/unlock': 1,
  'account/balance/lock': 1,
  'mine/exchange/ix/total': 1,
  'mine/game/join/list': 1,
  'mine/game/me': 1,
  'mine/game/rank': 1,
  'mine/game/pool': 1,
  'mine/game/join': 1,
  'game/bet/history': 1,
  'game/bet/last': 1,
  'game/bet/current': 1,
  'game/bet/me': 1,
  'game/bet/bet': 1
}
export const list = [
  {
    url: /game\/bet\/bet/,
    res () {
      return ok({})
    }
  },
  {
    url: /game\/bet\/last/,
    res () {
      return ok({
        game_id: 20181024001, // 活动期号
        pool: 88776, // 上期奖励，奖池总数量IX
        jackpots: [{ // 上期冠军奖用户(数组),
          UID: 'uid123',
          bet: 'bet123',
          ix: 'ix1234'
        }],
        invite_bet_ix: 9998.8, // 上期伯乐奖所有用户投注IX数量
        invite_ix: 99999 // 上期伯乐奖所有用户奖励IX数量
      })
    }
  },
  {
    url: /game\/bet\/me/,
    res () {
      return ok([{
        game_id: '20181024001',
        result: 0, // result 0未开奖 1涨 2平 3跌
        bet_time: new Date().getTime(),
        bet2_amount: rand(5),
        bet3_amount: rand(4),
        win_amount: rand(2)
      }, {
        game_id: '20181024002',
        result: 1, // result 0未开奖 1涨 2平 3跌
        bet_time: new Date().getTime(),
        bet3_amount: rand(4),
        win_amount: rand(2)
      }, {
        game_id: '20181024003',
        result: 2, // result 0未开奖 1涨 2平 3跌
        bet_time: new Date().getTime(),
        bet1_amount: rand(9),
        win_amount: rand(2)
      }, {
        game_id: '20181024004',
        result: 3, // result 0未开奖 1涨 2平 3跌
        bet_time: new Date().getTime(),
        bet1_amount: rand(9),
        bet2_amount: rand(5),
        bet3_amount: rand(4),
        win_amount: rand(2)
      }])
    }
  },

  {
    url: /game\/bet\/current/,
    res () {
      return ok({
        game_id: '20181028002',
        betover_time: new Date(2018, 12, 13).getTime(),
        gameover_time: new Date(2019, 8, 30).getTime(),
        open_price: 6666,
        current_price: 6888,
        bet1_amount: rand(4),
        bet2_amount: rand(3),
        bet3_amount: rand(4),
        bet_rank: [ // 本期投注排行前3，UID+投注IX数量
          {uid: '12121', ix: 8888.3},
          {uid: '46583', ix: 36352.13},
          {uid: '46583', ix: 36352.13}
        ]
      })
    }
  },

  {
    url: /game\/bet\/history/,
    res () {
      return ok([{
        game_id: '20181024001',
        result: 0, // result 0未开奖 1涨 2平 3跌
        destroy_amount: rand(4),
        destroy_record: 'https://omniexplorer.info/tx/af07d616cacb2cd65b8830ec135be710e1babfa107fca9541d838aef4f056f08'
      }, {
        game_id: '20181024002',
        result: 3, // result 0未开奖 1涨 2平 3跌
        destroy_amount: rand(4),
        destroy_record: 'xxxx'
      }, {
        game_id: '20181024003',
        result: 2, // result 0未开奖 1涨 2平 3跌
        destroy_amount: rand(4),
        destroy_record: 'xxxx'
      }, {
        game_id: '20181024004',
        result: 1, // result 0未开奖 1涨 2平 3跌
        destroy_amount: rand(4),
        destroy_record: 'xxxx'
      }])
    }
  },

  {
    url: /mine\/game\/join\/list/,
    res () {
      return ok([
        {
          user_id: 123123,
          join_time: new Date().getTime()
        },
        {
          join_time: new Date().getTime()
        }
      ])
    }
  },
  {
    url: /mine\/game\/me/,
    res () {
      return ok({
        is_join: 0,
        mined_amount: '93849.33234'
      })
    }
  },
  {
    url: /mine\/game\/rank/,
    res () {
      return ok([
        {
          rank: 1,
          user_id: 123123,
          mined_amount: '23123123',
          reward: '23492939.0012'
        },
        {
          rank: 2,
          user_id: 94994,
          mined_amount: '33',
          reward: '23492939.0012'
        },
        {
          rank: 3,
          user_id: 94994,
          mined_amount: '33',
          reward: '23492939.0012'
        },
        {
          rank: 4,
          user_id: 94994,
          mined_amount: '33',
          reward: '23492939.0012'
        },
        {
          rank: 5,
          user_id: 94994,
          mined_amount: '32378128378173',
          reward: '23492939.0012'
        },
        {
          rank: 6,
          user_id: 948994,
          mined_amount: '33',
          reward: '23492939.0012'
        },
        {
          rank: 7,
          user_id: 94994,
          mined_amount: '3020928283',
          reward: '23492939.0012'
        },
        {
          rank: 8,
          user_id: 94994,
          mined_amount: '33',
          reward: '23492939.0012'
        },
        {
          rank: 9,
          user_id: 94994,
          mined_amount: '33',
          reward: '23492939.0012'
        },
        {
          rank: 10,
          user_id: 94994,
          mined_amount: '32300288383',
          reward: '23492939.0012'
        },
        {
          rank: 11,
          user_id: 94994,
          mined_amount: '33',
          reward: '23492939.0012'
        }
      ])
    }
  },
  {
    url: /mine\/game\/pool/,
    res () {
      return ok({
        start_time: new Date().getTime(),
        end_time: new Date().getTime(),
        pool: '1231231.21239923'
      })
    }
  },
  {
    url: /mine\/game\/join/,
    res () {
      return ok({})
    }
  },
  {
    url: /mine\/exchange\/ix\/total/,
    res () {
      return ok({
        power: '800.22',
        amount_today: '123399.234',
        amount_yesterday: '234499.21239',
        total: '234234.049'
      })
    }
  },
  {
    url: /account\/balance\/unlock/,
    res () {
      return ok({})
    }
  },
  {
    url: /account\/balance\/lock/,
    res () {
      return ok({})
    }
  },
  {
    url: /mine\/exchange\/ix\/me\/total/,
    res () {
      return ok({
        amount_today: '212313.213',
        amount_yesterday: '300234.3223490',
        total: '9434234234.49'
      })
    }
  },
  {
    url: /market\/ix/,
    res () {
      return ok({ amount: 11111,
        locked: 2222,
        market_value: 3333 })
    }
  }, {
    url: /bonus\/total/,
    res () {
      return ok({ btc_today: 11111,
        btc_yesterday: 2222,
        btc_rate: 3333,
        ix_today: 4444,
        ix_yesterday: 5555,
        ix_rate: 6666
      })
    }
  },
  {
    url: /^mine\/exchange\/ix\/me$/,
    res () {
      return ok({power: 200, amount: 22200})
    }
  }, {
    url: /^mine\/exchange\/ix\/me\/history/,
    res ({ currency } = {}) {
      return ok([{
        mine_time: new Date().getTime(),
        fee: '200.22255',
        power: '200',
        amount: '212312300.021300',
        state: 1,
        release_time: new Date().getTime()
      }, {
        mine_time: new Date().getTime(),
        fee: '200.22233',
        power: '200',
        amount: '200.000',
        state: 0,
        release_time: new Date().getTime()
      }, {
        mine_time: new Date().getTime(),
        fee: '200.22233',
        power: '200',
        amount: '200.000',
        state: 1,
        release_time: new Date().getTime()
      }, {
        mine_time: new Date().getTime(),
        fee: '200.22233',
        power: '200',
        amount: '200.000',
        state: 0,
        release_time: new Date().getTime()
      }, {
        mine_time: new Date().getTime(),
        fee: '202342340.22233',
        power: '200',
        amount: '200.000',
        state: 1,
        release_time: new Date().getTime()
      }, {
        mine_time: new Date().getTime(),
        fee: '200.22233',
        power: '200',
        amount: '200.000',
        state: 1,
        release_time: new Date().getTime()
      }, {
        mine_time: new Date().getTime(),
        fee: '200.22233',
        power: '201230.23',
        amount: '20012312.0040',
        state: 1,
        release_time: new Date().getTime()
      }])
    }
  }, {
    url: /^account\/balance\/ix/,
    res ({ currency } = {}) {
      return ok({
        available: '11020301.23123123123',
        locked: '80000',
        unlocking: '20000',
        release_time: new Date().getTime()
      })
    }
  }, {
    url: /^order\/active/,
    res ({ currency } = {}) {
      return ok({ 'items': [{ 'id': '241867103081484288', 'symbol': 'EOSC_USDT', 'side': 'SELL', 'price': '0.5', 'amount': '52.26', 'unclosed': '52.26', 'create_time': 1535624011000, 'deal_amount': '0', 'total': '0', 'type': 'LIMIT' }, { 'id': '241866968909897728', 'symbol': 'EOSC_USDT', 'side': 'SELL', 'price': '0.1', 'amount': '34.83', 'unclosed': '34.83', 'create_time': 1535623979000, 'deal_amount': '0', 'total': '0', 'type': 'LIMIT' }, { 'id': '241866608841482240', 'symbol': 'EOSC_USDT', 'side': 'SELL', 'price': '0.08', 'amount': '46.45', 'unclosed': '46.45', 'create_time': 1535623893000, 'deal_amount': '0', 'total': '0', 'type': 'LIMIT' }, { 'id': '231368936590299136', 'symbol': 'TB_USDT', 'side': 'SELL', 'price': '0.1', 'amount': '2000', 'unclosed': '2000', 'create_time': 1533121053000, 'deal_amount': '0', 'total': '0', 'type': 'LIMIT' }] })
    }
  }, {
    url: /^favorite\/list/,
    res ({ currency } = {}) {
      return ok({ 'items': [{ 'symbol': 'EOS_USDT' }, { 'symbol': 'ETH_USDT' }] })
    }
  }, {
    url: /^balance\/list/,
    res ({ currency } = {}) {
      return ok(_.map(coins, balanceItem))
    }
  }, {
    url: /banner\/list/,
    res () {
      return ok({
        banners: [{
          action: 'https://eos.io',
          pic: 'https://s1.ax1x.com/2018/01/24/p7e4sg.jpg'
        }, {
          action: 'http://bitcoin.org',
          pic: 'https://ww1.sinaimg.cn/large/005Fpu2Tly1fopi1ckivhj30ek07sq48.jpg'
        }, {
          action: 'http://bitcoin.org',
          pic: 'https://ww1.sinaimg.cn/large/005Fpu2Tly1fopi0db1a2j30ek07wab9.jpg'
        }, {
          action: 'http://bitcoin.org',
          pic: 'https://ww1.sinaimg.cn/large/005Fpu2Tly1fopi0dbg2aj30ek07smyh.jpg'
        }]
      })
    }
  }, {
    url: /pair\/recommend/,
    res () {
      return ok([{
        currency: 'BTC',
        product: 'EOS',
        name: 'EOS_BTC'
      }, {
        currency: 'BTC',
        product: 'ETH',
        name: 'ETH_BTC'
      }, {
        currency: 'ETH',
        product: 'DTA',
        name: 'DTA_ETH'
      }])
    }
  }, {
    url: /order\/list/,
    res () {
      return ok(dup(i => {
        return {
          id: i,
          pair: 'DTA_BTC',
          avail: 100 + i,
          amount: 200 + i,
          type: rand(1) + 1,
          limit: i,
          price: i + 1,
          createtime: Math.floor(new Date() / 1000)
        }
      }, 20))
    }
  }, {
    url: /balance\/query/,
    res ({ currency }) {
      return ok(balanceItem(currency))
    }
  }, {
    //   url: /currency\/list/,
    //   res (data) {
    //     return ok({
    //       items: _.map(coins, coin => {
    //         return {
    //           scale: coin === 'USDT' ? 2 : 8,
    //           name: coin,
    //           fullname: coin + ' coin'
    //         }
    //       })
    //     })
    //   }
  }, {
    url: /currency\/rate/,
    res (data) {
      return ok({ 'HKD': '7.85', 'TWD': '30.79', 'SGD': '1.37', 'KRW': '1124', 'JPY': '110', 'EUR': '0.86', 'GBP': '0.77', 'USD': '1', 'CNY': '6.84' })
    }
  }, {
    url: /google\/new/,
    res () {
      return ok({
        key: 'm54x4r7lij2o7664'
      })
    }
  }, {
    url: /google\/bind/,
    res (data) {
      if (data && data.code === '111111') {
        return err()
      }
      return ok({})
    }
  }, {
    url: /kyc\/location/,
    res () {
      return ok({
        items: [{
          id: 1,
          text: '中国'
        }, {
          id: 2,
          text: '日本'
        }]
      })
    }
  }, {
    url: /kyc\/update/,
    res () {
      return ok({})
    }
  }, {
    url: /kyc\/upload/,
    res () {
      return ok({})
    }
  }, {
    url: /user\/my_invite/,
    res () {
      return ok(rand(4))
    }
  }, {
  // url: /kyc\/query/,
    res () {
      return ok({
        state: 0,
        reason: '有点问题',
        type: 1,
        first: 'liu',
        last: 'zhan',
        birthday: '19910101',
        street: 'xixi',
        unit: 'haha',
        city: 'xixi',
        zipcode: 'haha',
        location: 1,
        idfront: ['https://upload.wikimedia.org/wikipedia/zh/4/4e/Your_name_poster.jpg', ''][rand(1)],
        idback: ['https://upload.wikimedia.org/wikipedia/zh/d/d6/Kiminona.jpg', ''][rand(1)],
        inhand: ['http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg', ''][rand(1)],
        passport: ['https://p2.bahamut.com.tw/M/2KU/66/0001543066.JPG', ''][rand(1)],
        guardian: ['http://pic.sc.chinaz.com/files/pic/pic9/201303/xpic10458.jpg', ''][rand(1)],
        other: ['http://www.heyshow.com/wp-content/uploads/paid-campaign/266_artwork_1496480642.jpeg', ''][rand(1)]
      })
    }
  }, {
    url: /^pair\/list/,
    res (data) {
      const currency = data && data.currency ? data.currency : ''
      if (currency) {
        return ok(_.map(coins, coin => ({
          name: coin + '_' + currency,
          product: coin,
          productscale: 2,
          currency,
          currencyscale: 6
        })))
      } else {
        return ok({
          items: _.map(coins, coin => ({
            name: coin + '_BTC',
            price: rand(100),
            product_name: coin,
            product_scale: 2,
            currency_name: 'BTC',
            currency_scale: 6,
            amount_scale: 4,
            price_scale: 6,
            min_amount: '1',
            max_amount: '10000000',
            min_total: '0.01',
            max_total: '10000000'
          })).concat(_.map(coins, coin => ({
            name: coin + '_USDT',
            price: rand(200),
            min_amount: '1',
            max_amount: '10000000',
            min_total: '0.01',
            max_total: '10000000',
            product_name: coin,
            product_scale: 4,
            currency_scale: 6,
            currency_name: 'USDT',
            price_scale: 6,
            amount_scale: 4
          })))
        })
      }
    }
  }, {
    url: /phone\/new/,
    res () {
      return ok()
    }
  }, {
    url: /phone\/bind/,
    res (data) {
      if (data && data.code === '1111111') {
        return err()
      }
      return ok({})
    }
  }, {
    url: /sign\/signin/,
    res () {
      return ok({})
    }
  }, {
    url: /sign\/session/,
    res () {
      if (window) {
        return ok({
          email: 'i@popo.moe',
          google: false,
          phone: false,
          nick: 'popo',
          kyc: 0
        })
      }
      return err(1025, '未登录')
    }
  }, {
    url: /transfer\/stats/,
    res () {
      return ok({
        in: rand(3),
        out: rand(3),
        done: rand(3)
      })
    }
  }, {
    url: /transfer\/list/,
    res () {
      const item = () => {
        return {
          txid: _.uniqueId(),
          currency_name: 'BTC',
          type: ['IN', 'OUT'][rand(1)],
          unread: rand(1),
          confirmation: rand(5),
          withdraw_confirmation: 5 + rand(5),
          state: rand(4) + 1,
          amount: rand(100000),
          note: utils.generateToken(10),
          create_time: new Date()
        }
      }
      const items = []
      let n = 50
      while (n--) {
        items.push(item())
      }
      return ok({
        items
      })
    }
  }, {
    url: /error/,
    res () {
      return err()
    }
  }, {
    url: /quota\.ix-test.*deal/,
    res () {
      return ok([{ 'time': 1535716099735, 'side': 'sell', 'values': ['0.000901', '214.467'] }, { 'time': 1535715916739, 'side': 'buy', 'values': ['0.000899', '256.4311'] }, { 'time': 1535715692734, 'side': 'sell', 'values': ['0.000896', '259.39'] }, { 'time': 1535715507741, 'side': 'buy', 'values': ['0.0009', '279.6957'] }, { 'time': 1535715278754, 'side': 'sell', 'values': ['0.000901', '288.6194'] }, { 'time': 1535715094738, 'side': 'buy', 'values': ['0.000901', '283.1885'] }, { 'time': 1535714862745, 'side': 'sell', 'values': ['0.000898', '281.1275'] }, { 'time': 1535714633733, 'side': 'buy', 'values': ['0.000899', '210.8261'] }, { 'time': 1535714466741, 'side': 'sell', 'values': ['0.000903', '285.9508'] }, { 'time': 1535714310739, 'side': 'sell', 'values': ['0.000899', '290.5931'] }, { 'time': 1535714087738, 'side': 'buy', 'values': ['0.000898', '284.6423'] }, { 'time': 1535713873739, 'side': 'sell', 'values': ['0.000899', '299.5677'] }, { 'time': 1535713699739, 'side': 'sell', 'values': ['0.000902', '247.4491'] }, { 'time': 1535713474738, 'side': 'sell', 'values': ['0.000892', '257.8579'] }, { 'time': 1535713302731, 'side': 'buy', 'values': ['0.000889', '234.7187'] }, { 'time': 1535713085741, 'side': 'sell', 'values': ['0.00089', '275.514'] }, { 'time': 1535712923743, 'side': 'sell', 'values': ['0.00089', '281.8391'] }, { 'time': 1535712765742, 'side': 'sell', 'values': ['0.000889', '288.1326'] }, { 'time': 1535712580925, 'side': 'sell', 'values': ['0.000889', '276.8175'] }, { 'time': 1535712421739, 'side': 'sell', 'values': ['0.000887', '234.0154'] }, { 'time': 1535712255743, 'side': 'buy', 'values': ['0.000889', '207.3649'] }])
    }
  }, {
    url: /quota\.ix-test.*orderbook/,
    res () {
      return ok({ 'asks': [{ 'values': ['0.000921', '4.89'] }, { 'values': ['0.000925', '39.67'] }, { 'values': ['0.000928', '53.58'] }, { 'values': ['0.000929', '7.3'] }, { 'values': ['0.000934', '7.28'] }, { 'values': ['0.00094', '265.87'] }, { 'values': ['0.000944', '143.44'] }, { 'values': ['0.000971', '143.61'] }, { 'values': ['0.000993', '27'] }, { 'values': ['0.000997', '54.22'] }, { 'values': ['0.000999', '15.1'] }, { 'values': ['0.001', '53.5'] }, { 'values': ['0.001005', '44.85'] }, { 'values': ['0.001008', '21.48'] }, { 'values': ['0.001011', '71.07'] }, { 'values': ['0.001015', '57.12'] }, { 'values': ['0.001042', '29.34'] }, { 'values': ['0.001057', '109.25'] }, { 'values': ['0.001079', '76'] }, { 'values': ['0.001127', '52.94'] }], 'bids': [{ 'values': ['0.000879', '251.29'] }, { 'values': ['0.000877', '43.52'] }, { 'values': ['0.000875', '2.7'] }, { 'values': ['0.00087', '401.93'] }, { 'values': ['0.000863', '44.95'] }, { 'values': ['0.000859', '7.87'] }, { 'values': ['0.000833', '339.81'] }, { 'values': ['0.000811', '4.93'] }, { 'values': ['0.000807', '29'] }, { 'values': ['0.000805', '27'] }, { 'values': ['0.000804', '30.1'] }, { 'values': ['0.000799', '17.98'] }, { 'values': ['0.000796', '301.39'] }, { 'values': ['0.000793', '10.55'] }, { 'values': ['0.000789', '44.88'] }, { 'values': ['0.000762', '69.77'] }, { 'values': ['0.000747', '245.89'] }, { 'values': ['0.000725', '58.28'] }, { 'values': ['0.000708', '2'] }, { 'values': ['0.0007', '2'] }] })
    }
  }, {
    url: /quota\.ix-test.*history/,
    res () {
      return ok([{
        'time': 1535501700000,
        'pair': 'EOS_BTC',
        'values': ['0.000832', '0.00083', '0.000829', '0.000832', '1216.484', '1.0100260049', '0.000832', '5', '695.0034']
      }, {
        'time': 1535502600000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.000827', '0.000827', '0.00083', '938.4558', '0.7768374293', '0.00083', '4', '203.9731']
      }, {
        'time': 1535503500000,
        'pair': 'EOS_BTC',
        'values': ['0.000827', '0.000828', '0.000826', '0.000828', '1200.8767', '0.993824677', '0.000827', '5', '950.2614']
      }, {
        'time': 1535504400000,
        'pair': 'EOS_BTC',
        'values': ['0.000828', '0.00083', '0.000828', '0.00083', '965.932', '0.80172356', '0.000828', '4', '965.932']
      }, {
        'time': 1535505300000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.00083', '0.00083', '0.00083', '1238.1528', '1.027666824', '0.00083', '5', '1238.1528']
      }, {
        'time': 1535506200000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.00083', '0.00083', '0.000831', '1266.4862', '1.0514776138', '0.00083', '5', '972.4184']
      }, {
        'time': 1535507100000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.00083', '0.000829', '0.00083', '837.9627', '0.695306402', '0.00083', '4', '635.3237']
      }, {
        'time': 1535508000000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.00083', '0.00083', '0.00083', '896.2608', '0.743896464', '0.00083', '4', '896.2608']
      }, {
        'time': 1535508900000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.000829', '0.000829', '0.00083', '1253.8586', '1.04023046', '0.00083', '5', '472.178']
      }, {
        'time': 1535509800000,
        'pair': 'EOS_BTC',
        'values': ['0.000829', '0.000828', '0.000828', '0.000829', '1193.9936', '0.9890502628', '0.000829', '5', '267.6973']
      }, {
        'time': 1535510700000,
        'pair': 'EOS_BTC',
        'values': ['0.000828', '0.000828', '0.000828', '0.000828', '1013.8616', '0.8394774048', '0.000828', '4', '1013.8616']
      }, {
        'time': 1535511600000,
        'pair': 'EOS_BTC',
        'values': ['0.000828', '0.000826', '0.000826', '0.000828', '1120.3786', '0.9258760665', '0.000828', '5', '421.9575']
      }, {
        'time': 1535512500000,
        'pair': 'EOS_BTC',
        'values': ['0.000826', '0.000827', '0.000826', '0.000827', '1090.476', '0.9009825179', '0.000826', '4', '249.3419']
      }, {
        'time': 1535513400000,
        'pair': 'EOS_BTC',
        'values': ['0.000827', '0.000827', '0.000826', '0.000827', '1331.7131', '1.1010271183', '0.000827', '5', '1032.0977']
      }, {
        'time': 1535514300000,
        'pair': 'EOS_BTC',
        'values': ['0.000827', '0.000826', '0.000826', '0.000827', '1257.4684', '1.0389594676', '0.000827', '5', '966.8992']
      }, {
        'time': 1535515200000,
        'pair': 'EOS_BTC',
        'values': ['0.000826', '0.000828', '0.000826', '0.000828', '959.2278', '0.7939437078', '0.000826', '4', '662.3172']
      }, {
        'time': 1535516100000,
        'pair': 'EOS_BTC',
        'values': ['0.000828', '0.000829', '0.000828', '0.000829', '1235.9469', '1.0243923002', '0.000828', '5', '1028.267']
      }, {
        'time': 1535517000000,
        'pair': 'EOS_BTC',
        'values': ['0.000829', '0.00083', '0.000828', '0.00083', '1266.6574', '1.0509247684', '0.000829', '5', '1066.2206']
      }, {
        'time': 1535517900000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.00083', '0.00083', '0.00083', '1051.0459', '0.872368097', '0.00083', '4', '1051.0459']
      }, {
        'time': 1535518800000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.000828', '0.000828', '0.00083', '1222.9418', '1.0134504343', '0.00083', '5', '665.8569']
      }, {
        'time': 1535519700000,
        'pair': 'EOS_BTC',
        'values': ['0.000828', '0.000829', '0.000828', '0.000829', '1327.1522', '1.0991677269', '0.000828', '5', '285.7053']
      }, {
        'time': 1535520600000,
        'pair': 'EOS_BTC',
        'values': ['0.000829', '0.00083', '0.000828', '0.00083', '1065.89', '0.8836186026', '0.000829', '4', '530.8413']
      }, {
        'time': 1535521500000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.00083', '0.00083', '0.00083', '1298.0404', '1.077373532', '0.00083', '5', '1298.0404']
      }, {
        'time': 1535522400000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.000832', '0.00083', '0.000832', '1266.7725', '1.0523675653', '0.00083', '5', '220.6594']
      }, {
        'time': 1535523300000,
        'pair': 'EOS_BTC',
        'values': ['0.000832', '0.000832', '0.000832', '0.000832', '1177.8976', '0.9800108032', '0.000832', '5', '1177.8976']
      }, {
        'time': 1535524200000,
        'pair': 'EOS_BTC',
        'values': ['0.000832', '0.00083', '0.00083', '0.000832', '910.764', '0.75668892', '0.000832', '4', '425.2407']
      }, {
        'time': 1535525100000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.00083', '0.000828', '0.000831', '1154.4511', '0.9580007599', '0.00083', '5', '278.2516']
      }, {
        'time': 1535526000000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.00083', '0.00083', '0.000831', '1023.1983', '0.8497628299', '0.00083', '4', '514.9574']
      }, {
        'time': 1535526900000,
        'pair': 'EOS_BTC',
        'values': ['0.00083', '0.000832', '0.00083', '0.000832', '1351.4579', '1.1225791063', '0.00083', '5', '293.0964']
      }, {
        'time': 1535527800000,
        'pair': 'EOS_BTC',
        'values': ['0.000832', '0.000832', '0.000832', '0.000834', '1292.8011', '1.0763487207', '0.000832', '5', '515.678']
      }, {
        'time': 1535528700000,
        'pair': 'EOS_BTC',
        'values': ['0.000832', '0.000832', '0.000832', '0.000833', '921.2386', '0.7666926168', '0.000832', '4', '699.137']
      }, {
        'time': 1535529600000,
        'pair': 'EOS_BTC',
        'values': ['0.000832', '0.000831', '0.000831', '0.000832', '1333.8572', '1.1095044023', '0.000832', '5', '264.7881']
      }, {
        'time': 1535530500000,
        'pair': 'EOS_BTC',
        'values': ['0.000831', '0.000832', '0.00083', '0.000832', '1011.8359', '0.8411386476', '0.000831', '4', '526.9188']
      }, {
        'time': 1535531400000,
        'pair': 'EOS_BTC',
        'values': ['0.000832', '0.000834', '0.000832', '0.000834', '1211.2951', '1.0085202153', '0.000832', '5', '232.3028']
      }, {
        'time': 1535532300000,
        'pair': 'EOS_BTC',
        'values': ['0.000834', '0.000836', '0.000834', '0.000836', '1293.8313', '1.0795021384', '0.000834', '5', '223.4171']
      }, {
        'time': 1535533200000,
        'pair': 'EOS_BTC',
        'values': ['0.000836', '0.000835', '0.000833', '0.000836', '1215.3377', '1.0144477495', '0.000836', '5', '555.1697']
      }, {
        'time': 1535534100000,
        'pair': 'EOS_BTC',
        'values': ['0.000835', '0.000843', '0.000834', '0.000843', '915.6931', '0.7644835766', '0.000835', '6', '10']
      }, {
        'time': 1535535000000,
        'pair': 'EOS_BTC',
        'values': ['0.000843', '0.000876', '0.000843', '0.000876', '1245.3331', '1.0862345578', '0.000843', '5', '245.0494']
      }, {
        'time': 1535535900000,
        'pair': 'EOS_BTC',
        'values': ['0.000876', '0.000877', '0.000875', '0.000878', '1273.165', '1.1161768188', '0.000876', '5', '269.7933']
      }, {
        'time': 1535536800000,
        'pair': 'EOS_BTC',
        'values': ['0.000877', '0.000872', '0.000872', '0.000877', '1256.7064', '1.0984838922', '0.000877', '5', '242.9386']
      }, {
        'time': 1535537700000,
        'pair': 'EOS_BTC',
        'values': ['0.000872', '0.000871', '0.000869', '0.000872', '1060.9016', '0.9235078992', '0.000872', '4', '225.8214']
      }, {
        'time': 1535538600000,
        'pair': 'EOS_BTC',
        'values': ['0.000871', '0.000874', '0.000871', '0.000874', '1330.0732', '1.1600781469', '0.000871', '5', '257.6801']
      }, {
        'time': 1535539500000,
        'pair': 'EOS_BTC',
        'values': ['0.000874', '0.000877', '0.000874', '0.000877', '1037.4784', '0.9090522166', '0.000874', '4', '519.8576']
      }, {
        'time': 1535540400000,
        'pair': 'EOS_BTC',
        'values': ['0.000877', '0.000873', '0.000873', '0.000877', '1242.5421', '1.0860216894', '0.000877', '5', '245.4724']
      }, {
        'time': 1535541300000,
        'pair': 'EOS_BTC',
        'values': ['0.000873', '0.000877', '0.000873', '0.000877', '967.6104', '0.8469554352', '0.000873', '4', '266.5332']
      }, {
        'time': 1535542200000,
        'pair': 'EOS_BTC',
        'values': ['0.000877', '0.000876', '0.000875', '0.000877', '1511.1617', '1.3235529585', '0.000877', '6', '553.1116']
      }, {
        'time': 1535543100000,
        'pair': 'EOS_BTC',
        'values': ['0.000876', '0.000895', '0.000876', '0.000901', '1022.8651', '0.9092641245', '0.000876', '4', '281.9733']
      }, {
        'time': 1535544000000,
        'pair': 'EOS_BTC',
        'values': ['0.000895', '0.000903', '0.000895', '0.000903', '1068.7608', '0.9621984354', '0.000895', '5', '202.3767']
      }, {
        'time': 1535544900000,
        'pair': 'EOS_BTC',
        'values': ['0.000903', '0.000899', '0.000899', '0.000909', '1034.3587', '0.9344866333', '0.000903', '4', '272.0749']
      }, {
        'time': 1535545800000,
        'pair': 'EOS_BTC',
        'values': ['0.000899', '0.000891', '0.000891', '0.0009', '1246.9565', '1.1151744836', '0.000899', '5', '235.534']
      }, {
        'time': 1535546700000,
        'pair': 'EOS_BTC',
        'values': ['0.000891', '0.000894', '0.000888', '0.000894', '938.9033', '0.836974177', '0.000891', '4', '261.9605']
      }, {
        'time': 1535547600000,
        'pair': 'EOS_BTC',
        'values': ['0.000894', '0.000896', '0.000892', '0.000896', '1031.1664', '0.9219716649', '0.000894', '4', '291.9729']
      }, {
        'time': 1535548500000,
        'pair': 'EOS_BTC',
        'values': ['0.000896', '0.0009', '0.000896', '0.000902', '1179.9191', '1.0613703274', '0.000896', '5', '242.4626']
      }, {
        'time': 1535549400000,
        'pair': 'EOS_BTC',
        'values': ['0.0009', '0.000897', '0.000897', '0.0009', '1265.4965', '1.137241892', '0.0009', '5', '221.9785']
      }, {
        'time': 1535550300000,
        'pair': 'EOS_BTC',
        'values': ['0.000897', '0.000897', '0.000895', '0.000898', '1009.6571', '0.9053395625', '0.000897', '4', '264.847']
      }, {
        'time': 1535551200000,
        'pair': 'EOS_BTC',
        'values': ['0.000897', '0.000899', '0.000897', '0.000902', '1172.0327', '1.0547020629', '0.000897', '5', '492.6463']
      }, {
        'time': 1535552100000,
        'pair': 'EOS_BTC',
        'values': ['0.000899', '0.000895', '0.000895', '0.000899', '1132.4212', '1.0150240232', '0.000899', '5', '487.1762']
      }, {
        'time': 1535553000000,
        'pair': 'EOS_BTC',
        'values': ['0.000895', '0.000875', '0.000875', '0.000895', '1410.6511', '1.2510298089', '0.000895', '5', '286.2554']
      }, {
        'time': 1535553900000,
        'pair': 'EOS_BTC',
        'values': ['0.000875', '0.000872', '0.000871', '0.000879', '1150.9345', '1.0050598139', '0.000875', '5', '535.532']
      }, {
        'time': 1535554800000,
        'pair': 'EOS_BTC',
        'values': ['0.000872', '0.000864', '0.000864', '0.000874', '1169.4912', '1.0164759175', '0.000872', '5', '442.2906']
      }, {
        'time': 1535555700000,
        'pair': 'EOS_BTC',
        'values': ['0.000864', '0.000862', '0.000861', '0.000864', '983.0167', '0.8473644324', '0.000864', '4', '498.8703']
      }, {
        'time': 1535556600000,
        'pair': 'EOS_BTC',
        'values': ['0.000862', '0.000863', '0.000862', '0.000867', '1316.8262', '1.1390101752', '0.000862', '5', '246.7129']
      }, {
        'time': 1535557500000,
        'pair': 'EOS_BTC',
        'values': ['0.000863', '0.000856', '0.000853', '0.000864', '1281.9557', '1.0998058105', '0.000863', '5', '270.1199']
      }, {
        'time': 1535558400000,
        'pair': 'EOS_BTC',
        'values': ['0.000856', '0.000848', '0.000844', '0.000856', '952.2427', '0.8055747814', '0.000856', '4', '220.4699']
      }, {
        'time': 1535559300000,
        'pair': 'EOS_BTC',
        'values': ['0.000848', '0.000857', '0.000848', '0.000857', '990.034', '0.8453451036', '0.000848', '4', '251.1076']
      }, {
        'time': 1535560200000,
        'pair': 'EOS_BTC',
        'values': ['0.000857', '0.000865', '0.000857', '0.000868', '1314.5936', '1.1356017137', '0.000857', '5', '505.4712']
      }, {
        'time': 1535561100000,
        'pair': 'EOS_BTC',
        'values': ['0.000865', '0.000868', '0.000864', '0.00087', '797.5646', '0.691748359', '0.000865', '3', '296.9719']
      }, {
        'time': 1535562000000,
        'pair': 'EOS_BTC',
        'values': ['0.000868', '0.000868', '0.000868', '0.000868', '0', '0', '0.000868', '0', '0']
      }, {
        'time': 1535562900000,
        'pair': 'EOS_BTC',
        'values': ['0.000868', '0.000868', '0.000868', '0.000868', '0', '0', '0.000868', '0', '0']
      }, {
        'time': 1535563800000,
        'pair': 'EOS_BTC',
        'values': ['0.000868', '0.000868', '0.000868', '0.000868', '0', '0', '0.000868', '0', '0']
      }, {
        'time': 1535564700000,
        'pair': 'EOS_BTC',
        'values': ['0.000868', '0.000868', '0.000868', '0.000868', '0', '0', '0.000868', '0', '0']
      }, {
        'time': 1535565600000,
        'pair': 'EOS_BTC',
        'values': ['0.000868', '0.000865', '0.000865', '0.000868', '248.5834', '0.215024641', '0.000868', '1', '248.5834']
      }, {
        'time': 1535566500000,
        'pair': 'EOS_BTC',
        'values': ['0.000865', '0.000867', '0.000861', '0.000868', '1152.9325', '0.9972344724', '0.000865', '5', '227.5399']
      }, {
        'time': 1535567400000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000861', '0.000859', '0.00087', '1251.3735', '1.0797942932', '0.000867', '5', '202.2826']
      }, {
        'time': 1535568300000,
        'pair': 'EOS_BTC',
        'values': ['0.000861', '0.000866', '0.000859', '0.000866', '938.9454', '0.8085858864', '0.000861', '4', '223.7882']
      }, {
        'time': 1535569200000,
        'pair': 'EOS_BTC',
        'values': ['0.000866', '0.000867', '0.000864', '0.000867', '1168.9847', '1.0120004784', '0.000866', '5', '213.4261']
      }, {
        'time': 1535570100000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000869', '0.000866', '0.000869', '1312.9463', '1.1391699883', '0.000867', '5', '553.3628']
      }, {
        'time': 1535571000000,
        'pair': 'EOS_BTC',
        'values': ['0.000869', '0.000874', '0.000869', '0.000874', '1238.4327', '1.0807355463', '0.000869', '5', '255.1828']
      }, {
        'time': 1535571900000,
        'pair': 'EOS_BTC',
        'values': ['0.000874', '0.000873', '0.000873', '0.000875', '1024.6526', '0.8953327911', '0.000874', '4', '500.0234']
      }, {
        'time': 1535572800000,
        'pair': 'EOS_BTC',
        'values': ['0.000873', '0.000881', '0.000873', '0.000881', '1203.7603', '1.0547443849', '0.000873', '5', '243.0574']
      }, {
        'time': 1535573700000,
        'pair': 'EOS_BTC',
        'values': ['0.000881', '0.000888', '0.000881', '0.000888', '1255.9582', '1.1116756778', '0.000881', '5', '276.2481']
      }, {
        'time': 1535574600000,
        'pair': 'EOS_BTC',
        'values': ['0.000888', '0.000885', '0.000885', '0.000891', '1005.2946', '0.8922416501', '0.000888', '4', '291.9144']
      }, {
        'time': 1535575500000,
        'pair': 'EOS_BTC',
        'values': ['0.000885', '0.000887', '0.000885', '0.000888', '1005.1785', '0.8921136659', '0.000885', '4', '276.5287']
      }, {
        'time': 1535576400000,
        'pair': 'EOS_BTC',
        'values': ['0.000887', '0.000886', '0.000883', '0.000887', '1469.7118', '1.3001772508', '0.000887', '6', '235.8576']
      }, {
        'time': 1535577300000,
        'pair': 'EOS_BTC',
        'values': ['0.000886', '0.000886', '0.000885', '0.000888', '928.0456', '0.8224538102', '0.000886', '4', '252.92']
      }, {
        'time': 1535578200000,
        'pair': 'EOS_BTC',
        'values': ['0.000886', '0.000894', '0.000886', '0.000894', '1202.1292', '1.0705842414', '0.000886', '5', '204.2809']
      }, {
        'time': 1535579100000,
        'pair': 'EOS_BTC',
        'values': ['0.000894', '0.000886', '0.000886', '0.000895', '1234.693', '1.1010067493', '0.000894', '5', '263.5815']
      }, {
        'time': 1535580000000,
        'pair': 'EOS_BTC',
        'values': ['0.000886', '0.00089', '0.000884', '0.00089', '1315.1133', '1.1667939319', '0.000886', '5', '574.7022']
      }, {
        'time': 1535580900000,
        'pair': 'EOS_BTC',
        'values': ['0.00089', '0.000881', '0.000881', '0.00089', '1005.4519', '0.8889455186', '0.00089', '4', '220.7712']
      }, {
        'time': 1535581800000,
        'pair': 'EOS_BTC',
        'values': ['0.000881', '0.00088', '0.00088', '0.000881', '1198.2639', '1.0546942685', '0.000881', '5', '486.229']
      }, {
        'time': 1535582700000,
        'pair': 'EOS_BTC',
        'values': ['0.00088', '0.000888', '0.00088', '0.000888', '1208.4852', '1.0710037968', '0.00088', '5', '743.9173']
      }, {
        'time': 1535583600000,
        'pair': 'EOS_BTC',
        'values': ['0.000888', '0.000881', '0.000881', '0.000888', '1186.4422', '1.0491020979', '0.000888', '5', '244.6315']
      }, {
        'time': 1535584500000,
        'pair': 'EOS_BTC',
        'values': ['0.000881', '0.000872', '0.000872', '0.000881', '1175.2989', '1.0264334727', '0.000881', '5', '282.4051']
      }, {
        'time': 1535585400000,
        'pair': 'EOS_BTC',
        'values': ['0.000872', '0.000875', '0.000872', '0.00088', '1233.4429', '1.0812473197', '0.000872', '5', '253.1007']
      }, {
        'time': 1535586300000,
        'pair': 'EOS_BTC',
        'values': ['0.000875', '0.000871', '0.000871', '0.000875', '1025.842', '0.8945735016', '0.000875', '4', '526.9432']
      }, {
        'time': 1535587200000,
        'pair': 'EOS_BTC',
        'values': ['0.000871', '0.000875', '0.00087', '0.000875', '1235.9505', '1.0790906458', '0.000871', '5', '514.7537']
      }, {
        'time': 1535588100000,
        'pair': 'EOS_BTC',
        'values': ['0.000875', '0.00088', '0.000874', '0.00088', '1312.8002', '1.150746737', '0.000875', '5', '249.5087']
      }, {
        'time': 1535589000000,
        'pair': 'EOS_BTC',
        'values': ['0.00088', '0.000884', '0.00088', '0.000888', '1152.1923', '1.0200944372', '0.00088', '5', '218.7843']
      }, {
        'time': 1535589900000,
        'pair': 'EOS_BTC',
        'values': ['0.000884', '0.000885', '0.000882', '0.000887', '1214.8136', '1.0748262211', '0.000884', '5', '207.8422']
      }, {
        'time': 1535590800000,
        'pair': 'EOS_BTC',
        'values': ['0.000885', '0.000882', '0.000882', '0.000886', '1012.3819', '0.8950098654', '0.000885', '4', '232.0985']
      }, {
        'time': 1535591700000,
        'pair': 'EOS_BTC',
        'values': ['0.000882', '0.000883', '0.000879', '0.000883', '988.5253', '0.8703649833', '0.000882', '4', '246.3577']
      }, {
        'time': 1535592600000,
        'pair': 'EOS_BTC',
        'values': ['0.000883', '0.000848', '0.000848', '0.000883', '1297.5186', '1.134051491', '0.000883', '5', '266.6724']
      }, {
        'time': 1535593500000,
        'pair': 'EOS_BTC',
        'values': ['0.000848', '0.000882', '0.000848', '0.000883', '1002.3671', '0.8845876247', '0.000848', '4', '270.7908']
      }, {
        'time': 1535594400000,
        'pair': 'EOS_BTC',
        'values': ['0.000882', '0.000883', '0.000882', '0.000884', '1280.6006', '1.1308298232', '0.000882', '5', '213.6148']
      }, {
        'time': 1535595300000,
        'pair': 'EOS_BTC',
        'values': ['0.000883', '0.000879', '0.000879', '0.000883', '1231.718', '1.0851857193', '0.000883', '5', '248.315']
      }, {
        'time': 1535596200000,
        'pair': 'EOS_BTC',
        'values': ['0.000879', '0.000871', '0.000869', '0.000879', '1289.3157', '1.1239086469', '0.000879', '5', '225.7858']
      }, {
        'time': 1535597100000,
        'pair': 'EOS_BTC',
        'values': ['0.000871', '0.000873', '0.000868', '0.000877', '1002.957', '0.8756049588', '0.000871', '4', '246.4139']
      }, {
        'time': 1535598000000,
        'pair': 'EOS_BTC',
        'values': ['0.000873', '0.000873', '0.000869', '0.000878', '1133.5937', '0.9887169024', '0.000873', '5', '200.3951']
      }, {
        'time': 1535598900000,
        'pair': 'EOS_BTC',
        'values': ['0.000873', '0.000876', '0.000873', '0.000876', '1324.9518', '1.1598691755', '0.000873', '5', '536.3505']
      }, {
        'time': 1535599800000,
        'pair': 'EOS_BTC',
        'values': ['0.000876', '0.000874', '0.000873', '0.000876', '997.7135', '0.8717636008', '0.000876', '4', '759.7153']
      }, {
        'time': 1535600700000,
        'pair': 'EOS_BTC',
        'values': ['0.000874', '0.000877', '0.000872', '0.000877', '1067.9079', '0.9331819066', '0.000874', '4', '237.4485']
      }, {
        'time': 1535601600000,
        'pair': 'EOS_BTC',
        'values': ['0.000877', '0.000877', '0.000876', '0.000877', '1280.0329', '1.1215953352', '0.000877', '5', '286.5148']
      }, {
        'time': 1535602500000,
        'pair': 'EOS_BTC',
        'values': ['0.000877', '0.000873', '0.000873', '0.000879', '978.5913', '0.8558840516', '0.000877', '4', '516.8871']
      }, {
        'time': 1535603400000,
        'pair': 'EOS_BTC',
        'values': ['0.000873', '0.000867', '0.000867', '0.000873', '1158.3918', '1.0065917602', '0.000873', '5', '473.6255']
      }, {
        'time': 1535604300000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000865', '0.00086', '0.000867', '1325.8474', '1.1455360867', '0.000867', '5', '821.6011']
      }, {
        'time': 1535605200000,
        'pair': 'EOS_BTC',
        'values': ['0.000865', '0.000861', '0.000861', '0.000866', '953.9019', '0.8232847909', '0.000865', '4', '208.912']
      }, {
        'time': 1535606100000,
        'pair': 'EOS_BTC',
        'values': ['0.000861', '0.000853', '0.000852', '0.000861', '973.4879', '0.8310776106', '0.000861', '4', '285.6744']
      }, {
        'time': 1535607000000,
        'pair': 'EOS_BTC',
        'values': ['0.000853', '0.000852', '0.000846', '0.000853', '1339.5566', '1.1377305261', '0.000853', '5', '284.1561']
      }, {
        'time': 1535607900000,
        'pair': 'EOS_BTC',
        'values': ['0.000852', '0.000848', '0.000848', '0.000852', '1327.1205', '1.127634468', '0.000852', '5', '219.2075']
      }, {
        'time': 1535608800000,
        'pair': 'EOS_BTC',
        'values': ['0.000848', '0.000855', '0.000846', '0.000855', '1042.0989', '0.8877183797', '0.000848', '4', '299.1401']
      }, {
        'time': 1535609700000,
        'pair': 'EOS_BTC',
        'values': ['0.000855', '0.00086', '0.000854', '0.00086', '1222.2521', '1.0484393205', '0.000855', '5', '243.2617']
      }, {
        'time': 1535610600000,
        'pair': 'EOS_BTC',
        'values': ['0.00086', '0.000858', '0.000856', '0.00086', '1002.8506', '0.859255839', '0.00086', '4', '295.8028']
      }, {
        'time': 1535611500000,
        'pair': 'EOS_BTC',
        'values': ['0.000858', '0.000858', '0.000857', '0.00086', '1342.4072', '1.1522708065', '0.000858', '5', '297.2718']
      }, {
        'time': 1535612400000,
        'pair': 'EOS_BTC',
        'values': ['0.000858', '0.00086', '0.000858', '0.000861', '1007.1583', '0.8663521822', '0.000858', '4', '215.9071']
      }, {
        'time': 1535613300000,
        'pair': 'EOS_BTC',
        'values': ['0.00086', '0.000859', '0.000859', '0.000861', '1294.1308', '1.1132789927', '0.00086', '5', '220.3099']
      }, {
        'time': 1535614200000,
        'pair': 'EOS_BTC',
        'values': ['0.000859', '0.000855', '0.000855', '0.00086', '1314.9155', '1.1286003374', '0.000859', '5', '208.22']
      }, {
        'time': 1535615100000,
        'pair': 'EOS_BTC',
        'values': ['0.000855', '0.000851', '0.000849', '0.000855', '1020.1674', '0.867574469', '0.000855', '4', '259.707']
      }, {
        'time': 1535616000000,
        'pair': 'EOS_BTC',
        'values': ['0.000851', '0.000848', '0.000847', '0.000852', '1087.3864', '0.9227897508', '0.000851', '4', '541.971']
      }, {
        'time': 1535616900000,
        'pair': 'EOS_BTC',
        'values': ['0.000848', '0.000851', '0.000848', '0.000854', '1255.6587', '1.0704140044', '0.000848', '5', '466.2855']
      }, {
        'time': 1535617800000,
        'pair': 'EOS_BTC',
        'values': ['0.000851', '0.000847', '0.000847', '0.000851', '1314.1275', '1.1161891017', '0.000851', '5', '273.0911']
      }, {
        'time': 1535618700000,
        'pair': 'EOS_BTC',
        'values': ['0.000847', '0.000837', '0.000837', '0.000847', '1034.2934', '0.8718389529', '0.000847', '4', '274.5314']
      }, {
        'time': 1535619600000,
        'pair': 'EOS_BTC',
        'values': ['0.000837', '0.000838', '0.000837', '0.00084', '1298.5432', '1.0892334437', '0.000837', '5', '523.8723']
      }, {
        'time': 1535620500000,
        'pair': 'EOS_BTC',
        'values': ['0.000838', '0.00084', '0.000838', '0.000843', '971.2129', '0.8167051124', '0.000838', '4', '255.6243']
      }, {
        'time': 1535621400000,
        'pair': 'EOS_BTC',
        'values': ['0.00084', '0.000838', '0.000834', '0.000841', '1293.4311', '1.0849966659', '0.00084', '5', '271.78']
      }, {
        'time': 1535622300000,
        'pair': 'EOS_BTC',
        'values': ['0.000838', '0.000844', '0.000837', '0.000844', '1220.3346', '1.027683525', '0.000838', '5', '211.6536']
      }, {
        'time': 1535623200000,
        'pair': 'EOS_BTC',
        'values': ['0.000844', '0.000845', '0.000844', '0.000849', '986.3081', '0.835022015', '0.000844', '4', '298.2296']
      }, {
        'time': 1535624100000,
        'pair': 'EOS_BTC',
        'values': ['0.000845', '0.000846', '0.000842', '0.000846', '979.4661', '0.8271009244', '0.000845', '4', '280.7829']
      }, {
        'time': 1535625000000,
        'pair': 'EOS_BTC',
        'values': ['0.000846', '0.000843', '0.000842', '0.000846', '1207.0083', '1.017552051', '0.000846', '5', '468.8097']
      }, {
        'time': 1535625900000,
        'pair': 'EOS_BTC',
        'values': ['0.000843', '0.000847', '0.000843', '0.000849', '923.5775', '0.7823320393', '0.000843', '4', '220.5211']
      }, {
        'time': 1535626800000,
        'pair': 'EOS_BTC',
        'values': ['0.000847', '0.000846', '0.000846', '0.000848', '1247.7478', '1.0576234036', '0.000847', '5', '233.3654']
      }, {
        'time': 1535627700000,
        'pair': 'EOS_BTC',
        'values': ['0.000846', '0.000846', '0.000844', '0.000847', '1216.6742', '1.0288249368', '0.000846', '5', '243.3477']
      }, {
        'time': 1535628600000,
        'pair': 'EOS_BTC',
        'values': ['0.000846', '0.000841', '0.000841', '0.000846', '941.871', '0.7940001047', '0.000846', '4', '461.0951']
      }, {
        'time': 1535629500000,
        'pair': 'EOS_BTC',
        'values': ['0.000841', '0.000846', '0.000841', '0.000849', '1274.272', '1.0786977207', '0.000841', '5', '277.9471']
      }, {
        'time': 1535630400000,
        'pair': 'EOS_BTC',
        'values': ['0.000846', '0.00085', '0.000846', '0.00085', '1251.9584', '1.0633937429', '0.000846', '5', '515.0961']
      }, {
        'time': 1535631300000,
        'pair': 'EOS_BTC',
        'values': ['0.00085', '0.000848', '0.000848', '0.00085', '1048.7531', '0.8896370557', '0.00085', '4', '238.6043']
      }, {
        'time': 1535632200000,
        'pair': 'EOS_BTC',
        'values': ['0.000848', '0.000848', '0.000847', '0.000848', '1013.934', '0.8590728841', '0.000848', '4', '270.7861']
      }, {
        'time': 1535633100000,
        'pair': 'EOS_BTC',
        'values': ['0.000848', '0.000851', '0.000848', '0.000851', '1360.3162', '1.1559278459', '0.000848', '5', '214.5166']
      }, {
        'time': 1535634000000,
        'pair': 'EOS_BTC',
        'values': ['0.000851', '0.000852', '0.000849', '0.000852', '726.5116', '0.6175145235', '0.000851', '3', '235.3917']
      }, {
        'time': 1535634900000,
        'pair': 'EOS_BTC',
        'values': ['0.000852', '0.000854', '0.000852', '0.000854', '1220.2346', '1.041147842', '0.000852', '5', '252.7308']
      }, {
        'time': 1535635800000,
        'pair': 'EOS_BTC',
        'values': ['0.000854', '0.000858', '0.000854', '0.000858', '1253.3184', '1.0744333959', '0.000854', '5', '798.3453']
      }, {
        'time': 1535636700000,
        'pair': 'EOS_BTC',
        'values': ['0.000858', '0.000861', '0.000858', '0.000863', '764.9355', '0.6586751811', '0.000858', '3', '211.7701']
      }, {
        'time': 1535637600000,
        'pair': 'EOS_BTC',
        'values': ['0.000861', '0.000859', '0.000858', '0.000862', '1131.8999', '0.9734925371', '0.000861', '5', '459.2121']
      }, {
        'time': 1535638500000,
        'pair': 'EOS_BTC',
        'values': ['0.000859', '0.000868', '0.000859', '0.000868', '977.8308', '0.8438561032', '0.000859', '4', '234.1861']
      }, {
        'time': 1535639400000,
        'pair': 'EOS_BTC',
        'values': ['0.000868', '0.000868', '0.000865', '0.000869', '1156.2577', '1.0027913779', '0.000868', '5', '464.7237']
      }, {
        'time': 1535640300000,
        'pair': 'EOS_BTC',
        'values': ['0.000868', '0.000867', '0.000864', '0.000868', '1135.1669', '0.9832771934', '0.000868', '5', '205.871']
      }, {
        'time': 1535641200000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000867', '0.000867', '0.00087', '1057.414', '0.9177536364', '0.000867', '4', '543.3338']
      }, {
        'time': 1535642100000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.00087', '0.000864', '0.00087', '1254.3312', '1.087765009', '0.000867', '5', '227.2684']
      }, {
        'time': 1535643000000,
        'pair': 'EOS_BTC',
        'values': ['0.00087', '0.000873', '0.00087', '0.000877', '985.4364', '0.8611342506', '0.00087', '4', '274.9122']
      }, {
        'time': 1535643900000,
        'pair': 'EOS_BTC',
        'values': ['0.000873', '0.000872', '0.000872', '0.000874', '1176.2523', '1.0272551251', '0.000873', '5', '276.3679']
      }, {
        'time': 1535644800000,
        'pair': 'EOS_BTC',
        'values': ['0.000872', '0.000867', '0.000867', '0.000875', '1212.1198', '1.0569008076', '0.000872', '5', '256.7456']
      }, {
        'time': 1535645700000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000863', '0.000861', '0.000867', '1208.745', '1.0429372439', '0.000867', '5', '226.7572']
      }, {
        'time': 1535646600000,
        'pair': 'EOS_BTC',
        'values': ['0.000863', '0.000868', '0.000863', '0.000868', '1339.1611', '1.1573282005', '0.000863', '5', '284.6191']
      }, {
        'time': 1535647500000,
        'pair': 'EOS_BTC',
        'values': ['0.000868', '0.000868', '0.000867', '0.000869', '998.7649', '0.8669218904', '0.000868', '4', '475.0443']
      }, {
        'time': 1535648400000,
        'pair': 'EOS_BTC',
        'values': ['0.000868', '0.000873', '0.000866', '0.000873', '1029.5343', '0.8961765933', '0.000868', '4', '539.1833']
      }, {
        'time': 1535649300000,
        'pair': 'EOS_BTC',
        'values': ['0.000873', '0.00087', '0.000869', '0.000873', '1148.6222', '0.9993732016', '0.000873', '5', '461.6475']
      }, {
        'time': 1535650200000,
        'pair': 'EOS_BTC',
        'values': ['0.00087', '0.000873', '0.00087', '0.000873', '975.1908', '0.8495658689', '0.00087', '4', '223.5897']
      }, {
        'time': 1535651100000,
        'pair': 'EOS_BTC',
        'values': ['0.000873', '0.000867', '0.000867', '0.000873', '1241.722', '1.0794864966', '0.000873', '5', '267.2012']
      }, {
        'time': 1535652000000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000864', '0.000864', '0.000867', '1375.9081', '1.190655591', '0.000867', '5', '293.0854']
      }, {
        'time': 1535652900000,
        'pair': 'EOS_BTC',
        'values': ['0.000864', '0.000864', '0.000864', '0.000866', '964.762', '0.834078738', '0.000864', '4', '484.9643']
      }, {
        'time': 1535653800000,
        'pair': 'EOS_BTC',
        'values': ['0.000864', '0.000863', '0.000862', '0.000864', '987.2905', '0.8522503152', '0.000864', '4', '247.8176']
      }, {
        'time': 1535654700000,
        'pair': 'EOS_BTC',
        'values': ['0.000863', '0.000864', '0.000862', '0.000864', '1372.5768', '1.1843293941', '0.000863', '6', '256.7719']
      }, {
        'time': 1535655600000,
        'pair': 'EOS_BTC',
        'values': ['0.000864', '0.000866', '0.000864', '0.000867', '1060.6868', '0.9188354622', '0.000864', '4', '573.145']
      }, {
        'time': 1535656500000,
        'pair': 'EOS_BTC',
        'values': ['0.000866', '0.000865', '0.000864', '0.000866', '1241.7425', '1.0733522957', '0.000866', '5', '249.1679']
      }, {
        'time': 1535657400000,
        'pair': 'EOS_BTC',
        'values': ['0.000865', '0.00086', '0.000857', '0.000865', '1213.7072', '1.0437825979', '0.000865', '5', '215.4347']
      }, {
        'time': 1535658300000,
        'pair': 'EOS_BTC',
        'values': ['0.00086', '0.000866', '0.00086', '0.000867', '1026.1568', '0.8889259199', '0.00086', '4', '259.1558']
      }, {
        'time': 1535659200000,
        'pair': 'EOS_BTC',
        'values': ['0.000866', '0.000869', '0.000859', '0.000869', '1278.8188', '1.1034235479', '0.000866', '5', '281.3319']
      }, {
        'time': 1535660100000,
        'pair': 'EOS_BTC',
        'values': ['0.000869', '0.000874', '0.000869', '0.000875', '1302.8148', '1.137386879', '0.000869', '5', '299.5258']
      }, {
        'time': 1535661000000,
        'pair': 'EOS_BTC',
        'values': ['0.000874', '0.000874', '0.000869', '0.000874', '1093.9911', '0.9529699575', '0.000874', '5', '202.6125']
      }, {
        'time': 1535661900000,
        'pair': 'EOS_BTC',
        'values': ['0.000874', '0.000871', '0.000871', '0.000874', '924.7657', '0.8063505735', '0.000874', '4', '244.6417']
      }, {
        'time': 1535662800000,
        'pair': 'EOS_BTC',
        'values': ['0.000871', '0.000872', '0.000871', '0.000874', '1277.0479', '1.1144298562', '0.000871', '5', '232.1604']
      }, {
        'time': 1535663700000,
        'pair': 'EOS_BTC',
        'values': ['0.000872', '0.000874', '0.000872', '0.000874', '1053.5931', '0.9206333428', '0.000872', '4', '554.0583']
      }, {
        'time': 1535664600000,
        'pair': 'EOS_BTC',
        'values': ['0.000874', '0.000875', '0.000873', '0.000876', '1297.3297', '1.1347511864', '0.000874', '5', '286.368']
      }, {
        'time': 1535665500000,
        'pair': 'EOS_BTC',
        'values': ['0.000875', '0.000872', '0.000872', '0.000875', '1018.7437', '0.89021859', '0.000875', '4', '210.6332']
      }, {
        'time': 1535666400000,
        'pair': 'EOS_BTC',
        'values': ['0.000872', '0.00087', '0.00087', '0.000874', '1288.8957', '1.1247708573', '0.000872', '5', '215.209']
      }, {
        'time': 1535667300000,
        'pair': 'EOS_BTC',
        'values': ['0.00087', '0.000871', '0.00087', '0.000871', '1212.2421', '1.0556092961', '0.00087', '5', '958.6691']
      }, {
        'time': 1535668200000,
        'pair': 'EOS_BTC',
        'values': ['0.000871', '0.000873', '0.000871', '0.000873', '966.4788', '0.8430492342', '0.000871', '4', '279.7206']
      }, {
        'time': 1535669100000,
        'pair': 'EOS_BTC',
        'values': ['0.000873', '0.000871', '0.000871', '0.000873', '1119.6084', '0.9761195852', '0.000873', '5', '413.1556']
      }, {
        'time': 1535670000000,
        'pair': 'EOS_BTC',
        'values': ['0.000871', '0.000869', '0.000867', '0.000871', '1068.3826', '0.9271077818', '0.000871', '4', '260.6095']
      }, {
        'time': 1535670900000,
        'pair': 'EOS_BTC',
        'values': ['0.000869', '0.000867', '0.000867', '0.000869', '1276.5045', '1.1078290498', '0.000869', '5', '451.4392']
      }, {
        'time': 1535671800000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000867', '0.000864', '0.000867', '892.2744', '0.7725781785', '0.000867', '4', '484.2459']
      }, {
        'time': 1535672700000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.00087', '0.000867', '0.000871', '1304.7731', '1.1343849689', '0.000867', '5', '576.2724']
      }, {
        'time': 1535673600000,
        'pair': 'EOS_BTC',
        'values': ['0.00087', '0.000872', '0.000869', '0.000872', '1048.1382', '0.9122086671', '0.00087', '4', '284.9968']
      }, {
        'time': 1535674500000,
        'pair': 'EOS_BTC',
        'values': ['0.000872', '0.00087', '0.00087', '0.000872', '1281.2343', '1.1160411279', '0.000872', '5', '206.0078']
      }, {
        'time': 1535675400000,
        'pair': 'EOS_BTC',
        'values': ['0.00087', '0.000867', '0.000867', '0.00087', '928.1424', '0.8063817865', '0.00087', '4', '205.3236']
      }, {
        'time': 1535676300000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000867', '0.000866', '0.000868', '1194.7058', '1.0360972328', '0.000867', '5', '205.9042']
      }, {
        'time': 1535677200000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000864', '0.000864', '0.000868', '961.2412', '0.8334801256', '0.000867', '4', '219.309']
      }, {
        'time': 1535678100000,
        'pair': 'EOS_BTC',
        'values': ['0.000864', '0.000866', '0.000864', '0.000868', '1007.6779', '0.873739851', '0.000864', '4', '204.4048']
      }, {
        'time': 1535679000000,
        'pair': 'EOS_BTC',
        'values': ['0.000866', '0.000867', '0.000866', '0.000867', '1286.0577', '1.1150120259', '0.000866', '5', '1286.0577']
      }, {
        'time': 1535679900000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.00086', '0.00086', '0.000867', '1046.2443', '0.9035052652', '0.000867', '4', '249.5903']
      }, {
        'time': 1535680800000,
        'pair': 'EOS_BTC',
        'values': ['0.00086', '0.000855', '0.000855', '0.000861', '1022.0788', '0.8775621724', '0.00086', '4', '235.1112']
      }, {
        'time': 1535681700000,
        'pair': 'EOS_BTC',
        'values': ['0.000855', '0.000859', '0.000855', '0.000861', '1188.834', '1.0213267072', '0.000855', '5', '261.488']
      }, {
        'time': 1535682600000,
        'pair': 'EOS_BTC',
        'values': ['0.000859', '0.000862', '0.000859', '0.000862', '959.0948', '0.8257731981', '0.000859', '4', '206.0783']
      }, {
        'time': 1535683500000,
        'pair': 'EOS_BTC',
        'values': ['0.000862', '0.000859', '0.000859', '0.000863', '1294.5836', '1.1143047092', '0.000862', '5', '258.2847']
      }, {
        'time': 1535684400000,
        'pair': 'EOS_BTC',
        'values': ['0.000859', '0.00086', '0.000859', '0.000861', '949.8315', '0.8170610741', '0.000859', '4', '218.9461']
      }, {
        'time': 1535685300000,
        'pair': 'EOS_BTC',
        'values': ['0.00086', '0.000865', '0.00086', '0.000865', '1304.6868', '1.1250050455', '0.00086', '5', '297.4431']
      }, {
        'time': 1535686200000,
        'pair': 'EOS_BTC',
        'values': ['0.000865', '0.000866', '0.000864', '0.000866', '1005.8972', '0.8701400825', '0.000865', '4', '241.9765']
      }, {
        'time': 1535687100000,
        'pair': 'EOS_BTC',
        'values': ['0.000866', '0.000866', '0.000865', '0.000867', '1212.7319', '1.0504859438', '0.000866', '5', '294.833']
      }, {
        'time': 1535688000000,
        'pair': 'EOS_BTC',
        'values': ['0.000866', '0.000867', '0.000866', '0.000868', '1183.6757', '1.0267459921', '0.000866', '5', '240.0545']
      }, {
        'time': 1535688900000,
        'pair': 'EOS_BTC',
        'values': ['0.000867', '0.000865', '0.000865', '0.000867', '878.8118', '0.7608075769', '0.000867', '4', '453.6525']
      }, {
        'time': 1535689800000,
        'pair': 'EOS_BTC',
        'values': ['0.000865', '0.000866', '0.000865', '0.000866', '1057.873', '0.9158270513', '0.000865', '4', '244.6509']
      }, {
        'time': 1535690700000,
        'pair': 'EOS_BTC',
        'values': ['0.000866', '0.00087', '0.000866', '0.00087', '1172.5219', '1.0164575354', '0.000866', '5', '201.5756']
      }, {
        'time': 1535691600000,
        'pair': 'EOS_BTC',
        'values': ['0.00087', '0.000878', '0.00087', '0.000879', '1101.7632', '0.9673159994', '0.00087', '4', '299.086']
      }, {
        'time': 1535692500000,
        'pair': 'EOS_BTC',
        'values': ['0.000878', '0.000876', '0.000876', '0.000879', '897.4513', '0.7871516985', '0.000878', '4', '431.3712']
      }, {
        'time': 1535693400000,
        'pair': 'EOS_BTC',
        'values': ['0.000876', '0.000878', '0.000874', '0.000878', '689.4364', '0.604219135', '0.000876', '3', '200.7054']
      }, {
        'time': 1535694300000,
        'pair': 'EOS_BTC',
        'values': ['0.000878', '0.000876', '0.000875', '0.000878', '1068.5049', '0.9359688994', '0.000878', '4', '258.0459']
      }, {
        'time': 1535695200000,
        'pair': 'EOS_BTC',
        'values': ['0.000876', '0.000878', '0.000876', '0.000878', '1007.6566', '0.883900103', '0.000876', '4', '475.5505']
      }, {
        'time': 1535696100000,
        'pair': 'EOS_BTC',
        'values': ['0.000878', '0.000879', '0.000877', '0.000879', '1026.427', '0.900912386', '0.000878', '4', '254.9287']
      }, {
        'time': 1535697000000,
        'pair': 'EOS_BTC',
        'values': ['0.000879', '0.000881', '0.000879', '0.000881', '954.1558', '0.8399251827', '0.000879', '4', '491.5858']
      }, {
        'time': 1535697900000,
        'pair': 'EOS_BTC',
        'values': ['0.000881', '0.000881', '0.000879', '0.000881', '1062.1484', '0.9345023832', '0.000881', '5', '217.3016']
      }, {
        'time': 1535698800000,
        'pair': 'EOS_BTC',
        'values': ['0.000881', '0.000887', '0.000881', '0.000887', '961.2746', '0.8519301349', '0.000881', '4', '255.2734']
      }, {
        'time': 1535699700000,
        'pair': 'EOS_BTC',
        'values': ['0.000887', '0.000879', '0.000879', '0.000887', '1247.9261', '1.0991079587', '0.000887', '5', '226.6374']
      }, {
        'time': 1535700600000,
        'pair': 'EOS_BTC',
        'values': ['0.000879', '0.000876', '0.000876', '0.000881', '1001.6417', '0.8787568059', '0.000879', '4', '522.2066']
      }, {
        'time': 1535701500000,
        'pair': 'EOS_BTC',
        'values': ['0.000876', '0.000874', '0.000874', '0.000879', '1267.6598', '1.1118799436', '0.000876', '5', '297.6714']
      }, {
        'time': 1535702400000,
        'pair': 'EOS_BTC',
        'values': ['0.000874', '0.000881', '0.000874', '0.000881', '1177.574', '1.0352246641', '0.000874', '5', '283.3945']
      }, {
        'time': 1535703300000,
        'pair': 'EOS_BTC',
        'values': ['0.000881', '0.000883', '0.00088', '0.000884', '951.9658', '0.8397455437', '0.000881', '4', '203.5195']
      }, {
        'time': 1535704200000,
        'pair': 'EOS_BTC',
        'values': ['0.000883', '0.00088', '0.00088', '0.000883', '1280.535', '1.1286130149', '0.000883', '5', '535.4234']
      }, {
        'time': 1535705100000,
        'pair': 'EOS_BTC',
        'values': ['0.00088', '0.000879', '0.000879', '0.000882', '1063.1932', '0.9364036403', '0.00088', '4', '267.4631']
      }, {
        'time': 1535706000000,
        'pair': 'EOS_BTC',
        'values': ['0.000879', '0.00088', '0.000878', '0.00088', '1296.6503', '1.1400044412', '0.000879', '5', '772.7389']
      }, {
        'time': 1535706900000,
        'pair': 'EOS_BTC',
        'values': ['0.00088', '0.000885', '0.000879', '0.000885', '1248.7629', '1.1005048581', '0.00088', '5', '262.5202']
      }, {
        'time': 1535707800000,
        'pair': 'EOS_BTC',
        'values': ['0.000885', '0.00088', '0.00088', '0.000885', '1146.0558', '1.0101936608', '0.000885', '5', '222.9369']
      }, {
        'time': 1535708700000,
        'pair': 'EOS_BTC',
        'values': ['0.00088', '0.000885', '0.00088', '0.000885', '976.6351', '0.862619442', '0.00088', '4', '240.1084']
      }, {
        'time': 1535709600000,
        'pair': 'EOS_BTC',
        'values': ['0.000885', '0.000889', '0.000885', '0.000889', '1260.9052', '1.1184115146', '0.000885', '5', '480.5421']
      }, {
        'time': 1535710500000,
        'pair': 'EOS_BTC',
        'values': ['0.000889', '0.000887', '0.000886', '0.000889', '985.4421', '0.8744743414', '0.000889', '4', '487.0606']
      }, {
        'time': 1535711400000,
        'pair': 'EOS_BTC',
        'values': ['0.000887', '0.000889', '0.000887', '0.000892', '1256.0245', '1.1176903541', '0.000887', '5', '207.3649']
      }, {
        'time': 1535712300000,
        'pair': 'EOS_BTC',
        'values': ['0.000889', '0.00089', '0.000887', '0.00089', '1356.3186', '1.2058565577', '0.000889', '5', '557.3531']
      }, {
        'time': 1535713200000,
        'pair': 'EOS_BTC',
        'values': ['0.00089', '0.000898', '0.000889', '0.000902', '1324.2357', '1.186793407', '0.00089', '5', '284.6423']
      }, {
        'time': 1535714100000,
        'pair': 'EOS_BTC',
        'values': ['0.000898', '0.000898', '0.000898', '0.000903', '1068.4975', '0.9614419282', '0.000898', '4', '281.1275']
      }])
    }
  }, {
    url: /candy/,
    res () {
      return ok([
        {
          'id': '11',
          'user_id': '198110',
          'chain': 'BTC',
          'currency': 'BTC',
          'type': 'type001',
          'amount': '1.366',
          'name': '邀请返佣',
          'confirm': 6,
          'state': 2,
          'create_time': 1537193044000,
          'release_time': 1537193044000
        },
        {
          'id': '11',
          'user_id': '198110',
          'chain': 'BTC',
          'currency': 'BTC',
          'type': 'type001',
          'amount': '1.366',
          'name': '邀请返佣',
          'confirm': 6,
          'state': 2,
          'create_time': 1537193044000,
          'release_time': 1537193044000
        }
      ])
    }
  }, {
    url: /account\/currency\/list/,
    res () {
      return ok([
        {
          'id': '1',
          'chain': 'BTC',
          'currency': 'BTC',
          'full_name': 'Bitcoin',
          'min_confirm': 3,
          'min_deposit_amount': '0.001',
          'min_withdraw_amount': '0.002',
          'min_review_amount': '0',
          'withdraw_fee': '0.001',
          'depositable': true,
          'withdrawable': true,
          'memo_support': false,
          'scan_url': 'https://explorer.bitcoin.com/btc/tx/${txid}',
          'rates': {
            'FJD': '13285.87',
            'MXN': '117001.59',
            'STD': '131077789.41',
            'LVL': '4072.10',
            'SCR': '84511.98',
            'CDF': '10089330.00',
            'BBD': '12410.00',
            'GTQ': '47804.28',
            'CLP': '4217538',
            'HNL': '149354.18',
            'UGX': '23477147',
            'ZAR': '90077.18',
            'TND': '17534.728',
            'CUC': '6205.00',
            'BSD': '6205.00',
            'SLL': '52059950.00',
            'IQD': '7390155.000',
            'GMD': '306868.28',
            'TWD': '191778.34',
            'RSD': '634833.55',
            'DOP': '310250.00',
            'KMF': '2642721',
            'BCH': '13.96940700',
            'MYR': '25778.45',
            'FKP': '4716.48',
            'XOF': '3519513',
            'GEL': '15183.57',
            'BTC': '1.00000000',
            'UYU': '204697.51',
            'MAD': '58623.35',
            'CVE': '593964.32',
            'TOP': '14308.07',
            'AZN': '10564.01',
            'OMR': '2388.826',
            'PGK': '20757.28',
            'KES': '625758.01',
            'SEK': '55607.97',
            'CNH': '42954.62',
            'BTN': '459130.88',
            'UAH': '173193.96',
            'GNF': '56558575',
            'ERN': '93062.99',
            'MZN': '375407.52',
            'SVC': '54275.08',
            'ARS': '227376.02',
            'QAR': '22592.40',
            'MRO': '2215185.0',
            'XPD': '6',
            'CNY': '42952.25',
            'THB': '202875.58',
            'UZS': '50849975.00',
            'XPF': '640270',
            'BDT': '520103.10',
            'LYD': '8562.900',
            'BMD': '6205.00',
            'KWD': '1882.088',
            'PHP': '335088.44',
            'XPT': '7',
            'RUB': '409933.32',
            'PYG': '36725884',
            'ISK': '721392',
            'JMD': '823521.69',
            'COP': '19179241.98',
            'MKD': '330776.90',
            'USD': '6205.00',
            'DZD': '734281.77',
            'PAB': '6205.00',
            'GGP': '4716.48',
            'SGD': '8549.85',
            'ETB': '173460.78',
            'JEP': '4716.48',
            'ETC': '660.06600660',
            'KGS': '425301.76',
            'SOS': '3595797.50',
            'VEF': '1541766953.77',
            'VUV': '686622',
            'LAK': '52888317.50',
            'ETH': '31.32341425',
            'BND': '8750.33',
            'ZMK': '32595331.96',
            'XAF': '3519513',
            'LRD': '973873.96',
            'XAG': '425',
            'CHF': '6155.76',
            'HRK': '39792.74',
            'ALL': '672932.25',
            'DJF': '1104800',
            'MTL': '4242.59',
            'ZMW': '75831.30',
            'TZS': '14196419.50',
            'VND': '144282679',
            'XAU': '5',
            'AUD': '8722.24',
            'ILS': '22488.16',
            'GHS': '29744.91',
            'GYD': '1296297.48',
            'BOB': '42887.74',
            'KHR': '25335015.00',
            'MDL': '105143.31',
            'IDR': '94300208.28',
            'KYD': '5163.55',
            'AMD': '3013203.32',
            'BWP': '66033.75',
            'SHP': '4716.48',
            'TRY': '36439.73',
            'LBP': '9395873.69',
            'TJS': '58435.71',
            'JOD': '4402.485',
            'AED': '22791.05',
            'HKD': '48618.97',
            'RWF': '5404555',
            'EUR': '5410.71',
            'LSL': '90313.78',
            'DKK': '40048.93',
            'CAD': '8090.38',
            'BGN': '10479.50',
            'EEK': '90677.95',
            'MMK': '9701405.88',
            'MUR': '213039.37',
            'NOK': '50723.39',
            'IMP': '4716.48',
            'ZWL': '2000212.84',
            'GIP': '4716.48',
            'RON': '25038.96',
            'LKR': '1053236.70',
            'NGN': '2252415.00',
            'CRC': '3685666.73',
            'CZK': '138392.60',
            'PKR': '826816.25',
            'XCD': '16769.32',
            'ANG': '11013.92',
            'HTG': '432549.69',
            'LTC': '116.21150494',
            'BHD': '2339.322',
            'KZT': '2299386.85',
            'SRD': '46276.89',
            'SZL': '90313.78',
            'LTL': '20010.16',
            'SAR': '23274.64',
            'TTD': '41832.56',
            'YER': '1553426.39',
            'MVR': '95588.38',
            'AFN': '471363.12',
            'INR': '457221.63',
            'AWG': '11168.98',
            'KRW': '7020027',
            'NPR': '734614.55',
            'JPY': '696282',
            'MNT': '15415907.65',
            'AOA': '1870342.12500000',
            'PLN': '23063.98',
            'GBP': '4811.69',
            'SBD': '49256.06',
            'BYN': '13194.09',
            'HUF': '1740378',
            'BYR': '131940886',
            'BIF': '11234152',
            'MWK': '4511927.18',
            'MGA': '21686475.0',
            'XDR': '4435',
            'BZD': '12467.31',
            'BAM': '10475.88',
            'EGP': '111106.73',
            'MOP': '50061.75',
            'NAD': '90313.78',
            'SSP': '808284.40',
            'NIO': '199614.85',
            'PEN': '20662.01',
            'NZD': '9537.35',
            'WST': '16302.84',
            'TMT': '21717.41',
            'CLF': '155.4228',
            'BRL': '23473.52'
          }
        },
        {
          'id': '2',
          'chain': 'ETH',
          'currency': 'ETH',
          'full_name': 'Ethereum',
          'min_confirm': 36,
          'min_deposit_amount': '0.005',
          'min_withdraw_amount': '0.05',
          'min_review_amount': '0',
          'withdraw_fee': '0.005',
          'depositable': true,
          'withdrawable': true,
          'memo_support': false,
          'scan_url': 'https://etherscan.io/tx/${txid}',
          'rates': {
            'FJD': '423.67',
            'MXN': '3731.04',
            'STD': '4179913.33',
            'LVL': '129.85',
            'SCR': '2694.99',
            'CDF': '321736.62',
            'BBD': '395.74',
            'GTQ': '1524.42',
            'CLP': '134492',
            'HNL': '4762.73',
            'UGX': '748658',
            'ZAR': '2872.45',
            'TND': '559.161',
            'CUC': '197.87',
            'BSD': '197.87',
            'SLL': '1660129.30',
            'IQD': '235663.170',
            'GMD': '9785.66',
            'TWD': '6115.58',
            'RSD': '20244.08',
            'DOP': '9893.50',
            'KMF': '84273',
            'BCH': '0.44635687',
            'MYR': '822.04',
            'FKP': '150.40',
            'XOF': '112233',
            'GEL': '484.19',
            'BTC': '0.03192500',
            'UYU': '6527.56',
            'MAD': '1869.43',
            'CVE': '18940.81',
            'TOP': '456.27',
            'AZN': '336.87',
            'OMR': '76.177',
            'PGK': '661.92',
            'KES': '19954.67',
            'SEK': '1773.27',
            'CNH': '1369.77',
            'BTN': '14641.13',
            'UAH': '5522.95',
            'GNF': '1803585',
            'ERN': '2967.67',
            'MZN': '11971.30',
            'SVC': '1730.77',
            'ARS': '7250.75',
            'QAR': '720.44',
            'MRO': '70639.6',
            'XPD': '0',
            'CNY': '1369.70',
            'THB': '6469.46',
            'UZS': '1621544.65',
            'XPF': '20417',
            'BDT': '16585.46',
            'LYD': '273.061',
            'BMD': '197.87',
            'KWD': '60.018',
            'PHP': '10685.57',
            'XPT': '0',
            'RUB': '13072.28',
            'PYG': '1171144',
            'ISK': '23004',
            'JMD': '26261.12',
            'COP': '611603.00',
            'MKD': '10548.08',
            'USD': '197.87',
            'DZD': '23415.36',
            'PAB': '197.87',
            'GGP': '150.40',
            'SGD': '272.64',
            'ETB': '5531.46',
            'JEP': '150.40',
            'ETC': '20.91649049',
            'KGS': '13562.36',
            'SOS': '114665.66',
            'VEF': '49165097.04',
            'VUV': '21896',
            'LAK': '1686544.94',
            'ETH': '1.00000000',
            'BND': '279.04',
            'ZMK': '1039426.00',
            'XAF': '112233',
            'LRD': '31055.67',
            'XAG': '14',
            'CHF': '196.30',
            'HRK': '1268.94',
            'ALL': '21459.00',
            'DJF': '35231',
            'MTL': '135.29',
            'ZMW': '2418.17',
            'TZS': '452706.77',
            'VND': '4601001',
            'XAU': '0',
            'AUD': '278.14',
            'ILS': '717.12',
            'GHS': '948.53',
            'GYD': '41337.37',
            'BOB': '1367.64',
            'KHR': '807903.21',
            'MDL': '3352.89',
            'IDR': '3007120.42',
            'KYD': '164.66',
            'AMD': '96087.44',
            'BWP': '2105.74',
            'SHP': '150.40',
            'TRY': '1162.02',
            'LBP': '299623.13',
            'TJS': '1863.44',
            'JOD': '140.390',
            'AED': '726.78',
            'HKD': '1550.40',
            'RWF': '172345',
            'EUR': '173.01',
            'LSL': '2880.00',
            'DKK': '1277.11',
            'CAD': '257.99',
            'BGN': '334.18',
            'EEK': '2891.61',
            'MMK': '309366.19',
            'MUR': '6793.57',
            'NOK': '1617.51',
            'IMP': '150.40',
            'ZWL': '63784.39',
            'GIP': '150.40',
            'RON': '798.46',
            'LKR': '33586.45',
            'NGN': '71826.81',
            'CRC': '117531.49',
            'CZK': '4413.17',
            'PKR': '26366.18',
            'XCD': '534.75',
            'ANG': '351.22',
            'HTG': '13793.49',
            'LTC': '3.70196445',
            'BHD': '74.598',
            'KZT': '73324.69',
            'SRD': '1475.71',
            'SZL': '2880.00',
            'LTL': '638.10',
            'SAR': '742.20',
            'TTD': '1333.99',
            'YER': '49536.90',
            'MVR': '3048.20',
            'AFN': '15031.20',
            'INR': '14580.25',
            'AWG': '356.17',
            'KRW': '223860',
            'NPR': '23425.98',
            'JPY': '22204',
            'MNT': '491594.79',
            'AOA': '59642.96475000',
            'PLN': '735.48',
            'GBP': '155.77',
            'SBD': '1570.72',
            'BYN': '420.74',
            'HUF': '55499',
            'BYR': '4207436',
            'BIF': '358244',
            'MWK': '143879.94',
            'MGA': '691555.6',
            'XDR': '141',
            'BZD': '397.57',
            'BAM': '334.06',
            'EGP': '3543.06',
            'MOP': '1596.41',
            'NAD': '2880.00',
            'SSP': '25775.22',
            'NIO': '6365.48',
            'PEN': '658.89',
            'NZD': '304.13',
            'WST': '519.88',
            'TMT': '692.54',
            'CLF': '4.9562',
            'BRL': '748.54'
          }
        },
        {
          'id': '3',
          'chain': 'OMNI',
          'currency': 'USDT',
          'full_name': 'Tether',
          'min_confirm': 3,
          'min_deposit_amount': '10',
          'min_withdraw_amount': '20',
          'min_review_amount': '0',
          'withdraw_fee': '5',
          'depositable': true,
          'withdrawable': true,
          'memo_support': false,
          'scan_url': 'https://omniexplorer.info/tx/${txid}',
          'rates': {
            'FJD': '2.14',
            'MXN': '18.86',
            'STD': '21124.54',
            'LVL': '0.66',
            'SCR': '13.62',
            'CDF': '1626.00',
            'BBD': '2.00',
            'GTQ': '7.70',
            'CLP': '680',
            'HNL': '24.07',
            'UGX': '3784',
            'ZAR': '14.52',
            'TND': '2.826',
            'CUC': '1.00',
            'BSD': '1.00',
            'SLL': '8390.00',
            'IQD': '1191.000',
            'GMD': '49.46',
            'TWD': '30.91',
            'RSD': '102.31',
            'DOP': '50.00',
            'KMF': '426',
            'BCH': '0.00225581',
            'MYR': '4.15',
            'FKP': '0.76',
            'XOF': '567',
            'GEL': '2.45',
            'BTC': '0.00016100',
            'UYU': '32.99',
            'MAD': '9.45',
            'CVE': '95.72',
            'TOP': '2.31',
            'AZN': '1.70',
            'OMR': '0.385',
            'PGK': '3.35',
            'KES': '100.85',
            'SEK': '8.96',
            'CNH': '6.92',
            'BTN': '73.99',
            'UAH': '27.91',
            'GNF': '9115',
            'ERN': '15.00',
            'MZN': '60.50',
            'SVC': '8.75',
            'ARS': '36.64',
            'QAR': '3.64',
            'MRO': '357.0',
            'XPD': '0',
            'CNY': '6.92',
            'THB': '32.70',
            'UZS': '8195.00',
            'XPF': '103',
            'BDT': '83.82',
            'LYD': '1.380',
            'BMD': '1.00',
            'KWD': '0.303',
            'PHP': '54.00',
            'XPT': '0',
            'RUB': '66.06',
            'PYG': '5919',
            'ISK': '116',
            'JMD': '132.72',
            'COP': '3090.93',
            'MKD': '53.31',
            'USD': '1.00',
            'DZD': '118.34',
            'PAB': '1.00',
            'GGP': '0.76',
            'SGD': '1.38',
            'ETB': '27.96',
            'JEP': '0.76',
            'ETC': '0.10570825',
            'KGS': '68.54',
            'SOS': '579.50',
            'VEF': '248471.71',
            'VUV': '111',
            'LAK': '8523.50',
            'ETH': '0.00505382',
            'BND': '1.41',
            'ZMK': '5253.08',
            'XAF': '567',
            'LRD': '156.95',
            'XAG': '0',
            'CHF': '0.99',
            'HRK': '6.41',
            'ALL': '108.45',
            'DJF': '178',
            'MTL': '0.68',
            'ZMW': '12.22',
            'TZS': '2287.90',
            'VND': '23253',
            'XAU': '0',
            'AUD': '1.41',
            'ILS': '3.62',
            'GHS': '4.79',
            'GYD': '208.91',
            'BOB': '6.91',
            'KHR': '4083.00',
            'MDL': '16.94',
            'IDR': '15197.46',
            'KYD': '0.83',
            'AMD': '485.61',
            'BWP': '10.64',
            'SHP': '0.76',
            'TRY': '5.87',
            'LBP': '1514.24',
            'TJS': '9.42',
            'JOD': '0.710',
            'AED': '3.67',
            'HKD': '7.84',
            'RWF': '871',
            'EUR': '0.86',
            'LSL': '14.56',
            'DKK': '6.45',
            'CAD': '1.30',
            'BGN': '1.69',
            'EEK': '14.61',
            'MMK': '1563.48',
            'MUR': '34.33',
            'NOK': '8.17',
            'IMP': '0.76',
            'ZWL': '322.36',
            'GIP': '0.76',
            'RON': '4.04',
            'LKR': '169.74',
            'NGN': '363.00',
            'CRC': '593.98',
            'CZK': '22.30',
            'PKR': '133.25',
            'XCD': '2.70',
            'ANG': '1.78',
            'HTG': '69.71',
            'LTC': '0.01870907',
            'BHD': '0.377',
            'KZT': '370.57',
            'SRD': '7.46',
            'SZL': '14.56',
            'LTL': '3.22',
            'SAR': '3.75',
            'TTD': '6.74',
            'YER': '250.35',
            'MVR': '15.41',
            'AFN': '75.97',
            'INR': '73.69',
            'AWG': '1.80',
            'KRW': '1131',
            'NPR': '118.39',
            'JPY': '112',
            'MNT': '2484.43',
            'AOA': '301.42500000',
            'PLN': '3.72',
            'GBP': '0.76',
            'SBD': '7.94',
            'BYN': '2.13',
            'HUF': '280',
            'BYR': '21264',
            'BIF': '1810',
            'MWK': '727.14',
            'MGA': '3495.0',
            'XDR': '1',
            'BZD': '2.01',
            'BAM': '1.69',
            'EGP': '17.91',
            'MOP': '8.07',
            'NAD': '14.56',
            'SSP': '130.26',
            'NIO': '32.17',
            'PEN': '3.33',
            'NZD': '1.54',
            'WST': '2.63',
            'TMT': '3.50',
            'CLF': '0.0250',
            'BRL': '3.78'
          }
        }, {
          'id': '3',
          'chain': 'EOS',
          'currency': 'EOS',
          'full_name': 'Tether',
          'min_confirm': 3,
          'min_deposit_amount': '10',
          'min_withdraw_amount': '20',
          'min_review_amount': '0',
          'withdraw_fee': '5',
          'memo': 'memo number',
          'depositable': true,
          'withdrawable': true,
          'memo_support': false,
          'scan_url': 'https://omniexplorer.info/tx/${txid}'
        }
      ])
    }
  }]

async function ok (data, t) {
  await utils.delay(t || 200)
  return {
    code: 0,
    data
  }
}
function dup (generator, len = 5) {
  const list = []
  let n = len
  while (n--) {
    list.push(generator(len - n))
  }
  return list
}
function err (code = -1, message = '错误') {
  return {
    code,
    message
  }
}
