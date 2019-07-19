import { RESTDataSource } from 'apollo-datasource-rest'
import querystring from 'querystring'
import * as Errors from '../Errors.ts'

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
   * @brief check whether response contains error message
   * @param {object} response - response from api server
   */
  checkError(response) {
    // no error
    if (typeof response.error_code === 'undefined') {
      return
    }

    // check error
    if (response.error_code === 18)
      throw new Errors.ImageClassifyAPILimitedError()
    else if (response.error_code === 216201)
      throw new Errors.UploadImageTypeError()
  }

  async postAPI(api_uri, option) {
    let response = await this.post(
      this.urlWithToken(api_uri),
      this.encodeWithOption(option)
    ).catch(err => {
      // usually network error
      throw new Errors.ImageClassifyAPIError()
    })

    this.checkError(response)
    return response
  }

  /**
   * @param imgBase64: string - base64 for img to upload
   * @return Response: object
   */
  async getObjectDetectResult(imgBase64) {
    return this.postAPI('v1/object_detect', { image: imgBase64 })
  }

  async getImageIdentifyResult(imgBase64) {
    return this.postAPI('v2/advanced_general', { image: imgBase64 })
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
