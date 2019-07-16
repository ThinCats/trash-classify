import shortid from 'shortid'
import * as utils from './utils/utils'
import request from 'request'

export default {
  Query: {
    trashList: () => [],
    trash: () => {
      return {
        name: '123'
      }
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
    type: () => {
      return {
        name: 'recy'
      }
    },
    name: parent => parent.name || 'test-trash',
    extraInfo: () => {
      return {
        degration: {
          degrateTime: '123',
          degrateBy: []
        }
      }
    },
    id: () => {
      return shortid.generate()
    }
  }
}
