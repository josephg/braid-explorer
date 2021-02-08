import type { SvelteComponent, SvelteComponentTyped } from "svelte";

export interface Link {
  label: string,
  // type ??
  url: string,
}

export interface ListContents {
  type: 'List',
  content: Link[],
}

export type PaneProps = {content: any}
export interface JSONContents<T extends SvelteComponentTyped<PaneProps> = any> {
  type: 'JSON',
  content: any,
  view?: T,
}

export type PaneContents = ListContents | JSONContents