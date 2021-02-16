<script>
	// xstate
	import { useMachine } from "./libs/useMachine";
	import stateMachine from "./libs/machine";
	const { service } = useMachine(stateMachine, {}, scrollTop);

	// rest imports
	import { onMount } from "svelte";
	import { quintInOut } from "svelte/easing";
	import { flip } from "svelte/animate";

	// fallback data
	import productsBack from "../products";
	import categoriesBack from "../categories";

	// components
	import StageTransitioner from "./Stage-transitioner.svelte";
	import ProductsSortTool from "./components/Products-sort-tool.svelte";
	import ScrollWrapper from "./components/Scroll-wrapper.svelte";
	import Section from "./components/Section.svelte";
	import SectionButton from "./components/Section-button.svelte";
	import ItemProduct from "./components/Item-product.svelte";
	import ContactMethods from "./components/Contact-methods.svelte";
	import CardProduct from "./components/Card-product.svelte";
	import FooterMain from "./components/Footer-main.svelte";
	import SpinLoader from "./components/Spin-loader.svelte";
	import ListProducts from "./components/List-products.svelte";
	import ContactForm from "./components/Contact-form.svelte";

	let products = [],
		categories = [],
		currproduct,
		selectProduct;
	let filteredProducts,
		sortCategoriesPrice = [],
		filterProductsSalient = [],
		filter = "todos",
		sort = "menor";

	$: emptyP = !!!products.length;
	$: emptyC = !!!categories.length;

	// functions
	onMount(() => {
		FETCH(() => {
			service.send("MOUNT");
			console.log("state service running");
		});
	});

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
		// scrollTop();
		service.send("FINAL");
	}

	$: if (!emptyP && !emptyC) {
		filterProductsSalient = products.filter(({ salient }) => salient);

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
		service.send("MID");
	}
	function scrollTop() {
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}
	let show = false;
</script>

<div class="container-full">
	<div class="container">
		{#if $service.matches("init")}
			<ContactForm {show} on:close={() => (show = false)} />
			<StageTransitioner>
				<Section id="section-salient">
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
						<SectionButton
							main
							bouncy
							on:click={() => {
								service.send("MID");
								// scrollTop();
							}}
						>
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
					<SectionButton main on:click={() => (show = !show)}
						>Déjanos un comemtario</SectionButton
					>
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
			id="toolbarTop"
			style="padding-top: 1em; display: flex; justify-content: center; align-items: center"
		>
			{#if $service.matches("middle")}
				<button on:click={() => service.send("INIT")}>inicio</button>
				<!-- {#key filter} -->
				<button>productos ({filter === "todos" ? filter : ""})</button>
			{/if}

			{#if $service.matches("final")}
				<button
					on:click={() => {
						service.send("INIT");
						currproduct = undefined;
					}}>inicio</button
				>
				<button
					on:click={() => {
						service.send("MID");
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
			{/if}
		</nav>

		{#if $service.matches("middle")}
			<StageTransitioner>
				<ListProducts
					{products}
					{sortCategoriesPrice}
					on:clickCard={showProduct}
				>
					<ProductsSortTool {categories} bind:filter bind:sort>
						<button
							style="overflow:hidden; margin: 0 .3em"
							on:click={() => {
								service.send("INIT");
							}}
						>
							<svg
								style="display: flex; justify-content:center; align-items: center; max-height: 100%"
								viewBox="0 0 20 20"
							>
								<path
									d="M15.971,7.708l-4.763-4.712c-0.644-0.644-1.769-0.642-2.41-0.002L3.99,7.755C3.98,7.764,3.972,7.773,3.962,7.783C3.511,8.179,3.253,8.74,3.253,9.338v6.07c0,1.146,0.932,2.078,2.078,2.078h9.338c1.146,0,2.078-0.932,2.078-2.078v-6.07c0-0.529-0.205-1.037-0.57-1.421C16.129,7.83,16.058,7.758,15.971,7.708z M15.68,15.408c0,0.559-0.453,1.012-1.011,1.012h-4.318c0.04-0.076,0.096-0.143,0.096-0.232v-3.311c0-0.295-0.239-0.533-0.533-0.533c-0.295,0-0.534,0.238-0.534,0.533v3.311c0,0.09,0.057,0.156,0.096,0.232H5.331c-0.557,0-1.01-0.453-1.01-1.012v-6.07c0-0.305,0.141-0.591,0.386-0.787c0.039-0.03,0.073-0.066,0.1-0.104L9.55,3.75c0.242-0.239,0.665-0.24,0.906,0.002l4.786,4.735c0.024,0.033,0.053,0.063,0.084,0.09c0.228,0.196,0.354,0.466,0.354,0.76V15.408z"
								/>
							</svg>
						</button>
					</ProductsSortTool>
				</ListProducts>
			</StageTransitioner>
		{/if}

		{#if $service.matches("final")}
			<StageTransitioner>
				{#key currproduct}
					<ItemProduct product={currproduct}>
						<ContactMethods />
					</ItemProduct>
				{/key}
			</StageTransitioner>
		{/if}
	</div>
	<FooterMain send={service.send} />
</div>

<style>
</style>
