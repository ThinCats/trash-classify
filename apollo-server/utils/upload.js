import * as utils from './utils'
import * as Errors from '../Errors.ts'

export function checkImageMimetype(mimetype) {
  return utils.checkMimeType(mimetype, [
    'image/jpeg',
    'image/png',
    'application/octet-stream'
  ])
}

function checkFileSize(buffer) {
  // no more than 5 mb
  if (buffer.length > 5 * 1024 * 1024) {
    return new Errors.UploadImageSizeError()
  }
}

export function withBase64Stream(stream) {
  return utils.withBase64Stream(stream, checkFileSize)
}

export function loadFromCache(cache, url) {
  let res = cache.get(url)
  return res
}

export function saveToCache(cache, url, uploadImageRes) {
  let success = cache.set(url, uploadImageRes)
  if (!success) {
    console.log('Warning: save url to cache failed')
  }
  return uploadImageRes
}
