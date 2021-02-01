<script>
  import { onMount } from 'svelte';

  import stagesMachine from './libs/machine';
  import { useMachine } from './libs/useMachine';
  import MainApp from './Main-app.svelte';

  const service = useMachine(stagesMachine);

  // log for develpment mode
</script>

<MainApp {service} />
