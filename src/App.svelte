<script>
	import { onMount } from "svelte";
	import { useMachine } from "./libs/useMachine";
	import stepsMachine from "./libs/machine";
	import StageTransitioner from "./Stage-transitioner.svelte";
	const { state, send } = useMachine(stepsMachine, {});
	import { quintOut, quintIn, quintInOut } from "svelte/easing";
	import { flip } from "svelte/animate";
	import productsBack from "../products";
	import categoriesBack from "../categories";
	import ProductsSortTool from "./components/Products-sort-tool.svelte";
	import ScrollWrapper from "./components/Scroll-wrapper.svelte";
	import Section from "./components/Section.svelte";
	import SectionButton from "./components/Section-button.svelte";
	import ItemProduct from "./components/Item-product.svelte";
	import ContactMethods from "./components/Contact-methods.svelte";
	import CardProduct from "./components/Card-product.svelte";

	let products = [],
		categories = [],
		currproduct,
		selectProduct;
	let filteredProducts,
		sortCategoriesPrice = [],
		filterProductsSalient = [],
		filter = "todos",
		sort = "menor";

	$: empty = !!products.length;
	$: emptys = !!products.length && !!categories.length;
	$: console.log(empty);

	function FETCH(callback) {
		function failure(res, i) {
			if (!res.ok) {
				!!i ? (categories = categoriesBack) : (products = productsBack);
				throw new Error("bad status code for response");
			}
			return res
				.json()
				.then((data) => (!!i ? (categories = data) : (products = data)));
		}

		["products", "categories"].forEach((entity, i) => {
			fetch("https://api-consweet.vercel.app/api/" + entity)
				.then((res) => {
					failure(res, i);
				})
				.catch((err) => console.error(err));
		});

		if (callback) callback();
	}

	function showProduct(e) {
		currproduct = e.detail.product;
		send("FINAL");
	}

	onMount(() => {
		FETCH(() => {
			send("MOUNT");
		});
	});

	$: if (products.length > 0) {
		filterProductsSalient = products.filter((item) => item.salient);
	}

	$: if (emptys) {
		sortCategoriesPrice = categories
			.sort((a, b) => {
				function price({ id }) {
					return products[products.findIndex((el) => el.categoria_id === id)]
						.precio;
				}

				return sort === "mayor"
					? price(a) < price(b)
						? 1
						: -1
					: price(a) > price(b)
					? 1
					: -1;
			})
			.filter((item) =>
				filter === "todos" ? item.nombre : item.id === filter
			);
	}

	function tagsHandler(id) {
		filter = id;
		send("MID");
	}
</script>

