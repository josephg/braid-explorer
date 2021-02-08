<script lang='typescript'>
import Pane from './Pane.svelte'
import getContent from './store';
import type { PaneStream } from './types';

// This is pretty gross.
let urls: string[] = ['/']
let stack: Promise<PaneStream>[] = [getContent('/')]

$: console.log('stack', stack)

</script>

<style>

#panecontainer {
	overflow: auto;
	display: flex;
	height: 100%;
}

</style>

<div id='panecontainer'>
	{#each stack as cPromise, i}
		{#await cPromise}
			Loading...
		{:then stream}
			<Pane stream={stream} select={(next) => {
				urls = [...urls.slice(0, i+1), next]
				stack = [...stack.slice(0, i+1), getContent(next)]
			}} url={urls[i]} selectedUrl={urls[i+1]} />
		{/await}
	{/each}
</div>
