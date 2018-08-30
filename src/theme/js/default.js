const getSassVariables = require('./getSassVariables')

module.exports = {
  styleVar: getSassVariables(),
  googleAnalyticsId: 'UA-115918448-1',
  googleAdClient: 'ca-pub-3338747877281288',
  locales: ['en', 'zh-CN', 'zh-HK', 'ja', 'ko'],
  themeName: 'default',
  companyName: 'ThinkBit',
  exchangeName: 'ThinkBit Pro',
  keywords: 'ThinkBit Pro, 信币, Bitcoin Exchange, Bitcoin, BTC, Bitcoin Price, Bitcoin Markets, USDT, Litecoin, BCH, Ethereum, ETH, Ethereum Classic, EOS, 比特币交易平台,比特币,BTC,比特币价格,比特币行情,USDT,莱特币,BCH,以太坊,ETH,以太经典,柚子',
  description: 'ThinkBit Pro, 信币, Bitcoin Exchange, Bitcoin, BTC, Bitcoin Price, Bitcoin Markets, USDT, Litecoin, BCH, Ethereum, ETH, Ethereum Classic, EOS, 比特币交易平台,比特币,BTC,比特币价格,比特币行情,USDT,莱特币,BCH,以太坊,ETH,以太经典,柚子',
  shortcut: '',
  eosRamTrading: true,
  eosforcevote: true,
  freevote: true,
  telegram: {
    'zh-CN': 'https://t.me/ThinkBitProCN',
    en: 'https://t.me/ThinkBitProEnglish'
  },
  supportMail: 'support@thinkbit.com',
  hrMail: 'hr@thinkbit.com',
  apiDoc: {
    'en': 'https://github.com/thinkbitpro/API_docs_en/wiki',
    'zh-CN': 'https://github.com/thinkbitpro/API_docs_zh/wiki'
  },
  faq: {
    'en': 'https://thinkbit.zendesk.com/hc/en-us/categories/360000222934',
    'zh-CN': 'https://thinkbit.zendesk.com/hc/zh-cn/categories/360000222934'
  },
  announcement: {
    'en': 'https://thinkbit.zendesk.com/hc/en-us/categories/360000242414',
    'zh-CN': 'https://thinkbit.zendesk.com/hc/zh-cn/categories/360000242414'
  },
  help: {
    'en': 'https://thinkbit.zendesk.com/hc/en-us',
    'zh-CN': 'https://thinkbit.zendesk.com/hc/zh-cn'
  },
  request: {
    'en': 'https://thinkbit.zendesk.com/hc/en-us/requests/new',
    'zh-CN': 'https://thinkbit.zendesk.com/hc/zh-cn/requests/new'
  },
  eosforceLink: {
    'en': 'https://thinkbit.zendesk.com/hc/en-us/articles/360007849274',
    'zh-CN': 'https://thinkbit.zendesk.com/hc/zh-cn/articles/360007849274'
  }
}
