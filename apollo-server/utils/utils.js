export async function withBase64Stream(stream) {
  return new Promise((resolve, reject) => {
    let buffers = []
    stream.on('data', chunk => {
      buffers.push(chunk)
    })

    stream.once('end', () => {
      let buffer = Buffer.concat(buffers)
      resolve(buffer.toString('base64'))
    })

    stream.once('error', err => {
      reject(err)
    })
  })
}
