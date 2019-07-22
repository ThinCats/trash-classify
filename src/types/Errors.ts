/* eslint:disable */ 
import { ApolloError } from "apollo-client";
import { GraphQLError } from "graphql";
  
export enum PropheticErrorCode {
  CodeLessError = 'NONE',
  ImageClassifyAPILimitedError = "CLASSIFY_API_LIMITED",
  ImageClassifyAPIError = "CLASSIFY_API_ERROR",
  UploadImageTypeError = "IMAGE_TYPE_INVALID",
  UploadImageSizeError = "IMAGE_SIZE_LIMITED",
  UploadImageURLError = "IMAGE_URL_INVALID",
  TrashNotFoundError = "TRASH_NOT_FOUND"
}
  
export class PropheticError {
  constructor(public codes: string[]){}

  private inCodes(code: PropheticErrorCode){ return this.codes.indexOf(code) > -1; }

  get isCodeLessError() { return this.inCodes(PropheticErrorCode.CodeLessError); }
  get isImageClassifyAPILimitedError() { return this.inCodes(PropheticErrorCode.ImageClassifyAPILimitedError); }
  get isImageClassifyAPIError() { return this.inCodes(PropheticErrorCode.ImageClassifyAPIError); }
  get isUploadImageTypeError() { return this.inCodes(PropheticErrorCode.UploadImageTypeError); }
  get isUploadImageSizeError() { return this.inCodes(PropheticErrorCode.UploadImageSizeError); }
  get isUploadImageURLError() { return this.inCodes(PropheticErrorCode.UploadImageURLError); }
  get isTrashNotFoundError() { return this.inCodes(PropheticErrorCode.TrashNotFoundError); }
}
  
export interface Handler {
  (): any
}

export class PropheticErrorHandled {
  private handler: Handler = () => {}

  constructor(public codes: string[]){}

  private inCodes(code: PropheticErrorCode, handler: Handler){
    if(this.codes.indexOf(code) > -1){
      this.handler = handler
    }

    return this;
  }

  CodeLessError(handler: Handler) { return this.inCodes(PropheticErrorCode.CodeLessError, handler); }
  ImageClassifyAPILimitedError(handler: Handler) { return this.inCodes(PropheticErrorCode.ImageClassifyAPILimitedError, handler); }
  ImageClassifyAPIError(handler: Handler) { return this.inCodes(PropheticErrorCode.ImageClassifyAPIError, handler); }
  UploadImageTypeError(handler: Handler) { return this.inCodes(PropheticErrorCode.UploadImageTypeError, handler); }
  UploadImageSizeError(handler: Handler) { return this.inCodes(PropheticErrorCode.UploadImageSizeError, handler); }
  UploadImageURLError(handler: Handler) { return this.inCodes(PropheticErrorCode.UploadImageURLError, handler); }
  TrashNotFoundError(handler: Handler) { return this.inCodes(PropheticErrorCode.TrashNotFoundError, handler); }
  handle() { return this.handler(); }
}
  
const CODE_LESS_EXTENSION = { code: 'NONE'};
const findCodes = (error: ApolloError | GraphQLError): PropheticErrorCode[] => {
  if(error instanceof ApolloError) {
    return error.graphQLErrors.map((gError) => findCodes(gError)[0]);
  } else if(error.extensions) {
    const { extensions: { code } = CODE_LESS_EXTENSION } = error;
    return [code];
  }

  return [PropheticErrorCode.CodeLessError];
}

export const errorHere = (error: ApolloError | GraphQLError | undefined ) => {
  if(!error) {
    return new PropheticError([]);
  }
  const codes = findCodes(error);
  return new PropheticError(codes);
}

export const isThis = (error: ApolloError | GraphQLError | undefined) => {
  if(!error) {
    return new PropheticErrorHandled([]);
  }
  const codes = findCodes(error);
  return new PropheticErrorHandled(codes);
}