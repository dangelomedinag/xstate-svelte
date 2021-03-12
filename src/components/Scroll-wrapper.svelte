<script>
	import { afterUpdate } from "svelte";

	import { quintOut } from "svelte/easing";
	import { scale, slide } from "svelte/transition";
	import CardProductSkeleton from "./Card-product-skeleton.svelte";
	import CardProduct from "./Card-product.svelte";
	import SpinLoader from "./Spin-loader.svelte";

	export let products;

	// let productsWithFilter = products.filter(({ salient }) => salient);

	let scroll_container;
	let rotate = false;

	function scrolling(e) {
		let card = document.querySelector(".card").clientWidth;
		let spacer = document.querySelector(".salient__spacer").clientWidth;
		let next = card + spacer;

		if (scroll_container.scrollLeft + next > next) rotate = true;

		scroll_container.scroll({
			top: 0,
			left:
				scroll_container.scrollLeft > next
					? 0
					: scroll_container.scrollLeft + next,
			behavior: "smooth",
		});
		e.target.blur();
	}

	// afterUpdate(() => console.log("update scroll wrapper"));
</script>

<!-- {#key products} -->
<section class="salient" in:slide>
	<!-- <div class="salient__scrollable" bind:this={scroll_container}> -->
	{#each products.filter(({ salient }) => salient) as item, i (item.id)}
		<CardProduct grid inline product={item} on:clickCard />

		<!-- <div class="salient__spacer" /> -->
	{:else}
		<!-- <CardProductSkeleton /> -->
		<SpinLoader />
	{/each}
</section>

<!-- {/key} -->
<style>
	.salient {
		--bg-card: transparent;
		/* overflow: hidden; */
		width: 100%;
		/* height: 200px; */
		/* height: 300px; */
		margin-bottom: 1em;
		overflow-x: scroll;
		overflow-y: hidden;
		position: relative;
		/* height: 200px; */
		white-space: nowrap;
		min-width: 100%;
		padding-right: 4em;
		padding-top: 1em;
		padding-bottom: 1em;
		/* scroll-behavior: smooth; */
		scrollbar-color: var(--primary-opacity-1, #f36262) transparent !important;
		scrollbar-width: none;
	}
	.salient__scrollable {
		/* max-height: 250px; */
	}

	.salient::-webkit-scrollbar {
		height: 5px;
		border-radius: 10px;
	}
	.salient::-webkit-scrollbar-track {
		margin: 0 14px;
	}
	.salient::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: hsla(0, 86%, 67%, 0.015);
	}
	.salient::-webkit-scrollbar-thumb:hover {
		background: var(--primary-opacity-1, rgba(233, 134, 134, 0.1));
	}
	.salient__spacer {
		min-width: 15px;
		max-width: 15px;
		width: 15px;
		display: inline-block;
		max-height: 100%;
	}

	.salient__btn {
		opacity: 0;
		outline: none;
		position: absolute;
		z-index: 100;
		right: 0;
		top: 50%;
		width: 3em;
		height: 3em;
		background-color: white;
		color: #000;
		transform: translate(150%, -50%);
		margin: 0;
		margin-right: 1em;
		border-radius: 100px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0;
		transition: opacity 0.6s, transform 0.6s;
	}
	.salient__btn:hover,
	.salient__btn:focus {
		background-color: rgb(223, 223, 223);
		box-shadow: 0px 0px 0px 6px var(--primary-opacity-3);
	}

	.salient__scrollable:hover .salient__btn {
		transform: translate(0%, -50%);
		opacity: 1;
	}

	.salient__icon {
		fill: var(--primary, #f36262);
		width: 50%;
		height: auto;
		transform: rotate(0deg);
		pointer-events: none;
		transition-property: transform;
		transition-delay: 0.2s;
		transition-timing-function: ease-in-out;
		transition-duration: 0.6s;
	}

	.salient__icon--reverse {
		transform: rotate(180deg);
	}

	@media (min-width: 640px) {
	}

	@media (min-width: 768px) {
		.salient::after {
			opacity: 1;
		}
	}

	@media (min-width: 1024px) {
		.salient::after {
			width: 30%;
		}
	}

	@media (min-width: 1280px) {
	}
</style>
