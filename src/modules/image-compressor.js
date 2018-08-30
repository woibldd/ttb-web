export function convert (file, options, callback) {
  // Load the image
  const reader = new FileReader()
  reader.onload = function (readerEvent) {
    const image = new Image()
    image.onload = function (imageEvent) {
      // Resize the image
      const canvas = document.createElement('canvas')
      const maxSize = options.maxSide || 1920
      let width = image.width
      let height = image.height
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height
          height = maxSize
        }
      }
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(image, 0, 0, width, height)
      var dataUrl = canvas.toDataURL('image/jpeg')
      var resizedImage = dataURLToBlob(dataUrl)
      callback(null, {
        blob: resizedImage,
        url: dataUrl
      })
    }
    image.src = readerEvent.target.result
  }
  reader.readAsDataURL(file)
}

function dataURLToBlob (dataURL) {
  const BASE64_MARKER = ';base64,'
  let parts
  let contentType
  let raw
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    parts = dataURL.split(',')
    contentType = parts[0].split(':')[1]
    raw = parts[1]
    return new Blob([raw], {type: contentType})
  }
  parts = dataURL.split(BASE64_MARKER)
  contentType = parts[0].split(':')[1]
  raw = window.atob(parts[1])

  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], {type: contentType})
}

export default {
  convert
}
