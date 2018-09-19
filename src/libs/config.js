let wsUrl
let quoteUrl

if (process.env.NODE_ENV === 'development') {
  // wsUrl = 'ws://ws.ix-test.com:9090/v1/'
  // wsUrl = 'ws://ws.thinkbit.com/v2/'
  wsUrl = 'ws://47.88.230.181:9090/v1/'
  quoteUrl = 'http://quote.ix-test.com:9090/v1/'
//   quoteUrl = 'http://47.74.154.32:9090/v2/'
  // quoteUrl = 'https://api.thinkbit-beta.com/v2/'
} else if (process.env.NODE_ENV === 'beta'){
    wsUrl = 'ws://ws.ix-test.com:9090/v1/'
    quoteUrl = 'http://quote.ix-test.com:9090/v1/'
} else {
  wsUrl = 'wss://ws.ix.com/v2/'
  quoteUrl = 'http://quote.ix.com/v2/'
}

const { exchangeName } = process.env.THEME_ENV

const config = {
  title: exchangeName,
  wsUrl,
  quoteUrl
}

export default config
