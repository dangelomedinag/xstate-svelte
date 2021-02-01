<script>
  import { fly, slide, scale, fade } from 'svelte/transition';

  // interface ScaleParams {
  //   delay?: number;
  //   duration?: number;
  //   easing?: EasingFunction;
  //   start?: number;
  //   opacity?: number;
  // }

  import { quintInOut, quintIn, quintOut, linear } from 'svelte/easing';
</script>

<!-- <div
  in:fade={{
    delay: 250,
    duration: 300,
    easing: quintOut,
    opacity: 0,
    y: 150,
  }}
> -->
<div
  in:fly={{
    delay: 0,
    duration: 300,
    easing: quintOut,
    opacity: 0,
    y: 50,
  }}
>
  <slot />
</div>
