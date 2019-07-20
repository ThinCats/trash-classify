import { DataSource } from 'apollo-datasource'

export default class Article extends DataSource {
  constructor({ db }) {
    super()
    this.db = db
  }

  notFoundError(name, id) {
    return `${name}'s id: ${id} not found`
  }

  getRandomFromRange(start, end) {
    return Math.ceil(Math.random() * (end - start) + start)
  }

  async getDailyArticle() {
    let today = new Date()
    return this.getDailyArticleById((today.getDate() % 4) + 1)
  }

  async getDailyArticleById(id) {
    const res = await this.db.DailyArticle.findOne({
      where: { id: id }
    })
    if (!res) throw this.notFoundError('DailyArticle', id)
    return res
  }
}
