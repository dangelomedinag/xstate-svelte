<script>
	import { createEventDispatcher } from "svelte";

	export let item;
	let likesCount = item.imgs.length;
	let commentsCount = item.imgs.length;
	const dispatch = createEventDispatcher();
	let actions = [
		[
			{
				label: likesCount,
				active: false,
				onClick() {
					dispatch("like", { id: item.id });
				},
			},
			"M11.045,2.011a3.345,3.345,0,0,0-4.792,0c-.075.075-.15.225-.225.3-.075-.074-.15-.224-.225-.3a3.345,3.345,0,0,0-4.792,0,3.345,3.345,0,0,0,0,4.792l5.017,4.718L11.045,6.8A3.484,3.484,0,0,0,11.045,2.011Z",
		],
		[
			{
				label: commentsCount,
				onClick() {
					dispatch("comment", { id: item.id });
				},
			},
			"M6,0C2.691,0,0,2.362,0,5.267s2.691,5.266,6,5.266a6.8,6.8,0,0,0,1.036-.079l2.725,1.485A.505.505,0,0,0,10,12a.5.5,0,0,0,.5-.5V8.711A4.893,4.893,0,0,0,12,5.267C12,2.362,9.309,0,6,0Z",
		],

		[
			{
				label: "Comparte",
				onClick() {
					dispatch("share", { id: item.id });
				},
			},
			"M6,4C2.975,4,0,5.8,0,11,1.575,8.45,3.6,8,6,8v3l6-5L6,1Z",
		],
	];
</script>

<footer class="x-n_p">
	<ul class="x-n_d">
		{#each actions as [{ label, active, onClick }, path] (path)}
			<li class="card-v10__social-item">
				<button
					class="x-n_v x-b_"
					on:click={() => {
						if (active !== "undefined") active = !active;
						onClick();
					}}
					><svg class="icon" class:active viewBox="0 0 12 12"
						><g><path d={path} /></g></svg
					>
					<span>{label}</span>
				</button>
			</li>
		{/each}
	</ul>
</footer>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.x-n_p {
		margin-top: auto;
		padding: 0.7em;
		/* border-top: 1px solid rgba(0, 0, 0, 0.149); */
	}
	.x-n_d {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6px;
		align-items: center;
	}
	li {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.x-n_v {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: auto;
		padding: 8px;
		font-size: 0.8em;
		transition: 0.2s;
		border: none;
		/* background-color: var(--primary-opacity-1); */
		/* background-color: rgba(226, 70, 70, 0.05); */
		border-radius: 10px;
		transition: transform 0.1s;
	}
	.x-n_v:hover {
		background-color: rgba(255, 0, 0, 0.05);
		cursor: pointer;
	}
	.x-n_v:active {
		background-color: var(--primary);
		transform: translateY(10%);
	}
	.x-n_v:focus {
		outline: none;
		box-shadow: 0px 0px 0px 2px var(--secondary),
			0px 0px 0px 3px var(--primary-opacity-2);
	}

	.x-n_v:hover .icon {
		/* stroke: rgb(233, 58, 58); */
	}

	.icon {
		display: inline-block;
		color: inherit;
		fill: transparent;
		margin: 0 auto;
		stroke: white;
		stroke-width: 1px;
		height: 1.3em;
		width: 1.3em;
		line-height: 1;
		flex-shrink: 0;
		max-width: initial;
	}

	.active {
		stroke: none;
		fill: rgb(233, 58, 58);
		/* stroke: rgb(233, 58, 58); */
		/* color: rgb(255, 73, 73); */
	}
	.x-n_v .icon {
		font-size: 12px;
		margin-right: 5px;
	}
</style>
