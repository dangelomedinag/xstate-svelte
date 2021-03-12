<script>
	import {
		linear,
		quintIn,
		quintInOut,
		quintOut,
		backOut,
		cubicOut,
	} from "svelte/easing";
	import { scale, fade } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	export let show;
	let input = "Rafael Osorio";

	$: if (show) {
		document.body.classList.add("noscroll");
	} else {
		document.body.classList.remove("noscroll");
	}

	const dispacth = createEventDispatcher();

	function closeModal() {
		dispacth("close");
	}
	function foregroundAction(e) {
		// e.matches(e.target);
		if (!e.target.matches(".foreground")) return;
		closeModal();
	}
	function fly(
		node,
		{
			delay = 0,
			duration = 250,
			easing: easing$1 = quintOut,
			x = 0,
			y = 5,
			start = 0.99,
			opacity = 0,
		} = {}
	) {
		const style = getComputedStyle(node);
		const target_opacity = +style.opacity;
		const transform = style.transform === "none" ? "" : style.transform;
		const sd = 1 - start;
		const od = target_opacity * (1 - opacity);
		return {
			delay,
			duration,
			easing: easing$1,
			css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}%, ${(1 - t) * y}%);`,
		};
	}
</script>

{#if show}
	<div class="modal" in:fly>
		<div class="foreground" on:click={foregroundAction}>
			<div class="content">
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
									rows="4"
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

<style lang="scss">
	/* modal-foreground
	modal-bg
	modal-input-bg
	modal-input-bg-focus */

	.modal {
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
		overflow: hidden;
		position: fixed;
		z-index: 25;
		/* background-color: rgba(0, 0, 0, 0.5); */
		top: 0;
		left: 0;
		/* color: var(--secondary); */
		/* color: var(--neutral); */
	}
	.foreground {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: var(--modal-foreground);
		top: 0;
		left: 0;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 90%;
		max-width: 95vw;
		max-height: 95vh;
		/* background-color: seashell; */
		background-color: var(--modal-bg);
		/* border: 1px solid var(--primary-opacity-1); */
		border-radius: 10px;
		// border-radius: 10px;
		// border-bottom-left-radius: 0;
		// border-bottom-right-radius: 0;
		overflow: hidden;
		// margin-bottom: 1em;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
			0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
			0 8px 16px rgba(0, 0, 0, 0.11);

		@include media(">=tablet") {
			max-width: 650px;
			max-height: 70vh;
		}
	}
	main {
		position: relative;
		height: 100%;
		overflow-y: auto;
		// padding: 1em 1em 0em 1em;
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

	form {
		padding: 1em 0 0;
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
		background-color: var(--modal-input-bg);
		// color: var(--neutral-3);
		border: none;
		outline: none;
		// border-bottom: 1px solid var(--primary-opacity-1);
		border-radius: 5px;

		&:focus {
			background-color: var(--modal-input-bg-focus);
		}
	}
	textarea {
		margin-top: 0px;
		margin-bottom: 0px;
		height: 100%;
	}

	footer {
		height: auto;
		display: flex;
		// width: 70%;
		// border-top: 1px solid rgba(255, 255, 255, 0.1);
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
