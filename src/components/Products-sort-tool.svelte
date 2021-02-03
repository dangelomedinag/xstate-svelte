<script>
	export let categories,
		filter = "todos",
		sort = "menor";
</script>

<div class="select">
	<select class="select__item select__filter" bind:value={filter}>
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
	}

	.select__item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		display: inline-block;
		color: var(--primary);
		background-color: var(--primary-opacity-1);
		border-radius: 5px;
		cursor: pointer;
		margin: 0 0.5em;
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
</style>
