<script>
	import { scale } from "svelte/transition";
	import { quintInOut } from "svelte/easing";
	let y;
</script>

<svelte:window bind:scrollY={y} />
{#if y > 250}
	<div
		on:click={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
		transition:scale={{
			easing: quintInOut,
			duration: 300,
			scale: 0,
			start: 0.85,
		}}
	>
		<svg
			viewBox="0 0 20 20"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
		>
			<g stroke="none" stroke-width="1">
				<g id="icon-shape">
					<polygon
						points="9 3.82842712 2.92893219 9.89949494 1.51471863 8.48528137 10 0 10.7071068 0.707106781 18.4852814 8.48528137 17.0710678 9.89949494 11 3.82842712 11 20 9 20 9 3.82842712"
					/>
				</g>
			</g>
		</svg>
	</div>
{/if}

<style lang="scss">
	div {
		height: 45px;
		width: 45px;
		overflow: hidden;
		position: fixed;
		background-color: rgba(255, 255, 255, 0.1);
		bottom: 30px;
		right: 30px;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		/* color: red; */
		/* padding: 1em 1.3em; */
		border-radius: 50vh;

		&:hover {
			color: #f36566;
			background-color: white;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
				0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
				0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
		}
	}
</style>
