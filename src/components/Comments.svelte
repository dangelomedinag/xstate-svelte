<script>
	import { onDestroy } from "svelte";

	import { store } from "../libs/stores/products-store";
	import timeago from "../libs/timeago";
	import SectionButton from "./Section-button.svelte";
	export let id;

	let value = "";

	function valueClear() {
		return value.trim();
	}

	function onfocus() {
		value = "Lorem ipsum dolor sit amet consectetur, adipisicing elit.";
	}
	let current = {};
	let products = [];
	let categories = [];

	const unsubscriber = store.subscribe((d) => {
		let likes = [...d.comments].filter((ele) => ele.id === id)[0].likes;
		let comments = [...d.comments].filter((ele) => ele.id === id)[0];

		current = { ...[...d.products].filter((ele) => ele.id === id)[0] };

		current.likes = likes;
		current.comments = comments;

		products = [...d.products];
		categories = [...d.categories];
	});

	onDestroy(() => {
		unsubscriber();
	});

	function addCountLikes() {
		store.update((data) => {
			let prodid = data.comments.findIndex((el) => el.id === id);
			data.comments[prodid].likes += 1;
			return data;
		});
	}

	// $: console.log(current.id);
</script>

<div
	style="display: flex; justify-content: space-between; flex-direction: column; height:100%"
>
	<div class="scroll" style="padding: 0.5em; overflow-y:auto">
		{current.nombre}
		<button on:click={addCountLikes}>
			<svg class="actions__icon" width="100" height="100"
				><path
					d="M11.045,2.011a3.345,3.345,0,0,0-4.792,0c-.075.075-.15.225-.225.3-.075-.074-.15-.224-.225-.3a3.345,3.345,0,0,0-4.792,0,3.345,3.345,0,0,0,0,4.792l5.017,4.718L11.045,6.8A3.484,3.484,0,0,0,11.045,2.011Z"
				/></svg
			>
			<span>{current.likes}</span>
		</button>
		<h2>comentarios ({current.comments.comments.length})</h2>
		<section class="comments">
			<!-- <div class="comments__shape" /> -->
			<ul>
				{#each current.comments.comments.sort((a, b) =>
					a.created_at._seconds < b.created_at._seconds ? 1 : -1
				) as { id, name, comment, created_at }, i (id)}
					<li class="comments__item">
						<header class="comments__header" style="width: 100%">
							<span class="comments__username" style="font-weight: 700;">
								{name}
							</span>

							<span class="comments__date">
								{timeago(created_at._seconds)}
							</span>
						</header>
						<div class="comments__comment">
							<p class="comments__content">
								{comment}
							</p>
						</div>
					</li>
				{:else}
					<li class="comments__item">
						Aún no hay comentarios, <strong>se el primero!</strong>
					</li>
				{/each}
			</ul>
		</section>
	</div>
	<div
		style="border-top: 1px solid rgba(255, 255, 255, 0.1); position: sticky;bottom: 0;left: 0;z-index: 1;background-color: var(--modal-bg);padding: 0.5em;"
	>
		<form on:submit|preventDefault>
			<label for="test">Comentario</label>
			<textarea
				bind:value
				id="test"
				name="test"
				placeholder="dummy placeholder"
			/>
			{#if value}
				<div class="row">
					<div class="column">
						<label for="name">Nombre</label>
						<input type="text" id="name" name="name" placeholder="nombre" />
					</div>
					<div class="column">
						<label for="email">Email</label>
						<input
							on:focus={onfocus}
							type="email"
							id="email"
							name="email"
							placeholder="correo electrónico"
						/>
					</div>
				</div>
			{/if}

			<!-- <div class="wrap-buttons">
				<SectionButton type="submit" main>enviar</SectionButton>
				<SectionButton type="reset" main outline>cancelar</SectionButton>
			</div> -->
		</form>
	</div>
</div>

<!-- <ul>
	{#each current.comments.sort((a, b) =>
		a.created_at._seconds < b.created_at._seconds ? 1 : -1
	) as comment (comment.id)}
		<li>
			<span>name: {comment.name}</span>

			<span>{timeago(comment.created_at._seconds)}</span>
			<div>
				{comment.comment}
			</div>
		</li>
	{:else}
		<li>
			<div>No hay comentarios aun</div>
		</li>
	{/each}
