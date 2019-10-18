const getSassVariables = require('./getSassVariables')

module.exports = {
  styleVar: getSassVariables(),
  googleAnalyticsId: 'UA-125390817-4',
  locales: ['en', 'zh-CN', 'zh-HK', 'ko'],
  themeName: 'default',
  companyName: 'IXX.COM',
  exchangeName: 'IXX | Digital assets trading community',
  exchangeNameConfig: {
    'zh-CN': 'IXX | 数字资产交易共同体',
    'zh-HK': 'IXX | 數字資產交易共同體',
    en: 'IXX | Digital assets trading community',
    ko: 'IXX | 수자 재산 거래 공동체'
  },
  keywords: 'IXX,比特币,比特币交易,以太坊,区块链,共识,自由联合,数字资产交易所,BTC,ETH,Block chain,Bitcoin Trading',
  description: 'IXX | The world\'s first one-stop service center on digital currency assets, secure, fair and transparent.',
  shortcut: '',
  supportMail: 'support@ixx.com',
  hrMail: 'hr@ixx.com',
  apiDoc: {
    en: 'https://github.com/sonsea/ixx-API-Docs',
    ko: 'https://github.com/sonsea/ixx-API-Docs',
    'zh-CN': 'https://github.com/sonsea/ixx-API-Docs',
    'zh-HK': 'https://github.com/sonsea/ixx-API-Docs'
  },
  faq: {
    en: 'https://ixxcustomer.zendesk.com/hc/en-us/',
    ko: 'https://ixxcustomer.zendesk.com/hc/en-us/',
    'zh-CN': 'https://ixxcustomer.zendesk.com/hc/zh-cn/',
    'zh-HK': 'https://ixxcustomer.zendesk.com/hc/zh-cn/'
  },
  announcement: {
    en: 'https://ixxcustomer.zendesk.com/hc/en-us/categories/360001229791',
    ko: 'https://ixxcustomer.zendesk.com/hc/en-us/categories/360001229791',
    'zh-CN': 'https://ixxcustomer.zendesk.com/hc/zh-cn/categories/360001229791',
    'zh-HK': 'https://ixxcustomer.zendesk.com/hc/zh-cn/categories/360001229791'
  },
  help: {
    en: 'https://ixxcustomer.zendesk.com/hc/en-us/categories/360001229751',
    ko: 'https://ixxcustomer.zendesk.com/hc/en-us/categories/360001229751',
    'zh-CN': 'https://ixxcustomer.zendesk.com/hc/zh-cn/categories/360001229751',
    'zh-HK': 'https://ixxcustomer.zendesk.com/hc/zh-cn/categories/360001229751'
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
