import LRU from 'lru-cache'

const lruCache = new LRU({
  max: 1000
})

if (!process.env.BAIDU_ACCESS_TOKEN) {
    throw "Must specify Baidu API Token"
}

// Context passed to all resolvers (third argument)
// req => Query
// connection => Subscription
// eslint-disable-next-line no-unused-vars
export default ({ req, connection }) => {
  return {
    api_token: process.env.BAIDU_ACCESS_TOKEN,
    // simple cache
    cache: lruCache
  }
}
