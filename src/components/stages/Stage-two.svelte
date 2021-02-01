<script>
  import StageTransitioner from './Stage-transitioner.svelte';
  export let state;
</script>

{#if state.value === 'listing'}
  <StageTransitioner>
    <slot />
  </StageTransitioner>
{/if}
