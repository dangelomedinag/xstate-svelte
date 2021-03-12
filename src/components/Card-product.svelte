<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { linear, quintInOut, quintOut } from "svelte/easing";
	import { fly, scale, slide } from "svelte/transition";

	export let product,
		grid = false,
		inline = false,
		delay = 200;

	let card;
	const dispatch = createEventDispatcher();
	const { imgs } = product;
	let bultInGrid = grid ? 3 : imgs.length;
	let prefetch = true;
	let length = product.imgs.length - 1;
	let index = 0;
	$: current = imgs[index];

	function resizingImg(url) {
		let splited = url.split("upload");
		let word = "upload/";
		let config = "w_350,h_240,c_fill";
		let newUrl = splited[0] + word + config + splited[1];
		return newUrl;
	}

	function ProductClickEvent() {
		dispatch("clickCard", { product });
		// console.log("click on card product", product);
	}
	function setCardHeigth() {
		card.style.height = card.getBoundingClientRect().height + "px";
		setTimeout(() => {
			card.style.height = "auto";
		}, 600);
	}

	function nextImg() {
		if (!prefetch) setCardHeigth();
		prefetch = true;
		index == length ? (index = 0) : index++;
	}

	function prevImg() {
		if (!prefetch) setCardHeigth();
		prefetch = true;
		index == 0 ? (index = length) : index--;
	}

	function focusAccess(e) {
		const target = e.target;
		// console.log("focus card");
		function simulateClick(event) {
			if (
				event.which == 39 ||
				event.key === "ArrowRight" ||
				event.which == 37 ||
				event.key === "ArrowLeft"
			) {
				// console.log("arrow right");
				event.preventDefault();
				prefetch = true;
				event.key === "ArrowRight" ? nextImg() : prevImg();
				// target.removeEventListener("keydown", simulateClick);
			} else {
				if (
					event.which == 13 ||
					event.key === "Enter" ||
					event.which == 32 ||
					event.key === " "
				) {
					event.preventDefault();
					ProductClickEvent();
				}
				target.removeEventListener("keydown", simulateClick);
				target.blur();
			}
		}
		target.addEventListener("keydown", simulateClick);
	}

	function longhover(node) {
		let timer;
		function removeListener() {
			node.removeEventListener("mouseover", handleMousedown);
			node.removeEventListener("mouseout", handleMouseup);
		}

		const handleMousedown = () => {
			if (prefetch) {
				removeListener();
				return;
			}

			timer = setTimeout(() => {
				prefetch = true;

				/* remove listener for card */
				removeListener();
			}, 800);
		};

		const handleMouseup = () => {
			clearTimeout(timer);
		};

		node.addEventListener("mouseover", handleMousedown);
		node.addEventListener("mouseout", handleMouseup);

		return {
			destroy() {
				removeListener();
			},
		};
	}

	let intersectionObserver;

	function viewport(node) {
		if (intersectionObserver) return;

		intersectionObserver = new IntersectionObserver(
			(entries) => {
				// let isVisible = false;
				// console.log(entries[0]);
				if (entries[0].isIntersecting) {
					if (entries[0].target.dataset.src) {
						entries[0].target.setAttribute(
							"src",
							entries[0].target.dataset.src
						);
						delete entries[0].target.dataset.src;
						entries[0].target.removeAttribute("data-src");
						intersectionObserver.unobserve(node);
					}
				}
			},
			{
				rootMargin: "0px",
				threshold: 0,
			}
		);

		intersectionObserver.observe(node);

		return {
			destroy() {
				// console.log(intersectionObserver.unobserve);
				intersectionObserver.unobserve(node);
			},
		};
	}
</script>

<article
	class="card"
	class:card--inline={inline}
	on:focus={focusAccess}
	tabindex="0"
	in:scale={{
		delay,
		start: 0.9,
		opacity: 0,
		easing: quintOut,
		duration: 1000,
	}}
