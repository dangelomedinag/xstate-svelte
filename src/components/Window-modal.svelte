<script>
	import {
		linear,
		quintIn,
		quintInOut,
		quintOut,
		backOut,
	} from "svelte/easing";
	import { fly, scale } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	export let show = false;
	let input = "Rafael Osorio";

	$: if (show) {
		document.body.style.overflowY = "hidden";
	} else {
		document.body.style.overflowY = "initial";
	}

	const dispacth = createEventDispatcher();

	function closeModal() {
		dispacth("close");
	}
	function foregroundAction(e) {
		if (!e.target.className.includes("foreground")) return;
		closeModal();
	}
</script>

{#if show}
	<div class="modal">
		<div class="foreground" on:click={foregroundAction}>
			<div
				class="content"
				in:scale={{
					delay: 200,
					start: 0.9,
					opacity: 0,
					easing: quintOut,
					duration: 1000,
				}}
				out:scale={{
					delay: 0,
					start: 0.95,
					opacity: 0,
					easing: backOut,
					duration: 300,
				}}
			>
				<main>
					<slot>
						Gracias por compartir tu opinion o sugerencia, nos ayuda a mejorar
						nuestro servicio.
						<form on:submit|preventDefault>
							<div class="form-group">
								<label for="name">Nombre</label>
								<input type="text" id="name" name="name" bind:value={input} />
							</div>
							<div class="form-group">
								<label for="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									value={input.split(" ").join("").toLowerCase() + "@gmail.com"}
								/>
							</div>
							<div class="form-group">
								<label for="comment">Cometario</label>
								<textarea
									name="comment"
									id="comment"
									value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quo alias veritatis tempore autem. Ipsa asperiores error tempora dolorem quasi?"
								/>
							</div>
						</form>
					</slot>
				</main>
				<footer>
					<button style="margin-right: 0.15em" disabled={!input}>enviar</button>
					<button style="margin-left: 0.15em;" on:click={closeModal}
						>cerrar</button
					>
				</footer>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
		overflow: hidden;
		position: fixed;
		z-index: 999999999;
		/* background-color: rgba(0, 0, 0, 0.5); */
		top: 0;
		left: 0;
		/* color: var(--secondary); */
		color: var(--neutral);
	}
	.foreground {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: var(--secondary-opacity-9);
		top: 0;
		left: 0;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 80%;
		height: 70%;
		max-width: 800px;
		max-height: 450px;
		/* background-color: seashell; */
		background-color: #3f2926;
		/* border: 1px solid var(--primary-opacity-1); */
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
			0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
			0 8px 16px rgba(0, 0, 0, 0.11);
	}
	main {
		height: 100%;
		overflow-y: auto;
		padding: 1em;
	}

	form {
		padding: 1em 0;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	label {
		margin-top: 0.5em;
		font-size: 0.8rem;
		font-weight: 300;
		color: var(--primary-opacity-4);
	}

	input,
	textarea {
		background-color: transparent;
		color: var(--neutral-3);
		border: none;
		outline: none;
		border-bottom: 1px solid var(--primary-opacity-1);
	}
	textarea {
		margin-top: 0px;
		margin-bottom: 0px;
		height: 100%;
	}

	footer {
		height: auto;
		display: flex;
		width: 70%;
	}
	button {
		/* color: var(--secondary); */
		background-color: transparent;
		width: 50%;
		outline: none;
		border: none;
		padding: 0.6em;
		cursor: pointer;
		border-radius: 5px;
		margin: 0.5em;
	}
	button:hover {
		background-color: var(--primary-opacity-1);
	}
	button:active {
		background-color: var(--primary-opacity-3);
	}
</style>
