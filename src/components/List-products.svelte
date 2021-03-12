<script>
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { flip } from "svelte/animate";
	import { slide } from "svelte/transition";
	import CardProduct from "./Card-product.svelte";
	import CardActions from "./Card-actions.svelte";
	import { store } from "../libs/stores/products-store";
	import { filterstore } from "../libs/stores/filter-store";
	import { cubicOut } from "svelte/easing";
	// import { writable } from "svelte/store";

	let search = false;
	let filterBox = false;
	let products;
	let categories;
	let comments;
	let categoriesOptions = [];
	let categorieSelected = [];

	const unsubscriber = store.subscribe((r) => {
		products = r.products;
		categories = r.categories;
		comments = r.comments;

		categoriesOptions = categories;
		// categorieSelected = categories;
	});
	let productsSearch = products;
	// $: console.log(products, categories, comments);
	// $: console.log("sort: ", sortSelected);
	// $: console.log("categorie: ", categorieSelected);
	// $: console.log("feedback: ", feedbackSelected);
	// $: console.log("products: ", products);

	let sortOptions = [
		["mayor precio", ">"],
		["menor precio", "<"],
	];
	let sortSelected;
	let feedbackOptions = [
		["me gusta", "like"],
		["comentarios", "comment"],
	];
	let feedbackSelected = "like";

	$: categorieSelectedSorted = categorieSelected.sort(compare).map((e) => {
		e.products = products
			.filter((w) => w.categoria_id === e.id)
			.sort((a, b) => {
				const getData = ({ id }) => comments.filter((t) => t.id === id)[0];
				if (sortSelected === "") {
					if (feedbackSelected === "") {
						return;
					}
					if (feedbackSelected === "like") {
						let likesA = getData(a).likes;
						let likesB = getData(b).likes;

						if (likesA <= likesB) {
							return 1;
						} else {
							return -1;
						}
					} else {
						let commentsA = getData(a).comments.length;
						let commentsB = getData(b).comments.length;

						if (commentsA <= commentsB) {
							return 1;
						} else {
							return -1;
						}
					}
				}
				if (sortSelected === ">") {
					if (a.precio < b.precio) {
						return 1;
					} else if (a.precio == b.precio) {
						if (feedbackSelected === "") {
							return;
						}
						if (feedbackSelected === "like") {
							let likesA = getData(a).likes;
							let likesB = getData(b).likes;

							if (likesA <= likesB) {
								return 1;
							} else {
								return -1;
							}
						} else {
							let commentsA = getData(a).comments.length;
							let commentsB = getData(b).comments.length;

							if (commentsA <= commentsB) {
								return 1;
							} else {
								return -1;
							}
						}
					} else {
						return -1;
					}
				} else {
					if (a.precio > b.precio) {
						return 1;
					} else if (a.precio == b.precio) {
						if (feedbackSelected === "") {
							return;
						}
						if (feedbackSelected === "like") {
							let likesA = getData(a).likes;
							let likesB = getData(b).likes;

							if (likesA <= likesB) {
								return 1;
							} else {
								return -1;
							}
						} else {
							let commentsA = getData(a).comments.length;
							let commentsB = getData(b).comments.length;

							if (commentsA <= commentsB) {
								return 1;
							} else {
								return -1;
							}
						}
					} else {
						return -1;
					}
				}
			});
		return e;
	});

	$: productsSelectedSorted = productsSearch.sort((a, b) => {
		const getData = ({ id }) => comments.filter((t) => t.id === id)[0];
		if (sortSelected === "") {
			if (feedbackSelected === "like") {
				let likesA = getData(a).likes;
				let likesB = getData(b).likes;

				if (likesA <= likesB) {
					return 1;
				} else {
					return -1;
				}
			} else {
				let commentsA = getData(a).comments.length;
				let commentsB = getData(b).comments.length;

				if (commentsA <= commentsB) {
					return 1;
				} else {
					return -1;
				}
			}
		}
		if (sortSelected === ">") {
			if (a.precio < b.precio) {
				return 1;
			} else if (a.precio == b.precio) {
				if (feedbackSelected === "like") {
					let likesA = getData(a).likes;
					let likesB = getData(b).likes;

					if (likesA <= likesB) {
						return 1;
					} else {
						return -1;
					}
				} else {
					let commentsA = getData(a).comments.length;
					let commentsB = getData(b).comments.length;

					if (commentsA <= commentsB) {
						return 1;
					} else {
						return -1;
					}
				}
			} else {
				return -1;
			}
		} else {
			if (a.precio > b.precio) {
				return 1;
			} else if (a.precio == b.precio) {
				if (feedbackSelected === "like") {
					let likesA = getData(a).likes;
					let likesB = getData(b).likes;

					if (likesA <= likesB) {
						return 1;
					} else {
						return -1;
					}
				} else {
					let commentsA = getData(a).comments.length;
					let commentsB = getData(b).comments.length;

					if (commentsA <= commentsB) {
						return 1;
					} else {
						return -1;
					}
				}
			} else {
				return -1;
			}
		}
	});

	onMount(() => {
		if ($filterstore) {
			sortSelected = $filterstore.sortSelected || sortSelected;
			categorieSelected = $filterstore.categorieSelected || categorieSelected;
			feedbackSelected = $filterstore.feedbackSelected || feedbackSelected;
		}
	});

	onDestroy(() => {
		filterstore.set({ sortSelected, categorieSelected, feedbackSelected });
		unsubscriber();
		// unsub();
	});

	function productById(id) {
		return products[products.findIndex((el) => el.categoria_id === id)];
	}

	function compare(a, b) {
		if (sortSelected === "") return;
		return sortSelected === ">"
			? productById(a.id).precio < productById(b.id).precio
				? 1
				: -1
			: productById(a.id).precio > productById(b.id).precio
			? 1
			: -1;
	}

	let grid = false;

	const dispatch = createEventDispatcher();
	function clearfilter() {
		dispatch("clearfilter");
	}

	function setAllCategories(e) {
		// console.log(e.target.checked);

		if (e.target.checked) categorieSelected = categories;
	}

	// .sort((a, b) =>
	// 			sortSelected === ">"
	// 				? a.precio < b.precio
	// 					? 1
	// 					: -1
	// 				: a.precio > b.precio
	// 				? 1
	// 				: -1
	// 		)

	// const shared = async (e) => {
	// 	const id = e.detail.id.split("-")[0];
	// 	const url = "https://consweet.netlify.app/" + "?id=" + id;
	// 	// console.log(id);
	// 	const shareData = {
	// 		title: "Consweet",
	// 		text: "Descubre estas delicias que esperan por ti!",
	// 		url,
	// 	};
	// 	try {
	// 		await navigator.share(shareData);
	// 		// resultPara.textContent = 'MDN shared successfully'
	// 	} catch (err) {
	// 		// resultPara.textContent = 'Error: ' + err
	// 		console.error(`navigator.share() no disponible. \n ${err}`);
	// 		try {
	// 			await navigator.clipboard.writeText(url);
	// 			console.log("copy to clipboard");
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	}
	// };

	function UpdateLikesById(e) {
		const id = e.detail.id;
		console.log(id);

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		// myHeaders.append("host", "http://localhost:5000");

		let raw = JSON.stringify({ id: id });

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};

		fetch("https://api-consweet.vercel.app/api/create", requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	}

	let timeOut;
	function searchable(e) {
		if (timeOut) clearTimeout(timeOut);

		let text = e.target.value.replace(/[ó]/g, "o").trim();

		if (!text.length || text == undefined) {
			productsSearch = products;
			return;
		}
		console.log(text);
		sortSelected = "";
		categorieSelected = [];
		feedbackSelected = "";

		let newArr = [];

		timeOut = setTimeout(() => {
			products.forEach((el) => {
				console.log(el.nombre);
				let currentName = el.nombre.toLowerCase();
				let transformName = currentName
					.replace(/[á]/g, "a")
					.replace(/[é]/g, "e")
					.replace(/[í]/g, "i")
					.replace(/[ó]/g, "o")
					.replace(/[ú]/g, "u");

				if (transformName.startsWith(text) || transformName.includes(text)) {
					newArr.push(el);
				}
			});

			productsSearch = newArr;
		}, 800);
	}

	// let value;
	// $: console.log(value);
