import ImageClassifyAPI from './datasources/ImageClassify'
import TrashAPI from './datasources/Trash'
import ArticleAPI from './datasources/Article'
import { db } from './utils/db_mock'

const imageClassifyAPI = new ImageClassifyAPI()
const trashAPI = new TrashAPI({ db })
const articleAPI = new ArticleAPI({ db })
export default function () {
  return {
    imageClassifyAPI: imageClassifyAPI,
    trashAPI: trashAPI,
    articleAPI: articleAPI
  }
}
