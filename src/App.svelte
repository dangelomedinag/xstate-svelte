<script>
  import { listen } from 'svelte/internal';

  import { interpret } from 'xstate';
  import stagesMachine from './libs/machine';
  import StageListing from './Stage-listing.svelte';
  import StageProduct from './Stage-product.svelte';
  import StageRoot from './Stage-root.svelte';

  let current = 'root';
  let products = [
    { name: 'keyboard', price: 70, available: true },
    { name: 'screen', price: 250, available: false },
    { name: 'smartphone', price: 600, available: true },
    { name: 'mouse', price: 50, available: true },
    { name: 'headphone', price: 20, available: false },
  ];

  let product = products[0];

  const service = interpret(stagesMachine);
  service
    .onTransition((state) => {
      current = state.value;
      console.log(state.value);
    })
    .start();

  function setProduct(newProduct) {
    product = newProduct;
  }
</script>

{#if current === 'root'}
  <StageRoot>
    <h1>root</h1>
    <button on:click={() => service.send('STAGE_LISTING')}
      >show products!</button
    >
    <hr />
    <h3>recomended products</h3>
    <div class="grid-products">
      {#each products.filter((it) => it.available) as product}
        <div
          class="card"
          on:click={() => {
            setProduct(product);
            service.send('STAGE_PRODUCT');
          }}
        >
          <h1>{product.name}</h1>
          <hr />
          <p>price: {product.price}</p>
        </div>
      {/each}
    </div>
  </StageRoot>
{:else if current === 'listing'}
  <StageListing>
    <h1>root &gt; listing</h1>
    <button on:click={() => service.send('RETURN')}>Back home</button>
    <hr />
    <ul>
      {#each products as product, i}
        <li>
          {i} - {product.name}
          <button
            on:click={() => {
              setProduct(product);
              service.send('STAGE_PRODUCT');
            }}>show</button
          >
        </li>
      {/each}
    </ul>
  </StageListing>
{:else if current === 'product'}
  <StageProduct {...product} on:click={() => service.send('RETURN')}>
    <button on:click={() => service.send('STAGE_ROOT')}>back home</button>
  </StageProduct>
{/if}

<style>
  .card {
    border: 1px solid gray;
    padding: 0.5em;
    cursor: pointer;
  }
  .card:hover {
    background-color: rgb(189, 189, 189);
  }
  .grid-products {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
</style>
