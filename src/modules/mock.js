import _ from 'lodash'
import utils from '@/modules/utils'

const coins = ['USDT', 'BTC', 'ETH', 'EOS', 'IOST', 'ADA', 'DTA']
// const coins = ['USDT', 'BTC', 'ETH', 'EOS', 'IOST', 'ADA', 'AE', 'BCH', 'BNB', 'ETC', 'KCS', 'LTC', 'NEO', 'OMG', 'SC', 'STORJ']
const rand = n => Math.floor(Math.random() * (n + 1))

const balanceItem = (currency) => {
  return {
    currency,
    name: currency,
    fullname: currency + ' coin',
    avail: rand(10000),
    unavail: rand(10000),
    quota: 50000,
    quotabtc: 100,
    fee: 0.001,
    mincharge: 0.01,
    address: currency + 'ooooLzLQyM4GE8GuvBVvpNCoupkh5iS',
    tradeconfirm: 1,
    withdrawconfirm: 3,
    reviewamount: 80
  }
}

export const filter = {
  'order/list': 0,
  'banner/list': 0,
  'pair/recommend': 0,
  'balance/list': 0,
  'balance/query': 0,
  'currency/list': 0,
  'google/new': 0,
  'google/bind': 0,
  'kyc/location': 0,
  'kyc/update': 0,
  'kyc/upload': 0,
  'kyc/query': 0,
  'pair/list': 0,
  'phone/sms': 0,
  'phone/new': 0,
  'phone/bind': 0,
  'sign/session': 0,
  'sign/signin': 0,
  'transfer/stats': 0,
  'transfer/list': 0
}
export const list = [{
  url: /^balance\/list/,
  res ({currency} = {}) {
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
  res ({currency}) {
    return ok(balanceItem(currency))
  }
}, {
  url: /currency\/list/,
  res (data) {
    return ok({
      items: _.map(coins, coin => {
        return {
          scale: coin === 'USDT' ? 2 : 8,
          name: coin,
          fullname: coin + ' coin'
        }
      })
    })
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
      return ok(_.map(coins, coin => ({
        name: coin + '_BTC',
        price: rand(100),
        volumn: rand(100),
        delta: 3 - rand(5),
        product: coin,
        productscale: 2,
        currency: 'BTC',
        currencyscale: 6
      })).concat(_.map(coins, coin => ({
        name: coin + '_USDT',
        price: rand(200),
        volumn: rand(100),
        delta: 3 - rand(5),
        product: coin,
        productscale: 4,
        currency: 'USDT',
        currencyscale: 6
      }))))
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
