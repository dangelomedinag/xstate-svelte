<script>
	//? imports system

	import { createEventDispatcher } from "svelte";
	import { quintInOut } from "svelte/easing";
	import { fly } from "svelte/transition";

	//? imports components, store and function

	//? props

	export let levels = [];

	//? variables

	const dispatch = createEventDispatcher();

	//? Logic
	function handleKeydownHome(e) {
		// console.log(rest);
		if (e.key === "Enter") {
			dispatch("level1");
		}
	}
	function handleKeydown2(e) {
		// console.log(rest);
		if (e.key === "Enter") {
			dispatch("level2");
		}
	}
</script>

<style>
	.icon {
		/* max-width: 100%; */
		min-width: 25px;
		height: auto;
		display: inline-block;
	}
	path {
		fill: var(--primary);
	}
	.separator {
		min-width: 15px;
		height: auto;
	}
	.separator path {
		fill: var(--neutral-3);
	}
	.wrapper-breadcrumb {
		padding: 0 0.5em;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-weight: 300;
		height: 50px;
	}
	.breadcrumb {
		cursor: pointer;
		/* width: 120px; */
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0.25em 0.25em;
		border-radius: 5px;
	}
	.breadcrumb:hover,
	.breadcrumb.active {
		/* background-color: var(--primary-opacity-1); */
		color: var(--primary);
		/* font-weight: 700; */
	}

	/* .breadcrumb:focus {
		outline: 2px solid red;
	} */

	.home,
	.products {
		cursor: pointer;
	}

	.hide {
		display: none;
	}

	.show {
		display: inline-block;
	}

	@media (min-width: 640px) {
		.wrapper-breadcrumb {
			padding: 0;
		}

		.breadcrumb {
			width: auto;
		}

		/* .show {
			display: none;
		} */

		/* .hide {
			display: inline-block;
		} */

		.hide-icon {
			display: none;
		}
		.show-text {
			display: inline-block;
		}
	}

	@media (min-width: 768px) {
	}

	@media (min-width: 1024px) {
	}

	@media (min-width: 1280px) {
	}
</style>

