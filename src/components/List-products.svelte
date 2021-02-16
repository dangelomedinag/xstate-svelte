<script>
	import { flip } from "svelte/animate";
	import { quintInOut } from "svelte/easing";
	import CardProduct from "./Card-product.svelte";
	export let sortCategoriesPrice, products;

	let flipAnimate = {
		delay: 0,
		duration: 600,
		easing: quintInOut,
		opacity: 0,
	};
</script>

<div class="wrapper__sorttool">
	<slot />
</div>
{#each sortCategoriesPrice as { id, nombre: name }, i (id)}
	<div class="grid-products">
		<h3 class="categorie__title" id={"categorie-list" + i}>
			{name}
		</h3>
		{#each products.filter((it) => it.categoria_id === id) as item (item.id)}
			<div class="wrapper__card-list" animate:flip={flipAnimate}>
				<CardProduct product={item} on:clickCard delay={0} />
			</div>
		{/each}
	</div>
{/each}

<style>
	.grid-products {
		margin: 0 auto;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		min-width: 0;
	}

	.wrapper__sorttool {
		position: sticky;
		top: 0;
		z-index: 999999999;
		background-color: var(--secondary);
		width: 100%;
		max-height: 100%;
	}
	.categorie__title {
		width: 100%;
		margin: 0 0 1em 0;
		padding: 0.5em;
		text-align: center;
		position: sticky;
		top: 66px;
		z-index: 99999999;
		background-color: var(--secondary);
		width: 100%;
		border-bottom: 1px solid var(--neutral-opacity-1);
	}
	.wrapper__card-list {
		padding: 1em;
		min-width: 0;
	}

	@media (min-width: 640px) {
	}

	@media (min-width: 768px) {
	}

	@media (min-width: 1024px) {
		/* .grid-products {
			justify-content: left;
		} */
	}

	@media (min-width: 1280px) {
	}
</style>
