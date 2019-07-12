/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: list
// ====================================================

export interface list_trashList_type {
  __typename: "TrashType";
  name: string | null;
}

export interface list_trashList_extraInfo_degration {
  __typename: "DegrateInfo";
  /**
   * time is second
   */
  degrateTime: number | null;
}

export interface list_trashList_extraInfo {
  __typename: "TrashExtraInfo";
  degration: list_trashList_extraInfo_degration | null;
}

export interface list_trashList {
  __typename: "Trash";
  name: string | null;
  type: list_trashList_type | null;
  extraInfo: list_trashList_extraInfo | null;
}

export interface list {
  trashList: list_trashList[];
}
