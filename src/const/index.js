export const mapLang = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-HK': '繁體中文',
  'ko': '한국어'
}
export const mapNavBackground = {
  legalTender: '#3E3E3E',
  login: '#303E4B',
  contract: '#000',
  'currency-unit': '#000',
  share_option: '#111621'
}
export const mapTabTimes = ['1M', '5M', '10M', '1H', '3H', '1D', '7D']

export const rangeArr = [[1, 5, 20], [5, 10, 60], [10, 60, 180], [60, 180, 600], [180, 1440, 1800], [1440, 10080, 3600], [10080, 20000, 3600]]

export const mapBaseUrl = {
  'ixx.com': 'https://i.ixx.com',
  'staging.ixex.pro': 'https://i.ixex.pro'
}

export const mapLever = [1, 2, 3, 5, 10, 25, 50, 100]

export const serviceCharge = 7 / 10000

export const upColor = '#09C989'

export const downColor = '#F24E4D'

export const mapPeriod = {
  1: '1m', 3: '3m', 5: '5m', 15: '15m', 30: '30m', 60: '1h', 120: '2h', 240: '4h', 360: '6h', 720: '12h', 'D': '1d', '1D': '1d', 'W': '1w', '1W': '1w', 'M': '1M', '1M': '1M'
}

export const mapCurrency = ['CNY', 'USD']

export const WSURL = 'wss://wss.ixex.cc/v1'

export const mapRisk = {
  '20': [
    { r: 0, m: 20 },
    { r: 50, m: 20 },
    { r: 100, m: 10 },
    { r: 150, m: 6.6 },
    { r: 200, m: 5 },
    { r: 250, m: 4 },
    { r: 300, m: 3.3 },
    { r: 350, m: 2.8 },
    { r: 400, m: 2.5 },
    { r: 450, m: 2.2 },
    { r: 500, m: 2 }
  ],
  '50': [
    { r: 0, m: 50 },
    { r: 50, m: 50 },
    { r: 100, m: 33.3 },
    { r: 150, m: 25 },
    { r: 200, m: 20 },
    { r: 250, m: 16.6 },
    { r: 300, m: 14.2 },
    { r: 350, m: 12.5 },
    { r: 400, m: 11.1 },
    { r: 450, m: 10 },
    { r: 500, m: 9 }
  ],
  '100': [
    { r: 0, m: 100 },
    { r: 200, m: 100 },
    { r: 300, m: 66.66 },
    { r: 400, m: 50 },
    { r: 500, m: 40 },
    { r: 600, m: 33.33 },
    { r: 700, m: 28.5 },
    { r: 800, m: 25 },
    { r: 900, m: 22.22 },
    { r: 1000, m: 20 },
    { r: 1100, m: 18.1 }
  ]
}

export const mapAccount = {
  1: '资金账户',
  2: '币币账户',
  3: '合约账户',
  4: '法币账户',
  5: '币本位账户'
}
