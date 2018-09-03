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
  'transfer/list': 0,
  '/gate/region/list': 1
}
export const list = [{
  url: /gate\/region\/list/,
  res ({currency} = {}) {
    return ok([{"id":1,"name":"US","fullname":"United States of America","cname":"美国"},{"id":7,"name":"RU","fullname":"Russia","cname":"俄罗斯"},{"id":20,"name":"EG","fullname":"Egypt","cname":"埃及"},{"id":27,"name":"ZA","fullname":"South Africa","cname":"南非"},{"id":30,"name":"GR","fullname":"Greece","cname":"希腊"},{"id":31,"name":"NL","fullname":"Netherlands","cname":"荷兰"},{"id":32,"name":"BE","fullname":"Belgium","cname":"比利时"},{"id":33,"name":"FR","fullname":"France","cname":"法国"},{"id":34,"name":"ES","fullname":"Spain","cname":"西班牙"},{"id":36,"name":"HU","fullname":"Hungary","cname":"匈牙利"},{"id":39,"name":"IT","fullname":"Italy","cname":"意大利"},{"id":40,"name":"RO","fullname":"Romania","cname":"罗马尼亚"},{"id":41,"name":"CH","fullname":"Switzerland","cname":"瑞士"},{"id":43,"name":"AT","fullname":"Austria","cname":"奥地利"},{"id":44,"name":"GB","fullname":"United Kingdom","cname":"英国"},{"id":45,"name":"DK","fullname":"Denmark","cname":"丹麦"},{"id":46,"name":"SE","fullname":"Sweden","cname":"瑞典"},{"id":47,"name":"NO","fullname":"Norway","cname":"挪威"},{"id":48,"name":"PL","fullname":"Poland","cname":"波兰"},{"id":49,"name":"DE","fullname":"Germany","cname":"德国"},{"id":51,"name":"PE","fullname":"Peru","cname":"秘鲁"},{"id":52,"name":"MX","fullname":"Mexico","cname":"墨西哥"},{"id":53,"name":"CU","fullname":"Cuba","cname":"古巴"},{"id":54,"name":"AR","fullname":"Argentina","cname":"阿根廷"},{"id":55,"name":"BR","fullname":"Brazil","cname":"巴西"},{"id":56,"name":"CL","fullname":"Chile","cname":"智利"},{"id":57,"name":"CO","fullname":"Colombia","cname":"哥伦比亚"},{"id":58,"name":"VE","fullname":"Venezuela","cname":"委内瑞拉"},{"id":60,"name":"MY","fullname":"Malaysia","cname":"马来西亚"},{"id":61,"name":"AU","fullname":"Australia","cname":"澳大利亚","selected":true},{"id":62,"name":"ID","fullname":"Indonesia","cname":"印度尼西亚"},{"id":63,"name":"PH","fullname":"Philippines","cname":"菲律宾"},{"id":64,"name":"NZ","fullname":"New Zealand","cname":"新西兰"},{"id":65,"name":"SG","fullname":"Singapore","cname":"新加坡"},{"id":66,"name":"TH","fullname":"Thailand","cname":"泰国"},{"id":81,"name":"JP","fullname":"Japan","cname":"日本"},{"id":82,"name":"KR","fullname":"Korea","cname":"韩国"},{"id":84,"name":"VN","fullname":"Vietnam","cname":"越南"},{"id":86,"name":"CN","fullname":"China","cname":"中国"},{"id":90,"name":"TR","fullname":"Turkey","cname":"土耳其"},{"id":91,"name":"IN","fullname":"India","cname":"印度"},{"id":92,"name":"PK","fullname":"Pakistan","cname":"巴基斯坦"},{"id":93,"name":"AF","fullname":"Afghanistan","cname":"阿富汗"},{"id":94,"name":"LK","fullname":"Sri Lanka","cname":"斯里兰卡"},{"id":95,"name":"MM","fullname":"Burma","cname":"缅甸"},{"id":211,"name":"SS","fullname":"South Sudan","cname":"南苏丹共和国"},{"id":212,"name":"MA","fullname":"Morocco","cname":"摩洛哥"},{"id":213,"name":"DZ","fullname":"Algeria","cname":"阿尔及利亚"},{"id":216,"name":"TN","fullname":"Tunisia","cname":"突尼斯"},{"id":218,"name":"LY","fullname":"Libya","cname":"利比亚"},{"id":220,"name":"GM","fullname":"Gambia","cname":"冈比亚"},{"id":221,"name":"SN","fullname":"Senegal","cname":"塞内加尔"},{"id":222,"name":"MR","fullname":"Mauritania","cname":"毛里塔尼亚"},{"id":223,"name":"ML","fullname":"Mali","cname":"马里"},{"id":224,"name":"GN","fullname":"Guinea","cname":"几内亚"},{"id":225,"name":"CI","fullname":"Ivory Coast","cname":"科特迪瓦"},{"id":226,"name":"BF","fullname":"Burkina-faso","cname":"布基纳法索"},{"id":227,"name":"NE","fullname":"Niger","cname":"尼日尔"},{"id":228,"name":"TG","fullname":"Togo","cname":"多哥"},{"id":229,"name":"BJ","fullname":"Benin","cname":"贝宁"},{"id":230,"name":"MU","fullname":"Mauritius","cname":"毛里求斯"},{"id":231,"name":"LR","fullname":"Liberia","cname":"利比里亚"},{"id":232,"name":"SL","fullname":"Sierra Leone","cname":"塞拉利昂"},{"id":233,"name":"GH","fullname":"Ghana","cname":"加纳"},{"id":234,"name":"NG","fullname":"Nigeria","cname":"尼日利亚"},{"id":235,"name":"TD","fullname":"Chad","cname":"乍得"},{"id":236,"name":"CF","fullname":"Central African Republic","cname":"中非共和国"},{"id":237,"name":"CM","fullname":"Cameroon","cname":"喀麦隆"},{"id":238,"name":"CV","fullname":"Cape Verde","cname":"佛得角共和国"},{"id":239,"name":"ST","fullname":"Sao Tome and Principe","cname":"圣多美和普林西比"},{"id":240,"name":"GQ","fullname":"Equatorial Guinea","cname":"赤道几内亚"},{"id":241,"name":"GA","fullname":"Gabon","cname":"加蓬"},{"id":242,"name":"CG","fullname":"Congo","cname":"刚果"},{"id":243,"name":"ZR","fullname":"Zaire","cname":"扎伊尔"},{"id":244,"name":"AO","fullname":"Angola","cname":"安哥拉"},{"id":245,"name":"GW","fullname":"Guinea-Bissau","cname":"几内亚比绍"},{"id":248,"name":"SC","fullname":"Seychelles","cname":"塞舌尔"},{"id":249,"name":"SD","fullname":"Sudan","cname":"苏丹"},{"id":250,"name":"RW","fullname":"Rwanda","cname":"卢旺达"},{"id":251,"name":"ET","fullname":"Ethiopia","cname":"埃塞俄比亚"},{"id":252,"name":"SO","fullname":"Somali","cname":"索马里"},{"id":253,"name":"DJ","fullname":"Djibouti","cname":"吉布提"},{"id":254,"name":"KE","fullname":"Kenya","cname":"肯尼亚"},{"id":255,"name":"TZ","fullname":"Tanzania","cname":"坦桑尼亚"},{"id":256,"name":"UG","fullname":"Uganda","cname":"乌干达"},{"id":257,"name":"BI","fullname":"Burundi","cname":"布隆迪"},{"id":258,"name":"MZ","fullname":"Mozambique","cname":"莫桑比克"},{"id":260,"name":"ZM","fullname":"Zambia","cname":"赞比亚"},{"id":261,"name":"MG","fullname":"Madagascar","cname":"马达加斯加"},{"id":263,"name":"ZW","fullname":"Zimbabwe","cname":"津巴布韦"},{"id":264,"name":"NA","fullname":"Namibia","cname":"纳米比亚"},{"id":265,"name":"MW","fullname":"Malawi","cname":"马拉维"},{"id":266,"name":"LS","fullname":"Lesotho","cname":"莱索托"},{"id":267,"name":"BW","fullname":"Botswana","cname":"博茨瓦纳"},{"id":268,"name":"SZ","fullname":"Swaziland","cname":"斯威士兰"},{"id":269,"name":"YT","fullname":"Mayotte","cname":"马约特岛"},{"id":297,"name":"AW","fullname":"Aruba","cname":"阿鲁巴"},{"id":298,"name":"FO","fullname":"Faroe Islands","cname":"法罗群岛"},{"id":299,"name":"GL","fullname":"Greenland","cname":"格陵兰岛"},{"id":350,"name":"GI","fullname":"Gibraltar","cname":"直布罗陀"},{"id":351,"name":"PT","fullname":"Portugal","cname":"葡萄牙"},{"id":352,"name":"LU","fullname":"Luxembourg","cname":"卢森堡"},{"id":353,"name":"IE","fullname":"Ireland","cname":"爱尔兰"},{"id":354,"name":"IS","fullname":"Iceland","cname":"冰岛"},{"id":355,"name":"AL","fullname":"Albania","cname":"阿尔巴尼亚"},{"id":356,"name":"MT","fullname":"Malta","cname":"马耳他"},{"id":357,"name":"CY","fullname":"Cyprus","cname":"塞浦路斯"},{"id":358,"name":"FI","fullname":"Finland","cname":"芬兰"},{"id":359,"name":"BG","fullname":"Bulgaria","cname":"保加利亚"},{"id":370,"name":"LT","fullname":"Lithuania","cname":"立陶宛"},{"id":371,"name":"LV","fullname":"Latvia","cname":"拉脱维亚"},{"id":372,"name":"EE","fullname":"Estonia","cname":"爱沙尼亚"},{"id":373,"name":"MD","fullname":"Moldova, Republic of","cname":"摩尔多瓦"},{"id":374,"name":"AM","fullname":"Armenia","cname":"亚美尼亚"},{"id":375,"name":"BY","fullname":"Belarus","cname":"白俄罗斯"},{"id":376,"name":"AD","fullname":"Andorra","cname":"安道尔共和国"},{"id":377,"name":"MC","fullname":"Monaco","cname":"摩纳哥"},{"id":380,"name":"UA","fullname":"Ukraine","cname":"乌克兰"},{"id":381,"name":"YU","fullname":"Yugoslavia","cname":"南斯拉夫"},{"id":382,"name":"ME","fullname":"Montenegro","cname":"黑山共和国"},{"id":385,"name":"HR","fullname":"Croatia","cname":"克罗地亚共和国"},{"id":386,"name":"SI","fullname":"Slovenia","cname":"斯洛文尼亚"},{"id":387,"name":"BA","fullname":"Bosnia and Herzegovina","cname":"波黑共和国"},{"id":420,"name":"CZ","fullname":"Czech Republic","cname":"捷克"},{"id":421,"name":"SK","fullname":"Slovakia","cname":"斯洛伐克"},{"id":423,"name":"LI","fullname":"Liechtenstein","cname":"列支敦士登"},{"id":501,"name":"BZ","fullname":"Belize","cname":"伯利兹"},{"id":502,"name":"GT","fullname":"Guatemala","cname":"危地马拉"},{"id":503,"name":"SV","fullname":"EI Salvador","cname":"萨尔瓦多"},{"id":504,"name":"HN","fullname":"Honduras","cname":"洪都拉斯"},{"id":505,"name":"NI","fullname":"Nicaragua","cname":"尼加拉瓜"},{"id":506,"name":"CR","fullname":"Costa Rica","cname":"哥斯达黎加"},{"id":507,"name":"PA","fullname":"Panama","cname":"巴拿马"},{"id":509,"name":"HT","fullname":"Haiti","cname":"海地"},{"id":590,"name":"GP","fullname":"Guadeloupe","cname":"瓜德罗普岛"},{"id":591,"name":"BO","fullname":"Bolivia","cname":"玻利维亚"},{"id":592,"name":"GY","fullname":"Guyana","cname":"圭亚那"},{"id":593,"name":"EC","fullname":"Ecuador","cname":"厄瓜多尔"},{"id":595,"name":"PY","fullname":"Paraguay","cname":"巴拉圭"},{"id":597,"name":"SR","fullname":"Suriname","cname":"苏里南"},{"id":598,"name":"UY","fullname":"Uruguay","cname":"乌拉圭"},{"id":599,"name":"AN","fullname":"Netheriands Antilles","cname":"荷属安的列斯"},{"id":670,"name":"TL","fullname":"East Timor","cname":"东帝汶民主共和国"},{"id":673,"name":"BN","fullname":"Brunei","cname":"文莱"},{"id":675,"name":"PG","fullname":"Papua New Cuinea","cname":"巴布亚新几内亚"},{"id":676,"name":"TO","fullname":"Tonga","cname":"汤加"},{"id":677,"name":"SB","fullname":"Solomon Is","cname":"所罗门群岛"},{"id":678,"name":"VU","fullname":"Vanuatu","cname":"瓦努阿图共和国"},{"id":679,"name":"FJ","fullname":"Fiji","cname":"斐济"},{"id":680,"name":"PW","fullname":"Palau","cname":"帕劳共和国"},{"id":682,"name":"CK","fullname":"Cook Is.","cname":"库克群岛"},{"id":685,"name":"WS","fullname":"Samoa Western","cname":"西萨摩亚"},{"id":686,"name":"KI","fullname":"Kiribati","cname":"基里巴斯共和国"},{"id":689,"name":"PF","fullname":"French Polynesia","cname":"法属玻利尼西亚"},{"id":852,"name":"HK","fullname":"Hongkong","cname":"香港"},{"id":853,"name":"MO","fullname":"Macao","cname":"澳门"},{"id":855,"name":"KH","fullname":"Kampuchea (Cambodia)","cname":"柬埔寨"},{"id":856,"name":"LA","fullname":"Laos","cname":"老挝"},{"id":880,"name":"BD","fullname":"Bangladesh","cname":"孟加拉国"},{"id":886,"name":"TW","fullname":"Taiwan","cname":"台湾省"},{"id":960,"name":"MV","fullname":"Maldives","cname":"马尔代夫"},{"id":961,"name":"LB","fullname":"Lebanon","cname":"黎巴嫩"},{"id":962,"name":"JO","fullname":"Jordan","cname":"约旦"},{"id":963,"name":"SY","fullname":"Syria","cname":"叙利亚"},{"id":964,"name":"IQ","fullname":"Iraq","cname":"伊拉克"},{"id":965,"name":"KW","fullname":"Kuwait","cname":"科威特"},{"id":966,"name":"SA","fullname":"Saudi Arabia","cname":"沙特阿拉伯"},{"id":967,"name":"YE","fullname":"Yemen","cname":"也门"},{"id":968,"name":"OM","fullname":"Oman","cname":"阿曼"},{"id":977,"name":"NP","fullname":"Nepal","cname":"尼泊尔"},{"id":998,"name":"UZ","fullname":"Uzbekistan","cname":"乌兹别克斯坦"},{"id":1242,"name":"BS","fullname":"Bahamas","cname":"巴哈马"},{"id":1246,"name":"BB","fullname":"Barbados","cname":"巴巴多斯"},{"id":1264,"name":"AI","fullname":"Anguilla","cname":"安圭拉岛"},{"id":1268,"name":"AG","fullname":"Antigua and Barbuda","cname":"安提瓜和巴布达"},{"id":1284,"name":"VI","fullname":"Virgin Islands, US","cname":"美属维京群岛"},{"id":1340,"name":"VG","fullname":"Virgin Islands, British","cname":"英属维京群岛"},{"id":1345,"name":"KY","fullname":"Cayman Is.","cname":"开曼群岛"},{"id":1441,"name":"BM","fullname":"Bermuda Is.","cname":"百慕大群岛"},{"id":1473,"name":"GD","fullname":"Grenada","cname":"格林纳达"},{"id":1649,"name":"TC","fullname":"Turks and Caicos Islands","cname":"特克斯和凯科斯群岛"},{"id":1664,"name":"MS","fullname":"Montserrat Is","cname":"蒙特塞拉特岛"},{"id":1671,"name":"GU","fullname":"Guam","cname":"关岛"},{"id":1758,"name":"LC","fullname":"St.Lucia","cname":"圣卢西亚"},{"id":1767,"name":"DM","fullname":"Dominica","cname":"多米尼克"},{"id":1784,"name":"VC","fullname":"St.Vincent","cname":"圣文森特"},{"id":1787,"name":"PR","fullname":"Puerto Rico","cname":"波多黎各"},{"id":1809,"name":"DO","fullname":"Dominican Republic","cname":"多米尼加共和国"},{"id":1868,"name":"TT","fullname":"Trinidad and Tobago","cname":"特立尼达和多巴哥"},{"id":1869,"name":"KN","fullname":"Saint Kitts and Nevis","cname":"圣基茨和尼维斯"},{"id":1876,"name":"JM","fullname":"Jamaica","cname":"牙买加"}])
  }
}, {
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
}, {
  url: /api\.thinkbit.*deal/,
  res () {
    return ok([{"time":1535716099735,"side":"sell","values":["0.000901","214.467"]},{"time":1535715916739,"side":"buy","values":["0.000899","256.4311"]},{"time":1535715692734,"side":"sell","values":["0.000896","259.39"]},{"time":1535715507741,"side":"buy","values":["0.0009","279.6957"]},{"time":1535715278754,"side":"sell","values":["0.000901","288.6194"]},{"time":1535715094738,"side":"buy","values":["0.000901","283.1885"]},{"time":1535714862745,"side":"sell","values":["0.000898","281.1275"]},{"time":1535714633733,"side":"buy","values":["0.000899","210.8261"]},{"time":1535714466741,"side":"sell","values":["0.000903","285.9508"]},{"time":1535714310739,"side":"sell","values":["0.000899","290.5931"]},{"time":1535714087738,"side":"buy","values":["0.000898","284.6423"]},{"time":1535713873739,"side":"sell","values":["0.000899","299.5677"]},{"time":1535713699739,"side":"sell","values":["0.000902","247.4491"]},{"time":1535713474738,"side":"sell","values":["0.000892","257.8579"]},{"time":1535713302731,"side":"buy","values":["0.000889","234.7187"]},{"time":1535713085741,"side":"sell","values":["0.00089","275.514"]},{"time":1535712923743,"side":"sell","values":["0.00089","281.8391"]},{"time":1535712765742,"side":"sell","values":["0.000889","288.1326"]},{"time":1535712580925,"side":"sell","values":["0.000889","276.8175"]},{"time":1535712421739,"side":"sell","values":["0.000887","234.0154"]},{"time":1535712255743,"side":"buy","values":["0.000889","207.3649"]}])
  }
}, {
  url: /api\.thinkbit.*handicap/,
  res () {
    return ok({"asks":[{"values":["0.000921","4.89"]},{"values":["0.000925","39.67"]},{"values":["0.000928","53.58"]},{"values":["0.000929","7.3"]},{"values":["0.000934","7.28"]},{"values":["0.00094","265.87"]},{"values":["0.000944","143.44"]},{"values":["0.000971","143.61"]},{"values":["0.000993","27"]},{"values":["0.000997","54.22"]},{"values":["0.000999","15.1"]},{"values":["0.001","53.5"]},{"values":["0.001005","44.85"]},{"values":["0.001008","21.48"]},{"values":["0.001011","71.07"]},{"values":["0.001015","57.12"]},{"values":["0.001042","29.34"]},{"values":["0.001057","109.25"]},{"values":["0.001079","76"]},{"values":["0.001127","52.94"]}],"bids":[{"values":["0.000879","251.29"]},{"values":["0.000877","43.52"]},{"values":["0.000875","2.7"]},{"values":["0.00087","401.93"]},{"values":["0.000863","44.95"]},{"values":["0.000859","7.87"]},{"values":["0.000833","339.81"]},{"values":["0.000811","4.93"]},{"values":["0.000807","29"]},{"values":["0.000805","27"]},{"values":["0.000804","30.1"]},{"values":["0.000799","17.98"]},{"values":["0.000796","301.39"]},{"values":["0.000793","10.55"]},{"values":["0.000789","44.88"]},{"values":["0.000762","69.77"]},{"values":["0.000747","245.89"]},{"values":["0.000725","58.28"]},{"values":["0.000708","2"]},{"values":["0.0007","2"]}]})
  }
}, {
  url: /api\.thinkbit.*history/,
  res () {
    return ok([{
      "time": 1535501700000,
      "pair": "EOS_BTC",
      "values": ["0.000832", "0.00083", "0.000829", "0.000832", "1216.484", "1.0100260049", "0.000832", "5", "695.0034"]
    }, {
      "time": 1535502600000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.000827", "0.000827", "0.00083", "938.4558", "0.7768374293", "0.00083", "4", "203.9731"]
    }, {
      "time": 1535503500000,
      "pair": "EOS_BTC",
      "values": ["0.000827", "0.000828", "0.000826", "0.000828", "1200.8767", "0.993824677", "0.000827", "5", "950.2614"]
    }, {
      "time": 1535504400000,
      "pair": "EOS_BTC",
      "values": ["0.000828", "0.00083", "0.000828", "0.00083", "965.932", "0.80172356", "0.000828", "4", "965.932"]
    }, {
      "time": 1535505300000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.00083", "0.00083", "0.00083", "1238.1528", "1.027666824", "0.00083", "5", "1238.1528"]
    }, {
      "time": 1535506200000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.00083", "0.00083", "0.000831", "1266.4862", "1.0514776138", "0.00083", "5", "972.4184"]
    }, {
      "time": 1535507100000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.00083", "0.000829", "0.00083", "837.9627", "0.695306402", "0.00083", "4", "635.3237"]
    }, {
      "time": 1535508000000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.00083", "0.00083", "0.00083", "896.2608", "0.743896464", "0.00083", "4", "896.2608"]
    }, {
      "time": 1535508900000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.000829", "0.000829", "0.00083", "1253.8586", "1.04023046", "0.00083", "5", "472.178"]
    }, {
      "time": 1535509800000,
      "pair": "EOS_BTC",
      "values": ["0.000829", "0.000828", "0.000828", "0.000829", "1193.9936", "0.9890502628", "0.000829", "5", "267.6973"]
    }, {
      "time": 1535510700000,
      "pair": "EOS_BTC",
      "values": ["0.000828", "0.000828", "0.000828", "0.000828", "1013.8616", "0.8394774048", "0.000828", "4", "1013.8616"]
    }, {
      "time": 1535511600000,
      "pair": "EOS_BTC",
      "values": ["0.000828", "0.000826", "0.000826", "0.000828", "1120.3786", "0.9258760665", "0.000828", "5", "421.9575"]
    }, {
      "time": 1535512500000,
      "pair": "EOS_BTC",
      "values": ["0.000826", "0.000827", "0.000826", "0.000827", "1090.476", "0.9009825179", "0.000826", "4", "249.3419"]
    }, {
      "time": 1535513400000,
      "pair": "EOS_BTC",
      "values": ["0.000827", "0.000827", "0.000826", "0.000827", "1331.7131", "1.1010271183", "0.000827", "5", "1032.0977"]
    }, {
      "time": 1535514300000,
      "pair": "EOS_BTC",
      "values": ["0.000827", "0.000826", "0.000826", "0.000827", "1257.4684", "1.0389594676", "0.000827", "5", "966.8992"]
    }, {
      "time": 1535515200000,
      "pair": "EOS_BTC",
      "values": ["0.000826", "0.000828", "0.000826", "0.000828", "959.2278", "0.7939437078", "0.000826", "4", "662.3172"]
    }, {
      "time": 1535516100000,
      "pair": "EOS_BTC",
      "values": ["0.000828", "0.000829", "0.000828", "0.000829", "1235.9469", "1.0243923002", "0.000828", "5", "1028.267"]
    }, {
      "time": 1535517000000,
      "pair": "EOS_BTC",
      "values": ["0.000829", "0.00083", "0.000828", "0.00083", "1266.6574", "1.0509247684", "0.000829", "5", "1066.2206"]
    }, {
      "time": 1535517900000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.00083", "0.00083", "0.00083", "1051.0459", "0.872368097", "0.00083", "4", "1051.0459"]
    }, {
      "time": 1535518800000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.000828", "0.000828", "0.00083", "1222.9418", "1.0134504343", "0.00083", "5", "665.8569"]
    }, {
      "time": 1535519700000,
      "pair": "EOS_BTC",
      "values": ["0.000828", "0.000829", "0.000828", "0.000829", "1327.1522", "1.0991677269", "0.000828", "5", "285.7053"]
    }, {
      "time": 1535520600000,
      "pair": "EOS_BTC",
      "values": ["0.000829", "0.00083", "0.000828", "0.00083", "1065.89", "0.8836186026", "0.000829", "4", "530.8413"]
    }, {
      "time": 1535521500000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.00083", "0.00083", "0.00083", "1298.0404", "1.077373532", "0.00083", "5", "1298.0404"]
    }, {
      "time": 1535522400000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.000832", "0.00083", "0.000832", "1266.7725", "1.0523675653", "0.00083", "5", "220.6594"]
    }, {
      "time": 1535523300000,
      "pair": "EOS_BTC",
      "values": ["0.000832", "0.000832", "0.000832", "0.000832", "1177.8976", "0.9800108032", "0.000832", "5", "1177.8976"]
    }, {
      "time": 1535524200000,
      "pair": "EOS_BTC",
      "values": ["0.000832", "0.00083", "0.00083", "0.000832", "910.764", "0.75668892", "0.000832", "4", "425.2407"]
    }, {
      "time": 1535525100000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.00083", "0.000828", "0.000831", "1154.4511", "0.9580007599", "0.00083", "5", "278.2516"]
    }, {
      "time": 1535526000000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.00083", "0.00083", "0.000831", "1023.1983", "0.8497628299", "0.00083", "4", "514.9574"]
    }, {
      "time": 1535526900000,
      "pair": "EOS_BTC",
      "values": ["0.00083", "0.000832", "0.00083", "0.000832", "1351.4579", "1.1225791063", "0.00083", "5", "293.0964"]
    }, {
      "time": 1535527800000,
      "pair": "EOS_BTC",
      "values": ["0.000832", "0.000832", "0.000832", "0.000834", "1292.8011", "1.0763487207", "0.000832", "5", "515.678"]
    }, {
      "time": 1535528700000,
      "pair": "EOS_BTC",
      "values": ["0.000832", "0.000832", "0.000832", "0.000833", "921.2386", "0.7666926168", "0.000832", "4", "699.137"]
    }, {
      "time": 1535529600000,
      "pair": "EOS_BTC",
      "values": ["0.000832", "0.000831", "0.000831", "0.000832", "1333.8572", "1.1095044023", "0.000832", "5", "264.7881"]
    }, {
      "time": 1535530500000,
      "pair": "EOS_BTC",
      "values": ["0.000831", "0.000832", "0.00083", "0.000832", "1011.8359", "0.8411386476", "0.000831", "4", "526.9188"]
    }, {
      "time": 1535531400000,
      "pair": "EOS_BTC",
      "values": ["0.000832", "0.000834", "0.000832", "0.000834", "1211.2951", "1.0085202153", "0.000832", "5", "232.3028"]
    }, {
      "time": 1535532300000,
      "pair": "EOS_BTC",
      "values": ["0.000834", "0.000836", "0.000834", "0.000836", "1293.8313", "1.0795021384", "0.000834", "5", "223.4171"]
    }, {
      "time": 1535533200000,
      "pair": "EOS_BTC",
      "values": ["0.000836", "0.000835", "0.000833", "0.000836", "1215.3377", "1.0144477495", "0.000836", "5", "555.1697"]
    }, {
      "time": 1535534100000,
      "pair": "EOS_BTC",
      "values": ["0.000835", "0.000843", "0.000834", "0.000843", "915.6931", "0.7644835766", "0.000835", "6", "10"]
    }, {
      "time": 1535535000000,
      "pair": "EOS_BTC",
      "values": ["0.000843", "0.000876", "0.000843", "0.000876", "1245.3331", "1.0862345578", "0.000843", "5", "245.0494"]
    }, {
      "time": 1535535900000,
      "pair": "EOS_BTC",
      "values": ["0.000876", "0.000877", "0.000875", "0.000878", "1273.165", "1.1161768188", "0.000876", "5", "269.7933"]
    }, {
      "time": 1535536800000,
      "pair": "EOS_BTC",
      "values": ["0.000877", "0.000872", "0.000872", "0.000877", "1256.7064", "1.0984838922", "0.000877", "5", "242.9386"]
    }, {
      "time": 1535537700000,
      "pair": "EOS_BTC",
      "values": ["0.000872", "0.000871", "0.000869", "0.000872", "1060.9016", "0.9235078992", "0.000872", "4", "225.8214"]
    }, {
      "time": 1535538600000,
      "pair": "EOS_BTC",
      "values": ["0.000871", "0.000874", "0.000871", "0.000874", "1330.0732", "1.1600781469", "0.000871", "5", "257.6801"]
    }, {
      "time": 1535539500000,
      "pair": "EOS_BTC",
      "values": ["0.000874", "0.000877", "0.000874", "0.000877", "1037.4784", "0.9090522166", "0.000874", "4", "519.8576"]
    }, {
      "time": 1535540400000,
      "pair": "EOS_BTC",
      "values": ["0.000877", "0.000873", "0.000873", "0.000877", "1242.5421", "1.0860216894", "0.000877", "5", "245.4724"]
    }, {
      "time": 1535541300000,
      "pair": "EOS_BTC",
      "values": ["0.000873", "0.000877", "0.000873", "0.000877", "967.6104", "0.8469554352", "0.000873", "4", "266.5332"]
    }, {
      "time": 1535542200000,
      "pair": "EOS_BTC",
      "values": ["0.000877", "0.000876", "0.000875", "0.000877", "1511.1617", "1.3235529585", "0.000877", "6", "553.1116"]
    }, {
      "time": 1535543100000,
      "pair": "EOS_BTC",
      "values": ["0.000876", "0.000895", "0.000876", "0.000901", "1022.8651", "0.9092641245", "0.000876", "4", "281.9733"]
    }, {
      "time": 1535544000000,
      "pair": "EOS_BTC",
      "values": ["0.000895", "0.000903", "0.000895", "0.000903", "1068.7608", "0.9621984354", "0.000895", "5", "202.3767"]
    }, {
      "time": 1535544900000,
      "pair": "EOS_BTC",
      "values": ["0.000903", "0.000899", "0.000899", "0.000909", "1034.3587", "0.9344866333", "0.000903", "4", "272.0749"]
    }, {
      "time": 1535545800000,
      "pair": "EOS_BTC",
      "values": ["0.000899", "0.000891", "0.000891", "0.0009", "1246.9565", "1.1151744836", "0.000899", "5", "235.534"]
    }, {
      "time": 1535546700000,
      "pair": "EOS_BTC",
      "values": ["0.000891", "0.000894", "0.000888", "0.000894", "938.9033", "0.836974177", "0.000891", "4", "261.9605"]
    }, {
      "time": 1535547600000,
      "pair": "EOS_BTC",
      "values": ["0.000894", "0.000896", "0.000892", "0.000896", "1031.1664", "0.9219716649", "0.000894", "4", "291.9729"]
    }, {
      "time": 1535548500000,
      "pair": "EOS_BTC",
      "values": ["0.000896", "0.0009", "0.000896", "0.000902", "1179.9191", "1.0613703274", "0.000896", "5", "242.4626"]
    }, {
      "time": 1535549400000,
      "pair": "EOS_BTC",
      "values": ["0.0009", "0.000897", "0.000897", "0.0009", "1265.4965", "1.137241892", "0.0009", "5", "221.9785"]
    }, {
      "time": 1535550300000,
      "pair": "EOS_BTC",
      "values": ["0.000897", "0.000897", "0.000895", "0.000898", "1009.6571", "0.9053395625", "0.000897", "4", "264.847"]
    }, {
      "time": 1535551200000,
      "pair": "EOS_BTC",
      "values": ["0.000897", "0.000899", "0.000897", "0.000902", "1172.0327", "1.0547020629", "0.000897", "5", "492.6463"]
    }, {
      "time": 1535552100000,
      "pair": "EOS_BTC",
      "values": ["0.000899", "0.000895", "0.000895", "0.000899", "1132.4212", "1.0150240232", "0.000899", "5", "487.1762"]
    }, {
      "time": 1535553000000,
      "pair": "EOS_BTC",
      "values": ["0.000895", "0.000875", "0.000875", "0.000895", "1410.6511", "1.2510298089", "0.000895", "5", "286.2554"]
    }, {
      "time": 1535553900000,
      "pair": "EOS_BTC",
      "values": ["0.000875", "0.000872", "0.000871", "0.000879", "1150.9345", "1.0050598139", "0.000875", "5", "535.532"]
    }, {
      "time": 1535554800000,
      "pair": "EOS_BTC",
      "values": ["0.000872", "0.000864", "0.000864", "0.000874", "1169.4912", "1.0164759175", "0.000872", "5", "442.2906"]
    }, {
      "time": 1535555700000,
      "pair": "EOS_BTC",
      "values": ["0.000864", "0.000862", "0.000861", "0.000864", "983.0167", "0.8473644324", "0.000864", "4", "498.8703"]
    }, {
      "time": 1535556600000,
      "pair": "EOS_BTC",
      "values": ["0.000862", "0.000863", "0.000862", "0.000867", "1316.8262", "1.1390101752", "0.000862", "5", "246.7129"]
    }, {
      "time": 1535557500000,
      "pair": "EOS_BTC",
      "values": ["0.000863", "0.000856", "0.000853", "0.000864", "1281.9557", "1.0998058105", "0.000863", "5", "270.1199"]
    }, {
      "time": 1535558400000,
      "pair": "EOS_BTC",
      "values": ["0.000856", "0.000848", "0.000844", "0.000856", "952.2427", "0.8055747814", "0.000856", "4", "220.4699"]
    }, {
      "time": 1535559300000,
      "pair": "EOS_BTC",
      "values": ["0.000848", "0.000857", "0.000848", "0.000857", "990.034", "0.8453451036", "0.000848", "4", "251.1076"]
    }, {
      "time": 1535560200000,
      "pair": "EOS_BTC",
      "values": ["0.000857", "0.000865", "0.000857", "0.000868", "1314.5936", "1.1356017137", "0.000857", "5", "505.4712"]
    }, {
      "time": 1535561100000,
      "pair": "EOS_BTC",
      "values": ["0.000865", "0.000868", "0.000864", "0.00087", "797.5646", "0.691748359", "0.000865", "3", "296.9719"]
    }, {
      "time": 1535562000000,
      "pair": "EOS_BTC",
      "values": ["0.000868", "0.000868", "0.000868", "0.000868", "0", "0", "0.000868", "0", "0"]
    }, {
      "time": 1535562900000,
      "pair": "EOS_BTC",
      "values": ["0.000868", "0.000868", "0.000868", "0.000868", "0", "0", "0.000868", "0", "0"]
    }, {
      "time": 1535563800000,
      "pair": "EOS_BTC",
      "values": ["0.000868", "0.000868", "0.000868", "0.000868", "0", "0", "0.000868", "0", "0"]
    }, {
      "time": 1535564700000,
      "pair": "EOS_BTC",
      "values": ["0.000868", "0.000868", "0.000868", "0.000868", "0", "0", "0.000868", "0", "0"]
    }, {
      "time": 1535565600000,
      "pair": "EOS_BTC",
      "values": ["0.000868", "0.000865", "0.000865", "0.000868", "248.5834", "0.215024641", "0.000868", "1", "248.5834"]
    }, {
      "time": 1535566500000,
      "pair": "EOS_BTC",
      "values": ["0.000865", "0.000867", "0.000861", "0.000868", "1152.9325", "0.9972344724", "0.000865", "5", "227.5399"]
    }, {
      "time": 1535567400000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000861", "0.000859", "0.00087", "1251.3735", "1.0797942932", "0.000867", "5", "202.2826"]
    }, {
      "time": 1535568300000,
      "pair": "EOS_BTC",
      "values": ["0.000861", "0.000866", "0.000859", "0.000866", "938.9454", "0.8085858864", "0.000861", "4", "223.7882"]
    }, {
      "time": 1535569200000,
      "pair": "EOS_BTC",
      "values": ["0.000866", "0.000867", "0.000864", "0.000867", "1168.9847", "1.0120004784", "0.000866", "5", "213.4261"]
    }, {
      "time": 1535570100000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000869", "0.000866", "0.000869", "1312.9463", "1.1391699883", "0.000867", "5", "553.3628"]
    }, {
      "time": 1535571000000,
      "pair": "EOS_BTC",
      "values": ["0.000869", "0.000874", "0.000869", "0.000874", "1238.4327", "1.0807355463", "0.000869", "5", "255.1828"]
    }, {
      "time": 1535571900000,
      "pair": "EOS_BTC",
      "values": ["0.000874", "0.000873", "0.000873", "0.000875", "1024.6526", "0.8953327911", "0.000874", "4", "500.0234"]
    }, {
      "time": 1535572800000,
      "pair": "EOS_BTC",
      "values": ["0.000873", "0.000881", "0.000873", "0.000881", "1203.7603", "1.0547443849", "0.000873", "5", "243.0574"]
    }, {
      "time": 1535573700000,
      "pair": "EOS_BTC",
      "values": ["0.000881", "0.000888", "0.000881", "0.000888", "1255.9582", "1.1116756778", "0.000881", "5", "276.2481"]
    }, {
      "time": 1535574600000,
      "pair": "EOS_BTC",
      "values": ["0.000888", "0.000885", "0.000885", "0.000891", "1005.2946", "0.8922416501", "0.000888", "4", "291.9144"]
    }, {
      "time": 1535575500000,
      "pair": "EOS_BTC",
      "values": ["0.000885", "0.000887", "0.000885", "0.000888", "1005.1785", "0.8921136659", "0.000885", "4", "276.5287"]
    }, {
      "time": 1535576400000,
      "pair": "EOS_BTC",
      "values": ["0.000887", "0.000886", "0.000883", "0.000887", "1469.7118", "1.3001772508", "0.000887", "6", "235.8576"]
    }, {
      "time": 1535577300000,
      "pair": "EOS_BTC",
      "values": ["0.000886", "0.000886", "0.000885", "0.000888", "928.0456", "0.8224538102", "0.000886", "4", "252.92"]
    }, {
      "time": 1535578200000,
      "pair": "EOS_BTC",
      "values": ["0.000886", "0.000894", "0.000886", "0.000894", "1202.1292", "1.0705842414", "0.000886", "5", "204.2809"]
    }, {
      "time": 1535579100000,
      "pair": "EOS_BTC",
      "values": ["0.000894", "0.000886", "0.000886", "0.000895", "1234.693", "1.1010067493", "0.000894", "5", "263.5815"]
    }, {
      "time": 1535580000000,
      "pair": "EOS_BTC",
      "values": ["0.000886", "0.00089", "0.000884", "0.00089", "1315.1133", "1.1667939319", "0.000886", "5", "574.7022"]
    }, {
      "time": 1535580900000,
      "pair": "EOS_BTC",
      "values": ["0.00089", "0.000881", "0.000881", "0.00089", "1005.4519", "0.8889455186", "0.00089", "4", "220.7712"]
    }, {
      "time": 1535581800000,
      "pair": "EOS_BTC",
      "values": ["0.000881", "0.00088", "0.00088", "0.000881", "1198.2639", "1.0546942685", "0.000881", "5", "486.229"]
    }, {
      "time": 1535582700000,
      "pair": "EOS_BTC",
      "values": ["0.00088", "0.000888", "0.00088", "0.000888", "1208.4852", "1.0710037968", "0.00088", "5", "743.9173"]
    }, {
      "time": 1535583600000,
      "pair": "EOS_BTC",
      "values": ["0.000888", "0.000881", "0.000881", "0.000888", "1186.4422", "1.0491020979", "0.000888", "5", "244.6315"]
    }, {
      "time": 1535584500000,
      "pair": "EOS_BTC",
      "values": ["0.000881", "0.000872", "0.000872", "0.000881", "1175.2989", "1.0264334727", "0.000881", "5", "282.4051"]
    }, {
      "time": 1535585400000,
      "pair": "EOS_BTC",
      "values": ["0.000872", "0.000875", "0.000872", "0.00088", "1233.4429", "1.0812473197", "0.000872", "5", "253.1007"]
    }, {
      "time": 1535586300000,
      "pair": "EOS_BTC",
      "values": ["0.000875", "0.000871", "0.000871", "0.000875", "1025.842", "0.8945735016", "0.000875", "4", "526.9432"]
    }, {
      "time": 1535587200000,
      "pair": "EOS_BTC",
      "values": ["0.000871", "0.000875", "0.00087", "0.000875", "1235.9505", "1.0790906458", "0.000871", "5", "514.7537"]
    }, {
      "time": 1535588100000,
      "pair": "EOS_BTC",
      "values": ["0.000875", "0.00088", "0.000874", "0.00088", "1312.8002", "1.150746737", "0.000875", "5", "249.5087"]
    }, {
      "time": 1535589000000,
      "pair": "EOS_BTC",
      "values": ["0.00088", "0.000884", "0.00088", "0.000888", "1152.1923", "1.0200944372", "0.00088", "5", "218.7843"]
    }, {
      "time": 1535589900000,
      "pair": "EOS_BTC",
      "values": ["0.000884", "0.000885", "0.000882", "0.000887", "1214.8136", "1.0748262211", "0.000884", "5", "207.8422"]
    }, {
      "time": 1535590800000,
      "pair": "EOS_BTC",
      "values": ["0.000885", "0.000882", "0.000882", "0.000886", "1012.3819", "0.8950098654", "0.000885", "4", "232.0985"]
    }, {
      "time": 1535591700000,
      "pair": "EOS_BTC",
      "values": ["0.000882", "0.000883", "0.000879", "0.000883", "988.5253", "0.8703649833", "0.000882", "4", "246.3577"]
    }, {
      "time": 1535592600000,
      "pair": "EOS_BTC",
      "values": ["0.000883", "0.000848", "0.000848", "0.000883", "1297.5186", "1.134051491", "0.000883", "5", "266.6724"]
    }, {
      "time": 1535593500000,
      "pair": "EOS_BTC",
      "values": ["0.000848", "0.000882", "0.000848", "0.000883", "1002.3671", "0.8845876247", "0.000848", "4", "270.7908"]
    }, {
      "time": 1535594400000,
      "pair": "EOS_BTC",
      "values": ["0.000882", "0.000883", "0.000882", "0.000884", "1280.6006", "1.1308298232", "0.000882", "5", "213.6148"]
    }, {
      "time": 1535595300000,
      "pair": "EOS_BTC",
      "values": ["0.000883", "0.000879", "0.000879", "0.000883", "1231.718", "1.0851857193", "0.000883", "5", "248.315"]
    }, {
      "time": 1535596200000,
      "pair": "EOS_BTC",
      "values": ["0.000879", "0.000871", "0.000869", "0.000879", "1289.3157", "1.1239086469", "0.000879", "5", "225.7858"]
    }, {
      "time": 1535597100000,
      "pair": "EOS_BTC",
      "values": ["0.000871", "0.000873", "0.000868", "0.000877", "1002.957", "0.8756049588", "0.000871", "4", "246.4139"]
    }, {
      "time": 1535598000000,
      "pair": "EOS_BTC",
      "values": ["0.000873", "0.000873", "0.000869", "0.000878", "1133.5937", "0.9887169024", "0.000873", "5", "200.3951"]
    }, {
      "time": 1535598900000,
      "pair": "EOS_BTC",
      "values": ["0.000873", "0.000876", "0.000873", "0.000876", "1324.9518", "1.1598691755", "0.000873", "5", "536.3505"]
    }, {
      "time": 1535599800000,
      "pair": "EOS_BTC",
      "values": ["0.000876", "0.000874", "0.000873", "0.000876", "997.7135", "0.8717636008", "0.000876", "4", "759.7153"]
    }, {
      "time": 1535600700000,
      "pair": "EOS_BTC",
      "values": ["0.000874", "0.000877", "0.000872", "0.000877", "1067.9079", "0.9331819066", "0.000874", "4", "237.4485"]
    }, {
      "time": 1535601600000,
      "pair": "EOS_BTC",
      "values": ["0.000877", "0.000877", "0.000876", "0.000877", "1280.0329", "1.1215953352", "0.000877", "5", "286.5148"]
    }, {
      "time": 1535602500000,
      "pair": "EOS_BTC",
      "values": ["0.000877", "0.000873", "0.000873", "0.000879", "978.5913", "0.8558840516", "0.000877", "4", "516.8871"]
    }, {
      "time": 1535603400000,
      "pair": "EOS_BTC",
      "values": ["0.000873", "0.000867", "0.000867", "0.000873", "1158.3918", "1.0065917602", "0.000873", "5", "473.6255"]
    }, {
      "time": 1535604300000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000865", "0.00086", "0.000867", "1325.8474", "1.1455360867", "0.000867", "5", "821.6011"]
    }, {
      "time": 1535605200000,
      "pair": "EOS_BTC",
      "values": ["0.000865", "0.000861", "0.000861", "0.000866", "953.9019", "0.8232847909", "0.000865", "4", "208.912"]
    }, {
      "time": 1535606100000,
      "pair": "EOS_BTC",
      "values": ["0.000861", "0.000853", "0.000852", "0.000861", "973.4879", "0.8310776106", "0.000861", "4", "285.6744"]
    }, {
      "time": 1535607000000,
      "pair": "EOS_BTC",
      "values": ["0.000853", "0.000852", "0.000846", "0.000853", "1339.5566", "1.1377305261", "0.000853", "5", "284.1561"]
    }, {
      "time": 1535607900000,
      "pair": "EOS_BTC",
      "values": ["0.000852", "0.000848", "0.000848", "0.000852", "1327.1205", "1.127634468", "0.000852", "5", "219.2075"]
    }, {
      "time": 1535608800000,
      "pair": "EOS_BTC",
      "values": ["0.000848", "0.000855", "0.000846", "0.000855", "1042.0989", "0.8877183797", "0.000848", "4", "299.1401"]
    }, {
      "time": 1535609700000,
      "pair": "EOS_BTC",
      "values": ["0.000855", "0.00086", "0.000854", "0.00086", "1222.2521", "1.0484393205", "0.000855", "5", "243.2617"]
    }, {
      "time": 1535610600000,
      "pair": "EOS_BTC",
      "values": ["0.00086", "0.000858", "0.000856", "0.00086", "1002.8506", "0.859255839", "0.00086", "4", "295.8028"]
    }, {
      "time": 1535611500000,
      "pair": "EOS_BTC",
      "values": ["0.000858", "0.000858", "0.000857", "0.00086", "1342.4072", "1.1522708065", "0.000858", "5", "297.2718"]
    }, {
      "time": 1535612400000,
      "pair": "EOS_BTC",
      "values": ["0.000858", "0.00086", "0.000858", "0.000861", "1007.1583", "0.8663521822", "0.000858", "4", "215.9071"]
    }, {
      "time": 1535613300000,
      "pair": "EOS_BTC",
      "values": ["0.00086", "0.000859", "0.000859", "0.000861", "1294.1308", "1.1132789927", "0.00086", "5", "220.3099"]
    }, {
      "time": 1535614200000,
      "pair": "EOS_BTC",
      "values": ["0.000859", "0.000855", "0.000855", "0.00086", "1314.9155", "1.1286003374", "0.000859", "5", "208.22"]
    }, {
      "time": 1535615100000,
      "pair": "EOS_BTC",
      "values": ["0.000855", "0.000851", "0.000849", "0.000855", "1020.1674", "0.867574469", "0.000855", "4", "259.707"]
    }, {
      "time": 1535616000000,
      "pair": "EOS_BTC",
      "values": ["0.000851", "0.000848", "0.000847", "0.000852", "1087.3864", "0.9227897508", "0.000851", "4", "541.971"]
    }, {
      "time": 1535616900000,
      "pair": "EOS_BTC",
      "values": ["0.000848", "0.000851", "0.000848", "0.000854", "1255.6587", "1.0704140044", "0.000848", "5", "466.2855"]
    }, {
      "time": 1535617800000,
      "pair": "EOS_BTC",
      "values": ["0.000851", "0.000847", "0.000847", "0.000851", "1314.1275", "1.1161891017", "0.000851", "5", "273.0911"]
    }, {
      "time": 1535618700000,
      "pair": "EOS_BTC",
      "values": ["0.000847", "0.000837", "0.000837", "0.000847", "1034.2934", "0.8718389529", "0.000847", "4", "274.5314"]
    }, {
      "time": 1535619600000,
      "pair": "EOS_BTC",
      "values": ["0.000837", "0.000838", "0.000837", "0.00084", "1298.5432", "1.0892334437", "0.000837", "5", "523.8723"]
    }, {
      "time": 1535620500000,
      "pair": "EOS_BTC",
      "values": ["0.000838", "0.00084", "0.000838", "0.000843", "971.2129", "0.8167051124", "0.000838", "4", "255.6243"]
    }, {
      "time": 1535621400000,
      "pair": "EOS_BTC",
      "values": ["0.00084", "0.000838", "0.000834", "0.000841", "1293.4311", "1.0849966659", "0.00084", "5", "271.78"]
    }, {
      "time": 1535622300000,
      "pair": "EOS_BTC",
      "values": ["0.000838", "0.000844", "0.000837", "0.000844", "1220.3346", "1.027683525", "0.000838", "5", "211.6536"]
    }, {
      "time": 1535623200000,
      "pair": "EOS_BTC",
      "values": ["0.000844", "0.000845", "0.000844", "0.000849", "986.3081", "0.835022015", "0.000844", "4", "298.2296"]
    }, {
      "time": 1535624100000,
      "pair": "EOS_BTC",
      "values": ["0.000845", "0.000846", "0.000842", "0.000846", "979.4661", "0.8271009244", "0.000845", "4", "280.7829"]
    }, {
      "time": 1535625000000,
      "pair": "EOS_BTC",
      "values": ["0.000846", "0.000843", "0.000842", "0.000846", "1207.0083", "1.017552051", "0.000846", "5", "468.8097"]
    }, {
      "time": 1535625900000,
      "pair": "EOS_BTC",
      "values": ["0.000843", "0.000847", "0.000843", "0.000849", "923.5775", "0.7823320393", "0.000843", "4", "220.5211"]
    }, {
      "time": 1535626800000,
      "pair": "EOS_BTC",
      "values": ["0.000847", "0.000846", "0.000846", "0.000848", "1247.7478", "1.0576234036", "0.000847", "5", "233.3654"]
    }, {
      "time": 1535627700000,
      "pair": "EOS_BTC",
      "values": ["0.000846", "0.000846", "0.000844", "0.000847", "1216.6742", "1.0288249368", "0.000846", "5", "243.3477"]
    }, {
      "time": 1535628600000,
      "pair": "EOS_BTC",
      "values": ["0.000846", "0.000841", "0.000841", "0.000846", "941.871", "0.7940001047", "0.000846", "4", "461.0951"]
    }, {
      "time": 1535629500000,
      "pair": "EOS_BTC",
      "values": ["0.000841", "0.000846", "0.000841", "0.000849", "1274.272", "1.0786977207", "0.000841", "5", "277.9471"]
    }, {
      "time": 1535630400000,
      "pair": "EOS_BTC",
      "values": ["0.000846", "0.00085", "0.000846", "0.00085", "1251.9584", "1.0633937429", "0.000846", "5", "515.0961"]
    }, {
      "time": 1535631300000,
      "pair": "EOS_BTC",
      "values": ["0.00085", "0.000848", "0.000848", "0.00085", "1048.7531", "0.8896370557", "0.00085", "4", "238.6043"]
    }, {
      "time": 1535632200000,
      "pair": "EOS_BTC",
      "values": ["0.000848", "0.000848", "0.000847", "0.000848", "1013.934", "0.8590728841", "0.000848", "4", "270.7861"]
    }, {
      "time": 1535633100000,
      "pair": "EOS_BTC",
      "values": ["0.000848", "0.000851", "0.000848", "0.000851", "1360.3162", "1.1559278459", "0.000848", "5", "214.5166"]
    }, {
      "time": 1535634000000,
      "pair": "EOS_BTC",
      "values": ["0.000851", "0.000852", "0.000849", "0.000852", "726.5116", "0.6175145235", "0.000851", "3", "235.3917"]
    }, {
      "time": 1535634900000,
      "pair": "EOS_BTC",
      "values": ["0.000852", "0.000854", "0.000852", "0.000854", "1220.2346", "1.041147842", "0.000852", "5", "252.7308"]
    }, {
      "time": 1535635800000,
      "pair": "EOS_BTC",
      "values": ["0.000854", "0.000858", "0.000854", "0.000858", "1253.3184", "1.0744333959", "0.000854", "5", "798.3453"]
    }, {
      "time": 1535636700000,
      "pair": "EOS_BTC",
      "values": ["0.000858", "0.000861", "0.000858", "0.000863", "764.9355", "0.6586751811", "0.000858", "3", "211.7701"]
    }, {
      "time": 1535637600000,
      "pair": "EOS_BTC",
      "values": ["0.000861", "0.000859", "0.000858", "0.000862", "1131.8999", "0.9734925371", "0.000861", "5", "459.2121"]
    }, {
      "time": 1535638500000,
      "pair": "EOS_BTC",
      "values": ["0.000859", "0.000868", "0.000859", "0.000868", "977.8308", "0.8438561032", "0.000859", "4", "234.1861"]
    }, {
      "time": 1535639400000,
      "pair": "EOS_BTC",
      "values": ["0.000868", "0.000868", "0.000865", "0.000869", "1156.2577", "1.0027913779", "0.000868", "5", "464.7237"]
    }, {
      "time": 1535640300000,
      "pair": "EOS_BTC",
      "values": ["0.000868", "0.000867", "0.000864", "0.000868", "1135.1669", "0.9832771934", "0.000868", "5", "205.871"]
    }, {
      "time": 1535641200000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000867", "0.000867", "0.00087", "1057.414", "0.9177536364", "0.000867", "4", "543.3338"]
    }, {
      "time": 1535642100000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.00087", "0.000864", "0.00087", "1254.3312", "1.087765009", "0.000867", "5", "227.2684"]
    }, {
      "time": 1535643000000,
      "pair": "EOS_BTC",
      "values": ["0.00087", "0.000873", "0.00087", "0.000877", "985.4364", "0.8611342506", "0.00087", "4", "274.9122"]
    }, {
      "time": 1535643900000,
      "pair": "EOS_BTC",
      "values": ["0.000873", "0.000872", "0.000872", "0.000874", "1176.2523", "1.0272551251", "0.000873", "5", "276.3679"]
    }, {
      "time": 1535644800000,
      "pair": "EOS_BTC",
      "values": ["0.000872", "0.000867", "0.000867", "0.000875", "1212.1198", "1.0569008076", "0.000872", "5", "256.7456"]
    }, {
      "time": 1535645700000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000863", "0.000861", "0.000867", "1208.745", "1.0429372439", "0.000867", "5", "226.7572"]
    }, {
      "time": 1535646600000,
      "pair": "EOS_BTC",
      "values": ["0.000863", "0.000868", "0.000863", "0.000868", "1339.1611", "1.1573282005", "0.000863", "5", "284.6191"]
    }, {
      "time": 1535647500000,
      "pair": "EOS_BTC",
      "values": ["0.000868", "0.000868", "0.000867", "0.000869", "998.7649", "0.8669218904", "0.000868", "4", "475.0443"]
    }, {
      "time": 1535648400000,
      "pair": "EOS_BTC",
      "values": ["0.000868", "0.000873", "0.000866", "0.000873", "1029.5343", "0.8961765933", "0.000868", "4", "539.1833"]
    }, {
      "time": 1535649300000,
      "pair": "EOS_BTC",
      "values": ["0.000873", "0.00087", "0.000869", "0.000873", "1148.6222", "0.9993732016", "0.000873", "5", "461.6475"]
    }, {
      "time": 1535650200000,
      "pair": "EOS_BTC",
      "values": ["0.00087", "0.000873", "0.00087", "0.000873", "975.1908", "0.8495658689", "0.00087", "4", "223.5897"]
    }, {
      "time": 1535651100000,
      "pair": "EOS_BTC",
      "values": ["0.000873", "0.000867", "0.000867", "0.000873", "1241.722", "1.0794864966", "0.000873", "5", "267.2012"]
    }, {
      "time": 1535652000000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000864", "0.000864", "0.000867", "1375.9081", "1.190655591", "0.000867", "5", "293.0854"]
    }, {
      "time": 1535652900000,
      "pair": "EOS_BTC",
      "values": ["0.000864", "0.000864", "0.000864", "0.000866", "964.762", "0.834078738", "0.000864", "4", "484.9643"]
    }, {
      "time": 1535653800000,
      "pair": "EOS_BTC",
      "values": ["0.000864", "0.000863", "0.000862", "0.000864", "987.2905", "0.8522503152", "0.000864", "4", "247.8176"]
    }, {
      "time": 1535654700000,
      "pair": "EOS_BTC",
      "values": ["0.000863", "0.000864", "0.000862", "0.000864", "1372.5768", "1.1843293941", "0.000863", "6", "256.7719"]
    }, {
      "time": 1535655600000,
      "pair": "EOS_BTC",
      "values": ["0.000864", "0.000866", "0.000864", "0.000867", "1060.6868", "0.9188354622", "0.000864", "4", "573.145"]
    }, {
      "time": 1535656500000,
      "pair": "EOS_BTC",
      "values": ["0.000866", "0.000865", "0.000864", "0.000866", "1241.7425", "1.0733522957", "0.000866", "5", "249.1679"]
    }, {
      "time": 1535657400000,
      "pair": "EOS_BTC",
      "values": ["0.000865", "0.00086", "0.000857", "0.000865", "1213.7072", "1.0437825979", "0.000865", "5", "215.4347"]
    }, {
      "time": 1535658300000,
      "pair": "EOS_BTC",
      "values": ["0.00086", "0.000866", "0.00086", "0.000867", "1026.1568", "0.8889259199", "0.00086", "4", "259.1558"]
    }, {
      "time": 1535659200000,
      "pair": "EOS_BTC",
      "values": ["0.000866", "0.000869", "0.000859", "0.000869", "1278.8188", "1.1034235479", "0.000866", "5", "281.3319"]
    }, {
      "time": 1535660100000,
      "pair": "EOS_BTC",
      "values": ["0.000869", "0.000874", "0.000869", "0.000875", "1302.8148", "1.137386879", "0.000869", "5", "299.5258"]
    }, {
      "time": 1535661000000,
      "pair": "EOS_BTC",
      "values": ["0.000874", "0.000874", "0.000869", "0.000874", "1093.9911", "0.9529699575", "0.000874", "5", "202.6125"]
    }, {
      "time": 1535661900000,
      "pair": "EOS_BTC",
      "values": ["0.000874", "0.000871", "0.000871", "0.000874", "924.7657", "0.8063505735", "0.000874", "4", "244.6417"]
    }, {
      "time": 1535662800000,
      "pair": "EOS_BTC",
      "values": ["0.000871", "0.000872", "0.000871", "0.000874", "1277.0479", "1.1144298562", "0.000871", "5", "232.1604"]
    }, {
      "time": 1535663700000,
      "pair": "EOS_BTC",
      "values": ["0.000872", "0.000874", "0.000872", "0.000874", "1053.5931", "0.9206333428", "0.000872", "4", "554.0583"]
    }, {
      "time": 1535664600000,
      "pair": "EOS_BTC",
      "values": ["0.000874", "0.000875", "0.000873", "0.000876", "1297.3297", "1.1347511864", "0.000874", "5", "286.368"]
    }, {
      "time": 1535665500000,
      "pair": "EOS_BTC",
      "values": ["0.000875", "0.000872", "0.000872", "0.000875", "1018.7437", "0.89021859", "0.000875", "4", "210.6332"]
    }, {
      "time": 1535666400000,
      "pair": "EOS_BTC",
      "values": ["0.000872", "0.00087", "0.00087", "0.000874", "1288.8957", "1.1247708573", "0.000872", "5", "215.209"]
    }, {
      "time": 1535667300000,
      "pair": "EOS_BTC",
      "values": ["0.00087", "0.000871", "0.00087", "0.000871", "1212.2421", "1.0556092961", "0.00087", "5", "958.6691"]
    }, {
      "time": 1535668200000,
      "pair": "EOS_BTC",
      "values": ["0.000871", "0.000873", "0.000871", "0.000873", "966.4788", "0.8430492342", "0.000871", "4", "279.7206"]
    }, {
      "time": 1535669100000,
      "pair": "EOS_BTC",
      "values": ["0.000873", "0.000871", "0.000871", "0.000873", "1119.6084", "0.9761195852", "0.000873", "5", "413.1556"]
    }, {
      "time": 1535670000000,
      "pair": "EOS_BTC",
      "values": ["0.000871", "0.000869", "0.000867", "0.000871", "1068.3826", "0.9271077818", "0.000871", "4", "260.6095"]
    }, {
      "time": 1535670900000,
      "pair": "EOS_BTC",
      "values": ["0.000869", "0.000867", "0.000867", "0.000869", "1276.5045", "1.1078290498", "0.000869", "5", "451.4392"]
    }, {
      "time": 1535671800000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000867", "0.000864", "0.000867", "892.2744", "0.7725781785", "0.000867", "4", "484.2459"]
    }, {
      "time": 1535672700000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.00087", "0.000867", "0.000871", "1304.7731", "1.1343849689", "0.000867", "5", "576.2724"]
    }, {
      "time": 1535673600000,
      "pair": "EOS_BTC",
      "values": ["0.00087", "0.000872", "0.000869", "0.000872", "1048.1382", "0.9122086671", "0.00087", "4", "284.9968"]
    }, {
      "time": 1535674500000,
      "pair": "EOS_BTC",
      "values": ["0.000872", "0.00087", "0.00087", "0.000872", "1281.2343", "1.1160411279", "0.000872", "5", "206.0078"]
    }, {
      "time": 1535675400000,
      "pair": "EOS_BTC",
      "values": ["0.00087", "0.000867", "0.000867", "0.00087", "928.1424", "0.8063817865", "0.00087", "4", "205.3236"]
    }, {
      "time": 1535676300000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000867", "0.000866", "0.000868", "1194.7058", "1.0360972328", "0.000867", "5", "205.9042"]
    }, {
      "time": 1535677200000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000864", "0.000864", "0.000868", "961.2412", "0.8334801256", "0.000867", "4", "219.309"]
    }, {
      "time": 1535678100000,
      "pair": "EOS_BTC",
      "values": ["0.000864", "0.000866", "0.000864", "0.000868", "1007.6779", "0.873739851", "0.000864", "4", "204.4048"]
    }, {
      "time": 1535679000000,
      "pair": "EOS_BTC",
      "values": ["0.000866", "0.000867", "0.000866", "0.000867", "1286.0577", "1.1150120259", "0.000866", "5", "1286.0577"]
    }, {
      "time": 1535679900000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.00086", "0.00086", "0.000867", "1046.2443", "0.9035052652", "0.000867", "4", "249.5903"]
    }, {
      "time": 1535680800000,
      "pair": "EOS_BTC",
      "values": ["0.00086", "0.000855", "0.000855", "0.000861", "1022.0788", "0.8775621724", "0.00086", "4", "235.1112"]
    }, {
      "time": 1535681700000,
      "pair": "EOS_BTC",
      "values": ["0.000855", "0.000859", "0.000855", "0.000861", "1188.834", "1.0213267072", "0.000855", "5", "261.488"]
    }, {
      "time": 1535682600000,
      "pair": "EOS_BTC",
      "values": ["0.000859", "0.000862", "0.000859", "0.000862", "959.0948", "0.8257731981", "0.000859", "4", "206.0783"]
    }, {
      "time": 1535683500000,
      "pair": "EOS_BTC",
      "values": ["0.000862", "0.000859", "0.000859", "0.000863", "1294.5836", "1.1143047092", "0.000862", "5", "258.2847"]
    }, {
      "time": 1535684400000,
      "pair": "EOS_BTC",
      "values": ["0.000859", "0.00086", "0.000859", "0.000861", "949.8315", "0.8170610741", "0.000859", "4", "218.9461"]
    }, {
      "time": 1535685300000,
      "pair": "EOS_BTC",
      "values": ["0.00086", "0.000865", "0.00086", "0.000865", "1304.6868", "1.1250050455", "0.00086", "5", "297.4431"]
    }, {
      "time": 1535686200000,
      "pair": "EOS_BTC",
      "values": ["0.000865", "0.000866", "0.000864", "0.000866", "1005.8972", "0.8701400825", "0.000865", "4", "241.9765"]
    }, {
      "time": 1535687100000,
      "pair": "EOS_BTC",
      "values": ["0.000866", "0.000866", "0.000865", "0.000867", "1212.7319", "1.0504859438", "0.000866", "5", "294.833"]
    }, {
      "time": 1535688000000,
      "pair": "EOS_BTC",
      "values": ["0.000866", "0.000867", "0.000866", "0.000868", "1183.6757", "1.0267459921", "0.000866", "5", "240.0545"]
    }, {
      "time": 1535688900000,
      "pair": "EOS_BTC",
      "values": ["0.000867", "0.000865", "0.000865", "0.000867", "878.8118", "0.7608075769", "0.000867", "4", "453.6525"]
    }, {
      "time": 1535689800000,
      "pair": "EOS_BTC",
      "values": ["0.000865", "0.000866", "0.000865", "0.000866", "1057.873", "0.9158270513", "0.000865", "4", "244.6509"]
    }, {
      "time": 1535690700000,
      "pair": "EOS_BTC",
      "values": ["0.000866", "0.00087", "0.000866", "0.00087", "1172.5219", "1.0164575354", "0.000866", "5", "201.5756"]
    }, {
      "time": 1535691600000,
      "pair": "EOS_BTC",
      "values": ["0.00087", "0.000878", "0.00087", "0.000879", "1101.7632", "0.9673159994", "0.00087", "4", "299.086"]
    }, {
      "time": 1535692500000,
      "pair": "EOS_BTC",
      "values": ["0.000878", "0.000876", "0.000876", "0.000879", "897.4513", "0.7871516985", "0.000878", "4", "431.3712"]
    }, {
      "time": 1535693400000,
      "pair": "EOS_BTC",
      "values": ["0.000876", "0.000878", "0.000874", "0.000878", "689.4364", "0.604219135", "0.000876", "3", "200.7054"]
    }, {
      "time": 1535694300000,
      "pair": "EOS_BTC",
      "values": ["0.000878", "0.000876", "0.000875", "0.000878", "1068.5049", "0.9359688994", "0.000878", "4", "258.0459"]
    }, {
      "time": 1535695200000,
      "pair": "EOS_BTC",
      "values": ["0.000876", "0.000878", "0.000876", "0.000878", "1007.6566", "0.883900103", "0.000876", "4", "475.5505"]
    }, {
      "time": 1535696100000,
      "pair": "EOS_BTC",
      "values": ["0.000878", "0.000879", "0.000877", "0.000879", "1026.427", "0.900912386", "0.000878", "4", "254.9287"]
    }, {
      "time": 1535697000000,
      "pair": "EOS_BTC",
      "values": ["0.000879", "0.000881", "0.000879", "0.000881", "954.1558", "0.8399251827", "0.000879", "4", "491.5858"]
    }, {
      "time": 1535697900000,
      "pair": "EOS_BTC",
      "values": ["0.000881", "0.000881", "0.000879", "0.000881", "1062.1484", "0.9345023832", "0.000881", "5", "217.3016"]
    }, {
      "time": 1535698800000,
      "pair": "EOS_BTC",
      "values": ["0.000881", "0.000887", "0.000881", "0.000887", "961.2746", "0.8519301349", "0.000881", "4", "255.2734"]
    }, {
      "time": 1535699700000,
      "pair": "EOS_BTC",
      "values": ["0.000887", "0.000879", "0.000879", "0.000887", "1247.9261", "1.0991079587", "0.000887", "5", "226.6374"]
    }, {
      "time": 1535700600000,
      "pair": "EOS_BTC",
      "values": ["0.000879", "0.000876", "0.000876", "0.000881", "1001.6417", "0.8787568059", "0.000879", "4", "522.2066"]
    }, {
      "time": 1535701500000,
      "pair": "EOS_BTC",
      "values": ["0.000876", "0.000874", "0.000874", "0.000879", "1267.6598", "1.1118799436", "0.000876", "5", "297.6714"]
    }, {
      "time": 1535702400000,
      "pair": "EOS_BTC",
      "values": ["0.000874", "0.000881", "0.000874", "0.000881", "1177.574", "1.0352246641", "0.000874", "5", "283.3945"]
    }, {
      "time": 1535703300000,
      "pair": "EOS_BTC",
      "values": ["0.000881", "0.000883", "0.00088", "0.000884", "951.9658", "0.8397455437", "0.000881", "4", "203.5195"]
    }, {
      "time": 1535704200000,
      "pair": "EOS_BTC",
      "values": ["0.000883", "0.00088", "0.00088", "0.000883", "1280.535", "1.1286130149", "0.000883", "5", "535.4234"]
    }, {
      "time": 1535705100000,
      "pair": "EOS_BTC",
      "values": ["0.00088", "0.000879", "0.000879", "0.000882", "1063.1932", "0.9364036403", "0.00088", "4", "267.4631"]
    }, {
      "time": 1535706000000,
      "pair": "EOS_BTC",
      "values": ["0.000879", "0.00088", "0.000878", "0.00088", "1296.6503", "1.1400044412", "0.000879", "5", "772.7389"]
    }, {
      "time": 1535706900000,
      "pair": "EOS_BTC",
      "values": ["0.00088", "0.000885", "0.000879", "0.000885", "1248.7629", "1.1005048581", "0.00088", "5", "262.5202"]
    }, {
      "time": 1535707800000,
      "pair": "EOS_BTC",
      "values": ["0.000885", "0.00088", "0.00088", "0.000885", "1146.0558", "1.0101936608", "0.000885", "5", "222.9369"]
    }, {
      "time": 1535708700000,
      "pair": "EOS_BTC",
      "values": ["0.00088", "0.000885", "0.00088", "0.000885", "976.6351", "0.862619442", "0.00088", "4", "240.1084"]
    }, {
      "time": 1535709600000,
      "pair": "EOS_BTC",
      "values": ["0.000885", "0.000889", "0.000885", "0.000889", "1260.9052", "1.1184115146", "0.000885", "5", "480.5421"]
    }, {
      "time": 1535710500000,
      "pair": "EOS_BTC",
      "values": ["0.000889", "0.000887", "0.000886", "0.000889", "985.4421", "0.8744743414", "0.000889", "4", "487.0606"]
    }, {
      "time": 1535711400000,
      "pair": "EOS_BTC",
      "values": ["0.000887", "0.000889", "0.000887", "0.000892", "1256.0245", "1.1176903541", "0.000887", "5", "207.3649"]
    }, {
      "time": 1535712300000,
      "pair": "EOS_BTC",
      "values": ["0.000889", "0.00089", "0.000887", "0.00089", "1356.3186", "1.2058565577", "0.000889", "5", "557.3531"]
    }, {
      "time": 1535713200000,
      "pair": "EOS_BTC",
      "values": ["0.00089", "0.000898", "0.000889", "0.000902", "1324.2357", "1.186793407", "0.00089", "5", "284.6423"]
    }, {
      "time": 1535714100000,
      "pair": "EOS_BTC",
      "values": ["0.000898", "0.000898", "0.000898", "0.000903", "1068.4975", "0.9614419282", "0.000898", "4", "281.1275"]
    }])
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
