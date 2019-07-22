/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Trash
// ====================================================

export interface Trash_randomTrash_type {
  __typename: "TrashType";
  name: string | null;
}

export interface Trash_randomTrash_extraInfo_degration {
  __typename: "DegrateInfo";
  /**
   * time is second
   */
  degrateTime: number | null;
}

export interface Trash_randomTrash_extraInfo {
  __typename: "TrashExtraInfo";
  degration: Trash_randomTrash_extraInfo_degration | null;
}

export interface Trash_randomTrash {
  __typename: "Trash";
  name: string | null;
  type: Trash_randomTrash_type | null;
  extraInfo: Trash_randomTrash_extraInfo | null;
}

export interface Trash {
  randomTrash: Trash_randomTrash | null;
}
