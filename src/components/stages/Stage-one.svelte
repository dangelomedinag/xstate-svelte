<script>
  import StageTransitioner from './Stage-transitioner.svelte';
  export let state;

  $: console.log(state.value);
</script>

{#if state.value === 'root'}
  <StageTransitioner>
    <slot />
  </StageTransitioner>
{/if}
