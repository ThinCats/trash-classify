import { db } from './utils/db'
import { BaiduAccessToken } from '../secret/baidu'
import NodeCache from 'node-cache'

const nodeCache = new NodeCache({ stdTTL: 6000, checkperiod: 6010 })
// Context passed to all resolvers (third argument)
// req => Query
// connection => Subscription
// eslint-disable-next-line no-unused-vars
export default ({ req, connection }) => {
  return {
    db,
    api_token: BaiduAccessToken,
    // simple cache
    cache: nodeCache
  }
}
