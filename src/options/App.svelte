<script>
  import '@common/css/main.scss';
  import Schedule from '@options/lib/Schedule.svelte';
  import Headband from '@common/lib/Headband.svelte';
  import Blacklist from '@options/lib/Blacklist.svelte';
  import { getTimestamp } from '@common/js/svelte-utils';
  import { snackbarMessage } from '@common/js/store';
  import Snackbar from '@common/lib/Snackbar.svelte';

  let timestamp;

  function handleClick() {
    timestamp = getTimestamp();
  }
</script>

<svelte:window on:click={handleClick} />

<main>
  <Headband>
    <span slot="title"><h1>BlockSiteZen Configuration</h1></span>
    <span slot="action">&nbsp;</span>
  </Headband>

  <section>
    <h2>Which sites ?</h2>
    <Blacklist />
  </section>

  <section>
    <h2>When ?</h2>
    <Schedule {timestamp} />
  </section>

  <Snackbar message={$snackbarMessage} />
</main>

<style>
  :root {
    --max-width-options: 768px;
  }

  main {
    border: 2px dashed hotpink;
    min-height: 100vh;
    max-width: var(--max-width-options);
    margin-inline: auto;
    font-size: var(--step--2);
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: var(--space-l);
  }

  main section:nth-of-type(2) {
    margin-block-start: var(--space-l);
  }

  h2 {
    margin-block: var(--space-2xs) var(--space-m);
    font-size: var(--step-2);
    font-family: 'montserrat-700';
    text-align: center;
  }
</style>