>
	<main class="card__wrapper">
		<div class="card__top" class:grid bind:this={card}>
			{#if prefetch}
				{#each imgs.slice(0, bultInGrid) as img (img)}
					{#if grid}
						<img
							on:click={ProductClickEvent}
							class="card__image"
							src={resizingImg(img)}
							alt={product.nombre + " item of products"}
						/>
					{:else}
						<img
							on:click={ProductClickEvent}
							class="card__image"
							src={resizingImg(img)}
							alt={product.nombre + " item of products"}
							style="display: {imgs.indexOf(img) == index ? 'block' : 'none'}"
						/>
					{/if}
				{/each}
			{:else}
				<img
					use:viewport
					on:click={ProductClickEvent}
					class="card__image"
					data-src={resizingImg(current)}
					alt={product.nombre + " item product"}
				/>
			{/if}
			{#if !grid}
				<button
					tabindex="-1"
					on:click={prevImg}
					class="card__btn card__btn--right"
					><svg viewBox="0 0 20 20">
						<path
							d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
						/>
					</svg></button
				>
				<button
					tabindex="-1"
					on:click={nextImg}
					class="card__btn card__btn--left"
					><svg viewBox="0 0 20 20">
						<path
							d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
						/>
					</svg></button
				>
			{/if}
		</div>
		<div class="card__bottom" on:click={ProductClickEvent}>
			<div class="card__details">
				<div class="card__title">{product.nombre}</div>
				<p class="card__description">${product.precio}</p>
			</div>
			<!-- <div class="card__buy">
				<svg class="card__icon-cart" viewBox="0 0 20 20">
					<path
						d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"
					/>
					<path
					d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"
					/>
					<path
					d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"
					/>
				</svg>
			</div> -->
		</div>
	</main>
</article>

<style lang="scss">
	// card
	.card--inline {
		display: inline-block;
	}
	.card.card--inline {
		box-shadow: none;
	}

	.card {
		width: 100%;
		min-width: 0px;
		max-width: 350px;
		min-height: 0;
		margin: 0 auto;
		border-radius: 10px 10px 10px 10px;
		cursor: pointer;
		border: 1px solid transparent;
		background-color: var(--bg-card);
		box-shadow: var(--shadow-card);

		&:hover,
		&:focus {
			border: 1px solid var(--bg-card-hover);
			background-color: var(--bg-card-hover);
			outline: 0;

			.card__title {
				// color: var(--neutral-6);
			}

			.card__description {
				// color: var(--primary);
			}
		}

		&:focus {
			.card__btn {
				background-color: var(--primary-opacity-4);
				// box-shadow: 0px 0px 0px 4px var(--primary-opacity-3);

				svg {
					opacity: 1;
				}
			}
		}
	}
	.card__wrapper {
		padding: 0.5em;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr;
	}

	.grid img:not(:nth-child(-n + 3)) {
		display: none;
	}

	.card__top {
		border-radius: 10px;
		position: relative;
		overflow: hidden;
		max-width: 100%;

		padding: 0;
		// background: url("../imgs/consweet-logo-letter.svg");
		// background-repeat: no-repeat;
		// background-position: center;
		// background-size: 20%;
		background-color: var(--primary-opacity-2);
	}
	.card__image {
		object-fit: cover;
		width: 100%;
		height: 100%;
		min-width: 100%;
		min-height: 100%;
	}
	.card__btn {
		display: none;
		position: absolute;
		top: 0;
		height: 100%;
		margin: 0;
		background-color: var(--primary-opacity-1);
		outline: 0;
		cursor: inherit;
		border: 0;

		@include media(">=small") {
			display: inline-block;
		}
		// &:focus,
		&:hover {
			background-color: var(--primary-opacity-4);
			// box-shadow: 0px 0px 0px 4px var(--primary-opacity-3);
		}
		svg {
			opacity: 0.3;
		}
	}

	.card__btn--left {
		right: 0;
	}
	.card__btn--right {
		left: 0;
	}

	.card__top {
		// svg {
		// 	opacity: 0.5;
		// }

		// &:hover {
		// 	svg {
		// 		opacity: 1;
		// 	}
		// }
	}

	.card__bottom {
		// min-height: 20%;
		// min-width: 100%;
		// background: white;
		// height: auto;
		// display: flex;
		padding: 0.5em 0.5em 0 0.5em;
		// transition: transform 0.5s;
	}
	.card__details {
		// border-radius: 10px;
		/* margin: auto 0; */
		// width: 75%;
		// display: flex;
		// flex-direction: column;
		// justify-content: space-evenly;
		/* overflow: hidden; */
	}

	.card__title {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		margin: 0;
		padding: 0;
		// font-size: 1rem;
		// color: var(--neutral-6);
		font-weight: 700;
	}

	.card__description {
		color: var(--primary);
		margin: 0;
		padding: 0;
		font-weight: 300;
		// font-size: 1.1rem;
		/* height: 100%; */
	}
	// .card__buy {
	// 	text-align: center;
	// 	width: 25%;
	// 	margin: auto 0;
	// 	/* background: #f1f1f1; */
	// 	transition: background 0.5s;
	// 	border-left: solid thin rgba(0, 0, 0, 0.1);
	// 	cursor: pointer;
	// }
	// .card__buy svg {
	// 	width: 35px;
	// 	height: auto;
	// }
	// .card__icon-cart {
	// 	fill: var(--neutral-6);
	// }
	// .card__wrapper:hover .card__icon-cart {
	// 	fill: var(--primary);
	// }
	/* .card__inside {
		z-index: 9;
		background: var(--primary);
		width: 140px;
		height: 140px;
		position: absolute;
		top: -70px;
		right: -70px;
		border-radius: 0px 0px 200px 200px;
		transition: all 0.5s, border-radius 2s, top 1s;
		overflow: hidden;
		color: white;
	}
	.card__icon {
		position: absolute;
		right: 85px;
		top: 85px;
		color: white;
		opacity: 1;
	}
	.card__icon svg {
		width: 25px;
		height: auto;
	}
	.card__icon path {
		fill: white;
	}
	.card__inside:hover {
		width: 100%;
		right: 0;
		top: 0;
		border-radius: 0;
		height: 80%;
	}
	.card__inside:hover .card__icon {
		opacity: 0;
		right: 15px;
		top: 15px;
	}
	.card__inside:hover .card__contents {
		opacity: 1;
		transform: scale(1);
		transform: translateY(0);
	}
	.card__contents {
		padding: 5%;
		opacity: 0;
		transform: scale(0.5);
		transform: translateY(-200%);
		transition: opacity 0.2s, transform 0.8s;
	}
	.card__table {
		text-align: left;
		width: 100%;
	} */

	/* media */
	/* @media (min-width: 768px) {
		.card {
			width: 350px;
			height: 300px;
		}
	} */
</style>
