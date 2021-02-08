import type { SvelteComponent, SvelteComponentTyped } from "svelte";
import type { Readable } from "svelte/store";

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

export type PaneContents = ListContents | JSONContents | {type: 'null'}

export type PaneStream = Readable<PaneContents>
// export type PaneStream = {
//   initialValue: PaneContents,
//   stream: AsyncGenerator<PaneContents>
// }