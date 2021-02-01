<script>
  import StageOne from './components/stages/Stage-one.svelte';
  import StageTwo from './components/stages/Stage-two.svelte';
  import StageThree from './components/stages/Stage-three.svelte';
  import Section from './components/Section.svelte';
  import ScrollWrapper from './components/Scroll-wrapper.svelte';
  import SectionButton from './components/Section-button.svelte';
  import CardProductSkeleton from './components/Card-product-skeleton.svelte';
  import ContactMethods from './components/Contact-methods.svelte';
  import SpinLoader from './components/Spin-loader.svelte';
  import CardProduct from './components/Card-product.svelte';
  import ProductsSortTool from './components/Products-sort-tool.svelte';
  import { flip } from 'svelte/animate';
  import { linear, quintIn, quintInOut, quintOut } from 'svelte/easing';
  import ItemProduct from './components/Item-product.svelte';
  export let service;

  let { xstate, send } = service;
  $: state = $xstate;
  // $: console.log(state);
  // console.log(send);

  let sort, filter, product, selectProduct;
  let intro = {
      delay: 0,
      duration: 600,
      easing: quintOut,
      x: 400,
      opacity: 0,
    },
    outro = { duration: 600, easing: quintIn, x: -400, opacity: 0 };

  // console.log(products);
  // console.log(categories);
  // console.log(product);

  $: toolProductsSort = state.context.products
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
  $: productsFiltered = state.context.products.filter(condition);
  $: empty =
    state.context.products.length == 0 || state.context.categories.length == 0;

  function condition(item) {
    return item.salient;
  }

  function cardClickHandler(e) {
    // console.log(e.detail.product);
    product = e.detail.product;
    send('STAGE_PRODUCT');
  }
  function filterWithTags(id) {
    filter = id;
    send('STAGE_LISTING');
  }

  function setProduct() {
    console.log(filter);
    console.log(state.context.categories);
    product = selectProduct;
  }
  function tranformIdCategorie() {
    if (filter === 'todos') return '';

    const hh = state.context.categories.filter((cat) => cat.id === filter);
    return hh.nombre;
  }
</script>

<!-- {#if state} -->
<!-- <button on:click={() => send('STAGE_PRODUCT')}>product</button> -->

<!-- <button on:click={() => send('STAGE_LISTING')}>listing</button> -->
<!-- <button on:click={() => send('RETURN')}>listing</button> -->

<nav />

<StageOne {state}>
  <!-- <h1>root</h1> -->
  <Section id="section-products">
    <ScrollWrapper
      products={productsFiltered}
      on:clickCard={cardClickHandler}
    />
    {#if !empty}
      {#each state.context.categories as { nombre: name, id } (id)}
        <SectionButton on:click={filterWithTags(id)}>
          {name}
        </SectionButton>
      {/each}
      <div>
        <SectionButton main bouncy on:click={() => send('STAGE_LISTING')}
          >Mostrar todos</SectionButton
        >
      </div>
    {/if}
  </Section>

  <Section id="section-contact">
    <p>
      ¡Conversemos un poco!🤗. A través de la siguientes vias, podremos ponernos
      en contacto.
    </p>
    <ContactMethods />
    <SectionButton main>Déjanos un comemtario</SectionButton>
  </Section>

  <Section id="section-about">
    <div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, quo? Ad
        blanditiis iusto culpa sed veniam doloremque maxime qui enim dolore amet
        ratione, deleniti unde dignissimos sapiente voluptates sunt? Ut?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt iure
        et, odit ab adipisci exercitationem ipsum culpa quos, optio fugiat
        perspiciatis fugit voluptates nostrum. Enim dicta iusto laudantium
        recusandae repudiandae! Alias, itaque, esse vel doloremque repellendus
        consequuntur in ea minus corporis deleniti explicabo a ex excepturi
        suscipit soluta voluptatum, earum possimus impedit aperiam sit modi
        numquam. Nihil tempora alias eum. Exercitationem, optio. Molestias quae
        debitis accusantium nostrum atque maiores eum, est, praesentium optio,
        aliquam eius explicabo? Possimus, est natus necessitatibus voluptatem
        doloremque velit reprehenderit sint nam at sunt aut. A? Praesentium,
        animi? Inventore cum esse architecto maiores nostrum natus ipsam
        consequatur accusantium, deserunt vitae necessitatibus non nesciunt
        blanditiis, deleniti nulla, voluptatem aliquam et dolore ratione.
        Voluptates, sint? Autem, et fugit? Inventore aperiam ut quis obcaecati
        necessitatibus accusamus fuga? Qui earum ad temporibus nobis officiis
        non vitae corporis consequuntur saepe quod. Omnis accusamus est incidunt
        suscipit aspernatur distinctio repudiandae impedit error.
      </p>
    </div>
  </Section>
</StageOne>

<nav style="display: flex; justify-content: center; align-items: center">
  {#if state.value === 'listing'}
    <button on:click={() => send('RETURN')}>{'<'} inicio</button>
    {#key filter}
      <button>productos ({tranformIdCategorie()})</button>
    {/key}
  {/if}
  {#if state.value === 'product'}
    <button on:click={() => send('STAGE_ROOT')}>inicio</button>
    <button on:click={() => send('RETURN')}>{'<'} productos </button>
    <!-- svelte-ignore a11y-no-onchange -->
    <select
      class="select__item select__filter"
      bind:value={selectProduct}
      on:change={setProduct}
    >
      {#each state.context.products as product (product.id)}
        <option class="select__option" value={product}>
          {product.nombre}
        </option>
      {/each}
    </select>
    <!-- <button>{product.nombre}</button> -->
  {/if}
  <!-- <button on:click={() => send('RETURN')}>{'<'} {product.nombre}</button> -->
</nav>

<StageTwo {state}>
  <!-- <button >sssss</button> -->
  <h1>Productos</h1>
  <ProductsSortTool
    categories={state.context.categories}
    bind:sort
    bind:filter
  />
  <div class="grid-products">
    {#each toolProductsSort as item (item.id)}
      <div
        animate:flip={{
          delay: 0,
          duration: 600,
          easing: quintInOut,
          opacity: 0,
        }}
        style="padding: 1em;"
      >
        <CardProduct product={item} on:clickCard={cardClickHandler} delay={0} />
      </div>
    {/each}
  </div>
</StageTwo>

<StageThree {state}>
  <!-- <h1>product</h1> -->
  <!-- <button on:click={() => send('STAGE_ROOT')}>volver inico</button> -->
  {#key product}
    <ItemProduct {product} {intro} {outro}>
      <ContactMethods />
    </ItemProduct>
  {/key}
</StageThree>
<!-- {/if} -->

<!-- <h1>sdasdada</h1> -->
<style>
  .grid-products {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  }
  .card {
    border: 1px solid gray;
    padding: 0.5em;
    cursor: pointer;
    width: 30%;
    min-height: 200px;
  }
  .card:hover {
    background-color: rgb(189, 189, 189);
  }
  /* .oferta {
    color: limegreen;
    border: 1px solid limegreen;
    border-radius: 7px;
    padding: 0 0.4em;
    background-color: rgb(233, 255, 233);
  } */
</style>