<div class="container-full">
	<div class="container">
		{#if $state.matches("init")}
			<StageTransitioner>
				<Section id="section-products">
					<ScrollWrapper
						products={filterProductsSalient}
						on:clickCard={showProduct}
					/>
					{#each categories as { nombre: name, id } (id)}
						<SectionButton on:click={tagsHandler(id)}>
							{name}
						</SectionButton>
					{/each}
					<div>
						<SectionButton main bouncy on:click={() => send("MID")}>
							Mostrar todos
						</SectionButton>
					</div>
				</Section>
				<Section id="section-contact">
					<p>
						¡Conversemos un poco!🤗. A través de la siguientes vias, podremos
						ponernos en contacto.
					</p>
					<ContactMethods />
					<SectionButton main>Déjanos un comemtario</SectionButton>
				</Section>

				<Section id="section-about">
					<div>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, quo?
							Ad blanditiis iusto culpa sed veniam doloremque maxime qui enim
							dolore amet ratione, deleniti unde dignissimos sapiente voluptates
							sunt? Ut?
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
							iure et, odit ab adipisci exercitationem ipsum culpa quos, optio
							fugiat perspiciatis fugit voluptates nostrum. Enim dicta iusto
							laudantium recusandae repudiandae! Alias, itaque, esse vel
							doloremque repellendus consequuntur in ea minus corporis deleniti
							explicabo a ex excepturi suscipit soluta voluptatum, earum
							possimus impedit aperiam sit modi numquam. Nihil tempora alias
							eum. Exercitationem, optio. Molestias quae debitis accusantium
							nostrum atque maiores eum, est, praesentium optio, aliquam eius
							explicabo? Possimus, est natus necessitatibus voluptatem
							doloremque velit reprehenderit sint nam at sunt aut. A?
							Praesentium, animi? Inventore cum esse architecto maiores nostrum
							natus ipsam consequatur accusantium, deserunt vitae necessitatibus
							non nesciunt blanditiis, deleniti nulla, voluptatem aliquam et
							dolore ratione. Voluptates, sint? Autem, et fugit? Inventore
							aperiam ut quis obcaecati necessitatibus accusamus fuga? Qui earum
							ad temporibus nobis officiis non vitae corporis consequuntur saepe
							quod. Omnis accusamus est incidunt suscipit aspernatur distinctio
							repudiandae impedit error.
						</p>
					</div>
				</Section>
			</StageTransitioner>
		{/if}

		<nav
			style="padding-top: 1em; display: flex; justify-content: center; align-items: center"
		>
			{#if $state.matches("middle")}
				<button on:click={() => send("INIT")}>inicio</button>
				<!-- {#key filter} -->
				<button>productos ({filter === "todos" ? filter : ""})</button>
				<!-- {/key} -->
			{/if}

			{#if $state.matches("final")}
				<button
					on:click={() => {
						send("INIT");
						currproduct = undefined;
					}}>inicio</button
				>
				<button
					on:click={() => {
						send("MID");
						currproduct = undefined;
					}}
					>productos
				</button>
				<!-- svelte-ignore a11y-no-onchange -->
				<select
					style="max-width: 150px"
					class="select__item select__filter"
					bind:value={selectProduct}
					on:change={() => {
						currproduct = selectProduct;
					}}
				>
					{#each products as product (product.id)}
						<option class="select__option" value={product}>
							{product.nombre}
						</option>
					{/each}
				</select>
				<!-- <button>{product.nombre}</button> -->
			{/if}
			<!-- <button on:click={() => send('RETURN')}>{'<'} {product.nombre}</button> -->
		</nav>

		{#if $state.matches("middle")}
			<!-- <button
    on:click={() => {
      currproduct = undefined;
      send('INIT');
    }}
    disabled={$state.value === 'init'}>init</button
  > -->
			<StageTransitioner>
				<div
					style="position: sticky; top: 0; z-index: 999999999; background-color: var(--secondary);width: 100%;"
				>
					<ProductsSortTool {categories} bind:filter bind:sort />
				</div>
				{#each sortCategoriesPrice as { id, nombre: name }, i (id)}
					<div
						class:lastCat={i == sortCategoriesPrice.length - 1}
						class="grid-products"
						id={"categorie-list" + i}
					>
						<h3
							style="margin:0 0 3em 0;padding: 0.5em;text-align: center;position: sticky; top: 66px; z-index: 99999999; background-color: var(--secondary);width: 100%; border-bottom: 1px solid var(--neutral-opacity-1);"
						>
							{name}
							<a
								style="font-size: .75em; text-align: right"
								href="#categorie-list{i !== sortCategoriesPrice.length - 1
									? i + 1
									: 0}"
								>{i !== sortCategoriesPrice.length - 1 ? "sig." : "volver"}</a
							>
						</h3>
						{#each products.filter((it) => it.categoria_id === id) as item (item.id)}
							<div
								animate:flip={{
									delay: 0,
									duration: 600,
									easing: quintInOut,
									opacity: 0,
								}}
								style="padding: 1em;"
							>
								<CardProduct
									product={item}
									on:clickCard={showProduct}
									delay={0}
								/>
							</div>
						{/each}
					</div>
				{/each}
			</StageTransitioner>
		{/if}

		{#if $state.matches("final")}
			<StageTransitioner>
				{#key currproduct}
					<ItemProduct product={currproduct}>
						<ContactMethods />
					</ItemProduct>
				{/key}
			</StageTransitioner>
		{/if}
	</div>
</div>

<style lang="scss">
	$color: red;
	.grid-products {
		// margin: 0 auto;
		// margin-top: 3.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		// background-color: $color;
	}

	.grid-products.lastCat {
		// background-color: greenyellow;
		padding-bottom: 50vh;
	}

	/* .grid-products { */
	/* padding: 1em; */
	/* display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden; */
	/* } */
</style>
