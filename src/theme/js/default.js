const getSassVariables = require('./getSassVariables')

module.exports = {
  styleVar: getSassVariables(),
  googleAnalyticsId: 'UA-125390817-2',
  locales: ['en', 'zh-CN', 'zh-HK'],
  themeName: 'default',
  companyName: 'IX.COM',
  exchangeName: 'IX | 自由人的自由联合',
  keywords: 'IX,比特币,比特币交易,以太坊,区块链,共识,自由联合,数字资产交易所',
  description: 'IX致力于打造一家回归区块链精神的数字资产交易所，公开、公正、透明',
  shortcut: '',
  telegram: {
    'zh-CN': 'https://t.me/ixCN',
    en: 'https://t.me/ixEnglish'
  },
  supportMail: 'support@ix.com',
  hrMail: 'hr@ix.com',
  apiDoc: {
    'en': 'https://github.com/ix/API_docs_en/wiki',
    'zh-CN': 'https://github.com/ix/API_docs_zh/wiki'
  },
  faq: {
    'en': 'https://ixcustomer.zendesk.com/hc/en-us/categories/360000964011',
    'zh-CN': 'https://ixcustomer.zendesk.com/hc/zh-cn/categories/360000964011'
  },
  announcement: {
    'en': 'https://ixcustomer.zendesk.com/hc/en-us/categories/360000964031',
    'zh-CN': 'https://ixcustomer.zendesk.com/hc/zh-cn/categories/360000964031'
  },
  help: {
    'en': 'https://ixcustomer.zendesk.com/hc/en-us/sections/360002271551',
    'zh-CN': 'https://ixcustomer.zendesk.com/hc/zh-cn/sections/360002271551'
  },
  request: {
    'en': 'https://ixcustomer.zendesk.com/hc/en-us/requests/new',
    'zh-CN': 'https://ixcustomer.zendesk.com/hc/zh-cn/requests/new'
  }
}