<div class="wrapper-breadcrumb">
	{#each levels as item, index}
		{#if index <= 0}
			<svg
				in:fly={{ delay: 25, duration: 1000, easing: quintInOut, y: -200 }}
				out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
				class="home icon"
				on:click={() => dispatch('level1')}
				on:keydown={handleKeydownHome}
				tabindex="0"
				viewBox="0 0 20 20">
				<path
					fill="current"
					d="M15.971,7.708l-4.763-4.712c-0.644-0.644-1.769-0.642-2.41-0.002L3.99,7.755C3.98,7.764,3.972,7.773,3.962,7.783C3.511,8.179,3.253,8.74,3.253,9.338v6.07c0,1.146,0.932,2.078,2.078,2.078h9.338c1.146,0,2.078-0.932,2.078-2.078v-6.07c0-0.529-0.205-1.037-0.57-1.421C16.129,7.83,16.058,7.758,15.971,7.708z M15.68,15.408c0,0.559-0.453,1.012-1.011,1.012h-4.318c0.04-0.076,0.096-0.143,0.096-0.232v-3.311c0-0.295-0.239-0.533-0.533-0.533c-0.295,0-0.534,0.238-0.534,0.533v3.311c0,0.09,0.057,0.156,0.096,0.232H5.331c-0.557,0-1.01-0.453-1.01-1.012v-6.07c0-0.305,0.141-0.591,0.386-0.787c0.039-0.03,0.073-0.066,0.1-0.104L9.55,3.75c0.242-0.239,0.665-0.24,0.906,0.002l4.786,4.735c0.024,0.033,0.053,0.063,0.084,0.09c0.228,0.196,0.354,0.466,0.354,0.76V15.408z" />
			</svg>
		{/if}

		{#if index == 1}
			<svg
				in:fly={{ delay: 50, duration: 1000, easing: quintInOut, y: -200 }}
				out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
				class="separator"
				viewBox="0 0 20 20">
				<path
					fill="current"
					d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z" />
			</svg>
			<span
				in:fly={{ delay: 75, duration: 1000, easing: quintInOut, y: -200 }}
				out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
				class="breadcrumb hide show-text"
				class:show={levels.length <= 2}
				class:active={levels.length == 2}
				tabindex="0"
				on:click={() => dispatch('level2')}
				on:keydown={handleKeydown2}>{levels[index]}</span>
			<svg
				in:fly={{ delay: 75, duration: 1000, easing: quintInOut, y: -200 }}
				out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
				class="icon products hide hide-icon"
				class:show={levels.length > 2}
				viewBox="0 0 20 20"
				tabindex="0"
				on:click={() => dispatch('level2')}
				on:keydown={handleKeydown2}>
				<path
					fill="current"
					d="M16.803,18.615h-4.535c-1,0-1.814-0.812-1.814-1.812v-4.535c0-1.002,0.814-1.814,1.814-1.814h4.535c1.001,0,1.813,0.812,1.813,1.814v4.535C18.616,17.803,17.804,18.615,16.803,18.615zM17.71,12.268c0-0.502-0.405-0.906-0.907-0.906h-4.535c-0.501,0-0.906,0.404-0.906,0.906v4.535c0,0.502,0.405,0.906,0.906,0.906h4.535c0.502,0,0.907-0.404,0.907-0.906V12.268z M16.803,9.546h-4.535c-1,0-1.814-0.812-1.814-1.814V3.198c0-1.002,0.814-1.814,1.814-1.814h4.535c1.001,0,1.813,0.812,1.813,1.814v4.534C18.616,8.734,17.804,9.546,16.803,9.546zM17.71,3.198c0-0.501-0.405-0.907-0.907-0.907h-4.535c-0.501,0-0.906,0.406-0.906,0.907v4.534c0,0.501,0.405,0.908,0.906,0.908h4.535c0.502,0,0.907-0.406,0.907-0.908V3.198z M7.733,18.615H3.198c-1.002,0-1.814-0.812-1.814-1.812v-4.535c0-1.002,0.812-1.814,1.814-1.814h4.535c1.002,0,1.814,0.812,1.814,1.814v4.535C9.547,17.803,8.735,18.615,7.733,18.615zM8.64,12.268c0-0.502-0.406-0.906-0.907-0.906H3.198c-0.501,0-0.907,0.404-0.907,0.906v4.535c0,0.502,0.406,0.906,0.907,0.906h4.535c0.501,0,0.907-0.404,0.907-0.906V12.268z M7.733,9.546H3.198c-1.002,0-1.814-0.812-1.814-1.814V3.198c0-1.002,0.812-1.814,1.814-1.814h4.535c1.002,0,1.814,0.812,1.814,1.814v4.534C9.547,8.734,8.735,9.546,7.733,9.546z M8.64,3.198c0-0.501-0.406-0.907-0.907-0.907H3.198c-0.501,0-0.907,0.406-0.907,0.907v4.534c0,0.501,0.406,0.908,0.907,0.908h4.535c0.501,0,0.907-0.406,0.907-0.908V3.198z" />
			</svg>
		{/if}

		{#if index == 2}
			<svg
				in:fly={{ delay: 100, duration: 1000, easing: quintInOut, y: -200 }}
				out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
				class="separator"
				viewBox="0 0 20 20">
				<path
					fill="current"
					d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z" />
			</svg>
			{#key levels}
				<span
					in:fly={{ delay: 125, duration: 1000, easing: quintInOut, y: -200 }}
					out:fly={{ duration: 300, easing: quintInOut, y: -50 }}
					class="breadcrumb active">{levels[index]}</span>
			{/key}
		{/if}
	{/each}
</div>
