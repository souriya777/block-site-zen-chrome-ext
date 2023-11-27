<script>
  import '@common/css/main.scss';
  import { closeCurrentTab, currentUrlAndFavicon, getOptionsUrl } from '@common/js/chrome-utils';
  import { extractDomain, isValidUrl } from '@common/js/string-utils';
  import { addToBlacklist, isBlacklisted } from '@common/js/blacklist-utils';
  import SettingsSvg from '@common/lib/SettingsSvg.svelte';
  import Headband from '@common/lib/Headband.svelte';

  const NOT_BLOCKED_MSG = 'is not blocked.';
  const BLOCKED_MSG = 'is blocked 🎉.';

  let url;
  let domain;
  let success = false;
  $: isPageValid = isValidUrl(url);
  $: message = success ? BLOCKED_MSG : NOT_BLOCKED_MSG;
  $: if (isBlacklisted(url)) {
    success = true;
  }

  chrome.runtime.sendMessage(
    {
      data: 'Handshake',
    },

    function (response) {
      console.log('handshake', response);
    },
  );

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('🟢listener', message.data, message?.url);
  });

  function openParams() {
    window.open(getOptionsUrl(), '_blank');
  }

  async function blockSite() {
    if (success) {
      closeCurrentTab();
      return;
    }

    addToBlacklist(domain);
    success = true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    currentUrlAndFavicon().then((result) => {
      url = result.url;
      domain = extractDomain(url);
    });
  });
</script>

<main>
  <div class="my-headband">
    <Headband>
      <span slot="title">BlockSiteZen</span>
      <span slot="action">
        <button class="icon" on:click|preventDefault={openParams}>
          <SettingsSvg />
        </button>
      </span>
    </Headband>
  </div>

  <div class="content">
    {#if isPageValid}
      <div class="msg">
        <span class="url">
          {domain}
        </span>
        <span class="msg" class:success>
          {message}
        </span>
      </div>
      <div class="action">
        <button class="normal primary" class:button__success={success} on:click={blockSite}>
          {#if success}
            <span class="summary">Close!</span>
            <span class="detail">Close this page</span>
          {:else}
            <span class="summary">Block!</span>
            <span class="detail">Block this site</span>
          {/if}
        </button>
      </div>
    {:else}
      <div class="msg">Unavailable on this page.</div>
    {/if}
  </div>
</main>

<style>
  :root {
    --padding-inline: 10px;
  }

  :global(main .my-headband .headband) {
    padding: var(--space-3xs) var(--space-2xs);
  }

  main {
    width: 280px;
  }

  .my-headband {
    color: var(--color-on-primary);
  }

  .content {
    display: flex;
    flex-direction: column;
    padding-block: 16px 24px;
    background-color: var(--background-color-tertiary);
  }

  .url {
    color: var(--color-accent);
    font-family: 'montserrat-700';
  }

  .msg {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
  }

  .action {
    margin-block-start: 28px;
    margin-inline: auto;
    font-size: 16px;
  }

  .content {
    padding-inline: var(--padding-inline);
  }

  .success {
    background-color: var(--color-success);
  }

  .button__success {
    border-color: var(--color-success);
  }
</style>
