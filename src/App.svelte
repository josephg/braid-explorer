<script lang='typescript'>
import Pane from './Pane.svelte'

let stack: string[] = ['/']

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
	{#each stack as url, i}
		<Pane url={url} select={(next) => {
			stack = [...stack.slice(0, i+1), next]
		}} selectedUrl={stack[i+1]} />
	{/each}
</div>
