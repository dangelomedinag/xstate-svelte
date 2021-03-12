<script>
	import { createEventDispatcher } from "svelte";

	export let products;
	let id = "fc95bceb-9703-4534-bff3-96541bde2f89";

	const dispatch = createEventDispatcher();

	function ProductClickEvent() {
		let product = products.filter((it) => it.id === id)[0];

		dispatch("clickCard", { product });
		console.log("click on card product", product);
	}

	// console.log(data);

	let promos = [
		{
			id: "1",
			typo: "dulce",
			name: "tres leches",
			price: 1500,
			img1: "/imgs/promo-tresleches-1.jpg",
			img2: "/imgs/promo-tresleches.png",
		},
		{
			id: "2",
			type: "postre",
			name: "Quesillo",
			price: 1000,
			img1: "/imgs/promo-quesillo-1.jpg",
			img2: "/imgs/promo-quesillo.png",
		},
	];
</script>

<div class="promo-wrapper">
	{#each promos as promo (promo.id)}
		<article class="promo" on:click={ProductClickEvent}>
			<div class="first" style="background-image: url('{promo.img1}');">
				<div class="new1">
					<span>{promo.type}</span>
					<h4>{promo.name}</h4>
					<span>🍰 desde ${promo.price}</span>
					<button>ver más</button>
				</div>
			</div>
			<div class="last">
				<img src={promo.img2} alt="" />
			</div>
		</article>
	{/each}
</div>

<style lang="scss">
	.promo-wrapper {
		width: auto;
		height: auto;
		// padding: 1em 1.5em;
		padding: var(--space-y) var(--space-x);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		flex-basis: 100%;
		// background-color: rgb(219, 219, 219);
		// @include media(">=tablet") {
		// 	padding: 1em 0;
		// }
	}

	$gap-margin: 0.5em;

	@include media(">=small") {
		.promo-wrapper .promo:nth-child(1) {
			margin-right: $gap-margin;
		}
		.promo-wrapper .promo:nth-child(2) {
			margin-left: $gap-margin;
		}
	}

	$color: var(--primary);
	.promo {
		flex-basis: 100%;
		height: 200px;
		max-width: 425px;
		// border: 1px solid gray;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: var(--promo-color);
		border-radius: 10px;
		overflow: hidden;
		margin-top: $gap-margin;
		margin-bottom: $gap-margin;

		background-image: linear-gradient(
			190deg,
			var(--promo-gradient-front) 75%,
			var(--promo-gradient) 75.3%
		);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		text-align: center;
		background-color: var(--neutral);
		cursor: pointer;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05),
			0 4px 8px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.05),
			0 16px 32px rgba(0, 0, 0, 0.05), 0 32px 64px rgba(0, 0, 0, 0.05);

		@include media(">=small") {
			flex-basis: calc(50% - #{$gap-margin});
		}
		@include media(">=tablet") {
			flex-basis: calc(50% - #{$gap-margin});
			background-image: linear-gradient(
				75deg,
				var(--promo-gradient-front) 75%,
				var(--promo-gradient) 75.3%
			);
			flex-direction: row;
			// height: 200px;
			max-width: 650px;
		}

		button {
			font-size: 0.8rem;
			// position: absolute;
			// bottom: 0;
			// left: 0;
			cursor: inherit;
			display: none;
			border-radius: 50vw;
			padding: 0.5em 3em;
			// margin-top: 1em;
			margin: 1em;
			background-color: var(--promo-bg);
			color: var(--promo-btn-color);
			border: 2px solid white;
			outline: none;
			transition: box-shadow 0.3s, transform 0.3s;
			transform: scale(1);
			// &:hover {
			// 	color: var(--primary);
			// 	background-color: white;
			// 	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07),
			// 		0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
			// 		0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			// 		0 32px 64px rgba(0, 0, 0, 0.07);
			// 	transform: scale(1.1);
			// }

			@include media(">=tablet") {
				display: inline-block;
			}
		}

		&:hover {
			button {
				color: var(--primary);
				background-color: white;
				box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
					0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
					0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
				transform: scale(1.1);
			}
		}

		.first,
		.last,
		.new1 {
			width: 100%;
			height: 100%;
		}

		.first {
			flex-grow: 1;
			flex-shrink: 0;
			flex-basis: 45%;
			// background: linear-gradient(transparent, $color 95%),
			// url("/imgs/promo-tresleches-1.jpg");
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			// background-color: $color;
			text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);

			@include media(">=tablet") {
				flex-basis: 70%;
				// background: linear-gradient(90deg, transparent, $color),
				// url("/imgs/promo-tresleches-1.jpg");
			}

			span:first-child {
				// font-style: italic;
				display: none;
				font-weight: 300;
				font-size: 1.5rem;
				letter-spacing: 1.8px;

				@include media(">=tablet") {
					// font-size: 1.2rem;
				}
			}
			span:last-child {
				// font-style: italic;
				font-size: 1rem;
			}

			h4 {
				margin: 0;
				font-size: 12vw;
				font-weight: 900;

				@include media(">=small") {
					font-size: 6vw;
					// font-size: 1.8rem;
				}

				@include media(">=tablet") {
					font-size: 2rem;
					// font-size: 2.5vw;
				}
				@include media(">=desktop") {
					font-size: 2.5rem;
					// font-size: 4rem;
				}
			}
		}

		.last {
			overflow: hidden;
			flex-grow: 0;
			flex-shrink: 1;
			flex-basis: auto;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			// background-size: 300px;
			// background-position: center -30px;
			// background-repeat: repeat-x;
			// text-align: center;
			img {
				height: 170%;
				width: auto;
				transform: translate(3px, -18px);

				@include media(">=tablet") {
					height: 120%;
					transform: translate(-18px, -1px);
				}
			}

			@include media(">=tablet") {
				justify-content: flex-start;
				align-items: center;
				// background-size: 250px;
				// background-position: -20px center;
				// background-repeat: no-repeat;
			}
		}
		.new1 {
			background: linear-gradient(transparent, var(--promo-gradient-front) 95%);
			flex-grow: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			flex-direction: column;

			@include media(">=tablet") {
				background: linear-gradient(
					90deg,
					transparent,
					var(--promo-gradient-front)
				);
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
