<script>
  import '@common/css/main.scss';
  import { addToBlacklist } from '@common/js/store';
  import { closeCurrentTab, currentUrlAndFavicon, getOptionsUrl } from '@common/js/chrome-utils';
  import { extractDomain, isValidUrl } from '@common/js/string-utils';
  import SettingsSvg from '@common/lib/SettingsSvg.svelte';
  import Headband from '@common/lib/Headband.svelte';

  let url;
  let domain;
  $: isPageValid = isValidUrl(url);

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
    addToBlacklist(domain);
    closeCurrentTab();
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
        <span class="url">{domain}</span>is not blocked.
      </div>
      <div class="action">
        <button class="normal primary" on:click={blockSite}>
          <span class="summary">Block!</span>
          <span class="detail">Block this site</span>
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
    --translate-button-summary: -30px;
    --translate-button-detail: 30px;
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
</style>
