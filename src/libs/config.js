let wsUrl
let quoteUrl

if (process.env.NODE_ENV === 'development') {
  wsUrl = 'ws://ws.ix-test.com:9090/v2/'
  // wsUrl = 'ws://ws.thinkbit.com/v2/'
  // wsUrl = 'ws://47.88.230.181:9090/v2/'
  quoteUrl = 'http://quote.ix-test.com:9090/v2/'
//   quoteUrl = 'http://47.74.154.32:9090/v2/'
  // quoteUrl = 'https://api.thinkbit-beta.com/v2/'
} else {
//   const hostname = location.hostname.match(/(\.|^)([\w-]*.[\w]*)$/)[2]
//   wsUrl = `wss://ws.${hostname}/v2/`
//   quoteUrl = `https://api.${hostname}/v2/`
    wsUrl = 'ws://ws.ix-test.com:9090/v2/'
    quoteUrl = 'http://quote.ix-test.com:9090/v2/'
}

const { exchangeName } = process.env.THEME_ENV

const config = {
  title: exchangeName,
  wsUrl,
  quoteUrl
}

export default config
