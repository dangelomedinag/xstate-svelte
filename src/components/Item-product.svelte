<script>
	//? imports system
	//? imports components, store and function
	//? props

	export let product;

	//? variables
	let current = product.imgs[0];

	//? Logic

	function resizingTumblr(url) {
		let splited = url.split("upload");
		let word = "upload/";
		let config = "w_50,h_50,c_fill";
		let newUrl = splited[0] + word + config + splited[1];
		return newUrl;
	}

	function resizingImg(url) {
		let splited = url.split("upload");
		let word = "upload/";
		let config = "w_500,h_500,c_fill";
		let newUrl = splited[0] + word + config + splited[1];
		return newUrl;
	}

	function setCurrentImg(index) {
		current = product.imgs[index];
	}

	function unanimated(node, config) {
		return {
			css: (t) => {
				return ``;
			},
		};
	}
</script>

<div class="courses-container">
	<div class="course">
		<div class="course-preview">
			<h6>{product.tipo}</h6>
			<h2 class="title">{product.nombre}</h2>
			<div class="wrapper-price">
				<span class="price">precio: ${product.precio}</span>
			</div>
		</div>
		<div class="course-info">
			<h6>Descripcion de producto</h6>
			<p class="description">
				{@html product.descripcion}
			</p>
		</div>
	</div>
</div>
<hr class="divider" />
<div class="section-wrapper">
	<div class="layout">
		<div class="col">
			<h3 class="subtitle">Contacto</h3>
			<slot />
		</div>
		<div class="col">
			<div class="list-images-wrapper">
				{#each product.imgs as img (img)}
					<div
						class:active={product.imgs.indexOf(img) ==
							product.imgs.indexOf(current)}
						class="image-wrapper"
					>
						<img
							class="thumbnail"
							src={resizingTumblr(img)}
							alt="thumbnail current product {product.name}"
							on:mouseover={setCurrentImg(product.imgs.indexOf(img))}
						/>
					</div>
				{/each}
			</div>
			{#each product.imgs as img (img)}
				<img
					class="img-full"
					style="display: {product.imgs.indexOf(img) ==
					product.imgs.indexOf(current)
						? 'block'
						: 'none'}"
					src={resizingImg(img)}
					alt="current product {product.name}"
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.courses-container {
		padding: var(--space-y) var(--space-x);
		width: 100%;
		overflow: hidden;
		max-height: 813px;
	}

	.course {
		/* background-color: #fff; */
		border-radius: 15px;
		/* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2); */
		display: flex;
		max-width: 100%;
		margin: 0 auto;
		overflow: hidden;
		width: 100%;
		flex-direction: column;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05),
			0 4px 8px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.05),
			0 16px 32px rgba(0, 0, 0, 0.05), 0 32px 64px rgba(0, 0, 0, 0.05);
	}
	.course-preview {
		background-color: var(--item-preview-bg);
		color: var(--item-preview-color);
		padding: 0.8em 1.5em;
		width: 100%;
	}

	.course h6 {
		opacity: 0.6;
		margin: 0;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.wrapper-price {
		background-color: var(--secondary);
		border: 0;
		border-radius: 50px;
		/* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2); */
		padding: 1em;
		max-width: 150px;
		/* min-width: 100%; */
	}
	.price {
		display: block;
		max-width: 100%;
		text-align: center;
	}

	/* .course-preview h6 {
		color: var(--item-preview-color);
	}
	.course-preview h2 {
		color: var(--item-preview-color);
	} */

	.course .title {
		letter-spacing: 1px;
		margin: 0.5em 0;
	}
	.course .description {
		margin: 10px 0;
		font-size: 1rem;
		color: gray;
	}

	/* .course-preview a {
		color: #fff;
		display: inline-block;
		font-size: 0.8rem;
		opacity: 0.6;
		margin-top: 30px;
		text-decoration: none;
	} */

	.course-info {
		background-color: var(--item-info-bg);
		padding: 0.8em 1.5em;
		position: relative;
		width: 100%;
	}
	.course-info h6 {
		color: #b7b7b7;
	}

	/* .progress-container {
		position: absolute;
		top: 30px;
		right: 30px;
		text-align: right;
		width: 150px;
	} */

	/* .progress {
		background-color: #ddd;
		border-radius: 3px;
		height: 5px;
		width: 100%;
	}

	.progress::after {
		border-radius: 3px;
		background-color: var(--primary);
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 5px;
		width: 66%;
	}

	.progress-text {
		font-size: 10px;
		opacity: 0.6;
		letter-spacing: 1px;
	} */

	/* .btn {
		background-color: var(--secondary);
		border: 0;
		border-radius: 50px;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
		color: #fff;
		font-size: 16px;
		padding: 12px 25px;
		letter-spacing: 1px;
	} */

	.divider {
		/* --color-opacity: 0.2; */
		/* width: 80%; */
		width: 100%;
		height: 1px;
		background-color: var(--primary-alpha);
		border: none;
		margin: 0;
	}

	@media (min-width: 1280px) {
	}
	.section-wrapper {
		padding: var(--space-y) var(--space-x);
		margin: 0 auto;
	}
	.layout {
		display: flex;
		flex-direction: column-reverse;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.col {
		width: 100%;
		max-width: 500px;
		padding: 1em 0;
	}

	.contact-methods-wrapper {
		max-width: 400px;
		margin: 1em auto;
	}

	.list-images-wrapper {
		position: relative;
		border-radius: 10px;
		/* overflow: hidden; */
		padding: 0.5em;
		/* background: var(--neutral-6); */
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: no-wrap;
		margin-bottom: 0.5em;
		overflow-y: hidden;
		overflow-x: auto;
		border: 1px solid var(--primary);
		scroll-behavior: smooth;
		scrollbar-color: var(--primary, #f36262) transparent !important;
		scrollbar-width: thin;
	}

	.list-images-wrapper::-webkit-scrollbar {
		height: 5px;
		border-radius: 10px;
	}
	/* Track */
	.list-images-wrapper::-webkit-scrollbar-track {
		/* height: 5px; */
		margin: 0 14px;
	}
	/* Handle */
	.list-images-wrapper::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: var(--primary-opacity-2, #f362621a);
	}
	/* Handle on hover */
	.list-images-wrapper::-webkit-scrollbar-thumb:hover {
		background: var(--primary, #e98585);
	}
	.image-wrapper {
		position: relative;
		min-width: 60px;
		height: 60px;
		min-width: 60px;
		max-width: 80px;
		min-height: 60px;
		/* margin: 5px 0; */
	}

	.thumbnail {
		flex: 1 0 80px;
		height: 100%;
		cursor: pointer;
		object-fit: cover;
	}
	.img-full {
		border-radius: 10px;
		overflow: hidden;
		object-fit: cover;
		width: 100%;
		height: auto;
	}

	.active::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: var(--primary);
		transform: translateY(-100%);
		transition: all 0.5s ease-in-out;
	}

	.subtitle {
		font-size: 1.3em;
		margin: 0;
		margin-bottom: 0.5em;
	}
	@media (min-width: 640px) {
	}

	@media (min-width: 768px) {
		.course {
			flex-direction: row;
		}

		.col:nth-child(1) {
			margin-right: 0.5em;
		}

		.col:nth-child(2) {
			margin-left: 0.5em;
		}
	}

	@media (min-width: 1024px) {
		.course {
			max-width: 1024px;
		}
		.course-preview {
			width: 40%;
		}
		.course-info {
			width: 60%;
		}

		.layout {
			flex-direction: row;
			align-items: flex-start;
		}
		.col {
			max-width: 600px;
		}
	}
</style>
