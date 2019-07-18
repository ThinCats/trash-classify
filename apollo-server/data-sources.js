import ImageClassifyAPI from './datasources/ImageClassify'
import TrashAPI from './datasources/Trash'
export default function () {
  return {
    imageClassifyAPI: new ImageClassifyAPI(),
    trashAPI: new TrashAPI()
  }
}
