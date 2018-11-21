const getSassVariables = require('./getSassVariables')

module.exports = {
  styleVar: getSassVariables(),
  googleAnalyticsId: 'UA-125390817-4',
  locales: ['en', 'zh-CN', 'zh-HK', 'ko'],
  themeName: 'default',
  companyName: 'IXX.COM',
  exchangeName: 'IX | 自由人的自由联合',
  exchangeNameConfig: {
    'zh-CN': 'IX | 自由人的自由联合',
    'zh-HK': 'IX | 自由人的自由聯合',
    en: 'IX | Freedom,Choice & Unification',
    ko: 'IX | 자유인의 자유 연합  번역'
  },
  keywords: 'IX,比特币,比特币交易,以太坊,区块链,共识,自由联合,数字资产交易所',
  description:
    'IX致力于打造一家回归区块链精神的数字资产交易所，公开、公正、透明',
  shortcut: '',
  supportMail: 'support@ix.com',
  hrMail: 'hr@ix.com',
  apiDoc: {
    en: 'https://github.com/ix-api/API_Docs',
    ko: 'https://github.com/ix-api/API_Docs',
    'zh-CN': 'https://github.com/ix-api/API_Docs',
    'zh-HK': 'https://github.com/ix-api/API_Docs'
  },
  faq: {
    en: 'https://ixxcustomer.zendesk.com/hc/en-us/',
    ko: 'https://ixxcustomer.zendesk.com/hc/en-us/',
    'zh-CN': 'https://ixxcustomer.zendesk.com/hc/zh-cn/',
    'zh-HK': 'https://ixxcustomer.zendesk.com/hc/zh-cn/'
  },
  announcement: {
    en: 'https://ixxcustomer.zendesk.com/hc/en-us/sections/360002955371',
    ko: 'https://ixxcustomer.zendesk.com/hc/en-us/sections/360002955371',
    'zh-CN': 'https://ixxcustomer.zendesk.com/hc/zh-cn/sections/360002955371',
    'zh-HK': 'https://ixxcustomer.zendesk.com/hc/zh-cn/sections/360002955371'
  },
  help: {
    en: 'https://ixxcustomer.zendesk.com/hc/en-us/',
    ko: 'https://ixxcustomer.zendesk.com/hc/en-us/',
    'zh-CN': 'https://ixxcustomer.zendesk.com/hc/zh-cn/',
    'zh-HK': 'https://ixxcustomer.zendesk.com/hc/zh-cn/'
  },
  request: {
    en: 'https://ixxcustomer.zendesk.com/hc/en-us/requests/new',
    ko: 'https://ixxcustomer.zendesk.com/hc/en-us/requests/new',
    'zh-CN': 'https://ixxcustomer.zendesk.com/hc/zh-cn/requests/new',
    'zh-HK': 'https://ixxcustomer.zendesk.com/hc/zh-cn/requests/new'
  },
  activeRule: {
    en: 'https://ixxcustomer.zendesk.com/hc/en-us/articles/360015900832',
    ko: 'https://ixxcustomer.zendesk.com/hc/en-us/articles/360015900832',
    'zh-CN': 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360015900832',
    'zh-HK': 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360015900832'
  },
  activityKyc: {
    en: 'https://ixxcustomer.zendesk.com/hc/en-us/articles/360016718671',
    ko: 'https://ixxcustomer.zendesk.com/hc/en-us/articles/360016718671',
    'zh-CN': 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360016718671',
    'zh-HK': 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360016718671'
  }
}
