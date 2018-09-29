let wsUrl
let quoteUrl

if (process.env.NODE_ENV === 'development') {
  wsUrl = 'ws://ws.ix-test.com:9090/v1/'
  quoteUrl = 'http://q.ix-test.com:8080/v1/'
  // wsUrl = 'ws://ws.ix-test.com:9090/v1/'
  // quoteUrl = 'http://q.ix-test.com:8080/v1/'
} else if (process.env.NODE_ENV === 'beta') {
  wsUrl = 'ws://ws.ix-test.com:9090/v1/'
  quoteUrl = 'http://q.ix-test.com:8080/v1/'
} else {
  wsUrl = 'wss://ws.ix.com/v1/'
  quoteUrl = 'https://q.ix.com/v1/'
}

const { exchangeName } = process.env.THEME_ENV

const config = {
  title: exchangeName,
  wsUrl,
  quoteUrl
}

export default config
