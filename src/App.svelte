<script>
	// xstate
	import { useMachine } from "./libs/useMachine";
	import stateMachine from "./libs/machine";
	const { service } = useMachine(stateMachine, {}, scrollTop);
	import { store } from "./libs/stores/products-store";
	import { filterstore } from "./libs/stores/filter-store";

	// $: console.log(products);

	// rest imports
	import { onMount } from "svelte";
	import getAllUrlParams from "./libs/getAllUrlParams";
	// import { quintInOut } from "svelte/easing";
	// import { flip } from "svelte/animate";

	// fallback data
	// import productsBack from "../products";
	// import categoriesBack from "../categories";

	// components
	import CardProduct from "./components/Card-product.svelte";
	import ContactMethods from "./components/Contact-methods.svelte";
	import FooterMain from "./components/Footer-main.svelte";
	import ItemProduct from "./components/Item-product.svelte";
	import ListProducts from "./components/List-products.svelte";
	import NavbarMain from "./components/Navbar-main.svelte";
	import OffcanvasMenu from "./components/Offcanvas-menu.svelte";
	import ProductsSortTool from "./components/Products-sort-tool.svelte";
	import Promo from "./components/Promo.svelte";
	import ScrollTop from "./components/ScrollTop.svelte";
	import ScrollWrapper from "./components/Scroll-wrapper.svelte";
	import Section from "./components/Section.svelte";
	import SectionButton from "./components/Section-button.svelte";
	import SpinLoader from "./components/Spin-loader.svelte";
	import StageTransitioner from "./Stage-transitioner.svelte";
	import WindowModal from "./components/Window-modal.svelte";
	import Crossfade from "./components/crossfade.svelte";
	import Comments from "./components/Comments.svelte";

	let products = [],
		categories = [],
		comments = [],
		currproduct,
		selectProduct;
	let filteredProducts,
		sortCategoriesPrice = [],
		filterProductsSalient = [],
		filter = "todos",
		sort = "menor";
	let emptyP = true;
	let emptyC = true;
	let emptyA = true;
	let activeUser = { name: "", email: "" };

	store.subscribe((dt) => {
		products = dt.products;
		categories = dt.categories;
		comments = dt.comments;

		if (emptyP) {
			if (!!products.length) {
				emptyP = false;
			}
		}
		if (emptyC) {
			if (!!categories.length) {
				emptyC = false;
			}
		}
		if (emptyA) {
			if (!!comments.length) emptyA = false;
		}

		if (dt.activeUser) {
			activeUser = dt.activeUser;
		}
	});

	// functions
	onMount(() => {
		FETCH(() => {
			service.send("MOUNT");
			console.log("state service running");
			showProductfromUrlParams();
			// let id = getAllUrlParams().id;
			// let condition = id == undefined || id.length < 5 ? false : id;
			// let interval;
			// function clear() {
			// 	clearInterval(interval);
			// }

			// if (condition) {
			// 	interval = setInterval(() => {
			// 		if (!emptyP) {
			// 			let searchProduct = products.filter((p) => p.id.startsWith(id));
			// 			if (!!searchProduct.length) {
			// 				currproduct = searchProduct[0];
			// 				service.send("FINAL");
			// 			}
			// 			return clearInterval(interval);
			// 		}
			// 	}, 100);
			// }
		});
	});

	function showProductfromUrlParams() {
		const id = getAllUrlParams().id;
		// const condition = id == undefined || id.length < 5 ? false : id;
		let interval;

		if (getAllUrlParams().id?.length > 5) {
			interval = setInterval(() => {
				if (!emptyP) {
					let searchProduct = products.filter((p) => p.id.startsWith(id));
					if (!!searchProduct.length) {
						currproduct = searchProduct[0];
						service.send("FINAL");
					}
					return clearInterval(interval);
				}
			}, 100);
		}
	}

	function FETCH(callback) {
		function failure(res, i) {
			if (!res.ok) {
				/* !!i ? (categories = categoriesBack) : (products = productsBack); */
				throw new Error("bad status code for response");
			}
			return res.json().then((data) => {
				if (i == 0) {
					store.update((d) => {
						d.products = data;
						return d;
					});
				} else if (i == 1) {
					store.update((d) => {
						d.categories = data;
						return d;
					});
				} else {
					store.update((d) => {
						d.comments = data;
						return d;
					});
				}
			});
		}

		["products", "categories", "comments"].forEach((entity, i) => {
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
		service.send("FINAL");
	}

	// $: if (!emptyP && !emptyC && !!products.length && !!categories.length) {
	// 	console.log("estoy aquiii");
	// 	filterProductsSalient = products.filter(({ salient }) => salient);
	// 	sortCategoriesPrice = categories
	// 		.sort((a, b) => {
	// 			function price({ id }) {
	// 				return products[products.findIndex((el) => el.categoria_id === id)]
	// 					.precio;
	// 			}
	// 			return sort === "mayor"
	// 				? price(a) < price(b)
	// 					? 1
	// 					: -1
	// 				: price(a) > price(b)
	// 				? 1
	// 				: -1;
	// 		})
	// 		.filter((item) =>
	// 			filter === "todos" ? item.nombre : item.id === filter
	// 		);
	// }

	function tagsHandler(id) {
		filter = [...$store.categories].filter((t) => t.id === id);

		filterstore.update((r) => {
			r.categorieSelected = filter;

			return r;
		});
		service.send("MID");
	}

	function showAllProducts() {
		filterstore.update((r) => {
			r.categorieSelected = [...$store.categories];
			return r;
		});

		service.send("MID");
	}

	function scrollTop() {
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}

	let show = false;
	let showModal = false;
	// $: console.log(comments);
	// $: console.log(products);
	// $: console.log(categories);
	function UpdateLikes(e) {
		const { id, user } = e.detail;
		console.log(id, user);

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		// myHeaders.append("host", "http://localhost:5000");

		let raw = JSON.stringify({ id: id, user: user });

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};

		fetch("https://api-consweet.vercel.app/api/create", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				fetch("https://api-consweet.vercel.app/api/comments")
					.then((response) => response.json())
					.then((data) => {
						// comments = data;
						// console.log(data);
						store.update((r) => {
							const idRef = r.comments.indexOf(
								r.comments.filter((a) => a.id === id)[0]
							);
							// console.log(idRef);
							// console.log(r.comments[idRef]);
							// console.log(r.comments[idRef].likes);
							if (data[idRef].likes == result.likes)
								console.log({ status: "ok" });
							else console.log({ status: "failure" });
							r.comments[idRef] = data[idRef];
							r.comments[idRef].activeLike = true;
							r.activeUser = user;
							return r;
						});
					});
			})
			.catch((error) => console.log("error", error));
	}

	let currentAction = "";
	let id;

	function setCurrentAction(e) {
		id = e.detail.id;
		// currentAction = comments.filter((ele) => ele.id === id)[0];

		showModal = !showModal;
	}
	// $: console.log(products);

	function beforeunload(event) {
		event.preventDefault();
		return (event.returnValue = "xxxxxxx");
	}
