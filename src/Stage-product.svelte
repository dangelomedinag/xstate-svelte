<script>
  export let name, price, available;
</script>

<div>
  <h1>{name}</h1>
  <hr />
  <p>{price}</p>
  <div
    class="status"
    class:status--yes={available}
    class:status--not={!available}
  />
  <button on:click>back to list</button>
  <slot />
</div>

<style>
  .status {
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
  .status--yes {
    background-color: greenyellow;
  }
  .status--not {
    background-color: greenyellow;
  }
</style>
