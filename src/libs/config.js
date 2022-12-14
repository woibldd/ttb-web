let wsUrl
let quoteUrl
let wssUrl 

let ws = ''
let quote = ''
let wss = ''

console.log("NODE_ENV:", process.env.NODE_ENV )
if (process.env.NODE_ENV != 'development') {
  const val = location.host.split('.')
  const host = val.slice(val.length - 2, val.length).join('.')
  if (host === 'qimenpaipan.com') {
    ws = `wss://ws.${host}/v1/`
    quote = `https://q.${host}/v1/`
    wss = `wss://wss.${host}/v1`  
  } else { 
    wsUrl = 'wss://ws.cloudservicex.com/v1/'
    quoteUrl = 'https://q.cloudservicex.com/v1/'
    wssUrl = 'wss://wss.cloudservicex.com/v1'
  }
}
if (process.env.NODE_ENV === 'development') {
  // wsUrl = 'wss://ws.ixweb.pro/v1/'
  // quoteUrl = 'https://q.ixweb.pro/v1/'
  // wssUrl = 'wss://wss.ixweb.pro/v1' 
  wsUrl = 'wss://ws.cloudservicex.com/v1/'
  quoteUrl = 'https://q.cloudservicex.com/v1/'
  wssUrl = 'wss://wss.cloudservicex.com/v1' 
} else if (process.env.NODE_ENV === 'beta') {
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
