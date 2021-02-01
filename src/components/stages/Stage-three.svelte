<script>
  import StageTransitioner from './Stage-transitioner.svelte';
  export let state;
</script>

{#if state.value === 'product'}
  <StageTransitioner>
    <slot />
  </StageTransitioner>
{/if}
