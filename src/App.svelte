<script lang="ts">
    import CodeSpellCanvas from "./CodeSpellCanvas.svelte";
    import { EmptyNode } from "./model/EmptyNode";
    import { FunctionDefineNode } from "./model/FunctionDefineNode";
    import type { Node } from "./model/Node";

	const rootNode: Node = new FunctionDefineNode(
		"fibonacci", 
		[
			"counter",
			"first",
			"second",
			"iteratable",
			"reversable",
			"list",
		],
		new EmptyNode(),
	); 
</script>

<main>
	<CodeSpellCanvas
		node={ rootNode }
	/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>