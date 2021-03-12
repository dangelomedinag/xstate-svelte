<script>
	export let categories,
		filter = "todos",
		sort = "menor";
</script>

<div class="select">
	<!-- <slot /> -->
	<select class="select__item select__filter" bind:value={filter}>
		<!-- <svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
			/>
		</svg> -->
		<option class="select__option" value="todos">todos</option>
		{#each categories as { nombre: name, id }}
			<option class="select__option" value={id}>
				{name}
			</option>
		{/each}
	</select>

	<select class="select__item select_sort" bind:value={sort}>
		<option class="select__option" value="menor">menor precio</option>
		<option class="select__option" value="mayor">mayor precio</option>
	</select>
</div>

<style>
	.select {
		text-align: center;
		padding: 1em;
		display: flex;
		justify-content: center;
		position: relative;
	}

	.select__item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		min-width: 0;
		overflow: hidden;
		color: var(--primary);
		background-color: var(--primary-opacity-1);
		border-radius: 5px;
		cursor: pointer;
		margin: 0 0.2em;
		/* border: 1px solid var(--primary); */
	}
	.select__item:hover {
		background-color: var(--primary-opacity-2);
	}
	.select__item:focus {
		outline: 1px dashed var(--primary-opacity-3);
		outline-offset: -3px;
		box-shadow: 0px 0px 30px 3px rgba(0, 0, 0, 0.1);
	}
	svg {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
</style>
