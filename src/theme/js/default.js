const getSassVariables = require('./getSassVariables')

module.exports = {
  styleVar: getSassVariables(),
  googleAnalyticsId: 'UA-115918448-1',
  googleAdClient: 'ca-pub-3338747877281288',
  locales: ['en', 'zh-CN', 'zh-HK', 'ja', 'ko'],
  themeName: 'default',
  companyName: 'IX.COM',
  exchangeName: '比特币/以太坊交易平台，IX，数字资产交易所',
  keywords: '比特币,比特币交易,以太坊,区块链,IX,共识,自由联合,数字资产交易所',
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
    'en': 'https://ix.zendesk.com/hc/en-us/categories/360000222934',
    'zh-CN': 'https://ix.zendesk.com/hc/zh-cn/categories/360000222934'
  },
  announcement: {
    'en': 'https://ix.zendesk.com/hc/en-us/categories/360000242414',
    'zh-CN': 'https://ix.zendesk.com/hc/zh-cn/categories/360000242414'
  },
  help: {
    'en': 'https://ix.zendesk.com/hc/en-us',
    'zh-CN': 'https://ix.zendesk.com/hc/zh-cn'
  },
  request: {
    'en': 'https://ix.zendesk.com/hc/en-us/requests/new',
    'zh-CN': 'https://ix.zendesk.com/hc/zh-cn/requests/new'
  }
}
