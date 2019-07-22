import shortid from 'shortid'
import * as utils from './utils/utils.js'
import * as uploadUtil from './utils/upload.js'
import request from 'request'

import * as Errors from './Errors.ts'

export default {
  Query: {
    trashList: async (_, { trashNameList }, { dataSources }) => {
      let trashList = await dataSources.trashAPI.getTrashByNameList(
        trashNameList
      )
      // no trash will just return []
      return trashList
    },
    trash: async (_, { name: { keyword, root } }, { dataSources }) => {
      return dataSources.trashAPI.getTrashByName({ keyword, root })
    },
    errors: (_, __, context) => Errors.errorsList,
    dailyArticle: (_, __, { dataSources }) =>
      dataSources.articleAPI.getDailyArticle()
  },

  Mutation: {
    uploadImageByFile: async (parent, { imgFile }, { dataSources }) => {
      let { createReadStream, filename, mimetype } = await imgFile
      // not image
      if (!uploadUtil.checkImageMimetype(mimetype)) {
        throw new Errors.UploadImageTypeError()
      }

      let imgBase64 = await uploadUtil.withBase64Stream(createReadStream())
      return dataSources.imageClassifyAPI.getUploadImageResponse(imgBase64)
    },

    uploadImageByURL: async (parent, { imgURL }, { dataSources, cache }) => {
      // load from cache
      let response = uploadUtil.loadFromCache(cache, imgURL)
      if (typeof response !== 'undefined') {
        return response
      }

      let header = await utils.getHeaderFromUrl(imgURL).catch(err => {
        throw new Errors.UploadImageURLError()
      })

      // get image/jpeg
      let contentType = header['content-type'].split(';')[0]
      // check whether is image
      if (!uploadUtil.checkImageMimetype(contentType)) {
        throw new Errors.UploadImageTypeError()
      }

      let stream = request(imgURL)
      let imgBase64 = await uploadUtil.withBase64Stream(stream)
      response = await dataSources.imageClassifyAPI.getUploadImageResponse(
        imgBase64
      )

      // save to cache
      uploadUtil.saveToCache(cache, imgURL, response)
      return response
    },

    uploadImage: async (parent, { imgFile }) => {
      let { createReadStream, filename, mimetype } = await imgFile
      return { filename, mimetype }
    }
  },

  Trash: {
    type: async (trash, _, { dataSources }) => {
      return dataSources.trashAPI.getTrashTypeById(trash.trashTypeId)
    },
    extraInfo: async (trash, _, { dataSources }) => {
      return dataSources.trashAPI.getTrashExtraById(trash.extraInfoId)
    }
  }
}
