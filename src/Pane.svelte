<script lang="ts">
import type { PaneContents } from "./types";
import getContent from './store'

export let url: string
export let selectedUrl: string | null = null
export let select: (url: string) => void

let contents: PaneContents | null
$: contents = getContent(url)

const expand = (e: MouseEvent) => {
  const idx = parseInt((e.target! as HTMLElement).dataset.idx!)
  const selected = contents!.items[idx]
  select(selected.url)
}

console.log('url', url)

</script>

<style>

.container {
	border-right: 1px solid black;
	width: 200px;
  min-width: 100px;
  overflow-y: auto;
}

header {
  background-color: var(--muted-highlight);
  margin-bottom: 0.3em;
}

header > *:first-child {
  padding-left: 0.5em;
}
header > *:last-child {
  float: right;
  padding-right: 0.5em;
}

.container > div {
	padding: 0 1em;
  cursor: pointer;
}

.container > .selected {
  background-color: var(--highlight-blue);
}

.container.json {
  width: 400px;
}
.container.json > pre {
  padding-left: 1em;
  /* background-color: var(--muted-highlight); */
  color: var(--highlight-pink);
}

</style>

<!-- <div class="container {contents ? contents.type : ''}"> -->
<div
  class="container"
  class:json={contents && contents.type === 'JSON'}
  class:list={contents && contents.type === 'List'}
>
  {#if contents == null}
    <h2>404 Not found</h2>
  {:else}
    <header>
      <span>{url}</span>
      <span>{contents.type}</span>
    </header>

    {#if contents.type === 'List'}
      {#each contents.items as item, i}
        <div
          class:selected="{item.url === selectedUrl}"
          on:click={expand}
          data-idx={i}
        >{item.label}</div>
      {/each}
    {:else if contents.type === 'JSON'}
      <pre>
        {JSON.stringify(contents.content, null, 2)}
      </pre>
    {/if}
  {/if}
</div>

