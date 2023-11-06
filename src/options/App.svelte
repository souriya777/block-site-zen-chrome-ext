<script>
  import '@options/css/main.scss';
  import { blacklist } from '@options/js/store';
  import InvalidUrlError from './js/InvalidUrlError';

  let currentUrl = '';

  function isValid(url) {
    return /^(https?:\/\/)?(www\.)?([a-z0-9-~_\.]+)\.([a-z]{2,})/i.test(url);
  }

  function addToBlacklist(url) {
    if (!isValid(url)) {
      throw new InvalidUrlError(`${url} is invalid`);
    }

    blacklist.update((arr) => [...arr, url]);
  }

  function removeUrlFromBlacklist(url) {
    blacklist.update((arr) => [...arr.filter((arrUrl) => arrUrl !== url)]);
  }
</script>

<main>
  <h1>DeepBlock</h1>
  <h2>Blocked urls</h2>
  <input type="text" placeholder="facebook.com" bind:value={currentUrl} />
  <button on:click={() => addToBlacklist(currentUrl)}>add</button>
  <ul class="blacklist">
    {#each $blacklist as url}
      <li>{url} <button on:click={() => removeUrlFromBlacklist(url)}>❌</button></li>
    {/each}
  </ul>

  <h2>When ?</h2>
</main>
