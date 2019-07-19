const fs = require('fs')
const path = require('path')

/**
 *
 * @param {string} toConvertStr - the string to be removed directives
 * @param {string[]} directives - specify the directives, like [example, fake], remove @example, @fake
 * @return {string} - converted string
 */
function removeDirectives(toConvertStr, directives) {
  let convertedStr = String(toConvertStr)
  for (const directive of directives) {
    const directiveStr = `@${directive}` // like @example
    const reg = new RegExp(`${directiveStr}[\\s]?\\((?:.|\\s)*?\\)`, 'g')
    convertedStr = convertedStr.replace(reg, '')
  }
  return convertedStr
}

function removeDirectives_test() {
  let toConvertStr = `
    type Trash {
    type(type: TrashType): String @examples(values: ["recy", "non-recy"])
    name: String @fake(type: productName)
    extraInfo: TrashInfo
    about: HTMLType
    }
  `

  let directives = ['examples', 'fake']

  console.log(removeDirectives(toConvertStr, directives))
}

/**
 *
 * @param {string} pathname
 */
function fakeToNormal(pathname) {
  let normalFilePath = `${path.basename(pathname, '.fake.graphql')}.graphql`
  normalFilePath = path.resolve(path.dirname(pathname), normalFilePath)

  const directives = ['examples', 'fake']

  let gqlContent = fs.readFileSync(pathname, { encoding: 'utf-8' })
  gqlContent = removeDirectives(gqlContent, directives)

  console.log(`converted ${path.basename(normalFilePath)}`)
  // write to files
  fs.writeFileSync(normalFilePath, gqlContent, { encoding: 'utf-8' })
}

/**
 *
 * @param {string} dirname - path to iter
 * @param {(string) => boolean} predict - return true if iter
 * @param {(string) => void} action - do action to iter it
 */
function iterDir(dirname, predict, action) {
  fs.readdir(dirname, (err, files) => {
    if (err) {
      console.error(`Cound not find the dir ${err}`)
      process.exit(1)
    }
    files.forEach(file => {
      let filePath = path.join(dirname, file)
      let fileStat = fs.statSync(filePath)
      // if file, then do action, ignore dir
      if (fileStat.isFile()) {
        if (predict(filePath)) {
          // do action on filePath
          action(filePath)
        }
      }
    })
  })
}

function run() {
  if (process.argv.length < 3) {
    throw 'Please specify the dirname'
  }

  let dirPath = process.argv[2]
  iterDir(
    dirPath,
    file => {
      let lastSuffix = path
        .basename(file)
        .split('.')
        .slice(-2)
        .join('.')

      return lastSuffix === 'fake.graphql'
    },
    file => {
      fakeToNormal(file)
    }
  )
}

run()
