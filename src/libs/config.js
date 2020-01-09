let wsUrl
let quoteUrl
let wssUrl 

let ws = ''
let quote = ''
let wss = ''

if (process.env.NODE_ENV != 'development') {
  const val = location.host.split('.')
  const host = val.slice(val.length - 2, val.length).join('.')
  if (host === 'ixex.pro') {
    ws = `wss://ws.${host}/v1/`
    quote = `https://q.${host}/v1/`
    wss = `wss://wss.${host}/v1`
  } else {
    ws = 'wss://ws.ixex.io/v1/'
    quote = 'https://q.ixex.io/v1/'
    wssUrl = 'wss://wss.ixex.io/v1' 
    // wsUrl = 'wss://ws.ixex.pro/v1/'
    // quoteUrl = 'https://q.ixex.pro/v1/'
    // wssUrl = 'wss://wss.ixex.pro/v1'
  }
}
if (process.env.NODE_ENV === 'development') {
  wsUrl = 'wss://ws.ixex.io/v1/'
  quoteUrl = 'https://q.ixex.io/v1/'
  wssUrl = 'wss://wss.ixex.io/v1'
  // wsUrl = 'wss://ws.ixex.pro/v1/'
  // quoteUrl = 'https://q.ixex.pro/v1/'
  // wssUrl = 'wss://wss.ixex.pro/v1'
} else if (process.env.NODE_ENV === 'beta') {
  wsUrl = ws
  quoteUrl = quote
  wssUrl = wss
} else {
  wsUrl = ws
  quoteUrl = quote
  wssUrl = wss
}

const { exchangeName } = process.env.THEME_ENV

const config = {
  title: exchangeName,
  wsUrl,
  quoteUrl,
  wssUrl
}

export default config
