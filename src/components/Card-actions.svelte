<script>
	import relativeTime from "../libs/timeago";
	import { createEventDispatcher, onDestroy, tick } from "svelte";
	import { slide } from "svelte/transition";
	import { store } from "../libs/stores/products-store";

	// let products;
	// let categories;
	export let item;
	let comments;
	let current;
	let value = false;
	let status = false;
	let ok = true;
	let name = "";
	let email = "";

	const unsubscriber = store.subscribe((r) => {
		comments = r.comments;
		current = comments.filter((el) => el.id === item.id)[0];
		if (r.activeUser) {
			name = r.activeUser.name;
			email = r.activeUser.email;
		}
		if (current.activeLike) {
			status = true;
			ok = true;
		}
	});

	onDestroy(() => {
		unsubscriber();
	});

	// function getProductPropertiesById(id) {
	// 	let keys = Object.keys($store);
	// 	let values = {};
	// 	let product = products.filter((t) => t.id === id)[0];
	// 	keys.forEach((k) => {
	// 		const match = $store[k].filter(
	// 			(item) => item.id === id || item.id === product.categoria_id
	// 		);
	// 		values[k] = match[0];
	// 	});
	// 	console.log(values);
	// }

	// getProductPropertiesById("6383e8ba-bd46-4aeb-8dc5-1a3148486b1d");

	// export let isolate = false;

	const dispatch = createEventDispatcher();

	function likeEvent() {
		// console.log(comments.users_likes);

		let ref = comments.indexOf(comments.filter((y) => y.id === item.id)[0]);
		let users_likes = comments[ref].users_likes;

		if (
			users_likes == undefined ||
			typeof users_likes === "undefined" ||
			typeof users_likes !== "object" ||
			!(users_likes instanceof Array)
		) {
			console.log("no existe");
			dispatch("like", { id: item.id, user: { name, email } });
			showStatusAndClose(true);
		} else {
			console.log("existe! continuo");
			if (!users_likes.length) {
				dispatch("like", { id: item.id, user: { name, email } });
				showStatusAndClose(true);
			} else {
				const even = (element) =>
					element.email.toLowerCase() === email.toLowerCase();

				const exist = users_likes.some(even);
				console.log("exist in array: ", users_likes.some(even));

				if (!exist) {
					dispatch("like", { id: item.id, user: { name, email } });
					showStatusAndClose(true);
				} else {
					showStatusAndClose(false);
					console.log("ya se registro like con este correo para este producto");
				}
			}
		}
		// console.log("1", users_likes == undefined, users_likes);
		// console.log("2", typeof users_likes === "undefined", users_likes);
		// console.log("3", typeof users_likes === "object", users_likes);
		// console.log("4", users_likes instanceof Array, users_likes);

		// console.log(exist);

		// addCountLikes();
	}
	function commentEvent() {
		dispatch("comment", { id: item.id });
	}
	function shareEvent() {
		dispatch("share", { id: item.id });
		shared();
	}

	function showStatusAndClose(res) {
		status = true;
		ok = res;

		let timer;

		if (!ok) {
			return;
		}
		timer = setTimeout(() => {
			value = false;
			// status = false;
			return clearTimeout(timer);
		}, 2000);
	}

	// function addCountLikes() {
	// 	store.update((data) => {
	// 		// let id = data.comments.indexOf(current);
	// 		// let key = Object.keys(data.comments[id]);
	// 		// console.log(id, key);

	// 		// data.comments[id].likes = data.comments[id].likes + 1;
	// 		let id = data.comments.findIndex((el) => el.id === item.id);
	// 		data.comments[id].likes += 1;
	// 		return data;
	// 	});
	// }

	const shared = async () => {
		const id = item.id;
		const url = "https://consweet.netlify.app/?id=" + id;
		const shareData = {
			title: "Consweet",
			text: "Descubre estas delicias que esperan por ti!",
			url,
		};
		try {
			await navigator.share(shareData);
		} catch (err) {
			// console.error(`navigator.share() no disponible. \n ${err}`);
			try {
				await navigator.clipboard.writeText(url);
				console.log("copy to clipboard");
			} catch (e) {
				console.log(e);
			}
		}
	};

	// let change = false;
	// // let value = "mandalo";
	// const [send, receive] = crossfade({
	// 	delay: 500,
	// 	duration: 1500,
	// 	fallback: scale,
	// 	easing: quintOut,
	// });

	// function addCommentToArry() {
	// 	showMore();

	// 	commentsShort = [
	// 		{
	// 			created_at: { _seconds: 1613700600, _nanoseconds: 0 },
	// 			name,
	// 			comment: value,
	// 			id: Date.now(),
	// 		},
	// 		...item.comments,
	// 	].sort((a, b) => {
	// 		return a.created_at._seconds < b.created_at._seconds ? 1 : -1;
	// 	});
	// }
	// fdskfdhfdfhdshshidhds-------

	// delete item.comments;
	// delete item.likes;

	// item.comments = comments
	// 	.filter((it) => it.id == item.id)[0]
	// 	.comments.sort((a, b) => {
	// 		return a.created_at._seconds < b.created_at._seconds ? 1 : -1;
	// 	});

	// item.likes = comments.filter((it) => it.id == item.id)[0].likes;

	// $: console.log(commentsShort);

	// let value =
	// 	"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo harum obcaecati quis hic dolores mollitia?";
	// let email = "dangelomeding@gmail.com";
	// let name = "Dangel Medina";
	// let limit = 2;
	// let commentsShort = [...item.comments].splice(0, limit);
	// let expand = false;

	// function showMore() {
	// 	if (item.comments.length > limit) {
	// 		if (!expand) {
	// 			// console.log("todos");
	// 			commentsShort = [...item.comments];
	// 			expand = true;
	// 		} else {
	// 			// console.log("no todos");

	// 			commentsShort = [...item.comments].splice(0, limit);
	// 			expand = false;
	// 		}
	// 	}
	// }

	// let show = false;
	// let textarea;
	// let boxComments;
	// let actions = [
	// 	[
	// 		{
	// 			label: item.likes,
	// 			active: false,
	// 			onClick() {
	// 				dispatch("like", { id: item.id });
	// 				// item.likes++;
	// 			},
	// 		},
	// 		"M11.045,2.011a3.345,3.345,0,0,0-4.792,0c-.075.075-.15.225-.225.3-.075-.074-.15-.224-.225-.3a3.345,3.345,0,0,0-4.792,0,3.345,3.345,0,0,0,0,4.792l5.017,4.718L11.045,6.8A3.484,3.484,0,0,0,11.045,2.011Z",
	// 	],
	// 	[
	// 		{
	// 			label: item.comments.length,
	// 			active: null,
	// 			async onClick() {
	// 				dispatch("comment", { id: item.id });
	// 				show = !show;
	// 				// open = !open;
	// 				if (show) {
	// 					await tick();
	// 					// textarea.focus();
	// 					boxComments.scrollIntoView({ block: "center" });
	// 				}
	// 			},
	// 		},
	// 		"M6,0C2.691,0,0,2.362,0,5.267s2.691,5.266,6,5.266a6.8,6.8,0,0,0,1.036-.079l2.725,1.485A.505.505,0,0,0,10,12a.5.5,0,0,0,.5-.5V8.711A4.893,4.893,0,0,0,12,5.267C12,2.362,9.309,0,6,0Z",
	// 	],

	// 	[
	// 		{
	// 			label: "",
	// 			active: null,
	// 			onClick() {
	// 				dispatch("share", { id: item.id });
	// 			},
	// 		},
	// 		"M6,4C2.975,4,0,5.8,0,11,1.575,8.45,3.6,8,6,8v3l6-5L6,1Z",
	// 	],
	// ];

	// afterUpdate(() => {
	// console.log("update");
	// if (show) {
	// console.log(textarea);
	// textarea.focus();
	// boxComments.scrollIntoView({ block: "center" });
	// } else {
	// document.querySelectorAll(".wrapper__card-list").forEach((ele) => {
	// 	if (ele.contains(textarea)) {
	// 		ele.querySelector(".card").focus();
	// 		console.log(ele);
	// 	}
	// });
	// }
	// });

	function likeToggle() {
		value = !value;
	}
