/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: List
// ====================================================

export interface List_trashList_type {
  __typename: "TrashType";
  name: string | null;
}

export interface List_trashList_extraInfo_degration {
  __typename: "DegrateInfo";
  /**
   * time is second
   */
  degrateTime: number | null;
}

export interface List_trashList_extraInfo {
  __typename: "TrashExtraInfo";
  degration: List_trashList_extraInfo_degration | null;
}

export interface List_trashList {
  __typename: "Trash";
  name: string | null;
  type: List_trashList_type | null;
  extraInfo: List_trashList_extraInfo | null;
}

export interface List {
  trashList: List_trashList[];
}
