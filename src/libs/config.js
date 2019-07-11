let wsUrl
let quoteUrl

let ws = ''
let quote = ''

if(process.env.NODE_ENV != 'development'){
  let val = location.host.split('.')
  let host = val.slice(val.length - 2, val.length).join('.')
  // ws = `wss://ws.${host}/v1/` 
  // quote = `https://q.${host}/v1/` 
  wsUrl = 'wss://ws.ixex.pro/v1/'
  quoteUrl = 'https://q.ixex.pro/v1/'
}
if (process.env.NODE_ENV === 'development') { 
  wsUrl = 'wss://ws.ixex.pro/v1/'
  quoteUrl = 'https://q.ixex.pro/v1/'
} else if (process.env.NODE_ENV === 'beta') { 
  wsUrl = ws
  quoteUrl = quote
} else { 
  wsUrl = ws
  quoteUrl = quote
}

const { exchangeName } = process.env.THEME_ENV

const config = {
  title: exchangeName,
  wsUrl,
  quoteUrl
}

export default config
