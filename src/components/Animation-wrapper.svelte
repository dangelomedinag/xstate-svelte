<script>
	//? imports system
	import { quintInOut } from "svelte/easing";
	import { fly } from "svelte/transition";

	//? imports components, store and function

	//? props
	export let delay = 600;
	export let duration = 600;
	export let x = 0;
	export let y = 200;
	export let opacity = 0;
	export let out_delay = 0;
	export let out_duration = 600;
	export let out_x = 0;
	export let out_y = 200;
	export let out_opacity = 0;
	export let intro = {
		delay,
		duration,
		x,
		y,
		easing: quintInOut,
		opacity,
	};
	export let outro = {
		delay: out_delay,
		duration: out_duration,
		x: out_x,
		y: out_y,
		easing: quintInOut,
		opacity: out_opacity,
	};

	//? variables

	//? Logic
	function stateAnimations(e) {
		// console.log(e);
	}
</script>

<div
	in:fly={intro}
	out:fly={outro}
	on:introstart={stateAnimations}
	on:outrostart={stateAnimations}
	on:introend={stateAnimations}
	on:outroend={stateAnimations}>
	<slot />
</div>
