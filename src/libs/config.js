let wsUrl
let quoteUrl

if (process.env.NODE_ENV === 'development') {
  wsUrl = 'wss://ws.thinkbit.com/v2/'
  quoteUrl = 'https://api.ix-test.com/v2/'
} else {
  const hostname = location.hostname.match(/(\.|^)([\w-]*.[\w]*)$/)[2]
  wsUrl = `wss://ws.${hostname}/v2/`
  quoteUrl = `https://api.${hostname}/v2/`
}

const { exchangeName } = process.env.THEME_ENV

const config = {
  title: exchangeName,
  wsUrl,
  quoteUrl
}

export default config
