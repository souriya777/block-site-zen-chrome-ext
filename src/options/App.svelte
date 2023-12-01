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
    <h2>Which sites</h2>
    <Blacklist />
  </section>

  <section>
    <h2>When</h2>
    <Schedule {timestamp} />
  </section>

  <Snackbar message={$snackbarMessage} />
</main>

<style>
  :root {
    --max-width-options: 802px;
  }

  main {
    min-height: 100vh;
    font-size: var(--step--1);
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: var(--max-width-options);
    margin-inline: auto;
  }

  main section:first-of-type {
    margin-block-start: var(--space-s);
  }

  main section:nth-of-type(2) {
    margin-block: var(--space-l) var(--space-3xl);
  }

  h2 {
    margin-block-end: var(--space-xs);
    font-size: var(--step-2);
    font-family: 'montserrat-700';
    text-align: center;
  }
</style>
