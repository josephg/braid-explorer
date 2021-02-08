
export interface Link {
  label: string,
  // type ??
  url: string,
}

export interface ListContents {
  type: 'List',
  items: Link[],
}
export interface JSONContents {
  type: 'JSON',
  content: any
}

export type PaneContents = ListContents | JSONContents