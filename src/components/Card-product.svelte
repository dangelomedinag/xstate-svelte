<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { linear, quintInOut, quintOut } from "svelte/easing";
	import { fly, scale } from "svelte/transition";

	export let product,
		delay = 200;
	// export let skeleton = false;
	// export let in_fly = {
	//   delay: 0,
	//   duration: 1800,
	//   easing: quintInOut,
	//   y: 400,
	//   opacity: 0,
	// };
	// export let out_fly = {
	//   duration: 0,
	//   easing: linear,
	//   y: 0,
	//   opacity: 0,
	// };

	const dispatch = createEventDispatcher();
	const { imgs } = product;
	let prefetch = false;
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
		// console.log('click on card product');
	}

	function focusAccess(e) {
		const target = e.target;
		// console.log(target);
		function simulateClick(event) {
			if (
				event.which == 13 ||
				event.key === "Enter" ||
				event.which == 32 ||
				event.key === " "
			) {
				event.preventDefault();
				ProductClickEvent();
				target.removeEventListener("keydown", simulateClick);
			} else {
				target.removeEventListener("keydown", simulateClick);
			}
		}
		target.addEventListener("keydown", simulateClick);
	}

	function nextImg() {
		index == length ? (index = 0) : index++;
	}

	function prevImg() {
		index == 0 ? (index = length) : index--;
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
</script>

<article
	class="card"
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
		<div class="card__top">
			{#if prefetch}
				{#each imgs as img (img)}
					<img
						on:click={ProductClickEvent}
						class="card__image"
						src={resizingImg(img)}
						style="display: {imgs.indexOf(img) == index ? 'block' : 'none'}"
						alt={product.nombre + " item of products"}
					/>
				{/each}
			{:else}
				<img
					on:click={ProductClickEvent}
					class="card__image"
					src={resizingImg(current)}
					alt={product.nombre + " item product"}
				/>
			{/if}
			<button
				use:longhover
				on:click={prevImg}
				class="card__btn card__btn--right"
				><svg class="svg-reset" viewBox="0 0 20 20">
					<path
						d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
					/>
				</svg></button
			>
			<button use:longhover on:click={nextImg} class="card__btn card__btn--left"
				><svg class="svg-reset" viewBox="0 0 20 20">
					<path
						d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
					/>
				</svg></button
			>
		</div>
		<div class="card__bottom" on:click={ProductClickEvent}>
			<div class="card__details">
				<h1 class="card__title">{product.nombre}</h1>
				<p class="card__description">${product.precio}</p>
			</div>
			<div class="card__buy">
				<svg class="svg-reset card__icon-cart" viewBox="0 0 20 20">
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
			</div>
		</div>
	</main>
	<!-- <div class="card__inside">
		<div class="card__icon">
			<svg class="svg-reset" viewBox="0 0 20 20">
				<path
					d="M10,1.445c-4.726,0-8.555,3.829-8.555,8.555c0,4.725,3.829,8.555,8.555,8.555c4.725,0,8.555-3.83,8.555-8.555C18.555,5.274,14.725,1.445,10,1.445 M10,17.654c-4.221,0-7.654-3.434-7.654-7.654c0-4.221,3.433-7.654,7.654-7.654c4.222,0,7.654,3.433,7.654,7.654C17.654,14.221,14.222,17.654,10,17.654 M14.39,10c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,9.55,14.39,9.752,14.39,10 M14.39,12.702c0,0.247-0.203,0.449-0.45,0.449H6.06c-0.248,0-0.45-0.202-0.45-0.449c0-0.248,0.203-0.451,0.45-0.451h7.879C14.187,12.251,14.39,12.454,14.39,12.702 M14.39,7.298c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,6.848,14.39,7.051,14.39,7.298"
				/>
			</svg>
		</div>
		<div class="card__contents">
			<table class="card__table">
				<tr>
					<th>Width</th>
					<th>Height</th>
				</tr>
				<tr>
					<td>3000mm</td>
					<td>4000mm</td>
				</tr>
				<tr>
					<th>Something</th>
					<th>Something</th>
				</tr>
				<tr>
					<td>200mm</td>
					<td>200mm</td>
				</tr>
				<tr>
					<th>Something</th>
					<th>Something</th>
				</tr>
			</table>
		</div>
	</div> -->
</article>

<style>
	/* card */
	.card {
		display: inline-block;
		width: 100%;
		max-width: 350px;
		height: 300px;
		margin: 0;
		position: relative;
		overflow: hidden;
		border-radius: 10px 10px 10px 10px;
		transform: scale(0.98);
		transition: transform 0.5s;
		cursor: pointer;
	}
	.card:hover,
	.card:focus {
		outline: 0;
		transform: scale(1);
	}
	.card__wrapper {
		width: 100%;
		height: 100%;
	}
	.card__top {
		height: 80%;
		display: flex;
		justify-content: space-between;
		position: relative;
		overflow: hidden;
		/* guards if failed load imgs */
		background: url("../imgs/consweet-logo-letter.svg");
		background-repeat: no-repeat;
		background-position: center;
		background-size: 20%;
		background-color: var(--primary-opacity-2);
	}
	.card__image {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
	.card__btn {
		position: absolute;
		top: 0;
		height: 100%;
		margin: 0;
		background-color: var(--primary-opacity-2);
		outline: 0;
		cursor: inherit;
		border: 0;
	}
	.card__btn:hover,
	.card__btn:focus {
		background-color: var(--primary-opacity-6);
		box-shadow: 0px 0px 0px 4px var(--primary-opacity-3);
	}
	.card__btn:hover,
	.card__btn:focus svg {
		opacity: 1;
	}
	.card__btn--left {
		right: 0;
	}
	.card__btn--right {
		left: 0;
	}
	.card__top svg {
		opacity: 0.5;
	}
	.card__top:hover svg {
		opacity: 1;
	}
	.card__bottom {
		background: white;
		/* width: 100%; */
		/* min-width: 200px; */
		height: 20%;
		display: flex;
		transition: transform 0.5s;
	}
	.card__details {
		padding: 0 1em;
		margin: auto 0;
		width: 75%;
		min-width: 0;
	}
	.card__title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--neutral-6);
		font-size: 1em;
		margin: 0;
		padding: 0;
		position: relative;
	}
	.card__description {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--neutral-6);
		margin: 0;
		padding: 0;
		/* height: 100%; */
	}
	.card__buy {
		text-align: center;
		width: 25%;
		margin: auto 0;
		/* background: #f1f1f1; */
		transition: background 0.5s;
		border-left: solid thin rgba(0, 0, 0, 0.1);
		cursor: pointer;
	}
	.card__buy svg {
		width: 35px;
		height: auto;
	}
	.card__icon-cart {
		fill: var(--neutral-6);
	}
	.card__wrapper:hover .card__icon-cart {
		fill: var(--primary);
	}
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
	@media (min-width: 768px) {
		.card {
			width: 350px;
			height: 300px;
		}
	}
</style>
