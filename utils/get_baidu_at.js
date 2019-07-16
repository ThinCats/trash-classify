// get baidu access token from baidu
const Baidu = require('../secret/baidu')
var https = require('https')
var qs = require('querystring')

const param = qs.stringify({
  grant_type: 'client_credentials',
  client_id: Baidu.BaiduAPIToken.api_key,
  client_secret: Baidu.BaiduAPIToken.secret_key
})
console.log(param)

https.get(
  {
    hostname: 'aip.baidubce.com',
    path: '/oauth/2.0/token?' + param,
    agent: false
  },
  function(res) {
    // 在标准输出中查看运行结果
    res.pipe(process.stdout)
  }
)
