<script>
	import { flip } from "svelte/animate";
	import { crossfade, scale } from "svelte/transition";
	import { quintInOut } from "svelte/easing";

	let change = true;
	let value = "mandalo";
	const [send, receive] = crossfade({
		duration: 500,
		fallback: scale,
		easing: quintInOut,
	});
</script>

<button on:click={() => (change = !change)}> change! </button>
<div class="wrap">
	{#if change}
		<input
			class="input"
			type="text"
			bind:value
			out:send={{ key: "a" }}
			in:receive={{ key: "a" }}
		/>
		<!-- <div id="box1" out:send={{ key: "b" }} in:receive={{ key: "b" }}>b</div> -->
	{/if}
</div>
<div class="wrap">
	{#if !change}
		<input
			class="input--receive"
			type="text"
			{value}
			out:send={{ key: "a" }}
			in:receive={{ key: "a" }}
			disabled
		/>
		<!-- <section id="box2" out:send={{ key: "b" }} in:receive={{ key: "b" }}>
			{value}
		</section> -->
		<!-- <section id="box2" out:send={{ key: "b" }} in:receive={{ key: "b" }}>
			a
		</section> -->
	{/if}
</div>

<div id="box1" />
<div id="box1" />

<div id="box2" />
<div id="box2" />

<style>
	#box1 {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
		background-color: blue;
		/* transition: all 0.3s; */
		border-radius: 0;
	}
	#box2 {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
		background-color: red;
		border-radius: 50vh;
		/* transition: all 0.3s; */
	}

	.wrap {
		min-height: 80px;
	}

	.input {
		background-color: white;
		color: black;
		border-radius: 0;
	}
	.input--receive {
		background-color: gray;
		border-radius: 10px;
		padding: 1em;
		min-width: 100%;
	}
</style>
