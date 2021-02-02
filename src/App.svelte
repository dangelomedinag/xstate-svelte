<script>
  import { onMount } from 'svelte';
  import { useMachine } from './libs/useMachine';
  import stepsMachine from './libs/machine';
  import StageTransitioner from './Stage-transitioner.svelte';
  const { state, send } = useMachine(stepsMachine);
  import { slide } from 'svelte/transition';

  let products = [],
    categories = [],
    currproduct;
  let filteredProducts,
    filter = 'todos',
    sort = 'menor';

  function FETCH(callback) {
    const FETCH_products = fetch(
      'https://api-consweet.vercel.app/api/products'
    ).then((res) => res.json());
    FETCH_products.then((data) => (products = data));
    const FETCH_categories = fetch(
      'https://api-consweet.vercel.app/api/categories'
    ).then((res) => res.json());
    FETCH_categories.then((data) => (categories = data));

    if (callback) callback();
  }
  function set(select) {
    currproduct = select;
    console.log(currproduct);
    send('FINAL');
  }

  onMount(() => {
    FETCH(() => {
      send('MOUNT');
    });
  });

  $: if (products.length > 0) {
    filteredProducts = products
      .filter((item) =>
        filter === 'todos' ? item.nombre : item.categoria_id === filter
      )
      .sort(function (a, b) {
        if (sort === 'mayor') {
          if (a.precio < b.precio) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a.precio > b.precio) {
            return 1;
          } else {
            return -1;
          }
        }
      });
  }
</script>

<button
  on:click={() => {
    currproduct = undefined;
    send('INIT');
  }}
  disabled={$state.value === 'init'}>init</button
>
<button
  on:click={() => {
    currproduct = undefined;
    send('MID');
  }}
  disabled={$state.value === 'middle' || products.length < 1}>middle</button
>
<button
  on:click={() => send('FINAL')}
  disabled={$state.value === 'final' || !currproduct}>final</button
>
<main>
  {#if $state.matches('init')}
    <h1>Xstate! {$state.value}</h1>
    <StageTransitioner>
      {#each categories as { id, nombre }}
        <h2>{nombre}</h2>
        {#each products.filter((it) => it.categoria_id === id) as product}
          <p>
            {product.nombre}
            <button in:slide|local on:click={set(product)}>ver</button>
          </p>
        {/each}
      {:else}
        loading...
      {/each}
    </StageTransitioner>
  {/if}

  {#if $state.matches('middle')}
    <h1>Xstate! {$state.value}</h1>
    <StageTransitioner>
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
      <div>
        {#each categories as { id, nombre }}
          <h2 style="position: sticky; top: 0; background: white;">
            {nombre}
          </h2>
          {#each filteredProducts.filter((it) => it.categoria_id === id) as product}
            <p>
              {product.nombre}
              <button in:slide|local on:click={set(product)}>ver</button>
            </p>
          {/each}
        {:else}
          loading...
        {/each}
      </div>
    </StageTransitioner>
  {/if}

  {#if $state.matches('final')}
    <h1>Xstate! {$state.value}</h1>
    <StageTransitioner>
      {currproduct.nombre}
      {currproduct.precio}
    </StageTransitioner>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 2.5em;
    font-weight: 100;
  }

  h2 {
    color: #ff3e00;
    font-size: 1.5em;
    font-weight: 100;
  }
</style>
