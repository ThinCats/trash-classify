
  import { ApolloError } from 'apollo-server-express'

  export const errorsList = [
  {
    "name": "ImageClassifyAPILimitedError",
    "message": "Maximium API usage is reached, please retry later",
    "extensions": {
      "code": "CLASSIFY_API_LIMITED"
    }
  },
  {
    "name": "ImageClassifyAPIError",
    "message": "Something wrong in API server, try to contact with us",
    "extensions": {
      "code": "CLASSIFY_API_ERROR"
    }
  },
  {
    "name": "UploadImageTypeError",
    "message": "Image type error(accept jpg/png), please choose another one",
    "extensions": {
      "code": "IMAGE_TYPE_INVALID"
    }
  },
  {
    "name": "UploadImageSizeError",
    "message": "Image is too big(more than 5mb), please choose another one",
    "extensions": {
      "code": "IMAGE_SIZE_LIMITED"
    }
  },
  {
    "name": "UploadImageURLError",
    "message": "Image url error, retry",
    "extensions": {
      "code": "IMAGE_URL_INVALID"
    }
  },
  {
    "name": "TrashNotFoundError",
    "message": "Sorry, no trash found",
    "extensions": {
      "code": "TRASH_NOT_FOUND"
    }
  }
];
  export const errorType = `
    type PropheticErrorExtensions {
      code: String?
    }
    
    type PropheticError {
      name: String
      message: String?
      extensions: PropheticErrorExtensions
    }
  `;
  
  class PropheticError extends ApolloError {
  constructor(name, message, code, properties) {
    super(message, code, properties);

    // Set the prototype explicitly.
    // https://stackoverflow.com/a/41102306
    Object.setPrototypeOf(this, SyntaxError.prototype);
    Object.defineProperty(this, 'name', { value: name });
  }
}
  
  export class ImageClassifyAPILimitedError extends PropheticError {
  constructor(properties) {
    super("ImageClassifyAPILimitedError", "Maximium API usage is reached, please retry later", "CLASSIFY_API_LIMITED", properties);
  }
}
export class ImageClassifyAPIError extends PropheticError {
  constructor(properties) {
    super("ImageClassifyAPIError", "Something wrong in API server, try to contact with us", "CLASSIFY_API_ERROR", properties);
  }
}
export class UploadImageTypeError extends PropheticError {
  constructor(properties) {
    super("UploadImageTypeError", "Image type error(accept jpg/png), please choose another one", "IMAGE_TYPE_INVALID", properties);
  }
}
export class UploadImageSizeError extends PropheticError {
  constructor(properties) {
    super("UploadImageSizeError", "Image is too big(more than 5mb), please choose another one", "IMAGE_SIZE_LIMITED", properties);
  }
}
export class UploadImageURLError extends PropheticError {
  constructor(properties) {
    super("UploadImageURLError", "Image url error, retry", "IMAGE_URL_INVALID", properties);
  }
}
export class TrashNotFoundError extends PropheticError {
  constructor(properties) {
    super("TrashNotFoundError", "Sorry, no trash found", "TRASH_NOT_FOUND", properties);
  }
}
  