</script>

<svelte:window on:beforeunload={beforeunload} />
<svelte:head>
	<title>
		conSweet - {$service.matches("init") || $service.matches("idle")
			? "Inicio"
			: $service.matches("middle")
			? "Productos"
			: currproduct.nombre}
	</title>
</svelte:head>

<WindowModal show={showModal} on:close={() => (showModal = false)}>
	<Comments {id} />
</WindowModal>
<ScrollTop />
<div class="container-full">
	<NavbarMain {service}>
		{currproduct.nombre}
	</NavbarMain>

	<div
		class="container-full"
		class:spacer-top--gradient={$service.matches("init")}
	>
		<div class="spacer-top" />
		<div class="container">
			{#if $service.matches("init")}
				<Section id="section-salient">
					{#each categories as { nombre: name, id } (id)}
						<SectionButton on:click={tagsHandler(id)}>
							{name}
						</SectionButton>
					{/each}
					<ScrollWrapper {products} on:clickCard={showProduct} />

					<SectionButton
						disabled={emptyP && emptyC}
						loading={emptyP && emptyC}
						main
						bouncy
						on:click={showAllProducts}
					>
						Mostrar todos
					</SectionButton>
				</Section>
			{/if}
		</div>
	</div>

	<div class="container-full" />

	<div class="container">
		<!-- <OffcanvasMenu navOpen={show} /> -->

		{#if $service.matches("init")}
			<StageTransitioner>
				{#if !emptyP}
					<Promo on:clickCard={showProduct} {products} />
				{/if}

				<div class="track">
					<div class="col">
						<Section id="section-contact">
							<p>
								¡Conversemos un poco!🤗. A través de la siguientes vias,
								podremos ponernos en contacto.
							</p>
							<ContactMethods />
							<SectionButton main on:click={() => (showModal = !showModal)}
								>Déjanos un comemtario</SectionButton
							>
						</Section>
					</div>
					<div class="col form">
						<form
							style="display:flex; flex-basis:100%; flex-direction: column;"
							on:submit|preventDefault
						>
							<label for="commentName">Nombre</label>
							<input
								type="text"
								value={activeUser.name}
								name="commentName"
								id="commentName"
								placeholder="escribe"
							/>
							<label for="commentEmail">Email</label>
							<input
								type="text"
								value={activeUser.email}
								name="commentEmail"
								id="commentEmail"
								placeholder="escribe"
							/>
							<label for="commentContent">Comentario</label>
							<input
								type="text"
								name="commentContent"
								id="commentContent"
								placeholder="escribe aqui tu sugerencia o comentario"
							/>
							<button type="submit">send</button>
							<button type="reset">limpiar</button>
						</form>
					</div>
				</div>

				<!-- <Crossfade /> -->

				<Section id="section-about">
					<div>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, quo?
							Ad blanditiis iusto culpa sed veniam doloremque maxime qui enim
							dolore amet ratione, deleniti unde dignissimos sapiente voluptates
							sunt? Ut?
						</p>
					</div>
				</Section>
			</StageTransitioner>
		{/if}
		<!-- on:like={UpdateLikes} -->
		<!-- on:like={()=>console.log("test like event")} -->
		{#if $service.matches("middle")}
			<StageTransitioner>
				<ListProducts
					on:like={UpdateLikes}
					on:comment={setCurrentAction}
					on:clickCard={showProduct}
					on:clearfilter={() => {
						filter = "todos";
					}}
				/>
			</StageTransitioner>
		{/if}

		{#if $service.matches("final")}
			<StageTransitioner>
				<!-- {#key currproduct} -->
				<ItemProduct product={currproduct}>
					<ContactMethods />
				</ItemProduct>
				<!-- {/key} -->
			</StageTransitioner>
		{/if}
	</div>
	<FooterMain send={service.send} />
</div>

<style lang="scss">
	$navbar-height: 45px;

	.spacer-top {
		height: $navbar-height;
	}
	.spacer-top--gradient {
		// --color-icon-sections: var(--color-icon-sections-gradient);
		// --color-title: var(--color-title-gradient);
		background-image: var(--bg-gradient-section);
	}

	$color-schema: (
		//
		//
		//
		//
		//
		// modal
		modal-foreground:
			(
				dark: rgba(42, 34, 29, 0.9),
				light: rgba(171, 171, 171, 0.85),
			),
		modal-bg: (
			dark: hsl(23, 18%, 20%),
			light: #f0f0f0,
		),
		modal-input-bg: (
			dark: rgba(255, 255, 255, 0.03),
			light: rgba(0, 0, 0, 0.03),
		),
		modal-input-bg-focus: (
			dark: rgba(255, 255, 255, 0.1),
			light: rgba(0, 0, 0, 0.1),
		),
		//
		//
		//
		//
		//
		// item product
		item-preview-bg:
			(
				dark: #f36566,
				light: #f36566,
			),
		item-preview-color: (
			dark: white,
			light: white,
		),
		item-info-bg: (
			dark: #ffffff,
			light: #ffffff,
		),
		item-info-color: (
			dark: transparent,
			light: transparent,
		),
		//
		//
		//
		//
		//
		// card actions
		actions-bg:
			(
				dark: transparent,
				light: transparent,
			),
		actions-btn-bg: (
			dark: transparent,
			light: transparent,
		),
		actions-btn-bg-hover: (
			dark: #f365651a,
			light: rgba(0, 0, 0, 0.05),
		),
		actions-btn-bg-active: (
			dark: transparent,
			light: white,
		),
		actions-btn-bg-focus: (
			dark: #3f2925,
			light: white,
		),
		actions-icon-stroke: (
			dark: white,
			light: #f36566,
		),
		actions-icon-stroke-active: (
			dark: transparent,
			light: transparent,
		),
		actions-icon-fill: (
			dark: transparent,
			light: transparent,
		),
		actions-icon-fill-active: (
			dark: rgb(233, 58, 58),
			light: rgb(233, 58, 58),
		),
		comment-bg: (
			dark: #3f2925,
			light: rgba(243, 101, 101, 0.2),
		),
		comment-username: (
			dark: inherit,
			light: inherit,
		),
		comment-more-bg: (
			dark: transparent,
			light: transparent,
		),
		comment-more-bg-hover: (
			dark: transparent,
			light: white,
		),
		comment-more-color: (
			dark: rgba(128, 128, 128, 0.2),
			light: rgba(128, 128, 128, 0.2),
		),
		comment-more-color-hover: (
			dark: rgba(128, 128, 128, 0.4),
			light: rgba(128, 128, 128, 0.4),
		),
		comment-more-border: (
			dark: rgba(128, 128, 128, 0.2),
			light: rgba(128, 128, 128, 0.2),
		),
		comment-more-border-hover: (
			dark: rgba(128, 128, 128, 0.4),
			light: rgba(128, 128, 128, 0.4),
		),
		comment-textarea-bg: (
			dark: rgba(255, 255, 255, 0.1),
			light: #dadada,
		),
		comment-textarea-bg-active: (
			dark: #ffffff,
			light: #ffffff,
		),
		//
		//
		//
		//
		//
		// conctact methods
		rrss-icon:
			(
				dark: rgba(243, 98, 98, 0.2),
				light: rgba(243, 98, 98, 0.2),
			),
		rrss-line: (
			dark: #f365651a,
			light: #f365651a,
		),
		//
		//
		//
		//
		//
		// navbar main
		footer-color:
			(
				dark: #ffffff,
				light: #ffffff,
			),
		footer-color-hover: (
			dark: #f36566,
			light: #f36566,
		),
		footer-bg: (
			dark: #3f2925,
			light: #3f2925,
		),
		footer-icons: (
			dark: #f36566,
			light: #f36566,
		),
		footer-line: (
			dark: #f365651a,
			light: #f365651a,
		),
		//
		//
		//
		//
		//
		// navbar main
		navbar-bg-top:
			(
				dark: transparent,
				light: transparent,
			),
		navbar-bg: (
			dark: #2a221d,
			light: #2a221d,
		),
		navbar-icon-menu: (
			dark: #ffffff,
			light: #ffffff,
		),
		navbar-icon-menu-top: (
			dark: #ffffff,
			light: #2a221d,
		),
		navbar-color: (
			dark: #ffffff,
			light: #ffffff,
		),
		navbar-color-top: (
			dark: inherit,
			light: inherit,
		),
		navbar-color-link: (
			dark: #ffffff,
			light: #ffffff,
		),
		navbar-color-link-hover: (
			dark: #f36566,
			light: #f36566,
		),
		navbar-bg-links: (
			dark: #2a221d,
			light: hsl(23, 18%, 25%),
		),
		navbar-bg-extra: (
			dark: rgba(243, 98, 98, 0.97),
			light: rgba(63, 41, 37, 0.97),
		),
		//
		//
		//
		//
		//
		// navbar main
		primary:
			(
				dark: #f36566,
				light: #f36566,
			),
		primary-darken: (
			dark: #3f2925,
			light: #3f2925,
		),
		primary-alpha: (
			dark: #f365651a,
			light: #f365651a,
		),
		bg-filter-title: (
			dark: hsla(23, 18%, 18%, 0.98),
			light: rgba(230, 230, 230, 0.95),
		),
		bg-filter-border: (
			dark: rgba(255, 255, 255, 0.1),
			light: #d4d4d4,
		),
		color-title: (
			dark: #ffffff,
			light: #3f2925,
		),
		color-body: (
			dark: #cacaca,
			light: #272727,
		),
		color-icon-sections: (
			dark: #f36566,
			light: #f36566,
		),
		color-icon-sections-gradient: (
			dark: red,
			light: blue,
		),
		color-title-gradient: (
			dark: green,
			light: purple,
		),
		secondary: (
			dark: #2a221d,
			light: #2a221d,
		),
		bg: (
			dark: #2a221d,
			light: #f0f0f0,
		),
		secondary-lighten: (
			dark: #4b3d34,
			light: #4b3d34,
		),
		white: (
			dark: #ffffff,
			light: #ffffff,
		),
		gray: (
			dark: #f3f3f3,
			light: #f3f3f3,
		),
		gray-1: (
			dark: #dfdfdf,
			light: #dfdfdf,
		),
		gray-1-opacity: (
			dark: #dfdfdf1a,
			light: #dfdfdf1a,
		),
		gray-2: (
			dark: #c3c3c3,
			light: #c3c3c3,
		),
		gray-3: (
			dark: #a7a7a7,
			light: #a7a7a7,
		),
		bg-gradient-section: (
			dark: linear-gradient(90deg, var(--primary-darken), var(--gray-1-opacity)),
			light: linear-gradient(90deg, #c2939380, #f3626280),
		),
		//
		//
		//
		//
		//
		// buttons
		btn-color:
			(
				dark: #f36566,
				light: #ffffff,
			),
		btn-color-hover: (
			dark: #ffffff,
			light: #ffffff,
		),
		btn-color-disabled: (
			dark: #58585885,
			light: #58585885,
		),
		btn-bg: (
			dark: #573833,
			light: rgba(243, 101, 102, 0.6),
		),
		btn-bg-hover: (
			dark: #f36566,
			light: #f36566,
		),
		btn-bg-active: (
			dark: #c85656,
			light: #c85656,
		),
		btn-bg-disabled: (
			dark: rgba(66, 66, 66, 0.3),
			light: #42424229,
		),
		btn-border: (
			dark: transparent,
			light: transparent,
		),
		btn-border-hover: (
			dark: transparent,
			light: transparent,
		),
		btn-border-focus: (
			dark: rgba(0, 0, 0, 0.02),
			light: rgba(0, 0, 0, 0.05),
		),
		btn-border-disabled: (
			dark: transparent,
			light: transparent,
		),
		//
		//
		//
		//
		//
		// card-product
		bg-card:
			(
				dark: transparent,
				light: #ffffff,
			),
		bg-card-hover: (
			dark: rgba(255, 255, 255, 0.02),
			light: rgba(128, 128, 128, 0.1),
		),
		shadow-card: (
			dark: none,
			light: 0px 0px 10px 7px rgba(0, 0, 0, 0.03),
		),
		//
		//
		//
		//
		//
		// promo
		promo-color:
			(
				dark: #ffffff,
				light: #ffffff,
			),
		promo-gradient-front: (
			dark: #f36566,
			light: #2a221d,
		),
		promo-gradient: (
			dark: #ffffff,
			light: #ffffff,
		),
		promo-btn-color: (
			dark: #ffffff,
			light: #ffffff,
		),
		promo-btn-color-hover: (
			dark: #f36566,
			light: #f36566,
		),
		promo-bg: (
			dark: transparent,
			light: transparent,
		)
	);

	:global(:root) {
		--space-y: 1em;
		--space-x: 0.5em;

		@include media(">=small") {
			--space-y: 1em;
			--space-x: 1.5em;
		}

		@include media(">=tablet") {
			--space-y: 1em;
			--space-x: 0em;
		}

		@each $name, $theme in $color-schema {
			@each $mode, $value in $theme {
				@if ($mode == "dark") {
					--#{$name}: #{$value};
				}
			}
		}
	}
	:global(body.light) {
		@each $name, $theme in $color-schema {
			@each $mode, $value in $theme {
				@if ($mode == "light") {
					--#{$name}: #{$value};
				}
			}
		}
	}

	.form {
		padding: var(--space-y) var(--space-x);
	}

	/* .breadcrumb {
		// height: 50px;
		position: sticky;
		top: 54px;
		z-index: 999999999;
		padding: 1em 0;
		// color: white;
		background-image: linear-gradient(
			90deg,
			var(--primary) 0%,
			var(--secondary) 100%
		);
		a {
			display: inline-block;
			color: white;
			padding: 0.5em 1em;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			width: 100%;
		}

		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			justify-content: center;
		}

		li::before {
			content: "→";
		}

		li:first-child::before {
			content: "";
		}
	} */

	// .header-main {
	// 	width: 100%;
	// 	// position: fixed;
	// 	// top: -1px;
	// 	z-index: 99999999999999999999;

	// 	&__nav {
	// 		display: flex;
	// 		justify-content: space-between;
	// 		align-items: center;
	// 	}

	// 	button {
	// 		height: 100%;
	// 		display: flex;
	// 		justify-content: center;
	// 		align-items: center;
	// 		padding: 0;
	// 		// padding: 0.5em;
	// 		flex-basis: 100%;
	// 		flex-direction: column;
	// 	}

	// 	&__brand {
	// 		padding: 0.5em;
	// 	}
	// 	&__links {
	// 		a {
	// 			color: white;
	// 		}
	// 	}
	// 	&__menu {
	// 		padding: 0.5em;
	// 	}
	// }
</style>
