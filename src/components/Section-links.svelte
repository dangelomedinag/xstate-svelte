<script>
	//? imports system
	import { createEventDispatcher } from "svelte";
	import { quintInOut } from "svelte/easing";
	import { scale, slide } from "svelte/transition";
	//? imports components, store and function

	//? props
	export let main = false,
		block = false,
		outline = true,
		href = null;

	//? variables

	const dispatch = createEventDispatcher();
	const scaleTransition = {
		delay: 400,
		duration: 1000,
		easing: quintInOut,
		opacity: 0,
	};

	//? Logic

	function clickEvent() {
		dispatch("click");
		console.log("click link-item event");
	}
</script>

<style>
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
	}

	.link-item {
		/* reset */
		display: inline-block;
		position: relative;
		text-decoration: none;
		text-align: center;
		cursor: pointer;
		/* margin: 0 auto; */
	}

	.badge {
		border-radius: 2em !important;
		font-size: 0.9em;
		/* padding: 0; */
		padding: 0.5em 0.6em;
		font-weight: 700;
		/* padding: 0.8em; */
		background-color: transparent;
		color: white;
		margin: 0 0.3em 0.8em 0;
		/* width: auto; */
		/* margin-bottom: 0.8em; */
	}

	.badge:hover {
		color: white;
		border-color: var(--primary);
		background-color: rgba(243, 101, 102, 0.2);
	}
	.icon-animated {
		display: none;
		opacity: 0;
		transform: translateX(-100%);
		transition: transform 0.6s, opacity 0.6 ease-in;
	}
	.badge:hover .icon-animated {
		display: inline-block;
		opacity: 1;
		transform: translateX(0%);
	}

	.main {
		color: var(--primary);
		padding: 1em 3em;
		background-color: rgba(243, 101, 102, 0.05);
		border: none;
		transition: background 0.3s, color 0.3s;
		border-radius: 10px;
		font-weight: 700;
		width: 100%;
		margin-bottom: 0.8em;
	}

	.main:hover {
		background-color: var(--primary);
		color: white;
	}

	.block {
		display: block;
		width: 100%;
	}

	.outline {
		border: 1px solid rgba(255, 255, 255, 0.4);
		background-color: transparent;
	}
	.outline:hover {
		border: 1px solid var(--primary);
		background-color: transparent;
	}
	.outline:hover path {
		/* fill: var(--primary); */
	}

	.badge:nth-child(1) {
		animation-delay: 0.07s;
	}
	.badge:nth-child(2) {
		animation-delay: 0.14s;
	}
	.badge:nth-child(3) {
		animation-delay: 0.21s;
	}
	.badge:nth-child(4) {
		animation-delay: 0.28s;
	}

	@media (min-width: 640px) {
		.badge {
			width: auto;
			padding: 0.5em 1.5em;
		}
	}

	@media (min-width: 768px) {
		.main {
			width: auto;
		}
	}

	@media (min-width: 1024px) {
	}

	@media (min-width: 1280px) {
	}
</style>

{#if href}
	{#if !main}
		<a
			class="link-item badge bouncy"
			class:outline
			{href}
			in:scale={scaleTransition}>
			<span>
				<slot />
			</span>
			<svg class="svg-reset icon-animated" viewBox="0 0 20 20">
				<path
					fill="current"
					d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
            l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
            c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
            c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
            S1.293,9.212,1.729,9.212z" />
			</svg>
		</a>
	{:else}
		<a class="link-item main" class:block {href} in:scale={scaleTransition}>
			<span>
				<slot />
			</span>
		</a>
	{/if}
{:else}
	{#if !main}
		<button
			class="link-item badge bouncy"
			class:outline
			on:click
			in:scale={scaleTransition}>
			<span>
				<slot />
			</span>
			<svg class="svg-reset icon-animated" viewBox="0 0 20 20">
				<path
					fill="current"
					d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
            l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
            c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
            c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
            S1.293,9.212,1.729,9.212z" />
			</svg>
		</button>
	{:else}
		<button
			class="link-item main"
			class:block
			on:click
			in:slide={scaleTransition}>
			<span>
				<slot />
			</span>
		</button>
	{/if}
{/if}
