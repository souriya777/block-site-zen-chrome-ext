<script>
  import { blacklist } from '@common/js/store';
  import BinSvg from '@common/lib/BinSvg.svelte';
  import Snackbar from '@common/lib/Snackbar.svelte';
  import AddUrlForm from '@options/lib/AddUrlForm.svelte';

  let successMessage = null;

  function removeUrlFromBlacklist(url) {
    blacklist.update((arr) => [...arr.filter((arrUrl) => arrUrl !== url)]);
  }

  function clearBlacklist() {
    blacklist.clear();
  }

  function showSucessMessage(url) {
    successMessage = `${url} was added with success 🎉`;
  }
</script>

<div class="blacklist">
  <div class="header">
    <div class="clear"><button class="normal" on:click={clearBlacklist}>clear</button></div>
    <div class="add">
      <AddUrlForm
        on:addSuccess={(e) => {
          showSucessMessage(e.detail?.url);
        }}
      />
    </div>
  </div>
  <div class="content">
    <ul>
      {#if $blacklist}
        {#each $blacklist as url}
          <li>
            <div class="url">{url}</div>
            <button class="icon primary" on:click={() => removeUrlFromBlacklist(url)}
              ><BinSvg /></button
            >
          </li>
        {/each}
      {/if}
    </ul>
  </div>

  <Snackbar message={successMessage} />
</div>

<style>
  :root {
    --border-radius-container: 12px;
    --border-radius-header: 8px;
    --padding-container: 12px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 10px;
    margin-inline: auto;
    border-bottom: 1px solid var(--color-discret);
  }

  li:hover {
    color: var(--color-accent);
  }

  .url {
    max-width: 88%;
    overflow-x: scroll;
  }

  .blacklist {
    position: relative;
    max-width: 686px;
    border: 4px solid var(--color-primary-alternative);
    font-size: 14px;
    border-radius: var(--border-radius-container);
  }

  .header {
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding-inline: var(--padding-container);
    padding-block: 16px 28px;
    background-color: var(--color-discret);
    border-top-left-radius: var(--border-radius-header);
    border-top-right-radius: var(--border-radius-header);
  }

  .content {
    max-height: 400px;
    padding: 0 var(--padding-container);
    overflow-y: scroll;
    /* border-bottom-left-radius: var(--border-radius-container);
    border-bottom-right-radius: var(--border-radius-container); */
  }

  .add {
    display: flex;
  }
</style>