</ul> -->
<style lang="scss">
	textarea {
		// margin-top: 1em;
		width: 100%;
		height: auto;
		border: none;
		outline: none;
		border-radius: 5px;
		background-color: var(--comment-textarea-bg);
		// border-bottom: 2px solid var(--primary-opacity-1);
		padding: 0.2em 1em;
	}

	textarea:focus {
		color: black;
		background-color: var(--comment-textarea-bg-active);
		// border-bottom: 2px solid var(--primary-opacity-3);
	}
	input {
		// margin-top: 1em;
		width: 100%;
		border: none;
		outline: none;
		border-radius: 5px;
		background-color: var(--comment-textarea-bg);
		// border-bottom: 2px solid var(--primary-opacity-1);
		padding: 0.2em 1em;
	}

	input:focus {
		color: black;
		background-color: var(--comment-textarea-bg-active);
		// border-bottom: 2px solid var(--primary-opacity-3);
	}

	label {
		display: block;
		margin: 0;
		padding-top: 0.3em;
		opacity: 0.5;
	}

	form {
		// border-width: 1px;
		// border-style: solid;
		// border-color: rgba(255, 255, 255, 0.3);
		// background-color: var(--comment-bg);
		// padding-top: 5em;
		// border-radius: 5px;
		// margin-bottom: 0.5em;

		// position: sticky;
		// bottom: 0;
		// left: 0;
		// z-index: 1;
		width: 100%;
		// background-color: var(--modal-bg);
		// padding-bottom: 1em;
		font-size: 0.8rem;
		// background-color: var(--secondary);
	}

	.row {
		display: flex;

		& > * {
			flex-basis: 100%;
		}

		& .column:nth-child(1) {
			margin-right: 0.1em;
		}

		& .column:nth-last-child(1) {
			margin-left: 0.1em;
		}
	}

	.wrap-buttons {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.scroll {
		overflow-y: auto;
		scrollbar-color: var(--primary-opacity-1, rgba(0, 0, 0, 0.2)) transparent !important;
		scrollbar-width: thin;

		&::-webkit-scrollbar {
			width: 15px;

			&-track {
				background: transparent;
			}

			&-thumb {
				border-radius: 10px;
				background: rgba(0, 0, 0, 0.1);
				border: 5px solid var(--modal-bg);

				&:hover {
					background: rgba(0, 0, 0, 0.2);
				}
			}
		}
	}

	// reset ul elements

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.comments {
		// max-width: 350px;
		// font-size: 0.8rem;
		padding: 0.5em 0;
		font-size: 0.8rem;
	}

	.comments__shape {
		width: 0;
		height: 0;
		border-right: 10px solid transparent;
		border-top: 0px solid transparent;
		border-left: 10px solid transparent;
		border-bottom: 10px solid var(--comment-bg);
		margin: 0 auto;
		font-weight: 300;
	}

	.comments__item {
		background-color: var(--comment-bg);
		margin-bottom: 0.5em;
		padding: 0.3em 0.5em;
		border-radius: 5px;
	}

	.comments__header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 0.5em;
	}
	$margin-x: 0.5em;

	.comments__avatar {
		display: none;
		$size: 1.5em;

		width: $size;
		height: $size;
		min-width: $size;
		min-height: $size;
		overflow: hidden;
		border-radius: 100%;
		margin-right: $margin-x;

		@include media(">=phone") {
			display: inline-block;
		}
	}

	.comments__username {
		color: var(--comment-username);
		white-space: nowrap;
		margin-right: 0;
		margin-left: 0;
	}

	.comments__date {
		display: inline-block;
		width: auto;
		margin-left: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.comments__comment {
		width: 100%;
		// margin-top: 0.5em;
	}
	.comments__content {
		display: inline-block;
		max-width: 100%;
		margin: 0;
		font-weight: 300;
	}
</style>
