<script>
  import '@options/css/main.scss';
  import { blacklist, addToBlacklist } from '@options/js/store';
  import Schedule from '@options/lib/Schedule.svelte';

  let currentUrl = '';
  let temp;

  function removeUrlFromBlacklist(url) {
    blacklist.update((arr) => [...arr.filter((arrUrl) => arrUrl !== url)]);
  }

  function clearBlacklist() {
    blacklist.clear();
  }
</script>

<main>
  <h1>BlockSiteZen</h1>
  <h2>Blocked urls</h2>
  <h3>{temp}{JSON.stringify($blacklist)}</h3>
  <input type="text" placeholder="facebook.com" bind:value={currentUrl} />
  <button on:click={() => addToBlacklist(currentUrl)}>add</button>
  <ul class="blacklist">
    {#if $blacklist}
      {#each $blacklist as url}
        <li>{url} <button on:click={() => removeUrlFromBlacklist(url)}>❌</button></li>
      {/each}
    {/if}
  </ul>

  <h2>When ?</h2>
  <button on:click={clearBlacklist}>CLEAR blacklist</button>
  <Schedule />
</main>
