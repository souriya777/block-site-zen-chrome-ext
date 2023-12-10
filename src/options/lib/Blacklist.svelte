<script>
  import { blacklist, snackbarMessage } from '@common/js/store';
  import { extractDomain } from '@common/js/string-utils';
  import ButtonFloatingDown from '@common/lib/ButtonFloatingDown.svelte';
  import AddUrlForm from '@options/lib/AddUrlForm.svelte';
  import { observeVisibleElement } from '@common/js/observe-utils';
  import BlacklistItem from '@options/lib/BlacklistItem.svelte';

  const MAX_HEIGHT_CONTENT_LIST = 300;
  const SCROLL_OFFSET = 190;

  let blacklistElement;
  let contentElement;
  let listElement;
  let lastElement;

  $: blacklistVisible = $blacklist && $blacklist.length > 0;
  $: scrollButtonVisible = blacklistVisible && $blacklist.length > 5;

  $: scrollable = listElement && listElement.clientHeight > MAX_HEIGHT_CONTENT_LIST ? true : false;

  $: if (lastElement && blacklistElement) {
    observeVisibleElement(lastElement, blacklistElement, 'scrollEnd', 0.8);
  }

  function removeUrlFromBlacklist(domain) {
    blacklist.update((arr) => [...arr.filter((arrDomain) => arrDomain !== domain)]);
  }

  function clearBlacklist() {
    blacklist.clear();
  }

  function showSucessMessage(url) {
    $snackbarMessage = `${extractDomain(url)} was added with success 🎉`;
  }

  function scrollDown() {
    if (contentElement) {
      contentElement.scrollTo({
        top: contentElement.scrollTop + SCROLL_OFFSET,
        behavior: 'smooth',
      });
    }
  }

  function handleRemove(e) {
    removeUrlFromBlacklist(e.detail.domain);
  }
</script>

<!-- TO DEBUG -->
<!-- blacklist:{JSON.stringify($blacklist)}
<code> const blacklist = await chrome.storage.local.get('blacklist'); </code> -->

<div bind:this={blacklistElement} class="blacklist container">
  <div class="container__header header">
    <div class="clear">
      <button class="normal" on:click={clearBlacklist}>
        <span class="summary">Clear!</span>
        <span class="detail">Clear all</span>
      </button>
    </div>
    <div class="add">
      <AddUrlForm
        on:addSuccess={(e) => {
          showSucessMessage(e.detail?.url);
        }}
      />
    </div>
  </div>
  <div
    bind:this={contentElement}
    class="content"
    class:scrollable
    style={`max-height: ${MAX_HEIGHT_CONTENT_LIST}px`}
  >
    {#if blacklistVisible}
      <ul bind:this={listElement}>
        {#each $blacklist as domain, i}
          {#if i === $blacklist.length - 1}
            <li class="last" bind:this={lastElement}>
              <BlacklistItem {domain} on:remove={handleRemove} />
            </li>
          {:else}
            <li>
              <BlacklistItem {domain} on:remove={handleRemove} />
            </li>
          {/if}
        {/each}
      </ul>
    {:else}
      <p class="empty">No URL was blacklisted.</p>
    {/if}
  </div>

  {#if scrollButtonVisible}
    <div class="floating-button">
      <ButtonFloatingDown on:click={scrollDown} />
    </div>
  {/if}
</div>

<style>
  :root {
    --border-radius-container: 12px;
    --border-radius-header: 8px;
    --padding-container: 12px;
  }

  :global(.blacklist.scrollEnd .floating-button) {
    display: none;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 10px;
    margin-inline: auto;
  }

  li:nth-child(n + 2) {
    border-top: 1px solid var(--color-discret);
  }

  li:hover {
    color: var(--color-accent-4);
  }

  .blacklist {
    position: relative;
    width: 100%;
    border: 4px solid var(--color-primary);
    border-radius: var(--border-radius-container);
  }

  .header {
    display: flex;
    padding-inline: var(--space-s);
  }

  .content {
    padding: 0 var(--padding-container);
    overflow-y: scroll;
  }

  .add {
    flex-grow: 1;
    margin-inline-start: var(--space-xl);
  }

  .empty {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-block: var(--space-l);
    font-style: italic;
  }

  .floating-button {
    display: block;
  }
</style>
