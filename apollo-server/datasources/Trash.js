import { DataSource } from 'apollo-datasource'
import { db } from '../utils/db_mock'

export default class TrashAPI extends DataSource {
  constructor() {
    super()
    this.db = db
  }

  notFoundError(name, id) {
    return `${name}'s id: ${id} not found`
  }

  async getTrashByNameList(names) {
    const trashListPromise = names.map(name => {
      return this.getTrashByName(name)
    })

    let foundTrashList = await Promise.all(trashListPromise)
    // filter out the trash not found
    return foundTrashList.filter(trash => {
      return !!trash
    })
  }

  /**
   * @brief it will creat a list for sequelize, the precise match will have higher prec
   * @param {string[]} word_list - word to do fuzz lookup
   * @return {[]} - the result use for sequelize, like [word,..., {[Op.like]: %word%}...]
   */
  buildFuzzyLookupPatternList(word_list) {
    let precise_match_list = word_list.map(word => {
      return `${word}`
    })
    // word must have length
    let fuzz_match_list = word_list
      .filter(word => word.length > 0)
      .map(word => {
        return {
          [this.db.$Op.like]: `%${word}%`
        }
      })
    // precise match has higher prec
    return precise_match_list.concat(fuzz_match_list)
  }

  /**
   * @brief create the orderPattern to order the result according to prec
   * @param {any[]} fuzzyPatternList - the pattern to match
   * @param {string} colum - the colum to be ordered
   */
  buildFuzzyOrderPattern(fuzzyPatternList, colum) {
    let orderPattern = []
    fuzzyPatternList.forEach(pattern => {
      if (typeof pattern === 'string') {
        orderPattern.push(
          this.db.$SQL.literal(
            `(case when instr(\`Trash\`.\`${colum}\`, '${pattern}')>0 then 0 else 1 end)`
          )
        )
      }
    })
    return orderPattern
  }

  async getTrashByName({ keyword, root }) {
    // randomly get one if match
    let Op = this.db.$Op
    const fuzzyPatternList = this.buildFuzzyLookupPatternList(
      [keyword].concat(root.split('-'))
    )
    const trash = await this.db.Trash.findOne({
      where: {
        name: {
          [Op.or]: fuzzyPatternList
        }
      },
      // order by abs(len(col) - len(val))
      order: this.buildFuzzyOrderPattern(fuzzyPatternList, 'name')
    })

    if (!trash) {
      // ignore the trash that not found
      console.log(
        `Warning: Trash keyword: ${keyword}, root: ${root} can not found. ignore`
      )
      return null
    }

    return trash
  }

  async getGQLTrash({ trashTypeId, extraInfoId, name, id }) {
    const findExtra = this.getTrashExtraById(extraInfoId)
    const findType = this.getTrashTypeById(trashTypeId)

    let [extraInfo, typeInfo] = await Promise.all([findExtra, findType])
    return {
      id,
      extraInfo,
      typeInfo
    }
  }

  async getTrashExtraById(id) {
    const res = await this.db.TrashExtraInfo.findOne({
      where: { id: id }
    })
    if (!res) throw this.notFoundError('TrashExtraInfo', id)
    return res
  }

  async getTrashTypeById(id) {
    const res = await this.db.TrashType.findOne({
      where: { id: id }
    })
    if (!res) throw this.notFoundError('TrashType', id)
    return res
  }
}
