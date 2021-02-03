<script>
  import { onMount } from 'svelte';
  import { useMachine } from './libs/useMachine';
  import stepsMachine from './libs/machine';
  import StageTransitioner from './Stage-transitioner.svelte';
  const { state, send } = useMachine(stepsMachine, {});
  import { quintOut, quintIn, quintInOut } from 'svelte/easing';
  import { flip } from 'svelte/animate';
  import productsBack from '../products';
  import categoriesBack from '../categories';
  import ProductsSortTool from './components/Products-sort-tool.svelte';
  import ScrollWrapper from './components/Scroll-wrapper.svelte';
  import Section from './components/Section.svelte';
  import SectionButton from './components/Section-button.svelte';
  import ItemProduct from './components/Item-product.svelte';
  import ContactMethods from './components/Contact-methods.svelte';
  import CardProduct from './components/Card-product.svelte';

  let products = [],
    categories = [],
    currproduct,
    selectProduct;
  let filteredProducts,
    filterCatSort = [],
    salienteProducts = [],
    filter = 'todos',
    sort = 'menor';

  function FETCH(callback) {
    const FETCH_products = fetch('https://api-consweet.vercel.app/api/products')
      .then((res) => {
        if (res.status > 299) throw new Error('bad status code for response');
        res.json().then((data) => (products = data));
      })
      .catch((err) => {
        console.error(err);
        products = productsBack;
      });

    const FETCH_categories = fetch(
      'https://api-consweet.vercel.app/api/categories'
    )
      .then((res) => {
        if (res.status > 299) throw new Error('bad status code for response');
        res.json().then((data) => (categories = data));
      })
      .catch((err) => {
        console.error(err);
        categories = categoriesBack;
      });

    if (callback) callback();
  }
  function showProduct(e) {
    currproduct = e.detail.product;
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

    salienteProducts = products.filter((item) => item.salient);
  }
  function filterWithTags(id) {
    filter = id;
    send('MID');
  }

  $: if (categories.length > 0 && products.length > 0) {
    filterCatSort = categories.sort((a, b) => {
      const aID = a.id;
      const elementA = products.find((it) => it.categoria_id === aID);
      const bID = b.id;
      const elementB = products.find((it) => it.categoria_id === bID);
      // console.log(elementA.precio);

      if (sort === 'mayor') {
        if (elementA.precio < elementB.precio) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (elementA.precio > elementB.precio) {
          return 1;
        } else {
          return -1;
        }
      }
    });

    // const testFilter2 = categories.forEach((a) => {
    //   console.log(a);
    //   const aID = a.id;
    // const elementA = products.find((it) => it.categoria_id === aID);
    // console.log(elementA.precio);
    // });

    // console.log(testFilter);
  }
</script>

