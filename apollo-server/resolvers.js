import shortid from 'shortid'
import * as utils from './utils/utils'
import request from 'request'

export default {
  Query: {
    trashList: async (_, { trashNameList }, { dataSources }) => {
      return dataSources.trashAPI.getTrashByNameList(trashNameList)
    },
    trash: async (_, { name: { keyword, root } }, { dataSources }) => {
      return dataSources.trashAPI.getTrashByName({ keyword, root })
    }
  },

  Mutation: {
    uploadImageByFile: async (parent, { imgFile }, { dataSources }) => {
      let { createReadStream, filename, mimetype } = await imgFile
      let imgBase64 = await utils.withBase64Stream(createReadStream())
      return dataSources.imageClassifyAPI.getUploadImageResponse(imgBase64)
    },

    uploadImageByURL: async (parent, { imgURL }, { dataSources }) => {
      let stream = request(imgURL)
      let imgBase64 = await utils.withBase64Stream(stream)
      return dataSources.imageClassifyAPI.getUploadImageResponse(imgBase64)
    },

    uploadImage: async (parent, { imgFile }) => {
      console.log(imgFile)
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
