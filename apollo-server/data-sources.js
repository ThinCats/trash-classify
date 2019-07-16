import ImageClassifyAPI from './datasources/ImageClassify'
export default function() {
  return {
    imageClassifyAPI: new ImageClassifyAPI()
  }
}