<div class="container-full">
  <div class="container">
    {#if $state.matches('init')}
      <StageTransitioner>
        <!-- <button
      on:click={() => {
        currproduct = undefined;
        send('MID');
      }}
      disabled={$state.value === 'middle' || products.length < 1}>middle</button
    > -->

        <Section id="section-products">
          <ScrollWrapper
            products={salienteProducts}
            on:clickCard={showProduct}
          />
          {#each categories as { nombre: name, id } (id)}
            <SectionButton on:click={filterWithTags(id)}>
              {name}
            </SectionButton>
          {/each}
          <div>
            <SectionButton main bouncy on:click={() => send('MID')}>
              Mostrar todos
            </SectionButton>
          </div>
        </Section>
        <Section id="section-contact">
          <p>
            ¡Conversemos un poco!🤗. A través de la siguientes vias, podremos
            ponernos en contacto.
          </p>
          <ContactMethods />
          <SectionButton main>Déjanos un comemtario</SectionButton>
        </Section>

        <Section id="section-about">
          <div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, quo?
              Ad blanditiis iusto culpa sed veniam doloremque maxime qui enim
              dolore amet ratione, deleniti unde dignissimos sapiente voluptates
              sunt? Ut?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              iure et, odit ab adipisci exercitationem ipsum culpa quos, optio
              fugiat perspiciatis fugit voluptates nostrum. Enim dicta iusto
              laudantium recusandae repudiandae! Alias, itaque, esse vel
              doloremque repellendus consequuntur in ea minus corporis deleniti
              explicabo a ex excepturi suscipit soluta voluptatum, earum
              possimus impedit aperiam sit modi numquam. Nihil tempora alias
              eum. Exercitationem, optio. Molestias quae debitis accusantium
              nostrum atque maiores eum, est, praesentium optio, aliquam eius
              explicabo? Possimus, est natus necessitatibus voluptatem
              doloremque velit reprehenderit sint nam at sunt aut. A?
              Praesentium, animi? Inventore cum esse architecto maiores nostrum
              natus ipsam consequatur accusantium, deserunt vitae necessitatibus
              non nesciunt blanditiis, deleniti nulla, voluptatem aliquam et
              dolore ratione. Voluptates, sint? Autem, et fugit? Inventore
              aperiam ut quis obcaecati necessitatibus accusamus fuga? Qui earum
              ad temporibus nobis officiis non vitae corporis consequuntur saepe
              quod. Omnis accusamus est incidunt suscipit aspernatur distinctio
              repudiandae impedit error.
            </p>
          </div>
        </Section>
      </StageTransitioner>
    {/if}

    <nav
      style="padding-top: 1em; display: flex; justify-content: center; align-items: center"
    >
      {#if $state.matches('middle')}
        <button on:click={() => send('INIT')}>inicio</button>
        <!-- {#key filter} -->
        <button>productos ({filter === 'todos' ? filter : ''})</button>
        <!-- {/key} -->
      {/if}

      {#if $state.matches('final')}
        <button
          on:click={() => {
            send('INIT');
            currproduct = undefined;
          }}>inicio</button
        >
        <button
          on:click={() => {
            send('MID');
            currproduct = undefined;
          }}
          >productos
        </button>
        <!-- svelte-ignore a11y-no-onchange -->
        <select
          style="max-width: 150px"
          class="select__item select__filter"
          bind:value={selectProduct}
          on:change={() => {
            currproduct = selectProduct;
          }}
        >
          {#each products as product (product.id)}
            <option class="select__option" value={product}>
              {product.nombre}
            </option>
          {/each}
        </select>
        <!-- <button>{product.nombre}</button> -->
      {/if}
      <!-- <button on:click={() => send('RETURN')}>{'<'} {product.nombre}</button> -->
    </nav>

    {#if $state.matches('middle')}
      <!-- <button
    on:click={() => {
      currproduct = undefined;
      send('INIT');
    }}
    disabled={$state.value === 'init'}>init</button
  > -->
      <StageTransitioner>
        <div
          style="position: sticky; top: 0; z-index: 99999999; background-color: var(--secondary);width: 100%; border-bottom: 1px solid var(--neutral-opacity-1);"
        >
          <ProductsSortTool {categories} bind:filter bind:sort />
        </div>
        <div class="grid-products">
          {#each filterCatSort.filter((item) =>
            filter === 'todos' ? item.nombre : item.id === filter
          ) as { id, nombre: name }}
            <h3
              style="margin:0;padding: 0.5em 0;text-align: center;position: sticky; top: 66px; z-index: 99999999; background-color: var(--secondary);width: 100%; border-bottom: 1px solid var(--neutral-opacity-1);"
            >
              {name}
            </h3>
            {#each products.filter((it) => it.categoria_id === id) as item (item.id)}
              <div
                animate:flip={{
                  delay: 0,
                  duration: 600,
                  easing: quintInOut,
                  opacity: 0,
                }}
                style="padding: 1em;"
              >
                <CardProduct
                  product={item}
                  on:clickCard={showProduct}
                  delay={0}
                />
              </div>
            {/each}
          {/each}
        </div>
      </StageTransitioner>
    {/if}

    {#if $state.matches('final')}
      <!-- <button
    on:click={() => {
      send('INIT');
      currproduct = undefined;
    }}
    disabled={$state.value === 'init'}>init</button
  >
  <button
    on:click={() => {
      send('MID');
      currproduct = undefined;
    }}
    disabled={$state.value === 'middle' || products.length < 1}>middle</button
  > -->
      <StageTransitioner>
        <ItemProduct product={currproduct}>
          <ContactMethods />
        </ItemProduct>
      </StageTransitioner>
    {/if}
  </div>
</div>

<style>
  .grid-products {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  }
  /* .grid-products { */
  /* padding: 1em; */
  /* display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden; */
  /* } */
</style>
