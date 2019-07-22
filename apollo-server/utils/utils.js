const request = require('request')

/**
 *
 * @param stream - the stream to read files
 * @param checkFunction - check whether can continue to process the
 *    stream, if return error, will reject it. return null means no error
 */
export async function withBase64Stream(stream, checkFunction = array => null) {
  return new Promise((resolve, reject) => {
    let buffers = []
    stream.on('data', chunk => {
      buffers.push(...chunk)
      let err = checkFunction(buffers)
      // has err
      if (err) reject(err)
    })

    stream.once('end', () => {
      let buffer = Buffer.from(buffers)
      // let buffer = Buffer.concat(buffers)
      resolve(buffer.toString('base64'))
    })

    stream.once('error', err => {
      reject(err)
    })
  })
}

export function sizeByteToMega(sizeInByte) {
  return sizeInByte / (1024 * 1024)
}

export function checkMimeType(mimetype, check_pattern) {
  return check_pattern.includes(mimetype)
}

export async function getHeaderFromUrl(url) {
  return new Promise((resolve, reject) => {
    request({ url: url, method: 'HEAD' }, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res['headers'])
    })
  })
}
