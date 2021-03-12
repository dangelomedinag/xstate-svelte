<script>
	//? imports system
	import { scale, slide } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import SpinLoader from "./Spin-loader.svelte";

	//? imports components, store and function

	//? props

	export let href = false,
		loading = false,
		outline = false,
		disabled = false,
		type = "button",
		main = false,
		block = false,
		bouncy = false,
		path = `M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
									l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
									c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
									c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
									S1.293,9.212,1.729,9.212z`;

	//? variables

	const scaleTransition = {
		delay: 200,
		duration: 800,
		easing: quintOut,
		opacity: 0,
		start: 0.8,
	};
	let transition = main ? slide : scale;
</script>

{#if !href}
	<button
		{type}
		in:transition|local={scaleTransition}
		on:click
		class={`link-item ${main ? "main" : "badge"}`}
		class:outline
		class:block
		class:bouncy
		{disabled}
	>
		{#if loading}
			<SpinLoader color="var(--btn-color-disabled)" />
		{:else}
			<slot />
		{/if}

		{#if !main}
			<svg class="svg-reset icon-animated" viewBox="0 0 20 20">
				<path d={path} />
			</svg>
		{/if}
	</button>
{:else}
	<a
		in:transition|local={scaleTransition}
		on:click
		role="button"
		{href}
		class={`link-item ${main ? "main" : "badge"}`}
		class:outline
		class:block
		class:bouncy
	>
		<slot />
		{#if !main}
			<svg class="svg-reset icon-animated" viewBox="0 0 20 20">
				<path fill="current" d={path} />
			</svg>
		{/if}
	</a>
{/if}

<style lang="scss">
	@keyframes bouncy {
		0% {
			top: 0em;
		}
		40% {
			top: 0em;
		}
		43% {
			top: -0.9em;
		}
		46% {
			top: 0em;
		}
		48% {
			top: -0.4em;
		}
		50% {
			top: 0em;
		}
		100% {
			top: 0em;
		}
	}

	.bouncy {
		animation: bouncy 5s infinite linear;
		position: relative;

		&:disabled {
			animation: none;
		}
	}

	.link-item {
		/* reset */
		display: inline-block;
		position: relative;
		text-decoration: none;
		text-align: center;
		cursor: pointer;
		outline: 0;
		border-width: 1px;
		border-style: solid;
		border-color: var(--btn-border);
		transform: translateY(0);
		border-radius: 50vh;
		/* margin: 0 auto; */

		&:focus {
			transform: translateY(-5%);
			box-shadow: 0 1px 1px var(--btn-border-focus),
				0 2px 2px var(--btn-border-focus), 0 4px 4px var(--btn-border-focus),
				0 6px 8px var(--btn-border-focus), 0 8px 16px var(--btn-border-focus);
		}

		&:disabled {
			cursor: not-allowed;
			border-color: var(--btn-border-disabled);
			color: var(--btn-color-disabled);
			background-color: var(--btn-bg-disabled);
			// border: none;
		}
	}

	.main {
		padding: 0 0.5em;
		color: var(--btn-color);
		background-color: var(--btn-bg);
		border-color: var(--btn-border);
		// transition: background 0.3s, color 0.3s;
		line-height: 3.25;
		user-select: none;
		font-weight: 700;
		width: 100%;
		margin: 0.5em 0.1em;
	}

	.main:not(:disabled):hover {
		background-color: var(--btn-bg-hover);
		color: var(--btn-color-hover);
		border-color: var(--btn-border-hover);
	}

	.badge {
		color: var(--btn-color);
		background-color: var(--btn-bg);
		border-radius: 2em !important;
		font-size: 0.8rem;
		padding: 0.5em 0 0.5em 1.2em;
		font-weight: 300;
		// background-color: transparent;
		// color: white;
		transition: padding 0.2s ease-out;
		margin: 0.5em 0.5em 0.5em 0em;
	}

	.badge:not(:disabled):hover {
		background-color: var(--btn-bg-hover);
		color: var(--btn-color-hover);
		padding-right: 1.3em;
		border-color: transparent;
	}

	.icon-animated {
		/* display: none; */

		opacity: 0;
		transform: translateX(-100%);
		/* transition: transform 0.4s, opacity 0.4s ease-in; */
		transition: all 0.2s ease-out;
	}
	.badge:hover .icon-animated {
		/* display: inline-block; */
		width: auto;
		opacity: 1;
		transform: translateX(0%);
	}

	.block {
		display: block;
		width: 100%;
	}

	.outline {
		border-color: transparent;
		color: var(--btn-color-hover);
		background-color: transparent;
	}
	.outline:not(:disabled):hover {
		// border-color: var(--btn-border-hover);
		color: var(--btn-color);
		background-color: transparent;
		// border: 1px solid var(--primary);
		// background-color: var(--btn-bg);
	}

	@media (min-width: 640px) {
		.badge {
			width: auto;
			/* padding: 0.5em 0.6em 0.5em 1.8em; */
		}
	}

	@media (min-width: 768px) {
		.main {
			max-width: 300px;
			// width: auto;
			// margin-right: 0.5em;
		}
	}

	@media (min-width: 1024px) {
	}

	@media (min-width: 1280px) {
	}
</style>