</script>

<div class="wrapper__sorttool">
	<div class="record__tab">
		{#if !search}
			{#if categorieSelected.length || sortSelected !== "" || feedbackSelected !== ""}
				<button
					class="clearfilter"
					on:click={() => {
						categorieSelected = [];
						sortSelected = "";
						feedbackSelected = "";
						// filterBox = false;
					}}
					><span>
						<svg viewBox="0 0 20 20">
							<path
								d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
							/>
						</svg>
					</span>
				</button>
			{/if}
			<button
				class="toggle"
				class:expand={filterBox}
				on:click={() => (filterBox = !filterBox)}
			>
				filtrar por
				<span>
					<svg viewBox="0 0 20 20">
						<path
							d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
						/>
					</svg>
				</span>
			</button>
		{:else}
			<input
				on:input={searchable}
				type="search"
				id="search"
				placeholder="ej. 'maracuya'"
			/>
		{/if}

		<!-- <label for="search"> -->
		<!-- <span>buscar</span> -->
		<button on:click={() => (search = !search)} class="search">
			<span
				><svg viewBox="0 0 20 20">
					{#if !search}
						<path
							d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
					c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
					c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
					s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"
						/>
					{:else}
						<svg viewBox="0 0 20 20">
							<path
								d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
							/>
						</svg>
					{/if}
				</svg></span
			>
		</button>
		<!-- </label> -->
	</div>
	{#if filterBox}
		<div class="record">
			<h6 class="record__title">precio</h6>
			{#each sortOptions as [label, value] (value)}
				<label class="record__item">
					<input
						class="record__input"
						on:click={() => {
							if (sortSelected === value) {
								sortSelected = "";
							}
						}}
						type="radio"
						bind:group={sortSelected}
						{value}
					/>
					<span class="record__label">{label}</span>
				</label>
			{/each}
		</div>

		<div class="record">
			<h6 class="record__title">categoria</h6>
			<label class="record__item">
				<input
					class="record__input"
					type="checkbox"
					on:change={setAllCategories}
					disabled={categorieSelected.length == categories.length}
					checked={categorieSelected.length == categories.length}
					indeterminate={categorieSelected.length !== categories.length}
				/>
				<span class="record__label">todos</span>
			</label>
			{#each categoriesOptions.sort((a, b) =>
				a.nombre > b.nombre ? 1 : -1
			) as categorie (categorie.id)}
				<label class="record__item">
					<input
						class="record__input"
						type="checkbox"
						indeterminate={categorieSelected.length == 0}
						checked={false}
						bind:group={categorieSelected}
						value={categorie}
					/>
					<span class="record__label">{categorie.nombre}</span>
				</label>
			{/each}
		</div>
		<div class="record">
			<h6 class="record__title">feedback</h6>
			{#each feedbackOptions as [label, value] (value)}
				<label class="record__item">
					<input
						on:click={() => {
							if (feedbackSelected === value) {
								feedbackSelected = "";
							}
						}}
						class="record__input"
						type="radio"
						bind:group={feedbackSelected}
						{value}
					/>
					<span class="record__label">{label}</span>
				</label>
			{/each}
		</div>
	{/if}
</div>

<!-- {#key categorieSelected || sortSelected || feedbackSelected} -->
<!-- <div
	class="blackout"
	style="display: {value
		? 'block'
		: 'none'}; position: fixed;top: 0;left: 0;width: 100vw;height: 100vh;background-color: #000000a1;z-index: 2;"
/> -->
<!-- {#key categorieSelected || sortSelected || feedbackSelected} -->

{#each categorieSelectedSorted as { id, nombre: name, products: productsByCategorie }, i (id)}
	<div class="grid-products">
		<div class="sticky-info">
			<div class="left">
				{#if categories.length == 1}
					<button on:click={clearfilter}
						><svg viewBox="0 0 20 20">
							<path
								d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
										c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
										c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
										c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"
							/>
						</svg>
						<span>filtro:</span>
					</button>
				{/if}
				<span
					>{name} ({products.filter((p) => p.categoria_id === id).length})</span
				>
			</div>
			<div class="right">
				<button on:click={() => (grid = !grid)}>
					<svg class="svg-icon" viewBox="0 0 20 20">
						{#if grid}
							<path
								d="M18.175,4.142H1.951C1.703,4.142,1.5,4.344,1.5,4.592v10.816c0,0.247,0.203,0.45,0.451,0.45h16.224c0.247,0,0.45-0.203,0.45-0.45V4.592C18.625,4.344,18.422,4.142,18.175,4.142 M4.655,14.957H2.401v-1.803h2.253V14.957zM4.655,12.254H2.401v-1.803h2.253V12.254z M4.655,9.549H2.401V7.747h2.253V9.549z M4.655,6.846H2.401V5.043h2.253V6.846zM14.569,14.957H5.556V5.043h9.013V14.957z M17.724,14.957h-2.253v-1.803h2.253V14.957z M17.724,12.254h-2.253v-1.803h2.253V12.254zM17.724,9.549h-2.253V7.747h2.253V9.549z M17.724,6.846h-2.253V5.043h2.253V6.846z"
							/>
						{:else}
							<path
								d="M18.555,15.354V4.592c0-0.248-0.202-0.451-0.45-0.451H1.888c-0.248,0-0.451,0.203-0.451,0.451v10.808c0,0.559,0.751,0.451,0.451,0.451h16.217h0.005C18.793,15.851,18.478,14.814,18.555,15.354 M2.8,14.949l4.944-6.464l4.144,5.419c0.003,0.003,0.003,0.003,0.003,0.005l0.797,1.04H2.8z M13.822,14.949l-1.006-1.317l1.689-2.218l2.688,3.535H13.822z M17.654,14.064l-2.791-3.666c-0.181-0.237-0.535-0.237-0.716,0l-1.899,2.493l-4.146-5.42c-0.18-0.237-0.536-0.237-0.716,0l-5.047,6.598V5.042h15.316V14.064z M12.474,6.393c-0.869,0-1.577,0.707-1.577,1.576s0.708,1.576,1.577,1.576s1.577-0.707,1.577-1.576S13.343,6.393,12.474,6.393 M12.474,8.645c-0.371,0-0.676-0.304-0.676-0.676s0.305-0.676,0.676-0.676c0.372,0,0.676,0.304,0.676,0.676S12.846,8.645,12.474,8.645"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</div>
		{#each productsByCategorie as item (item.id)}
			<div class="wrapper__card-list">
				<CardProduct {grid} product={item} on:clickCard delay={0} />
				<CardActions {item} on:like on:comment on:share />
			</div>
		{/each}
	</div>
{:else}
	<div class="grid-products">
		<div class="sticky-info">
			<div class="left">
				{#if categories.length == 1}
					<button on:click={clearfilter}
						><svg viewBox="0 0 20 20">
							<path
								d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
									c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
									c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
									c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"
							/>
						</svg>
						<span>filtro:</span>
					</button>
				{/if}
				<span>todos ({productsSearch.length})</span>
			</div>
			<div class="right">
				<button on:click={() => (grid = !grid)}>
					<svg class="svg-icon" viewBox="0 0 20 20">
						{#if grid}
							<path
								d="M18.175,4.142H1.951C1.703,4.142,1.5,4.344,1.5,4.592v10.816c0,0.247,0.203,0.45,0.451,0.45h16.224c0.247,0,0.45-0.203,0.45-0.45V4.592C18.625,4.344,18.422,4.142,18.175,4.142 M4.655,14.957H2.401v-1.803h2.253V14.957zM4.655,12.254H2.401v-1.803h2.253V12.254z M4.655,9.549H2.401V7.747h2.253V9.549z M4.655,6.846H2.401V5.043h2.253V6.846zM14.569,14.957H5.556V5.043h9.013V14.957z M17.724,14.957h-2.253v-1.803h2.253V14.957z M17.724,12.254h-2.253v-1.803h2.253V12.254zM17.724,9.549h-2.253V7.747h2.253V9.549z M17.724,6.846h-2.253V5.043h2.253V6.846z"
							/>
						{:else}
							<path
								d="M18.555,15.354V4.592c0-0.248-0.202-0.451-0.45-0.451H1.888c-0.248,0-0.451,0.203-0.451,0.451v10.808c0,0.559,0.751,0.451,0.451,0.451h16.217h0.005C18.793,15.851,18.478,14.814,18.555,15.354 M2.8,14.949l4.944-6.464l4.144,5.419c0.003,0.003,0.003,0.003,0.003,0.005l0.797,1.04H2.8z M13.822,14.949l-1.006-1.317l1.689-2.218l2.688,3.535H13.822z M17.654,14.064l-2.791-3.666c-0.181-0.237-0.535-0.237-0.716,0l-1.899,2.493l-4.146-5.42c-0.18-0.237-0.536-0.237-0.716,0l-5.047,6.598V5.042h15.316V14.064z M12.474,6.393c-0.869,0-1.577,0.707-1.577,1.576s0.708,1.576,1.577,1.576s1.577-0.707,1.577-1.576S13.343,6.393,12.474,6.393 M12.474,8.645c-0.371,0-0.676-0.304-0.676-0.676s0.305-0.676,0.676-0.676c0.372,0,0.676,0.304,0.676,0.676S12.846,8.645,12.474,8.645"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</div>
		{#each productsSelectedSorted as item (item.id)}
			<div class="wrapper__card-list">
				<CardProduct {grid} product={item} on:clickCard delay={0} />
				<CardActions {item} on:like on:comment on:share />
			</div>
		{:else}
			<span>no se encuentran coincidencias con tu busqueda</span>
		{/each}
	</div>

	<!-- <button on:click={() => (categorieSelected = [...categories])}
		>mostrar todos</button
	> -->
{/each}

<!-- {/key} -->
<style lang="scss">
	$distanceoftop: 44px;

	.wrapper__sorttool {
		position: sticky;
		z-index: 2;
		width: 100%;
		top: $distanceoftop;
		display: flex;
		flex-wrap: wrap;
		background-color: var(--bg-filter-title);
		box-shadow: 0 1px 2px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 7%),
			0 4px 8px rgb(0 0 0 / 7%), 0 8px 16px rgb(0 0 0 / 7%),
			0 16px 32px rgb(0 0 0 / 7%), 0 32px 64px rgb(0 0 0 / 7%);
		border-radius: 5px;
		// margin-right: 1em;
		// margin-left: 1em;
		margin-top: 1em;
		overflow: hidden;
	}

	.record__tab {
		display: flex;
		flex-basis: 100%;
		align-items: baseline;

		& > * {
			flex-basis: 100%;
			border: none;
			outline: none;
		}

		.toggle {
			display: inline-flex;
			// align-items: baseline;
			justify-content: space-between;
			// padding-right: 1.2em;

			&:hover {
				background: rgba(0, 0, 0, 0.2);
			}

			svg {
				display: inline-block;
				transform: rotate(90deg);
			}
		}

		.toggle.expand {
			svg {
				transform: rotate(-90deg);
			}
		}
		.clearfilter {
			background-color: rgba(165, 42, 42, 0.1);
			flex-shrink: 3;

			&:hover {
				background-color: brown;
			}
		}

		.search {
			flex-shrink: 3;
			background-color: rgba(255, 255, 255, 0.1);

			&:hover {
				background: rgba(255, 255, 255, 0.3);
			}
		}

		input {
			background-color: rgba(255, 255, 255, 0.5);
			color: rgb(42, 42, 42);
		}

		// button {
		// 	flex: 1 1 50%;
		// 	border: none;
		// 	outline: none;
		// 	justify-content: space-between;
		// }

		// .clearfilter {
		// 	border-radius: 50vh;
		// 	width: auto;
		// 	background-color: rgba(255, 0, 0, 0.1);
		// 	padding: 0;
		// }
	}

	.record {
		$gap: 0.4em;
		background-color: rgba(255, 255, 255, 0.02);
		flex: 1 1 calc(100% / 3 - #{$gap * 2});
		text-align: center;
		min-width: 200px;
		margin: $gap;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		align-content: flex-start;
	}
	.record__title {
		flex-basis: 100%;
		font-size: 0.9rem;
		margin: 0;
		padding: 0.5em;
	}

	.record__item {
		display: flex;
		align-items: center;
		flex-direction: column;
		flex: 1 1 50%;
		min-width: 100px;
		// padding: 0.5em;
		position: relative;
		font-size: 0.8rem;
		justify-content: center;
		height: 60px;
		overflow: hidden;
	}

	.record__input:checked::after {
		content: "";
		position: absolute;
		top: 10%;
		left: 10%;
		background-color: var(--primary-alpha);
		height: 80%;
		width: 80%;
		border-radius: 5px;
	}

	.record__label {
	}

	.active {
		background-color: var(--primary);
	}

	.sticky-info {
		padding: 0.3em var(--space-x);
		position: sticky;
		top: 75px;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		width: 100%;
		background-color: var(--bg-filter-title);
		border-bottom: 1px solid var(--bg-filter-border);

		.left {
			button {
				font-size: 0.7rem;
				padding: 0 0.4em;
				margin: 0;
				border-color: transparent;
				background-color: rgba(255, 0, 0, 0.1);
				border-radius: 50vh;
				display: inline-flex;
				justify-content: center;
				align-items: baseline;
				// padding: 0 0.5em;

				&:hover {
					background-color: rgba(255, 0, 0, 0.3);
				}

				svg {
					height: 0.5rem;
					width: 0.5rem;
					margin-right: 0.2em;
				}
			}
			// background-color: red;
		}
		.right {
			button {
				outline: 0;
				padding: 0;
				margin: 0;
				cursor: pointer;
				// display: inline-flex;
				// justify-content: center;
				// align-items: center;
				border-color: transparent;

				&:hover {
					// background-color: rgba(255, 0, 0, 0.3);
					svg {
						fill: var(--primary);
						// margin-right: 0.2em;
					}
				}

				svg {
					height: 1.8rem;
					width: 1.8rem;
					// margin-right: 0.2em;
				}
			}
			// background-color: blue;
		}
	}

	// .categorie__title {
	// 	width: 100%;
	// 	margin: 0 0 0em 0;
	// 	padding: 0.5em;
	// 	font-size: 1rem;
	// 	text-align: center;
	// 	background-color: var(--bg-filter-title);
	// 	border-bottom: 1px solid var(--bg-filter-border);
	// 	// width: 100%;

	// 	position: sticky;
	// 	top: 44px;
	// 	z-index: 99999999;
	// 	@include media(">=tablet") {
	// 	}

	// 	button {
	// 		// font-size: 0.5rem;
	// 		border: 1px solid transparent;
	// 		background-color: rgba(255, 0, 0, 0.1);

	// 		&:hover {
	// 			background-color: rgba(255, 0, 0, 0.3);
	// 		}
	// 	}
	// }

	.grid-products {
		flex-basis: 100%;
		// max-width: 350px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;

		@include media(">=1000px") {
			justify-content: flex-start;
		}
	}

	.wrapper__card-list {
		min-width: 0;
		max-width: 350px;
		// flex-basis: calc(100% / 2);
		padding: 1.5em 1em;
		flex-basis: 100%;
		flex-grow: 0;
		flex-shrink: 1;
		position: relative;

		@include media(">600px") {
			// padding: 3em 1em;
			// flex-basis: 50%;
			flex-basis: calc(100% / 2);
		}
		@include media(">1000px") {
			padding: 3em 1em;
			// flex-basis: 50%;
			flex-basis: calc(100% / 3);
		}
		@include media(">=desktop") {
			flex-basis: calc(100% / 4);
		}
		@include media(">=large") {
			flex-basis: calc(100% / 5);
		}
	}
	.front {
		z-index: 2;
	}

	@media (min-width: 640px) {
	}

	@media (min-width: 768px) {
		.categorie__title {
			text-align: left;
		}
	}

	@media (min-width: 1024px) {
		/* .grid-products {
			justify-content: left;
		} */
	}

	@media (min-width: 1280px) {
	}
</style>