</script>

<!-- {#if value}
	<div
		class="blackout"
		style="display: {value
			? 'block'
			: 'none'}; position: fixed;top: 0;left: 0;width: 100vw;height: 100vh;background-color: #000000a1;z-index: 2; pointer-events: none;"
	/>
{/if} -->

<footer class="actions">
	<ul class="actions__list">
		<li class="actions__item">
			<button class="actions__btn" on:click={likeToggle}>
				<svg
					class:active={current.activeLike ? true : false}
					class="actions__icon"
					viewBox="-4 -4 20 20"
					><path
						d="M11.045,2.011a3.345,3.345,0,0,0-4.792,0c-.075.075-.15.225-.225.3-.075-.074-.15-.224-.225-.3a3.345,3.345,0,0,0-4.792,0,3.345,3.345,0,0,0,0,4.792l5.017,4.718L11.045,6.8A3.484,3.484,0,0,0,11.045,2.011Z"
					/></svg
				>

				<span class="actions__label" in:slide|local
					>{comments.filter((el) => el.id === item.id)[0].likes}</span
				>
			</button>
		</li>
		<li class="actions__item">
			<button class="actions__btn" on:click={commentEvent}>
				<svg class="actions__icon" viewBox="-4 -4 20 20"
					><path
						d="M6,0C2.691,0,0,2.362,0,5.267s2.691,5.266,6,5.266a6.8,6.8,0,0,0,1.036-.079l2.725,1.485A.505.505,0,0,0,10,12a.5.5,0,0,0,.5-.5V8.711A4.893,4.893,0,0,0,12,5.267C12,2.362,9.309,0,6,0Z"
					/></svg
				>

				<span class="actions__label" in:slide|local
					>{current.comments.length}</span
				>
			</button>
		</li>
		<li class="actions__item">
			<button class="actions__btn" on:click={shareEvent}>
				<svg class="actions__icon" viewBox="-4 -4 20 20"
					><path
						d="M6,4C2.975,4,0,5.8,0,11,1.575,8.45,3.6,8,6,8v3l6-5L6,1Z"
					/></svg
				>

				<!-- <span class="actions__label" in:slide|local>{item.comments.length}</span> -->
			</button>
		</li>

		<!-- {#each actions as [{ label, active, onClick }, path], i (path)}
			<li class="actions__item">
				<button
					class="actions__btn"
					on:click={() => {
						active = !active;
						onClick();
					}}
				>
					<svg class="actions__icon" class:active viewBox="-4 -4 20 20"
						><path d={path} /></svg
					>

					<span class="actions__label" in:slide|local>{label}</span>
				</button>
			</li>
		{/each} -->
	</ul>
</footer>

{#if value}
	<div class="popover" transition:slide>
		<div class="comments__shape" />
		{#if !status}
			<form on:submit|preventDefault={likeEvent}>
				<div class="row">
					<div class="column">
						<label for="name">Nombre</label>
						<label for="email">Email</label>
					</div>
					<div class="column">
						<input
							type="text"
							id="name"
							name="name"
							bind:value={name}
							placeholder="nombre"
							required
						/>
						<input
							type="email"
							id="email"
							name="email"
							bind:value={email}
							placeholder="correo electrónico"
							required
						/>
					</div>
				</div>
				<button
					disabled={name.length < 1 || email.length < 6}
					class="submit"
					type="submit"
					>Me gusta!
					<span>
						<svg viewBox="0 0 20 20"
							><path
								d="M11.045,2.011a3.345,3.345,0,0,0-4.792,0c-.075.075-.15.225-.225.3-.075-.074-.15-.224-.225-.3a3.345,3.345,0,0,0-4.792,0,3.345,3.345,0,0,0,0,4.792l5.017,4.718L11.045,6.8A3.484,3.484,0,0,0,11.045,2.011Z"
							/></svg
						>
					</span>
				</button>
			</form>
		{:else if ok}
			<div class="status">
				¡Listo{name ? ", " + name + "!" : "!"}
				<em
					style="text-decoration: underline;"
					on:click={() => {
						status = false;
						email = "";
					}}>Quiero usar otro email</em
				>
			</div>
		{:else}
			<div class="status">
				<span style="color: var(--primary)">"{email}"</span> ya registra un
				<em>Me gusta</em> a este producto.
				<em
					style="text-decoration: underline;"
					on:click={() => {
						status = false;
						email = "";
					}}>Quiero usar otro email</em
				>
			</div>
		{/if}
	</div>
{/if}

<!-- {#if show}
	<section
		bind:this={boxComments}
		class="comments"
		transition:slide|local={{ easing: cubicInOut}}
	>
		<div class="comments__shape" />
		<ul>
			{#each commentsShort as { id, name, comment, created_at }, i (id)}
				<li
					class="comments__item"
					in:scale={{
						delay: i++ * 100,
						duration: 300,
						start: 0.8,
					}}
					out:slide|local={{
						duration: 300,
					}}
				>
					<header class="comments__header" style="width: 100%">
						<span class="comments__username" style="font-weight: 700;">
							{name}
						</span>

						<span class="comments__date">
							{relativeTime(
								created_at._seconds ? created_at._seconds : created_at
							)}
						</span>
					</header>
					<div class="comments__comment">
						<p class="comments__content">
							{comment}
						</p>
					</div>
				</li>
			{:else}
				<li
					class="comments__item"
					in:scale={{
						delay: parseInt(i + 1 + "00"),
						duration: 300,
						start: 0.8,
					}}
				>
					Aún no hay comentarios, <strong>se el primero!</strong>
				</li>
			{/each}
			{#if item.comments.length > limit}
				<button class="moreless" on:click={showMore}
					>mostrar ({item.comments.length - limit}) {expand
						? "menos"
						: "más"}</button
				>
			{/if}
		</ul>
	</section>
{/if} -->
<style lang="scss">
	.popover {
		// position: absolute;
		// bottom: 0;
		// left: 0;
		z-index: 2;
		// transform: translateY(87%);
		width: 100%;
		font-size: 0.9rem;

		form,
		.status {
			background-color: #443333;
			border-radius: 5px;
			padding: 0.5em;
			// box-shadow: 0 1px 2px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 7%),
			// 	0 4px 8px rgb(0 0 0 / 7%), 0 8px 16px rgb(0 0 0 / 7%),
			// 	0 16px 32px rgb(0 0 0 / 7%), 0 32px 64px rgb(0 0 0 / 7%);
		}
	}

	// reset ul elements

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	// actions

	.actions {
		margin: 0.2em 0;
		// padding: 0.2em 0;
		background-color: var(--actions-bg);
		// border-radius: 50vh;
		// border-bottom-left-radius: 50vh;
		// border-bottom-right-radius: 50vh;
		// border-top-right-radius: 50vh;
		// border-top-left-radius: 50vh;
		// border-bottom-width: 1px;
		// border-bottom-style: solid;
		// border-bottom-color: var(--actions-bg);
	}

	.actions__list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6px;
		align-items: center;
	}
	.actions__item {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.actions__btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: auto;
		padding: 0.3em 0.5em;
		transition: 0.2s;
		border: none;
		border-radius: 10px;
		transition: transform 0.1s;
		background-color: var(--actions-btn-bg);

		&:hover {
			background-color: var(--actions-btn-bg-hover);
			cursor: pointer;
		}
		&:active {
			background-color: var(--actions-btn-bg-active);
			transform: translateY(10%);
		}
		&:focus {
			outline: none;
			box-shadow: 0px 0px 0px 2px var(--actions-btn-bg-focus),
				0px 0px 0px 3px var(--bg);
		}
	}

	.actions__icon {
		display: inline-block;
		color: inherit;
		fill: var(--actions-icon-fill);
		margin: 0 auto;
		stroke: var(--actions-icon-stroke);
		stroke-width: 1px;
		width: 25px;
		height: 25px;
		padding: 0.1em;
		line-height: 1;
		flex-shrink: 0;
		max-width: initial;
	}

	.actions__label {
		white-space: nowrap;
		margin-left: 5px;
	}
	.active {
		stroke: none;
		fill: var(--actions-icon-fill-active);
	}

	// comments

	// .comments {
	// 	max-width: 350px;
	// 	// font-size: 0.8rem;
	// 	padding: 0.5em;
	// 	font-size: 0.8rem;
	// }

	.comments__shape {
		width: 0;
		height: 0;
		border-right: 10px solid transparent;
		border-top: 0px solid transparent;
		border-left: 10px solid transparent;
		border-bottom: 10px solid #443333;
		margin-left: 2.5em;
		font-weight: 300;
	}

	// .comments__item {
	// 	background-color: var(--comment-bg);
	// 	margin-bottom: 0.5em;
	// 	padding: 0.3em 0.7em;
	// 	border-radius: 5px;
	// }

	// .comments__header {
	// 	display: flex;
	// 	justify-content: flex-start;
	// 	align-items: center;
	// 	margin-bottom: 0.5em;
	// }
	// $margin-x: 0.5em;

	// .comments__avatar {
	// 	display: none;
	// 	$size: 1.5em;

	// 	width: $size;
	// 	height: $size;
	// 	min-width: $size;
	// 	min-height: $size;
	// 	overflow: hidden;
	// 	border-radius: 100%;
	// 	margin-right: $margin-x;

	// 	@include media(">=phone") {
	// 		display: inline-block;
	// 	}
	// }

	// .comments__username {
	// 	color: var(--comment-username);
	// 	white-space: nowrap;
	// 	margin-right: 0;
	// 	margin-left: 0;
	// }

	// .comments__date {
	// 	display: inline-block;
	// 	width: auto;
	// 	margin-left: auto;
	// 	overflow: hidden;
	// 	text-overflow: ellipsis;
	// 	white-space: nowrap;
	// }
	// .comments__comment {
	// 	width: 100%;
	// 	// margin-top: 0.5em;
	// }
	// .comments__content {
	// 	display: inline-block;
	// 	max-width: 100%;
	// 	margin: 0;
	// 	font-weight: 300;
	// }
	// .moreless {
	// 	display: block;
	// 	color: var(--comment-more-color);
	// 	margin: 0 auto;
	// 	// text-align: center;
	// 	padding: 0.2em 0.8em;
	// 	border: none;
	// 	border: 1px solid var(--comment-more-border);
	// 	border-radius: 50vh;
	// 	font-size: 0.8rem;
	// 	font-weight: 300;
	// 	outline: none;
	// 	background-color: var(--comment-more-bg);
	// 	cursor: pointer;

	// 	&:hover {
	// 		background-color: var(--comment-more-bg-hover);
	// 		border: 1px solid var(--comment-more-border-hover);
	// 		color: var(--comment-more-color-hover);
	// 	}
	// }

	// textarea {
	// 	// margin-top: 1em;
	// 	width: 100%;
	// 	height: auto;
	// 	border: none;
	// 	outline: none;
	// 	border-radius: 5px;
	// 	background-color: var(--comment-textarea-bg);
	// 	// border-bottom: 2px solid var(--primary-opacity-1);
	// 	padding: 0.2em 1em;
	// }

	// textarea:focus {
	// 	color: black;
	// 	background-color: var(--comment-textarea-bg-active);
	// 	// border-bottom: 2px solid var(--primary-opacity-3);
	// }

	$p-y: 0.2em;
	$p-x: 0.4em;
	$m-b: 0.3em;
	.row {
		display: flex;
		flex-basis: 100%;

		// & > * {
		// 	flex-grow: 1;
		// }

		// & .column:nth-child(1) {
		// 	flex-shrink: 1;
		// }
	}
	.column {
		// display: inline-flex;
	}
	input {
		// display: block;
		width: 100%;
		border: none;
		outline: none;
		border-radius: 5px;
		background-color: var(--comment-textarea-bg);

		padding-top: $p-y;
		padding-bottom: $p-y;
		padding-left: $p-x;
		padding-right: $p-x;
		margin-bottom: $m-b;
	}

	// input:focus {
	// 	color: black;
	// 	background-color: var(--comment-textarea-bg-active);
	// 	// border-bottom: 2px solid var(--primary-opacity-3);
	// }

	label {
		display: block;
		margin: 0;
		white-space: nowrap;

		padding-top: $p-y;
		padding-bottom: $p-y;
		padding-left: 0;
		padding-right: $p-x;

		margin-bottom: $m-b;
	}

	.submit {
		width: 100%;
		border: none;
		margin-top: 0.5em;
		background: var(--primary);
		border-radius: 5px;
		font-size: 1.1rem;
		color: var(--white);
	}

	.submit:disabled {
		background: var(--btn-bg-disabled);
		color: var(--btn-color-disabled);
	}

	// form {
	// 	// border-width: 1px;
	// 	// border-style: solid;
	// 	// border-color: rgba(255, 255, 255, 0.3);
	// 	// background-color: var(--comment-bg);
	// 	// padding: 0.5em;
	// 	// border-radius: 5px;
	// 	// margin-bottom: 0.5em;
	// }
</style>
