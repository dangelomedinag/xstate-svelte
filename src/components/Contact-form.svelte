<script>
	import { linear, quintIn, quintInOut, quintOut } from "svelte/easing";
	import { fly, scale } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	export let show = false;

	const dispacth = createEventDispatcher();
	function closeDispatch(e) {
		console.log(e.target);
		dispacth("close");
	}
</script>

{#if show}
	<div class="wrapper-form">
		<div class="foreground" on:click={closeDispatch} />
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
				easing: quintIn,
				duration: 200,
			}}
		>
			<form on:submit|preventDefault>
				<label for="name">nombre</label>
				<input type="text" name="name" placeholder="ej. Pablo Marmol" />
				<label for="name">email</label>
				<input
					type="email"
					name="email"
					placeholder="ej. pablomarmol@mail.cl"
				/>
				<label for="message">mensaje</label>
				<textarea placeholder="ej. comentario, duda, o sugerencia" />
				<div>
					<button type="submit">enviar</button>
					<button type="button" on:click={closeDispatch}>cerrar</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.wrapper-form {
		display: flex;
		justify-content: center;
		align-items: center;
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
		color: var(--secondary);
	}
	.foreground {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: fixed;
		z-index: 9999999999;
		background-color: rgba(0, 0, 0, 0.5);
		top: 0;
		left: 0;
	}
	.content {
		position: fixed;
		z-index: 99999999999999;
	}

	form {
		border-radius: 10px;
		padding: 2em;
		background-color: rgb(243, 243, 243);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: left;
		max-width: 90vw;
		max-height: 80vh;
	}
	input,
	textarea {
		width: 100%;
	}
</style>
