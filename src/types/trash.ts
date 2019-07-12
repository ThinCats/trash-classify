/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: trash
// ====================================================

export interface trash_randomTrash_type {
  __typename: "TrashType";
  name: string | null;
}

export interface trash_randomTrash_extraInfo_degration {
  __typename: "DegrateInfo";
  /**
   * time is second
   */
  degrateTime: number | null;
}

export interface trash_randomTrash_extraInfo {
  __typename: "TrashExtraInfo";
  degration: trash_randomTrash_extraInfo_degration | null;
}

export interface trash_randomTrash {
  __typename: "Trash";
  name: string | null;
  type: trash_randomTrash_type | null;
  extraInfo: trash_randomTrash_extraInfo | null;
}

export interface trash {
  randomTrash: trash_randomTrash | null;
}
