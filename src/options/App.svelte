<script>
  import '@common/css/main.scss';
  import Schedule from '@options/lib/Schedule.svelte';
  import Headband from '@common/lib/Headband.svelte';
  import Blacklist from '@options/lib/Blacklist.svelte';
  import { getTimestamp } from '@common/js/svelte-utils';
  import { pin, authorizationToken, snackbarMessage } from '@common/js/store';
  import Snackbar from '@common/lib/Snackbar.svelte';
  import Poppin from '@common/lib/Poppin.svelte';
  import ValidLockForm from '@options/lib/ValidLockForm.svelte';
  import Pin from '@options/lib/Pin.svelte';
  import { noScroll, scroll } from '@common/js/dom-utils';
  import { isPinValid } from '@common/js/pin-utils';

  let timestamp;
  let isAuthorized = true;

  $: if ($pin) {
    isAuthorized = isPinValid();
  }
  $: if ($authorizationToken) {
    isAuthorized = true;
  }
  $: isAuthorized ? scroll() : noScroll();

  function handleClick() {
    timestamp = getTimestamp();
  }
</script>

<svelte:window on:click={handleClick} />

{#if !isAuthorized}
  <Poppin>
    <ValidLockForm validate={isPinValid}>
      <span slot="title">Enter the PIN :</span>
    </ValidLockForm>
  </Poppin>
{/if}
<main class:blurred={!isAuthorized}>
  <Headband>
    <span slot="title"><h1>BlockSiteZen Configuration</h1></span>
    <span slot="action">&nbsp;</span>
  </Headband>

  <section>
    <h2>Blocked sites</h2>
    <Blacklist />
  </section>

  <section>
    <h2>When</h2>
    <Schedule {timestamp} />
  </section>

  <section>
    <h2>Block Code</h2>
    <Pin />
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

  main section:not(:first-of-type) {
    margin-block-start: var(--space-l);
  }

  main section:last-of-type {
    margin-block-end: var(--space-3xl);
  }

  h2 {
    margin-block-end: var(--space-xs);
    font-size: var(--step-2);
    font-family: 'montserrat-700';
    text-align: center;
  }

  .blurred {
    filter: blur(5px);
  }
</style>
