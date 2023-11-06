<script>
  import '@options/css/main.scss';
  import { blacklist } from '@options/js/store';

  let currentUrl = '';

  function addToBlacklist(url) {
    blacklist.update((arr) => [...arr, url]);
  }
</script>

<main>
  <h1>DeepBlock</h1>
  <h2>blacklist</h2>
  <input type="text" placeholder="facebook.com" bind:value={currentUrl} />
  <button on:click={() => addToBlacklist(currentUrl)}>add</button>
  <ul class="blacklist">
    {#each $blacklist as item}
      <li>{item}</li>
    {/each}
  </ul>
</main>
