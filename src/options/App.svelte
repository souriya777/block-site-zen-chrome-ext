<script>
  import '@options/css/main.scss';
  import { blacklist } from '@options/js/store';
  import InvalidUrlError from '@options/js/InvalidUrlError';
  import Schedule from '@options/lib/Schedule.svelte';
  import ChromeStorage from '@options/js/ChromeStorage';
  import { onMount } from 'svelte';

  let currentUrl = '';
  let temp;

  onMount(() => {
    refreshBlacklist();
  });

  chrome.storage.onChanged.addListener(() => {
    console.log('tick');
    refreshBlacklist();
  });

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

  async function refreshBlacklist() {
    temp = await ChromeStorage.get('urlbis');
    console.log(temp, '😎');
  }
</script>

<main>
  <h1>BlockSiteZen</h1>
  <h2>Blocked urls</h2>
  <h3>{temp}</h3>
  <input type="text" placeholder="facebook.com" bind:value={currentUrl} />
  <button on:click={() => addToBlacklist(currentUrl)}>add</button>
  <ul class="blacklist">
    {#each $blacklist as url}
      <li>{url} <button on:click={() => removeUrlFromBlacklist(url)}>❌</button></li>
    {/each}
  </ul>

  <h2>When ?</h2>
  <button on:click={refreshBlacklist}>refresh blacklist</button>
  <button on:click={() => chrome.storage.local.remove('urlbis')}>remove blacklist</button>
  <Schedule />
</main>
