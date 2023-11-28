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
  <div class="options">
    <Headband>
      <span slot="title">
        <h1>BlockSiteZen</h1>
      </span>
    </Headband>

    <h2>Blocked urls</h2>
    <Blacklist />

    <h2>When ?</h2>
    <Schedule {timestamp} />
  </div>

  <Snackbar message={$snackbarMessage} />
</main>

<style>
  main {
    min-height: 100vh;
  }

  .options {
    font-size: 14px;
  }
</style>
