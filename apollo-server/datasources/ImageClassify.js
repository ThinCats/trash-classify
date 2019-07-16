import { RESTDataSource } from 'apollo-datasource-rest'
import querystring from 'querystring'
export default class ImageClassifyAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://aip.baidubce.com/rest/2.0/image-classify/'
  }

  /**
   * @brief Set request type every request
   * @param {*} request - Rest request
   */
  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
  }

  /**
   * @brief add access token for ever url
   * @param {string} url - url to send request
   */
  urlWithToken(url) {
    return `${url}?access_token=${this.context.api_token}`
  }

  encodeWithOption(option) {
    return querystring.stringify(option)
  }

  /**
   * @param imgBase64: string - base64 for img to upload
   * @return Response: object
   */
  async getObjectDetectResult(imgBase64) {
    let response = await this.post(
      this.urlWithToken('v1/object_detect'),
      this.encodeWithOption({ image: imgBase64 })
    )
    console.log(response)
    return response
  }

  async getImageIdentifyResult(imgBase64) {
    let response = await this.post(
      this.urlWithToken('v2/advanced_general'),
      this.encodeWithOption({ image: imgBase64 })
    )
    console.log(response)
    return response
  }

  async getUploadImageResponse(imgBase64) {
    let [detectRes, identityRes] = await Promise.all([
      this.getObjectDetectResult(imgBase64),
      this.getImageIdentifyResult(imgBase64)
    ])

    return {
      taggedImageResult: identityRes.result,
      taggedImagePosition: detectRes.result
    }
  }
}
