import * as Sequelize from 'sequelize'
import path from 'path'

const sequelize = new Sequelize.Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../../live/db.sqlite')
})

sequelize
  .authenticate()
  .then(() => console.log('connect database successfully'))
  .catch(() => console.log('connect database failed'))

const option = {
  sequelize,
  freezeTableName: true,
  timestamps: false
}

class Trash extends Sequelize.Model { }
Trash.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    trashTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    extraInfoId: {
      type: Sequelize.INTEGER
    }
  },
  option
)

class TrashType extends Sequelize.Model { }
TrashType.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  option
)

class TrashExtraInfo extends Sequelize.Model { }
TrashExtraInfo.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    degrateTime: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  option
)

const db = {
  Trash,
  TrashType,
  TrashExtraInfo,
  $Op: Sequelize.Op,
  $SQL: sequelize
}

export { db }
