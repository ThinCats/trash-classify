import { db } from './utils/db'
import { BaiduAccessToken } from '../secret/baidu'
import LRU from 'lru-cache'

const lruCache = new LRU({
  max: 1000
})

// Context passed to all resolvers (third argument)
// req => Query
// connection => Subscription
// eslint-disable-next-line no-unused-vars
export default ({ req, connection }) => {
  return {
    db,
    api_token: BaiduAccessToken,
    // simple cache
    cache: lruCache
  }
}
