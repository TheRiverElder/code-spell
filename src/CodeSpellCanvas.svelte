<script lang="ts">
    import { onMount } from "svelte";
    import type { Node } from "./model/Node";

    export let node: Node;
    
    let canvas: HTMLCanvasElement;

    onMount(() => redraw(node));

    function redraw(root: Node) {
        if (canvas == null) return;
        const box = canvas.getBoundingClientRect();
        canvas.width = box.width;
        canvas.height = box.height;

        const scale = 5;
        
        const g: CanvasRenderingContext2D = canvas.getContext('2d');

        g.fillStyle = "#223344";
        g.fillRect(0, 0, canvas.width, canvas.height);

        g.fillStyle = "#ffffff";
        g.strokeStyle = "#ffffff";
        g.save();
        g.translate(canvas.width / 2, canvas.height / 2);
        g.scale(scale, scale);
        root.draw(g)
        g.restore();
    }

    $: {
        redraw(node);
    }
</script>

<canvas class="fill" bind:this={canvas}></canvas>

<style>
    .fill {
        width: 100%;
        height: 100%;
    }
</style>