export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, error) => {
    let fileReader = new FileReader()
    //@ts-ignore
    fileReader.onload = _ => {
      if (!fileReader.result) {
        error(fileReader.result)
      }
      // delete base64 type, like "data:image/jpeg;base64,<data>" to "<data>"
      let rawBase64 = (fileReader.result as string).replace(/.*;base64,/, '')
      resolve(rawBase64)
    }
    fileReader.readAsDataURL(blob)
  })
}

export async function base64ToBlob(base64Obj: string): Promise<Blob> {
  return fetch(base64Obj).then(res => res.blob())
}

export async function urlToBlob(url: string): Promise<Blob> {
  let response = await fetch(url, { mode: 'no-cors' })
  return response.blob()
}

export interface ImageSize {
  width: number
  height: number
}

async function getImageSizeByURL(imgURL: string): Promise<ImageSize> {
  return new Promise((resolve, error) => {
    let image = new Image()
    image.src = imgURL

    if (image.width === 0) {
      error('Invalid image with 0 width')
    } else {
      resolve({
        width: image.width,
        height: image.height
      })
    }
  })
}

export interface PositionType {
  width: number
  height: number
  top: number
  left: number
}

export interface ScaleType {
  width: number
  height: number
}

function getScaledPositionByScale(
  position: PositionType,
  scale: ScaleType
): PositionType {
  return {
    width: position.width * scale.width,
    height: position.height * scale.height,
    top: position.top * scale.height,
    left: position.left * scale.width
  }
}

async function getScaledPositionByURL(
  curImageSize: ImageSize,
  curPosition: PositionType,
  oriImgURL: string
): Promise<PositionType> {
  let orignalImgSize = await getImageSizeByURL(oriImgURL)
  return getScaledPosition(curImageSize, curPosition, orignalImgSize)
}

export function getScaledPosition(
  curImageSize: ImageSize,
  curPosition: PositionType,
  oriImageSize: ImageSize
) {
  console.log(curImageSize)
  let scale: ScaleType = {
    width: curImageSize.width / oriImageSize.width,
    height: curImageSize.height / oriImageSize.height
  }

  return getScaledPositionByScale(curPosition, scale)
}

/**
 *
 * @param arr - array contains object
 * @param key - key to identify each object(object[key])
 */
export function uniqueObjArray<T>(arr: T[], key: string): T[] {
  let objMap = new Map()
  arr.forEach(val => {
    //@ts-ignore
    objMap.set(val[key], val)
  })

  return Array.from(objMap.values())
}

export function hex2rgba(hex: string, alpha = 1) {
  //@ts-ignore
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

// convert rgb(1,1,1) or rgba(1,1,1,1) to rgba(1,1,1,alpha)
export function rgb2rgba(rgb: string, alpha = 1) {
  //@ts-ignore
  const [r, g, b] = rgb.match(/\d+/g).map(x => parseInt(x, 10))
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function color2rgba(color: string, alpha = 1) {
  if (color.startsWith('rgb')) {
    return rgb2rgba(color, alpha)
  } else if (color.startsWith('#')) {
    return hex2rgba(color, alpha)
  } else {
    throw `Color type error ${color}`
  }
}
