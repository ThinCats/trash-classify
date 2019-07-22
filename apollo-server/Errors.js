'use strict'
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function(d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
exports.__esModule = true
var apollo_server_express_1 = require('apollo-server-express')
exports.errorsList = [
  {
    name: 'ImageClassifyAPILimitedError',
    message: 'Maximium API usage is reached, please retry later',
    extensions: {
      code: 'CLASSIFY_API_LIMITED'
    }
  },
  {
    name: 'ImageClassifyAPIError',
    message: 'Something wrong in API server, try to contact with us',
    extensions: {
      code: 'CLASSIFY_API_ERROR'
    }
  },
  {
    name: 'UploadImageTypeError',
    message: 'Image type error(accept jpg/png), please choose another one',
    extensions: {
      code: 'IMAGE_TYPE_INVALID'
    }
  },
  {
    name: 'UploadImageSizeError',
    message: 'Image is too big(more than 5mb), please choose another one',
    extensions: {
      code: 'IMAGE_SIZE_LIMITED'
    }
  },
  {
    name: 'UploadImageURLError',
    message: 'Image url error, retry',
    extensions: {
      code: 'IMAGE_URL_INVALID'
    }
  },
  {
    name: 'TrashNotFoundError',
    message: 'Sorry, no trash found',
    extensions: {
      code: 'TRASH_NOT_FOUND'
    }
  }
]
exports.errorType =
  '\n    type PropheticErrorExtensions {\n      code: String?\n    }\n    \n    type PropheticError {\n      name: String\n      message: String?\n      extensions: PropheticErrorExtensions\n    }\n  '
var PropheticError = /** @class */ (function(_super) {
  __extends(PropheticError, _super)
  function PropheticError(name, message, code, properties) {
    var _this = _super.call(this, message, code, properties) || this
    // Set the prototype explicitly.
    // https://stackoverflow.com/a/41102306
    Object.setPrototypeOf(_this, SyntaxError.prototype)
    Object.defineProperty(_this, 'name', { value: name })
    return _this
  }
  return PropheticError
})(apollo_server_express_1.ApolloError)
var ImageClassifyAPILimitedError = /** @class */ (function(_super) {
  __extends(ImageClassifyAPILimitedError, _super)
  function ImageClassifyAPILimitedError(properties) {
    return (
      _super.call(
        this,
        'ImageClassifyAPILimitedError',
        'Maximium API usage is reached, please retry later',
        'CLASSIFY_API_LIMITED',
        properties
      ) || this
    )
  }
  return ImageClassifyAPILimitedError
})(PropheticError)
exports.ImageClassifyAPILimitedError = ImageClassifyAPILimitedError
var ImageClassifyAPIError = /** @class */ (function(_super) {
  __extends(ImageClassifyAPIError, _super)
  function ImageClassifyAPIError(properties) {
    return (
      _super.call(
        this,
        'ImageClassifyAPIError',
        'Something wrong in API server, try to contact with us',
        'CLASSIFY_API_ERROR',
        properties
      ) || this
    )
  }
  return ImageClassifyAPIError
})(PropheticError)
exports.ImageClassifyAPIError = ImageClassifyAPIError
var UploadImageTypeError = /** @class */ (function(_super) {
  __extends(UploadImageTypeError, _super)
  function UploadImageTypeError(properties) {
    return (
      _super.call(
        this,
        'UploadImageTypeError',
        'Image type error(accept jpg/png), please choose another one',
        'IMAGE_TYPE_INVALID',
        properties
      ) || this
    )
  }
  return UploadImageTypeError
})(PropheticError)
exports.UploadImageTypeError = UploadImageTypeError
var UploadImageSizeError = /** @class */ (function(_super) {
  __extends(UploadImageSizeError, _super)
  function UploadImageSizeError(properties) {
    return (
      _super.call(
        this,
        'UploadImageSizeError',
        'Image is too big(more than 5mb), please choose another one',
        'IMAGE_SIZE_LIMITED',
        properties
      ) || this
    )
  }
  return UploadImageSizeError
})(PropheticError)
exports.UploadImageSizeError = UploadImageSizeError
var UploadImageURLError = /** @class */ (function(_super) {
  __extends(UploadImageURLError, _super)
  function UploadImageURLError(properties) {
    return (
      _super.call(
        this,
        'UploadImageURLError',
        'Image url error, retry',
        'IMAGE_URL_INVALID',
        properties
      ) || this
    )
  }
  return UploadImageURLError
})(PropheticError)
exports.UploadImageURLError = UploadImageURLError
var TrashNotFoundError = /** @class */ (function(_super) {
  __extends(TrashNotFoundError, _super)
  function TrashNotFoundError(properties) {
    return (
      _super.call(
        this,
        'TrashNotFoundError',
        'Sorry, no trash found',
        'TRASH_NOT_FOUND',
        properties
      ) || this
    )
  }
  return TrashNotFoundError
})(PropheticError)
exports.TrashNotFoundError = TrashNotFoundError
